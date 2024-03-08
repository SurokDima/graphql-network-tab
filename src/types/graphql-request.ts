import { NetworkRequest } from "./network-request";

export type GraphQLRequest = {
  id: string;
  name: string;
  rawGraphQL: string;
  rawVariables: string;
  type: "query" | "mutation";
  networkRequest: NetworkRequest;
};
