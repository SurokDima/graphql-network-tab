import { useWebsiteConfig } from "../providers/WebsiteConfigProvider";

export const useRules = () => {
  const websiteConfig = useWebsiteConfig();
  return websiteConfig.rules;
};
