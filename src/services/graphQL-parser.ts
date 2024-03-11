import { OperationDefinitionNode, FieldNode } from "graphql";

import { gql } from "graphql-tag";

import { GraphQLOperationType } from "../types/graphql-request";
import { NetworkRequest } from "../types/network-request";
import { Err, Ok, Result, wrap } from "../types/result";

export type GraphQLRequestDetails = {
  operationName: string;
  operationType: GraphQLOperationType;
  variables: Record<string, unknown>;
  rawGraphQL: string;
};

const parseGraphqlQuery = (queryString: string) => {
  return gql`
    ${queryString}
  `;
};

export const getGraphQLRequestDetails = (
  networkRequest: NetworkRequest
): Result<GraphQLRequestDetails> => {
  // TODO add support for formData
  // TODO add validation
  const requestData = networkRequest.request.body
    ? wrap(() => JSON.parse(networkRequest.request.body!))()
    : Ok(null);

  if (!requestData.ok) return Err(requestData.error);

  const query = requestData.value?.query;

  if (!query || typeof query !== "string") {
    return Err(new Error("No valid query"));
  }

  const documentNode = parseGraphqlQuery(query);

  const firstOperationDefinition = documentNode.definitions.find(
    (def) => def.kind === "OperationDefinition"
  ) as OperationDefinitionNode;

  const field = firstOperationDefinition.selectionSet.selections.find(
    (selection) => selection.kind === "Field"
  ) as FieldNode;

  const operationName = firstOperationDefinition.name?.value || field?.name.value;
  if (!operationName) return Err(new Error("No operation name found"));
  const operationType: GraphQLOperationType = firstOperationDefinition?.operation;

  return Ok({
    operationName,
    operationType,
    rawGraphQL: query,
    variables: requestData.value?.variables as Record<string, unknown>,
  });
};
