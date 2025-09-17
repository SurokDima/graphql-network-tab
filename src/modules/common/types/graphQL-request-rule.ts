export type GraphQLRequestTarget = {
  operationName: string;
  endpoint: string;
};

export type Rule = {
  id: string;
  scenarios: Scenario[];
  activeScenarioId: string;
} & GraphQLRequestTarget;

export type AppliedRule = {
  rule: Rule;
  requestDetails: {
    url: string;
    method: string;
    startDateTimestamp: number;
  };
};

export type Scenario = {
  id: string;
  name: string;
  response: {
    statusCode: number;
    headers: Record<string, string>;
    body: string;
  };
};

export const areTargetsEqual = (a: GraphQLRequestTarget, b: GraphQLRequestTarget) =>
  a.operationName === b.operationName && a.endpoint === b.endpoint;
