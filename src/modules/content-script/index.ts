import { initMessageHandler } from "./services/messageHandler";
import { sendMessageToServiceWorker } from "./services/sendMessage";

console.info(
  "[GraphQL Network Tab][Content Script]: Sending message to service worker to inject mocking script."
);

sendMessageToServiceWorker({ action: "injectMockingScript" });
initMessageHandler();
