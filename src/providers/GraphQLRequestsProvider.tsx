import { nanoid } from "nanoid";
import { FC } from "react";

import { useAtom } from "jotai";

import { useNetworkRequestsMonitor } from "../hooks/useNetworkRequestsMonitor";
import { getGraphQLRequestDetails } from "../services/graphQL-parser";
import { graphQLRequestsAtom } from "../store";
import { GraphQLRequest } from "../types/graphQL-request";
import { NetworkRequest } from "../types/network-request";

type GraphQLRequestsProviderProps = {
  children: React.ReactNode;
};

export const GraphQLRequestsProvider: FC<GraphQLRequestsProviderProps> = ({ children }) => {
  const [_, setGraphQLRequests] = useAtom(graphQLRequestsAtom);

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

  return <>{children}</>;
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
