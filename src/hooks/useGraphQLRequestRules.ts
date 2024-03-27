import { useCallback, useEffect } from "react";

import { useAtom } from "jotai";

import { getItem } from "../storage/extensionStorage";
import { graphQLRulesStateAtom } from "../store";
import { GraphQLRequestRule } from "../types/graphQL-request-rule";

export const useGraphQLRules = () => {
  const [{ data: graphQLRules, loading, error }, setGraphQLRulesState] =
    useAtom(graphQLRulesStateAtom);

  const loadGraphQLRules = useCallback(async () => {
    setGraphQLRulesState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await getItem<GraphQLRequestRule[] | null | undefined>("requestRules");
      setGraphQLRulesState((prev) => ({ ...prev, data: data ?? [] }));
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
