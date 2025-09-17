import { AppliedRule } from "../../common/types/graphQL-request-rule";

import { sendMessageToServiceWorker } from "./sendMessage";

export type MessageFromInjectedScript = {
  action: "ruleApplied";
  appliedRule: AppliedRule;
};

export const initMessageHandler = () => {
  window.top?.addEventListener("message", (event) => {
    if (event.source !== window.top) return;
    if (event.data.source !== "injectedScript") return;
    const message = event.data as MessageFromInjectedScript;

    if (event.data.action === "ruleApplied") {
      sendMessageToServiceWorker({
        action: "ruleApplied",
        appliedRule: message.appliedRule,
      });
    }
  });
};
