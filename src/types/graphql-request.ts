import { NetworkRequest } from "./network-request";

export type GraphQLRequest = {
  id: string;
  name: string;
  type: "query" | "mutation";
  networkRequest: NetworkRequest;
};
