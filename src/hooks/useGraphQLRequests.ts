import { useCallback } from "react";

import { useAtom } from "jotai";

import { graphQLRequestsAtom } from "../store";

export const useGraphQLRequests = () => {
  const [graphQLRequests, setGraphQLRequests] = useAtom(graphQLRequestsAtom);

  const clearRequests = useCallback(() => {
    setGraphQLRequests([]);
  }, [setGraphQLRequests]);

  return { graphQLRequests, clearRequests };
};
