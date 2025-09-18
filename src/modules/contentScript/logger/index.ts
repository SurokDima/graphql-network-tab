import { logger as commonLogger } from "../../common/logger";
import { env } from "../env";

export const logger = commonLogger.createInstance({
  path: ["Content Script"],
  level: env.buildType === "prod" ? "error" : "info",
});
