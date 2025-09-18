import { toArray } from "../utils/array.utils";

type LoggerOptions = {
  path?: string | string[];
  level?: Level;
};

type Level = "info" | "warn" | "error";

const levelsMap: { [key in Level]: number } = {
  error: 0,
  warn: 1,
  info: 2,
};

const mapLevelToNumber = (level: Level) => {
  return levelsMap[level];
};

export class Logger {
  private readonly path: string[] = [];
  private readonly level: Level;

  constructor(options?: LoggerOptions) {
    const { path, level } = options ?? {};
    this.path = [...this.path, ...toArray(path ?? [])];
    this.level = level ?? "info";
  }

  private getPathString() {
    return this.path.map((p) => `[${p}]`).join("");
  }

  createInstance(options?: LoggerOptions) {
    const { path, level } = options ?? {};
    return new Logger({ path: [...this.path, ...toArray(path ?? [])], level: level ?? this.level });
  }

  info(message: string, ...args: unknown[]) {
    if (mapLevelToNumber(this.level) < mapLevelToNumber("info")) return;
    console.info(`${this.getPathString()}: ${message}`, ...args);
  }

  warn(message: string, ...args: unknown[]) {
    if (mapLevelToNumber(this.level) < mapLevelToNumber("warn")) return;
    console.warn(`${this.getPathString()}: ${message}`, ...args);
  }

  error(message: string, ...args: unknown[]) {
    if (mapLevelToNumber(this.level) < mapLevelToNumber("error")) return;
    console.error(`${this.getPathString()}: ${message}`, ...args);
  }
}

export const logger = new Logger({
  path: "GraphQL Network Tab",
});
