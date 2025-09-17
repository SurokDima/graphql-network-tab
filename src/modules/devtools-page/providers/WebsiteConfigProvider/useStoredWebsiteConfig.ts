import { useCallback, useEffect, useState } from "react";

import { WebsiteConfig } from "../../../common/types/website-config";
import { getWebsiteConfig } from "../../services/graphQL-request-rules";
import { storage } from "../../storage";

// TODO refactor with useStorageItem
export const useStoredWebsiteConfig = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [websiteConfig, setWebsiteConfig] = useState<WebsiteConfig | null>(null);

  const loadWebsiteConfig = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const websiteConfig = await getWebsiteConfig();
      setWebsiteConfig(websiteConfig);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [setWebsiteConfig, setLoading, setError]);

  useEffect(() => {
    const listener = (changes: Record<string, chrome.storage.StorageChange>) => {
      if (changes["requestRules"]) {
        // As it is essentially refetch, do not update loading state
        getWebsiteConfig().then((websiteConfig) => {
          setWebsiteConfig(websiteConfig);
        });
      }
    };

    storage.listenToChanges(listener);
    return () => storage.stopListeningToChanges(listener);
  }, [loadWebsiteConfig]);

  useEffect(() => {
    // As it is essentially refetch, do not update loading state
    loadWebsiteConfig();
    // We wan't to call it only once, on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { websiteConfig: websiteConfig ?? null, loading, error };
};
