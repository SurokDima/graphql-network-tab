import { useEffect, useState } from "react";

import { storage } from "../storage";

export type UseStorageItemOptions<TData> = {
  onComplete?: (data: TData) => void;
};

export const useStorageItem = <TData>(
  key: string,
  { onComplete }: UseStorageItemOptions<TData> = {}
) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    storage
      .getItem<TData>(key)
      .then(async (value) => {
        setData(value);
        onComplete?.(value);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
    // We don't want to re-run this effect when onComplete changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    const listener = (changes: Record<string, chrome.storage.StorageChange>) => {
      if (changes[key]) {
        setData(changes[key].newValue as TData);
      }
    };

    storage.listenToChanges(listener);
    return () => storage.stopListeningToChanges(listener);
  }, [key]);

  return { data, loading, error };
};
