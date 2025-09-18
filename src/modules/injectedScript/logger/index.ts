import { logger as commonLogger } from "../../common/logger";
import { env } from "../env";

export const logger = commonLogger.createInstance({
  path: ["Injected Script"],
  level: env.buildType === "prod" ? "error" : "info",
});
