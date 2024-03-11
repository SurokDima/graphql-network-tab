import { noop } from "../utils/function.utils";

import { mockRequests } from "./mock-network-requests";

const removeListeners: Record<string, () => void> = {};

export const mockChrome = {
  devtools: {
    panels: {
      themeName: "dark",
    },
    network: {
      getHAR: (cb: (request: chrome.devtools.network.HARLog) => void) => {
        cb({
          entries: mockRequests,
          version: "1.2",
          creator: { name: "Chrome DevTools", version: "1.2" },
        });
      },
      onRequestFinished: {
        addListener: (cb: (request: chrome.devtools.network.Request) => void) => {
          // On press key "1", add more mock requests to app
          const handleKeydown = (e: KeyboardEvent) => {
            if (e.code === "Digit1") {
              mockRequests.forEach((mockRequest) => {
                cb(mockRequest);
              });
            }
          };
          window.addEventListener("keydown", handleKeydown);
          removeListeners.onRequestFinished = () =>
            window.removeEventListener("keydown", handleKeydown);
        },
        removeListener: () => {
          removeListeners.onRequestFinished();
        },
      },
      onNavigated: {
        addListener: noop,
        removeListener: noop,
      },
    },
  },
  runtime: {
    getPlatformInfo: (cb: (info: chrome.runtime.PlatformInfo) => void) => {
      cb({ arch: "x86-64", nacl_arch: "x86-64", os: "mac" });
    },
    onMessage: {
      addListener: noop,
      removeListener: noop,
    },
  },
} as unknown as typeof chrome;
