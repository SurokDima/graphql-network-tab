import { logger } from "./logger";

logger.info("Creating devtools panel.");

chrome.devtools.panels.create("GraphQL Network Tab", "./assets/logo.svg", "/index.html", () => {
  logger.info("Devtools panel has been created!");
});
