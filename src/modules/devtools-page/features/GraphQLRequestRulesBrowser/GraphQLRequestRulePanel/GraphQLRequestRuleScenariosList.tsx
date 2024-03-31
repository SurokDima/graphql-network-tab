import { FC, useEffect, useState } from "react";

import { Button } from "@mui/joy";

import { GraphQLRequestTarget, Scenario } from "../../../../common/types/graphQL-request-rule";
import { useGraphQLRules } from "../../../hooks/useGraphQLRequestRules";
import { setActiveScenario } from "../../../services/graphQL-request-rules";

import { GraphQLRequestRuleScenariosTable } from "./GraphQLRequestRuleScenariosTable";

type GraphQLRequestRuleScenariosListProps = {
  graphQLRequestTarget: GraphQLRequestTarget;
  scenarios: Scenario[];
  activeScenarioId: string | null;
};

export const GraphQLRequestRuleScenariosList: FC<GraphQLRequestRuleScenariosListProps> = ({
  scenarios,
  activeScenarioId,
  graphQLRequestTarget,
}) => {
  const { refresh: refreshGraphQLRules, loading: graphQLRequestRulesLoading } = useGraphQLRules();
  const { setActiveScenario, loading } = useSetActiveScenario();
  const [touched, setTouched] = useState(false);
  const [changedActiveScenarioId, setChangedActiveScenarioId] = useState<string | null>(null);

  useEffect(() => {
    setChangedActiveScenarioId(null);
    setTouched(false);
  }, [activeScenarioId, scenarios]);

  const handleSave = async () => {
    if (!changedActiveScenarioId) return;
    await setActiveScenario(changedActiveScenarioId, graphQLRequestTarget);
    await refreshGraphQLRules();
    setTouched(false);
  };

  return (
    <>
      <GraphQLRequestRuleScenariosTable
        activeScenarioId={touched ? changedActiveScenarioId : activeScenarioId}
        scenarios={scenarios}
        renderToolbarAction={() => (
          <Button
            variant="solid"
            color="primary"
            size="sm"
            sx={{ visibility: !touched ? "hidden" : "visible" }}
            loading={loading || graphQLRequestRulesLoading}
            onClick={handleSave}
          >
            Save
          </Button>
        )}
        onActiveScenarioChange={(scenarioId) => {
          if (!touched && scenarioId === activeScenarioId) return;

          setChangedActiveScenarioId(scenarioId);
          setTouched(true);
        }}
      />
    </>
  );
};

const useSetActiveScenario = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const setActiveScenarioItem = async (
    scenarioId: string,
    graphQLRequestTarget: GraphQLRequestTarget
  ) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await setActiveScenario(scenarioId, graphQLRequestTarget);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { setActiveScenario: setActiveScenarioItem, loading, error };
};
