import { FC, useMemo } from "react";

import { Alert, Avatar, Sheet, Stack, Table, Typography, styled } from "@mui/joy";

import { GraphQLOperationType, GraphQLRequest } from "../types/graphql-request.ts";
import { isDefined } from "../utils/boolean.utils.ts";
import { pipe } from "../utils/function.utils.ts";

import { NetworkRequestStatus } from "./NetworkRequestStatus.tsx";

type GraphQLRequestsListProps = {
  graphQLRequests: GraphQLRequest[];
  type: "short" | "long";
  selectedRequestId: string | null;
  onSelectRequest: (requestId: string) => void;
  startsWith?: string;
  operationTypes?: GraphQLOperationType[];
};

export const GraphQLRequestsList: FC<GraphQLRequestsListProps> = ({
  graphQLRequests,
  type,
  selectedRequestId,
  onSelectRequest,
  startsWith,
  operationTypes,
}) => {
  const filteredGraphQLRequests = useMemo(
    () =>
      filterGraphQLRequests(graphQLRequests, {
        startsWith,
        operationTypes,
      }),
    [graphQLRequests, startsWith, operationTypes]
  );

  return (
    <Sheet
      sx={{
        height: "100%",
        overflowY: "auto",
      }}
    >
      <Stack direction="column" height="100%">
        <Table
          size="sm"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-selectedBackground": (theme) => theme.vars.palette.primary.softBg,
            "& th": {
              height: "33px",
            },
          }}
        >
          <thead>
            <tr>
              {type === "long" ? (
                <>
                  <th>Type</th>
                  <th>Status</th>
                </>
              ) : (
                <th>Type</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredGraphQLRequests.map((graphQLRequest) => (
              <TableRow
                key={graphQLRequest.id}
                onClick={() => onSelectRequest(graphQLRequest.id)}
                selected={graphQLRequest.id === selectedRequestId}
              >
                {type === "long" ? (
                  <>
                    <td>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <GraphQLRequestIcon graphQLRequest={graphQLRequest} />
                        <Typography level="title-sm">{graphQLRequest.operation.name}</Typography>
                      </Stack>
                    </td>
                    <td>
                      <NetworkRequestStatus
                        statusCode={graphQLRequest.networkRequest.response.statusCode}
                      />
                    </td>
                  </>
                ) : (
                  <td>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <GraphQLRequestIcon graphQLRequest={graphQLRequest} />
                      <Typography level="title-sm">{graphQLRequest.operation.name}</Typography>
                    </Stack>
                  </td>
                )}
              </TableRow>
            ))}
          </tbody>
        </Table>
        {filteredGraphQLRequests.length === 0 && (
          <Stack justifyContent="center" alignItems="center" flex="1 1 auto">
            <Alert variant="plain" color="neutral">
              No requests found
            </Alert>
          </Stack>
        )}
      </Stack>
    </Sheet>
  );
};

type GraphQLRequestIconProps = {
  graphQLRequest: GraphQLRequest;
};

const GraphQLRequestIcon: FC<GraphQLRequestIconProps> = ({ graphQLRequest }) => {
  return graphQLRequest.operation.type === "mutation" ? <MutationIcon /> : <QueryIcon />;
};

const MutationIcon: FC = () => {
  return (
    <Avatar size="sm" color="danger">
      M
    </Avatar>
  );
};

const QueryIcon: FC = () => {
  return (
    <Avatar size="sm" color="success">
      Q
    </Avatar>
  );
};

const TableRow = styled("tr")<{ selected: boolean }>(({ selected }) =>
  selected
    ? {
        "--TableCell-dataBackground": "var(--TableCell-selectedBackground)",
        "--TableCell-headBackground": "var(--TableCell-selectedBackground)",
      }
    : {}
);

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
