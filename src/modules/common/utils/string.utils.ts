import { Result, wrap } from "../types/result";

/**
 * Extracts domain from url
 *
 * @example getDomain('https://example.com/path/to/page') // 'example.com'
 */
export const safeGetDomain = (url: string): Result<string> => {
  return wrap(() => new URL(url).hostname)();
};

export const safeParseJSON = <T>(str: string): Result<T> => {
  return wrap(() => JSON.parse(str))();
};

export const isJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};
