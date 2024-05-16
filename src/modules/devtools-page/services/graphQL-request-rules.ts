import { nanoid } from "nanoid";

import {
  GraphQLRequestRule,
  GraphQLRequestTarget,
  Scenario,
  areTargetsEqual,
} from "../../common/types/graphQL-request-rule";
import { WebsiteConfig } from "../../common/types/website-config";
import { getDomain } from "../../common/utils/string.utils";
import { storage } from "../storage";

// TODO refactor
export const setActiveScenario = async (
  scenarioId: string,
  graphQLRequestTarget: GraphQLRequestTarget,
  url: string
) => {
  const domainResult = getDomain(url);

  if (!domainResult.ok) {
    console.error(
      "[GraphQL Network Tab][Devtools Page]: Could not extract domain from the URL.",
      url
    );

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

export const saveScenario = async (
  scenario: Scenario,
  graphQLRequestTarget: GraphQLRequestTarget,
  url: string
) => {
  const domainResult = getDomain(url);

  if (!domainResult.ok) {
    console.error(
      "[GraphQL Network Tab][Devtools Page]: Could not extract domain from the URL.",
      url
    );

    return;
  }

  const domain = domainResult.value;

  console.info(
    "[GraphQL Network Tab][Devtools Page]: Creating new GraphQL scenario.",
    scenario,
    graphQLRequestTarget,
    domain
  );

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

  console.info("[GraphQL Network Tab][Devtools Page]: New GraphQL request rule has been created.");
};

// TODO optimize
export const setFeatureEnabled = async (domain: string, enabled: boolean) => {
  await storage.updateItem(
    "requestRules",
    (storageWebsiteConfigs: WebsiteConfig[] | null | undefined): WebsiteConfig[] => {
      const websiteConfigs = storageWebsiteConfigs ?? [];
      const websiteConfig = websiteConfigs.find((config) => config.domain === domain);

      if (!websiteConfig) {
        const newWebsiteConfig: WebsiteConfig = {
          id: nanoid(),
          domain: domain,
          enabled,
          rules: [],
        };

        return [...websiteConfigs, newWebsiteConfig];
      }

      const updatedWebsiteConfig: WebsiteConfig = {
        ...websiteConfig,
        enabled,
      };

      return websiteConfigs.map((config) => {
        if (config.id === updatedWebsiteConfig.id) return updatedWebsiteConfig;
        return config;
      });
    }
  );
};

export const getGraphQLRequestRules = async (): Promise<GraphQLRequestRule[]> => {
  return (await storage.getItem<GraphQLRequestRule[]>("requestRules")) ?? [];
};
