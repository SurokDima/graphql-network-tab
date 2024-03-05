import copyToClipboard from "copy-to-clipboard";
import { useCallback, useState } from "react";

export type UseCopyHookParams = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useCopy = ({ onSuccess, onError }: UseCopyHookParams = {}) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      setIsCopied(false);
      const isCopied = copyToClipboard(text);
      setIsCopied(isCopied);

      if (isCopied) {
        onSuccess?.();
      } else {
        onError?.();
      }
    },
    // We don't want to make the user of the hook to use useCallback
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { copy, isCopied };
};
