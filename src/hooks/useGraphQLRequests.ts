import { nanoid } from "nanoid";
import { useCallback, useState } from "react";

import { getGraphQLRequestDetails } from "../services/graphQL-parser";
import { GraphQLRequest } from "../types/graphql-request";
import { NetworkRequest } from "../types/network-request";

import { useNetworkRequestsMonitor } from "./useNetworkRequestsMonitor";

export const useGraphQLRequests = () => {
  const [graphQLRequests, setGraphQLRequests] = useState<GraphQLRequest[]>([]);

  const appendNetworkRequest = async (networkRequest: NetworkRequest) => {
    const graphQLRequest = mapNetworkToGraphQLRequest(networkRequest);
    if (!graphQLRequest) return;
    setGraphQLRequests((prevNetworkRequests) => [...prevNetworkRequests, graphQLRequest]);
  };

  useNetworkRequestsMonitor({
    onNewRequest: appendNetworkRequest,
    onInit: (networkRequests) => {
      setGraphQLRequests([]);
      networkRequests.forEach(appendNetworkRequest);
    },
  });

  const clearRequests = useCallback(() => {
    setGraphQLRequests([]);
  }, []);

  return { graphQLRequests, clearRequests };
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
