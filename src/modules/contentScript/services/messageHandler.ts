import { AppliedRule } from "../../common/types/rule";
import { logger } from "../logger";

import { sendMessageToServiceWorker } from "./sendMessage";

export type MessageFromInjectedScript = {
  action: "ruleApplied";
  appliedRule: AppliedRule;
};

export const initMessageHandler = () => {
  logger.info("Initializing message handler");

  window.top?.addEventListener("message", (event) => {
    if (event.source !== window.top) return;
    if (event.data.source !== "injectedScript") return;
    const message = event.data as MessageFromInjectedScript;
    logger.info("Received messaged from injected script", message);

    if (event.data.action === "ruleApplied") {
      sendMessageToServiceWorker({
        action: "ruleApplied",
        appliedRule: message.appliedRule,
      });
    }
  });
};
