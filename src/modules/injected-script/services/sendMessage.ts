import { AppliedRule } from "../../common/types/graphQL-request-rule";

export type MessageToContentScript = {
  action: "ruleApplied";
  appliedRule: AppliedRule;
};

/** Sends message to content script which will, in turn, send message to service-worker */
export const sendMessageToContentScript = (message: MessageToContentScript) => {
  window.top?.postMessage({
    source: "injectedScript",
    action: message.action,
    appliedRule: message.appliedRule,
  });
};
