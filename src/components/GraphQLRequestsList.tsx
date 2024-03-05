import { CSSProperties, FC } from "react";

import { Avatar, Sheet, Stack, Table, Typography } from "@mui/joy";

import { GraphQLRequest } from "../types/graphql-request.ts";

import { NetworkRequestStatus } from "./NetworkRequestStatus.tsx";

type GraphQLRequestsListProps = {
  requests: GraphQLRequest[];
  type: "short" | "long";
  selectedRequestId: string | null;
  onSelectRequest: (requestId: string) => void;
};

const MutationIcon: FC = () => {
  return <Avatar color="danger">M</Avatar>;
};

const QueryIcon: FC = () => {
  return <Avatar color="success">Q</Avatar>;
};

export const GraphQLRequestsList: FC<GraphQLRequestsListProps> = ({
  requests,
  type,
  selectedRequestId,
  onSelectRequest,
}) => {
  return (
    <Sheet>
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
          {requests.map((request) => (
            <tr
              key={request.id}
              onClick={() => onSelectRequest(request.id)}
              style={
                request.id === selectedRequestId
                  ? ({
                      "--TableCell-dataBackground": "var(--TableCell-selectedBackground)",
                      "--TableCell-headBackground": "var(--TableCell-selectedBackground)",
                    } as CSSProperties)
                  : {}
              }
            >
              {type === "long" ? (
                <>
                  <td>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      {request.type === "mutation" ? <MutationIcon /> : <QueryIcon />}
                      <Typography level="title-md">{request.name}</Typography>
                    </Stack>
                  </td>
                  <td>
                    <NetworkRequestStatus statusCode={request.networkRequest.response.statusCode} />
                  </td>
                </>
              ) : (
                <td>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    {request.type === "mutation" ? <MutationIcon /> : <QueryIcon />}
                    <Typography level="title-md">{request.name}</Typography>
                  </Stack>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};
