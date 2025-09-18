import { chromeProvider } from "./chromeProvider";

export const getCurrentTab = async (): Promise<chrome.tabs.Tab> => {
  return new Promise((resolve) => {
    chromeProvider.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0]);
    });
  });
};
