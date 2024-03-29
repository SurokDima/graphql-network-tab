export const initializeMessagesHandler = () => {
  console.info("[GraphQL Network Tab][Service Worker]: Initializing messages handler.");

  chrome.runtime.onMessage.addListener((message, sender) => {
    console.info(
      "[GraphQL Network Tab][Service Worker]: Received message from content script.",
      message,
      sender
    );

    if (sender.tab?.id === undefined || sender.frameId === undefined) return;

    if (message.action === "INJECT_MOCKING_SCRIPT") {
      console.info("[GraphQL Network Tab][Service Worker]: Injecting mocking script into the tab.");

      chrome.scripting.executeScript({
        target: {
          tabId: sender.tab.id,
          frameIds: [sender.frameId],
        },
        files: ["injected-script/injected-script.iife.js"],
        world: "MAIN",
        injectImmediately: true,
      });
    }
  });
};
