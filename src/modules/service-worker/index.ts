import { logger } from "./logger";
import { initializeMessagesHandler } from "./services/messages-handler";
import { initializeGraphQLRulesSynchronizer } from "./services/rules-synchronizer";

logger.info("Service worker is running.");

initializeMessagesHandler();
initializeGraphQLRulesSynchronizer();
