import { Rule } from "./rule";

export type WebsiteConfig = {
  id: string;
  domain: string;
  enabled: boolean;
  rules: Rule[];
};
