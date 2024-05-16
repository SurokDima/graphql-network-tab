import { Result, wrap } from "../types/result";

/**
 * Extracts domain from url
 *
 * @example getDomain('https://example.com/path/to/page') // 'example.com'
 */
export const getDomain = (url: string): Result<string> => {
  return wrap(() => new URL(url).hostname)();
};
