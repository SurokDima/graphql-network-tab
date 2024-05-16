import { WebsiteConfig } from "../../common/types/website-config";
import { getDomain } from "../../common/utils/string.utils";
import { storage } from "../storage";

import { ScriptCodeType, ScriptType, injectScript } from "./scripting";

// TODO optimize
export const initializeGraphQLRulesSynchronizer = async (): Promise<void> => {
  console.info(
    "[GraphQL Network Tab][Service Worker]: Initializing graphQL rules synchronizer.",
    chrome
  );

  chrome.storage.local.onChanged.addListener(async (changes) => {
    console.info(
      "[GraphQL Network Tab][Service Worker]: Registered local storage change event.",
      changes
    );

    const tabs = await chrome.tabs.query({});

    const websiteConfigs = (await storage.getItem<WebsiteConfig[]>("requestRules")) ?? [];

    console.info(
      "[GraphQL Network Tab][Service Worker]: Retrieved website configs from storage",
      websiteConfigs
    );

    tabs.forEach((tab) => {
      if (!tab.id || !tab.url) return;

      const domainResult = getDomain(tab.url);
      if (!domainResult.ok) return;
      const domain = domainResult.value;

      const websiteConfig = websiteConfigs.find((config) => config.domain === domain);
      if (!websiteConfig) return;

      if (!websiteConfig.enabled) {
        console.info(`[GraphQL Network Tab][Service Worker]: Disabling feature for the tab`, tab);

        injectScript(
          {
            codeType: ScriptCodeType.JS,
            type: ScriptType.CODE,
            value: `window.restoreFetch?.()`,
          },
          { tabId: tab.id }
        );

        return;
      }

      if (websiteConfig.rules.length === 0) return;

      injectScript(
        {
          codeType: ScriptCodeType.JS,
          type: ScriptType.CODE,
          value: `window.attachFetch?.(); window.GRAPHQL_NETWORK_TAB = {
            requestRules: ${JSON.stringify(websiteConfig.rules)}
          };`,
        },
        { tabId: tab.id }
      );
    });
  });
};
