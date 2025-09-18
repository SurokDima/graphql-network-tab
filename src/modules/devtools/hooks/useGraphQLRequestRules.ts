import { useCallback, useEffect } from "react";

import { atom, useAtom } from "jotai";

import { Rule } from "../../common/types/rule";
import { WebsiteConfig } from "../../common/types/websiteConfig";
import { safeGetDomain } from "../../common/utils/string.utils";
import { getCurrentTab } from "../services/tabs";
import { storage } from "../storage";

const graphQLRulesStateAtom = atom<{
  data: Rule[] | null;
  loading: boolean;
  error: Error | null;
}>({
  data: null,
  loading: true,
  error: null,
});

// TODO: maybe replace it with useStorageItem
export const useGraphQLRules = () => {
  const [{ data: graphQLRules, loading, error }, setGraphQLRulesState] =
    useAtom(graphQLRulesStateAtom);

  const loadGraphQLRules = useCallback(async () => {
    setGraphQLRulesState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const websiteConfigs = await storage.getItem<WebsiteConfig[] | null | undefined>(
        "requestRules"
      );

      const currentTab = await getCurrentTab();
      if (!currentTab?.url) return;

      const domainResult = safeGetDomain(currentTab.url);
      if (!domainResult.ok) return;
      const domain = domainResult.value;

      const websiteConfig = websiteConfigs?.find((config) => config.domain === domain);
      setGraphQLRulesState((prev) => ({ ...prev, data: websiteConfig?.rules ?? [] }));
    } catch (error) {
      setGraphQLRulesState((prev) => ({ ...prev, error: error as Error }));
    } finally {
      setGraphQLRulesState((prev) => ({ ...prev, loading: false }));
    }
  }, [setGraphQLRulesState]);

  useEffect(() => {
    if (graphQLRules) return;

    loadGraphQLRules();
  }, [graphQLRules, loadGraphQLRules, setGraphQLRulesState]);

  return { graphQLRules: graphQLRules ?? [], loading, error, refresh: loadGraphQLRules };
};
