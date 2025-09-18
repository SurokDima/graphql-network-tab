import { AppliedRule } from "../../common/types/rule";
import { logger } from "../logger";

export type MessageToContentScript = {
  action: "ruleApplied";
  appliedRule: AppliedRule;
};

/** Sends message to content script which will, in turn, send message to service-worker */
export const sendMessageToContentScript = (message: MessageToContentScript) => {
  logger.info("Sending message to content script", message);

  window.top?.postMessage({
    source: "injectedScript",
    action: message.action,
    appliedRule: message.appliedRule,
  });
};
