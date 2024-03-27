import { atom } from "jotai";

import { GraphQLRequest } from "../types/graphQL-request";
import { GraphQLRequestRule } from "../types/graphQL-request-rule";

export const graphQLRequestsAtom = atom<GraphQLRequest[]>([]);

export const graphQLRulesStateAtom = atom<{
  data: GraphQLRequestRule[] | null;
  loading: boolean;
  error: Error | null;
}>({
  data: null,
  loading: true,
  error: null,
});
