import { logger as commonLogger } from "../../common/logger";
import { env } from "../env";

export const logger = commonLogger.createInstance({
  path: ["Devtools Page"],
  level: env.buildType === "prod" ? "error" : "info",
});
