import { nanoid } from "nanoid";

import { getItem, updateItem } from "../storage/extensionStorage";
import {
  GraphQLRequestRule,
  GraphQLRequestTarget,
  Scenario,
  areTargetsEqual,
} from "../types/graphQL-request-rule";

export const setActiveScenario = async (
  scenarioId: string,
  graphQLRequestTarget: GraphQLRequestTarget
) => {
  await updateItem(
    "requestRules",
    (storageRequestRules: GraphQLRequestRule[] | null | undefined): GraphQLRequestRule[] => {
      const requestRules = storageRequestRules ?? [];

      return requestRules.map((requestRule) =>
        areTargetsEqual(requestRule, graphQLRequestTarget)
          ? {
              ...requestRule,
              activeScenarioId: scenarioId,
            }
          : requestRule
      );
    }
  );
};

export const saveScenario = async (
  scenario: Scenario,
  graphQLRequestTarget: GraphQLRequestTarget
) => {
  console.info(
    "[GraphQL Network Tab][Devtools Page]: Creating new GraphQL scenario.",
    scenario,
    graphQLRequestTarget
  );

  await updateItem(
    "requestRules",
    (storageRequestRules: GraphQLRequestRule[] | null | undefined): GraphQLRequestRule[] => {
      const requestRules = storageRequestRules ?? [];

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

        return requestRules.map((requestRule) =>
          areTargetsEqual(requestRule, updatedRequestRule) ? updatedRequestRule : requestRule
        );
      }

      const newRequestRule = {
        id: nanoid(),
        ...graphQLRequestTarget,
        scenarios: [scenario],
        activeScenarioId: scenario.id,
      };

      return [...requestRules, newRequestRule];
    }
  );

  console.info("[GraphQL Network Tab][Devtools Page]: New GraphQL request rule has been created.");
};

export const getGraphQLRequestRules = async (): Promise<GraphQLRequestRule[]> => {
  return (await getItem<GraphQLRequestRule[]>("requestRules")) ?? [];
};
