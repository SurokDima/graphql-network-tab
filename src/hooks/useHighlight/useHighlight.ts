import hljs from "highlight.js";
import { useEffect, useState } from "react";

import { HighlightLanguage, MessagePayload } from "./types.ts";

type UseHighlightHookParams = {
  language: HighlightLanguage;
  code: string;
  skip?: boolean;
};

const createWorker = () => {
  try {
    return new Worker(new URL("./highlightWorker.ts", import.meta.url));
  } catch (e) {
    return;
  }
};

export const useHighlight = ({ language, code, skip = false }: UseHighlightHookParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [markup, setMarkup] = useState("");

  useEffect(() => {
    if (skip) return;

    const highlightOnMainThread = () => {
      const result = hljs.highlight(code, { language });
      setMarkup(result.value);
      setIsLoading(false);
    };

    // Highlight small code blocks in the main thread
    if (code.length < 500) {
      highlightOnMainThread();
      return;
    }

    // Highlight large code blocks in a worker thread
    const worker = createWorker();
    if (!worker) {
      highlightOnMainThread();
      return;
    }

    worker.onmessage = (event) => {
      setIsLoading(false);
      setMarkup(event.data);
    };

    setIsLoading(true);
    const messagePayload: MessagePayload = { language, code };
    worker.postMessage(messagePayload);

    return () => {
      worker.terminate();
    };
  }, [setIsLoading, setMarkup, language, code, skip]);

  return { markup, isLoading };
};
