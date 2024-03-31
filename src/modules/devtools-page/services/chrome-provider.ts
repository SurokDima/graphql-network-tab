import { mockChrome } from "../../../mock/mock-chrome";

export const chromeProvider =
  typeof chrome === "undefined" || !chrome.storage || !chrome.devtools ? mockChrome : chrome;

export const getHARLogAsync = (): Promise<chrome.devtools.network.HARLog> => {
  return new Promise<chrome.devtools.network.HARLog>((resolve) => {
    chromeProvider.devtools.network.getHAR((harLog) => {
      resolve(harLog);
    });
  });
};

export const getContentAsync = (request: chrome.devtools.network.Request) => {
  return new Promise<string>((resolve) => {
    request.getContent((content) => {
      resolve(content);
    });
  });
};
