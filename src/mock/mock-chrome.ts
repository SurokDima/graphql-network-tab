import { noop } from "../modules/common/utils/function.utils";

import { mockRequests } from "./mock-network-requests";

const removeListeners: Record<string, () => void> = {};

export const mockChrome = {
  tabs: {
    query: (_: chrome.tabs.QueryInfo, cb: (tabs: chrome.tabs.Tab[]) => void) => {
      cb([
        {
          id: 1,
          url: "https://api.github.com/graphql",
          title: "GitHub",
          active: true,
          autoDiscardable: false,
          discarded: false,
          favIconUrl: "https://github.githubassets.com/favicons/favicon.png",
          height: 768,
          highlighted: true,
          incognito: false,
          index: 0,
          mutedInfo: { muted: false },
          pinned: false,
          selected: true,
          status: "complete",
          width: 1366,
          windowId: 1,
          groupId: -1,
        },
      ]);
    },
  },
  storage: {
    local: {
      get: (keys: string | string[] | null, cb: (items: Record<string, unknown>) => void) => {
        const keysArr =
          keys === null ? Object.keys(localStorage) : Array.isArray(keys) ? keys : [keys];

        const items = keysArr.reduce((acc, key) => {
          return { ...acc, [key]: JSON.parse(localStorage.getItem(key) ?? "null") };
        }, {});

        cb(items);
      },
      set: (items: Record<string, unknown>) => {
        Object.entries(items).forEach(([key, value]) => {
          localStorage.setItem(key, JSON.stringify(value));
        });
      },
      remove: (keys: string | string[], cb: () => void) => {
        const keysArr = Array.isArray(keys) ? keys : [keys];
        keysArr.forEach((key) => {
          localStorage.removeItem(key);
        });
        cb();
      },
      onChanged: {
        addListener: (cb: (changes: Record<string, chrome.storage.StorageChange>) => void) => {
          window.addEventListener("storage", (e) => {
            if (!e.key) return;
            cb({
              [e.key]: {
                newValue: e.newValue,
                oldValue: e.oldValue,
              },
            });
          });
        },
        removeListener: noop,
      },
    },
  },
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
