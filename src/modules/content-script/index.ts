import { logger } from "./logger";
import { initMessageHandler } from "./services/messageHandler";
import { sendMessageToServiceWorker } from "./services/sendMessage";

logger.info("Content Script is running.");

sendMessageToServiceWorker({ action: "injectMockingScript" });
initMessageHandler();
