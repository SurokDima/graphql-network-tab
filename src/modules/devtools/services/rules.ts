import { nanoid } from "nanoid";

import { GraphQLRequestTarget, Scenario, areTargetsEqual } from "../../common/types/rule";
import { WebsiteConfig } from "../../common/types/websiteConfig";
import { safeGetDomain } from "../../common/utils/string.utils";
import { logger } from "../logger";
import { storage } from "../storage";

import { getCurrentTab } from "./tabs";

// TODO refactor
export const setActiveScenario = async (
  scenarioId: string,
  graphQLRequestTarget: GraphQLRequestTarget,
  url: string
) => {
  const domainResult = safeGetDomain(url);

  if (!domainResult.ok) {
    logger.error("Could not extract domain from the URL.", url);

    return;
  }

  const domain = domainResult.value;

  await storage.updateItem(
    "requestRules",
    (storageWebsiteConfigs: WebsiteConfig[] | null | undefined): WebsiteConfig[] => {
      const websiteConfigs = storageWebsiteConfigs ?? [];
      const websiteConfig = websiteConfigs.find((config) => config.domain === domain);

      if (!websiteConfig) {
        return websiteConfigs;
      }

      const updatedWebsiteConfig: WebsiteConfig = {
        ...websiteConfig,
        rules: websiteConfig.rules.map((requestRule) =>
          areTargetsEqual(requestRule, graphQLRequestTarget)
            ? {
                ...requestRule,
                activeScenarioId: scenarioId,
              }
            : requestRule
        ),
      };

      return websiteConfigs.map((config) => {
        if (config.id === updatedWebsiteConfig.id) return updatedWebsiteConfig;
        return config;
      });
    }
  );
};

// TODO maybe compute url in the function instead of passing it as an argument
// TODO refactor errors handling
export const getWebsiteConfig = async () => {
  const currentTab = await getCurrentTab();

  if (!currentTab.url) {
    throw new Error("Could not get current tab's URL.");
  }

  const url = currentTab.url;

  const domainResult = safeGetDomain(url);

  if (!domainResult.ok) {
    throw new Error("Could not extract domain from the URL.");
  }

  const domain = domainResult.value;

  const websiteConfigs = await storage.getItem<WebsiteConfig[]>("requestRules");
  const existingWebsiteConfig = websiteConfigs?.find((config) => config.domain === domain) ?? null;

  if (existingWebsiteConfig) {
    return existingWebsiteConfig;
  }

  await initializeWebsiteConfig(url);
  await storage.getItem<WebsiteConfig[]>("requestRules");
  const websiteConfig = websiteConfigs?.find((config) => config.domain === domain);

  if (!websiteConfig) {
    throw new Error("Could not retrieve website config from storage after initialization");
  }

  return websiteConfig;
};

const initializeWebsiteConfig = async (url: string) => {
  const domainResult = safeGetDomain(url);

  if (!domainResult.ok) {
    logger.error("Could not extract domain from the URL.", url);

    return;
  }

  const domain = domainResult.value;

  await storage.updateItem(
    "requestRules",
    (storageWebsiteConfigs: WebsiteConfig[] | null | undefined): WebsiteConfig[] => {
      const websiteConfigs = storageWebsiteConfigs ?? [];
      const existingWebsiteConfig = websiteConfigs.find((config) => config.domain === domain);

      if (existingWebsiteConfig) {
        return websiteConfigs;
      }

      const newWebsiteConfig: WebsiteConfig = {
        id: nanoid(),
        domain: domain,
        enabled: false,
        rules: [],
      };

      return [...websiteConfigs, newWebsiteConfig];
    }
  );
};

export const saveScenario = async (
  scenario: Scenario,
  graphQLRequestTarget: GraphQLRequestTarget,
  url: string
) => {
  logger.info("Saving scenario", { scenario, graphQLRequestTarget, url });
  const domainResult = safeGetDomain(url);

  if (!domainResult.ok) {
    logger.error("Could not extract domain from the URL.", url);
    return;
  }

  const domain = domainResult.value;

  // TODO refactor
  await storage.updateItem(
    "requestRules",
    (storageWebsiteConfigs: WebsiteConfig[] | null | undefined): WebsiteConfig[] => {
      const websiteConfigs = storageWebsiteConfigs ?? [];
      const websiteConfig = websiteConfigs.find((config) => config.domain === domain);

      if (!websiteConfig) {
        const newWebsiteConfig: WebsiteConfig = {
          id: nanoid(),
          domain: domain,
          enabled: true,
          rules: [
            {
              id: nanoid(),
              ...graphQLRequestTarget,
              scenarios: [scenario],
              activeScenarioId: scenario.id,
            },
          ],
        };

        return [...websiteConfigs, newWebsiteConfig];
      }

      const requestRules = websiteConfig.rules;

      const existingRequestRule = requestRules?.find((requestRule) =>
        areTargetsEqual(requestRule, graphQLRequestTarget)
      );

      if (existingRequestRule) {
        const existingScenario = existingRequestRule.scenarios.find(
          (existingScenario) => existingScenario.id === scenario.id
        );

        const updatedScenarios = existingScenario
          ? existingRequestRule.scenarios.map((existingScenario) =>
              existingScenario.id === scenario.id ? scenario : existingScenario
            )
          : [...existingRequestRule.scenarios, scenario];

        const updatedRequestRule = {
          ...existingRequestRule,
          scenarios: updatedScenarios,
        };

        const updatedRequestRules = requestRules.map((requestRule) =>
          areTargetsEqual(requestRule, updatedRequestRule) ? updatedRequestRule : requestRule
        );

        const updatedWebsiteConfig: WebsiteConfig = {
          ...websiteConfig,
          rules: updatedRequestRules,
        };

        return websiteConfigs.map((config) => {
          if (config.id === updatedWebsiteConfig.id) return updatedWebsiteConfig;
          return config;
        });
      }

      const newRequestRule = {
        id: nanoid(),
        ...graphQLRequestTarget,
        scenarios: [scenario],
        activeScenarioId: scenario.id,
      };

      const updatedWebsiteConfig: WebsiteConfig = {
        ...websiteConfig,
        rules: [...requestRules, newRequestRule],
      };

      return websiteConfigs.map((config) => {
        if (config.id === updatedWebsiteConfig.id) return updatedWebsiteConfig;
        return config;
      });
    }
  );

  logger.info("Scenario has been saved");
};

// TODO optimize
export const setFeatureEnabled = async (enabled: boolean) => {
  const currentTab = await getCurrentTab();

  if (!currentTab.url) {
    throw new Error("Could not get current tab's URL.");
  }

  const domainResult = safeGetDomain(currentTab.url);

  if (!domainResult.ok) {
    throw new Error("Could not extract domain from the URL.");
  }

  const domain = domainResult.value;

  await storage.updateItem(
    "requestRules",
    (storageWebsiteConfigs: WebsiteConfig[] | null | undefined): WebsiteConfig[] => {
      const websiteConfigs = storageWebsiteConfigs ?? [];
      const existingWebsiteConfig = websiteConfigs.find((config) => config.domain === domain);

      if (!existingWebsiteConfig) {
        const newWebsiteConfig: WebsiteConfig = {
          id: nanoid(),
          domain: domain,
          enabled,
          rules: [],
        };

        return [...websiteConfigs, newWebsiteConfig];
      }

      const updatedWebsiteConfig: WebsiteConfig = {
        ...existingWebsiteConfig,
        enabled,
      };

      return websiteConfigs.map((config) => {
        if (config.id === updatedWebsiteConfig.id) return updatedWebsiteConfig;
        return config;
      });
    }
  );
};
