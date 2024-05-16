import { GraphQLRequestRule } from "./graphQL-request-rule";

export type WebsiteConfig = {
  id: string;
  domain: string;
  enabled: boolean;
  rules: GraphQLRequestRule[];
};
