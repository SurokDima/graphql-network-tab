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
    console.info("[Devtools Page]: Fetching data from storage", key);

    storage
      .getItem<TData>(key)
      .then(async (value) => {
        console.info("[Devtools Page]: Fetched data from storage", key, value);
        setData(value);
        onComplete?.(value);
      })
      .catch((error) => {
        console.error("[Devtools Page]: Error fetching data from storage", key, error);
        setError(error);
      })
      .finally(() => setLoading(false));
    // We don't want to re-run this effect when onComplete changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { data, loading, error };
};
