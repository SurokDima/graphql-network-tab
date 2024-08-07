import { FC, useMemo, useState } from "react";

import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { Stack, Box, IconButton, Input } from "@mui/joy";

import { GraphQLOperationType, GraphQLRequest } from "../../../../common/types/graphQL-request";
import { isDefined } from "../../../../common/utils/boolean.utils";
import { pipe } from "../../../../common/utils/function.utils";
import { CheckboxInput } from "../../../ui/Input/CheckboxInput";
import { Tag, TagsSelector } from "../../../ui/TagsSelector";

import { GraphQLRequestsList } from "./GraphQLRequestsList";

// TODO improve API
export type GraphQLRequestsListPanelProps = {
  graphQLRequests: GraphQLRequest[];
  selectedRequestId: string | null;
  type: "short" | "long";
  shouldPreserveLog: boolean;
  onSelectRequest: (requestId: string) => void;
  onClearRequests: () => void;
  onPreserveLogChange: (shouldPreserveLog: boolean) => void;
};

export const GraphQLRequestsListPanel: FC<GraphQLRequestsListPanelProps> = ({
  graphQLRequests,
  type,
  selectedRequestId,
  shouldPreserveLog,
  onSelectRequest,
  onClearRequests,
  onPreserveLogChange,
}) => {
  const [operationTypes, setOperationTypes] = useState<GraphQLOperationType[]>([
    "mutation",
    "query",
  ]);

  const [startsWith, setStartsWith] = useState("");

  const filteredGraphQLRequests = useMemo(
    () =>
      filterGraphQLRequests(graphQLRequests, {
        operationTypes,
        startsWith,
      }),
    [graphQLRequests, operationTypes, startsWith]
  );

  return (
    <Stack height="100%" direction="column">
      <Stack
        sx={{
          background: (theme) => theme.palette.background.surface,
          height: "100%",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "0.25rem",
            backgroundColor: (theme) => theme.palette.background.surface,
            borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
          }}
        >
          <Stack sx={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
            <IconButton variant="plain" size="sm" onClick={onClearRequests}>
              <NotInterestedIcon />
            </IconButton>
            <Input
              value={startsWith}
              onChange={(e) => {
                setStartsWith(e.target.value);
              }}
              sx={{ width: "250px" }}
              placeholder="Filter..."
              size="sm"
            />
            <CheckboxInput
              size="sm"
              label="Preserve log"
              value={shouldPreserveLog}
              onChange={onPreserveLogChange}
            />
          </Stack>
        </Stack>
        <GraphQLRequestsList
          type={type}
          selectedRequestId={selectedRequestId}
          onSelectRequest={onSelectRequest}
          graphQLRequests={filteredGraphQLRequests}
        />
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.background.surface,
            borderTop: (theme) => `2px solid ${theme.palette.divider}`,
          }}
        >
          <TagsSelector
            onChange={(tags) => setOperationTypes(tags as GraphQLOperationType[])}
            selectedTags={operationTypes}
          >
            <Tag color="success" value="query">
              Query
            </Tag>
            <Tag color="danger" value="mutation">
              Mutation
            </Tag>
          </TagsSelector>
        </Box>
      </Stack>
    </Stack>
  );
};

const filterGraphQLRequests = (
  graphQLRequests: GraphQLRequest[],
  { startsWith, operationTypes }: { startsWith?: string; operationTypes?: GraphQLOperationType[] }
) => {
  const filters = [
    startsWith ? filterByName(startsWith) : undefined,
    operationTypes ? filterByOperationTypes(operationTypes) : undefined,
  ];

  return pipe(...filters.filter(isDefined))(graphQLRequests);
};

const filterByOperationTypes =
  (operationTypes: GraphQLOperationType[]) =>
  (graphQLRequests: GraphQLRequest[]): GraphQLRequest[] =>
    graphQLRequests.filter((graphQLRequest) =>
      operationTypes.includes(graphQLRequest.operation.type)
    );

const filterByName =
  (startsWith: string) =>
  (graphQLRequests: GraphQLRequest[]): GraphQLRequest[] =>
    graphQLRequests.filter((graphQLRequest) =>
      graphQLRequest.operation.name.startsWith(startsWith)
    );
