import { FC } from "react";

import { Avatar, Sheet, Stack, Table, Typography, styled } from "@mui/joy";

import { GraphQLRequest } from "../types/graphql-request.ts";

import { NetworkRequestStatus } from "./NetworkRequestStatus.tsx";

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
    <Sheet sx={{ height: "100%", overflowY: "auto" }}>
      <Table
        stickyHeader
        hoverRow
        sx={{
          "--TableCell-selectedBackground": (theme) => theme.vars.palette.primary.softBg,
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
                      <GraphQLRequestIcon graphQLRequest={graphQLRequest} />
                      <Typography level="title-md">{graphQLRequest.operation.name}</Typography>
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
                    <Typography level="title-md">{graphQLRequest.operation.name}</Typography>
                  </Stack>
                </td>
              )}
            </TableRow>
          ))}
        </tbody>
      </Table>
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
  return <Avatar color="danger">M</Avatar>;
};

const QueryIcon: FC = () => {
  return <Avatar color="success">Q</Avatar>;
};

const TableRow = styled("tr")<{ selected: boolean }>(({ selected }) =>
  selected
    ? {
        "--TableCell-dataBackground": "var(--TableCell-selectedBackground)",
        "--TableCell-headBackground": "var(--TableCell-selectedBackground)",
      }
    : {}
);
