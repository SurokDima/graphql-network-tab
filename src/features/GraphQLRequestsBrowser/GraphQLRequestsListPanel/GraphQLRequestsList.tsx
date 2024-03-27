import { FC } from "react";

import { Alert, Sheet, Stack, Table, Typography, styled } from "@mui/joy";

import { GraphQLRequestIcon } from "../../../components/GraphQLRequestIcon";
import { NetworkRequestStatus } from "../../../components/NetworkRequestStatus";
import { GraphQLRequest } from "../../../types/graphQL-request";

type GraphQLRequestsListProps = {
  graphQLRequests: GraphQLRequest[];
  type: "short" | "long";
  selectedRequestId: string | null;
  onSelectRequest: (requestId: string) => void;
};

export const GraphQLRequestsList: FC<GraphQLRequestsListProps> = ({
  graphQLRequests,
  type,
  selectedRequestId,
  onSelectRequest,
}) => {
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
            {graphQLRequests.map((graphQLRequest) => (
              <TableRow
                key={graphQLRequest.id}
                onClick={() => onSelectRequest(graphQLRequest.id)}
                selected={graphQLRequest.id === selectedRequestId}
              >
                {type === "long" ? (
                  <>
                    <td>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <GraphQLRequestIcon operationType={graphQLRequest.operation.type} />
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
                      <GraphQLRequestIcon operationType={graphQLRequest.operation.type} />
                      <Typography level="title-sm">{graphQLRequest.operation.name}</Typography>
                    </Stack>
                  </td>
                )}
              </TableRow>
            ))}
          </tbody>
        </Table>
        {graphQLRequests.length === 0 && (
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

const TableRow = styled("tr")<{ selected: boolean }>(({ selected }) =>
  selected
    ? {
        "--TableCell-dataBackground": "var(--TableCell-selectedBackground)",
        "--TableCell-headBackground": "var(--TableCell-selectedBackground)",
      }
    : {}
);
