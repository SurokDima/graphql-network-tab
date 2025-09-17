import { AppliedRule } from "../../common/types/graphQL-request-rule";
import { WebsiteConfig } from "../../common/types/website-config";
import { getDomain } from "../../common/utils/string.utils";
import { storage } from "../storage";

import { ScriptCodeType, ScriptType, injectScript } from "./scripting";

export type MessageFromContentScript =
  | {
      action: "ruleApplied";
      appliedRule: AppliedRule;
    }
  | {
      action: "injectMockingScript";
    };

export const initializeMessagesHandler = () => {
  console.info("[GraphQL Network Tab][Service Worker]: Initializing messages handler.");

  chrome.runtime.onMessage.addListener(async (message, sender) => {
    console.info(
      "[GraphQL Network Tab][Service Worker]: Received message from content script.",
      message,
      sender
    );

    if (sender.tab?.id === undefined || sender.frameId === undefined || !sender.tab.url) return;
    const domainResult = getDomain(sender.tab.url);

    if (!domainResult.ok) {
      console.error(
        "[GraphQL Network Tab][Service Worker]: Could not extract domain from the URL.",
        sender.tab.url
      );

      return;
    }

    const domain = domainResult.value;

    if (message.action === "injectMockingScript") {
      // Inject the mocking script, which mocks nothing at first
      // We need to enable mocking by calling attachFetch() function
      chrome.scripting.executeScript({
        target: {
          tabId: sender.tab.id,
          frameIds: [sender.frameId],
        },
        files: ["injected-script/injected-script.iife.js"],
        world: "MAIN",
        injectImmediately: true,
      });

      const websiteConfigs = (await storage.getItem<WebsiteConfig[]>("requestRules")) ?? [];
      console.info(
        "[GraphQL Network Tab][Service Worker]: Retrieved website configs from storage",
        websiteConfigs
      );
      const websiteConfig = websiteConfigs.find((config) => config.domain === domain);

      if (!websiteConfig) {
        console.error(
          "[GraphQL Network Tab][Service Worker]: Could not find website config for the domain.",
          domain
        );

        return;
      }

      if (!websiteConfig.enabled) {
        console.info(
          "[GraphQL Network Tab][Service Worker]: Feature is disabled for the domain",
          sender.tab
        );

        return;
      }

      injectScript(
        {
          codeType: ScriptCodeType.JS,
          type: ScriptType.CODE,
          value: `window.attachFetch?.(); window.GRAPHQL_NETWORK_TAB = {
        requestRules: ${JSON.stringify(websiteConfig.rules)}
      };`,
        },
        { tabId: sender.tab.id }
      );
    }

    if (message.action === "ruleApplied") {
      storage.updateItem<AppliedRule[] | null | undefined, AppliedRule[]>(
        "appliedRules",
        (prevAppliedRules) => {
          const newAppliedRules = [...(prevAppliedRules ?? []), message.appliedRule];
          return newAppliedRules;
        }
      );
    }
  });
};
