import { AppliedRule } from "../../common/types/graphQL-request-rule";

export type ServiceWorkerMessage =
  | {
      action: "ruleApplied";
      appliedRule: AppliedRule;
    }
  | {
      action: "injectMockingScript";
    };

export const sendMessageToServiceWorker = (message: ServiceWorkerMessage) => {
  chrome.runtime.sendMessage(message);
};
