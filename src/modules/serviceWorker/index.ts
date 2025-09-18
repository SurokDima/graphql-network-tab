import { logger } from "./logger";
import { initializeMessagesHandler } from "./services/messageHandler";
import { initializeGraphQLRulesSynchronizer } from "./services/rulesSynchronizer";

logger.info("Service worker is running.");

initializeMessagesHandler();
initializeGraphQLRulesSynchronizer();
