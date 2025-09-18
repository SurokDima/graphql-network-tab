import { AppliedRule } from "../../common/types/rule";
import { WebsiteConfig } from "../../common/types/websiteConfig";
import { safeGetDomain } from "../../common/utils/string.utils";
import { logger } from "../logger";
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
  logger.info("Initializing messages handler.");

  chrome.runtime.onMessage.addListener(async (message, sender) => {
    logger.info("Received message from content script.", { message, sender });

    if (sender.tab?.id === undefined || sender.frameId === undefined || !sender.tab.url) return;
    const domainResult = safeGetDomain(sender.tab.url);

    if (!domainResult.ok) {
      logger.error("Could not extract domain from the URL.", sender.tab.url);

      return;
    }

    const domain = domainResult.value;

    if (message.action === "injectMockingScript") {
      logger.info("Injecting mocking script.");
      // Inject the mocking script, which mocks nothing at first
      // We need to enable mocking by calling attachFetch() function
      chrome.scripting.executeScript({
        target: {
          tabId: sender.tab.id,
          frameIds: [sender.frameId],
        },
        files: ["injectedScript/injected-script.iife.js"],
        world: "MAIN",
        injectImmediately: true,
      });

      const websiteConfigs = (await storage.getItem<WebsiteConfig[]>("requestRules")) ?? [];

      logger.info("Retrieved website configs from storage", websiteConfigs);

      const websiteConfig = websiteConfigs.find((config) => config.domain === domain);

      if (!websiteConfig) {
        logger.info("Could not find website config for the domain.", domain);

        return;
      }

      if (!websiteConfig.enabled) {
        logger.info("Feature is disabled for the domain", sender.tab);

        return;
      }

      logger.info("Injecting a script to attach fetch");
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
