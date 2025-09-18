import { AppliedRule } from "../../common/types/graphQL-request-rule";
import { logger } from "../logger";

export type ServiceWorkerMessage =
  | {
      action: "ruleApplied";
      appliedRule: AppliedRule;
    }
  | {
      action: "injectMockingScript";
    };

export const sendMessageToServiceWorker = (message: ServiceWorkerMessage) => {
  logger.info("Sending message to service worker", message);
  chrome.runtime.sendMessage(message);
};
