import { logger as commonLogger } from "../../common/logger";
import { env } from "../env";

export const logger = commonLogger.createInstance({
  path: ["Service Worker"],
  level: env.buildType === "prod" ? "error" : "info",
});
