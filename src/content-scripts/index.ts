console.info(
  "[GraphQL Network Tab][Content Script]: Sending message to service worker to inject mocking script."
);

chrome.runtime.sendMessage({ action: "INJECT_MOCKING_SCRIPT" });
