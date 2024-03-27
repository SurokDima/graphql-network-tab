import { getItem } from "../../storage/extensionStorage";
import { GraphQLRequestRule } from "../../types/graphQL-request-rule";

import { ScriptCodeType, ScriptType, injectScript } from "./scripting";

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
    const rules = (await getItem<GraphQLRequestRule[]>("requestRules")) ?? [];

    console.info("[GraphQL Network Tab][Service Worker]: Retrieved rules from storage", rules);

    tabs
      .filter(
        (tab) =>
          !!tab.url &&
          rules.some((rule) =>
            rule.scenarios.some((scenario) => scenario.tabTarget.url === tab.url)
          )
      )
      .forEach((tab) => {
        if (!tab.id) return;

        console.info(
          `[GraphQL Network Tab][Service Worker]: Sending request rules to the tab`,
          tab
        );

        injectScript(
          {
            codeType: ScriptCodeType.JS,
            type: ScriptType.CODE,
            value: `window.GRAPHQL_NETWORK_TAB = {
          requestRules: ${JSON.stringify(rules)}
        }`,
          },
          { tabId: tab.id }
        );
      });
  });
};
