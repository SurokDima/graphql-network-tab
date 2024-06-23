import { nanoid } from "nanoid";
import { FC, useCallback, useEffect } from "react";

import { atom, useAtom } from "jotai";

import { GraphQLRequest } from "../../common/types/graphQL-request";
import { NetworkRequest } from "../../common/types/network-request";
import { getGraphQLRequestDetails } from "../services/graphQL-parser";

import { useNetworkRequests } from "./NetworkRequestsProvider";

type GraphQLRequestsProviderProps = {
  children: React.ReactNode;
};

const graphQLRequestsAtom = atom<GraphQLRequest[]>([]);

export const GraphQLRequestsProvider: FC<GraphQLRequestsProviderProps> = ({ children }) => {
  const [_, setGraphQLRequests] = useAtom(graphQLRequestsAtom);
  const { networkRequests } = useNetworkRequests();

  useEffect(() => {
    const graphQLRequests = networkRequests
      .map(mapNetworkToGraphQLRequest)
      .filter((request): request is GraphQLRequest => request !== null);

    setGraphQLRequests(graphQLRequests);
  }, [networkRequests, setGraphQLRequests]);

  return <>{children}</>;
};

export const useGraphQLRequests = () => {
  const { setShouldPreserveLog, settings } = useNetworkRequests();
  const [graphQLRequests, setGraphQLRequests] = useAtom(graphQLRequestsAtom);

  const clearRequests = useCallback(() => {
    setGraphQLRequests([]);
  }, [setGraphQLRequests]);

  return { graphQLRequests, clearRequests, setShouldPreserveLog, settings };
};

const mapNetworkToGraphQLRequest = (networkRequest: NetworkRequest): GraphQLRequest | null => {
  const details = getGraphQLRequestDetails(networkRequest);
  if (!details.ok) return null;

  return {
    id: nanoid(),
    operation: {
      name: details.value.operationName,
      type: details.value.operationType,
    },
    rawGraphQL: details.value.rawGraphQL,
    variables: details.value.variables,
    networkRequest,
  };
};
