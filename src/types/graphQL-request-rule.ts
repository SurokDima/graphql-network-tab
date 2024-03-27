export type GraphQLRequestTarget = {
  operationName: string;
  endpoint: string;
};

export type GraphQLRequestRule = {
  id: string;
  scenarios: Scenario[];
  activeScenarioId: string;
} & GraphQLRequestTarget;

export type TabTarget = {
  tabId: number;
  url: string;
};

export type Scenario = {
  id: string;
  name: string;
  response: {
    statusCode: number;
    headers: Record<string, string>;
    body: string;
  };
  tabTarget: TabTarget;
};

export const areTargetsEqual = (a: GraphQLRequestTarget, b: GraphQLRequestTarget) =>
  a.operationName === b.operationName && a.endpoint === b.endpoint;
