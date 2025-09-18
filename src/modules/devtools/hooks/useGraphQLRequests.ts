import { useCallback, useMemo, useState } from "react";

import { GraphQLRequest } from "../../common/types/graphQLRequest";
import { NetworkRequest } from "../../common/types/networkRequest";
import { isDefined } from "../../common/utils/boolean.utils";
import { useNetworkRequests } from "../providers/NetworkRequestsProvider";
import { getGraphQLRequestDetails } from "../services/graphQLParser";

export const useGraphQLRequests = () => {
  const [clearedAfterId, setClearedAfterId] = useState<string | null>(null);
  const { setShouldPreserveLog, settings, networkRequests } = useNetworkRequests();

  const clearRequests = useCallback(() => {
    setClearedAfterId(networkRequests.at(-1)?.id ?? null);
  }, [networkRequests, setClearedAfterId]);

  const graphQLRequests = useMemo(() => {
    const slicedNetworkRequests = clearedAfterId
      ? networkRequests.slice(
          networkRequests.findIndex((request) => request.id === clearedAfterId) + 1
        )
      : networkRequests;

    return slicedNetworkRequests.map(mapNetworkToGraphQLRequest).filter(isDefined);
  }, [networkRequests, clearedAfterId]);

  return { graphQLRequests, clearRequests, setShouldPreserveLog, settings };
};

const mapNetworkToGraphQLRequest = (networkRequest: NetworkRequest): GraphQLRequest | null => {
  const details = getGraphQLRequestDetails(networkRequest);
  if (!details.ok) return null;

  return {
    id: networkRequest.id,
    operation: {
      name: details.value.operationName,
      type: details.value.operationType,
    },
    rawGraphQL: details.value.rawGraphQL,
    variables: details.value.variables,
    networkRequest,
  };
};
