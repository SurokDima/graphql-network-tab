import { useCallback, useEffect } from "react";

import { useAtom } from "jotai";

import { WebsiteConfig } from "../../common/types/website-config";
import { getDomain } from "../../common/utils/string.utils";
import { getCurrentTab } from "../services/tabs";
import { storage } from "../storage";
import { graphQLRulesStateAtom } from "../store";

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

      const domainResult = getDomain(currentTab.url);
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
