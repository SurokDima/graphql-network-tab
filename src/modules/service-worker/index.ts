import { initializeMessagesHandler } from "./services/messages-handler";
import { initializeGraphQLRulesSynchronizer } from "./services/rules-synchronizer";

console.info("[GraphQL Network Tab][Service Worker]: Service worker is running.");

initializeMessagesHandler();
initializeGraphQLRulesSynchronizer();
