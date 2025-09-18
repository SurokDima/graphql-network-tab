export enum ScriptCodeType {
  JS = "js",
  CSS = "css",
}

export enum ScriptType {
  URL = "url",
  CODE = "code",
}

export type ScriptObject = {
  codeType: ScriptCodeType;
  type: ScriptType;
  value: string;
  loadTime?: "afterPageLoad" | "beforePageLoad";
};

// export const injectJSAtRequestSource = (
//   code: string,
//   requestDetails: chrome.webRequest.WebRequestDetails
// ) => {
//   injectScript(
//     {
//       codeType: ScriptCodeType.JS,
//       type: ScriptType.CODE,
//       value: code,
//     },
//     { tabId: requestDetails.tabId, frameIds: [requestDetails.frameId] }
//   );
// };

export const injectScript = (
  script: ScriptObject,
  target: chrome.scripting.InjectionTarget
): Promise<unknown> => {
  return new Promise((resolve) => {
    let func: (val: string, executeAfterPageLoad?: boolean) => void;
    if (script.codeType === ScriptCodeType.JS) {
      func = script.type === ScriptType.URL ? addRemoteJS : addInlineJS;
    } else {
      func = script.type === ScriptType.URL ? addRemoteCSS : addInlineCSS;
    }

    chrome.scripting.executeScript(
      {
        target,
        func,
        args: [script.value, script.loadTime === "afterPageLoad"],
        world: "MAIN",
        injectImmediately: true,
      },
      resolve
    );
  });
};

/* Do not refer any external variable in below function other than arguments */
const addInlineJS = (code: string, executeAfterPageLoad = false): void => {
  const addScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.className = "__RQ_SCRIPT__";
    script.appendChild(document.createTextNode(code));
    const parent = document.head || document.documentElement;
    parent.appendChild(script);
  };
  if (executeAfterPageLoad && document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addScript);
  } else {
    addScript();
  }
};

/* Do not refer any external variable in below function other than arguments */
const addRemoteJS = (url: string, executeAfterPageLoad = false): void => {
  const addScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.className = "__RQ_SCRIPT__";
    script.src = url;
    const parent = document.head || document.documentElement;
    parent.appendChild(script);
  };
  if (executeAfterPageLoad && document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addScript);
  } else {
    addScript();
  }
};

/* Do not refer any external variable in below function other than arguments */
const addInlineCSS = function (css: string): void {
  const style = document.createElement("style");
  style.appendChild(document.createTextNode(css));
  style.className = "__RQ_SCRIPT__";
  const parent = document.head || document.documentElement;
  parent.appendChild(style);
};

/* Do not refer any external variable in below function other than arguments */
const addRemoteCSS = function (url: string): void {
  const link = document.createElement("link");
  link.href = url;
  link.type = "text/css";
  link.rel = "stylesheet";
  link.className = "__RQ_SCRIPT__";
  const parent = document.head || document.documentElement;
  parent.appendChild(link);
};
