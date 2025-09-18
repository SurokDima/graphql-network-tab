import { WebsiteConfig } from "../../common/types/websiteConfig";
import { safeGetDomain } from "../../common/utils/string.utils";
import { logger } from "../logger";
import { storage } from "../storage";

import { ScriptCodeType, ScriptType, injectScript } from "./scripting";

// TODO optimize
export const initializeGraphQLRulesSynchronizer = async (): Promise<void> => {
  logger.info("Initializing graphQL rules synchronizer.", chrome);

  storage.listenToChanges(async (changes) => {
    logger.info("Registered local storage change event.", changes);

    const tabs = await chrome.tabs.query({});
    const websiteConfigs = (await storage.getItem<WebsiteConfig[]>("requestRules")) ?? [];

    logger.info("Retrieved website configs from storage", websiteConfigs);

    tabs.forEach((tab) => {
      if (!tab.id || !tab.url) return;

      const domainResult = safeGetDomain(tab.url);
      if (!domainResult.ok) return;
      const domain = domainResult.value;

      const websiteConfig = websiteConfigs.find((config) => config.domain === domain);
      if (!websiteConfig) return;

      if (!websiteConfig.enabled) {
        logger.info("Restoring original fetch for the tab", tab);

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

      logger.info("Attaching fetch to the tab", tab);

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
