import { NetworkRequest } from "./network-request";

export type GraphQLRequest = {
  id: string;
  operation: GraphQLOperation;
  rawGraphQL: string;
  variables: Record<string, unknown>;
  networkRequest: NetworkRequest;
};

export type GraphQLOperation = {
  name: string;
  type: GraphQLOperationType;
};

export type GraphQLOperationType = "query" | "mutation" | "subscription";

export type GraphQLRequestBody = {
  id: string;
  query: string;
  variables?: Record<string, unknown>;
  extensions?: Record<string, unknown>;
};

export const isGraphQLRequestBody = (payload: unknown): payload is GraphQLRequestBody => {
  const graphQLRequestBody = payload as GraphQLRequestBody;

  const isQueryValid =
    (graphQLRequestBody.query !== undefined && typeof graphQLRequestBody.query === "string") ||
    !!graphQLRequestBody.extensions?.persistedQuery;

  const isVariablesValid =
    graphQLRequestBody?.variables !== undefined
      ? typeof graphQLRequestBody.variables === "object"
      : true;

  return isQueryValid && isVariablesValid;
};
