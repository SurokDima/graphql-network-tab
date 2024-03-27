import { FC } from "react";

import { Skeleton, Stack, Table, Typography, styled } from "@mui/joy";

import { GraphQLRequestRule } from "../../types/graphQL-request-rule";
import { InlineAlert } from "../../ui/InlineAlert";

type GraphQLRequestRulesListProps = {
  rules: GraphQLRequestRule[];
  selectedRuleId: string | null;
  loading: boolean;
  error: Error | null;
  onSelectRule: (ruleId: string) => void;
};

export const GraphQLRequestRulesList: FC<GraphQLRequestRulesListProps> = ({
  rules,
  loading,
  error,
  selectedRuleId,
  onSelectRule,
}) => {
  return (
    <Table
      size="sm"
      stickyHeader
      hoverRow={!loading && !error}
      sx={{
        "--TableCell-selectedBackground": (theme) => theme.vars.palette.primary.softBg,
        "& th": {
          height: "33px",
        },
      }}
    >
      <thead>
        <tr>
          <th>Operation name</th>
          <th>Endpoint</th>
        </tr>
      </thead>
      <tbody>
        {error ? (
          <tr>
            <td colSpan={2}>
              <Stack direction="column" height="100%" justifyContent="center" alignItems="center">
                <InlineAlert type="error" message="Failed to retrieve graphQL request rules" />
              </Stack>
            </td>
          </tr>
        ) : loading ? (
          <>
            <TableRow selected={false}>
              <td>
                <Skeleton variant="text" level="title-sm" sx={{ width: "150px" }} />
              </td>
              <td>
                <Skeleton variant="text" sx={{ width: "300px" }} />
              </td>
            </TableRow>
            <TableRow selected={false}>
              <td>
                <Skeleton variant="text" level="title-sm" sx={{ width: "150px" }} />
              </td>
              <td>
                <Skeleton variant="text" sx={{ width: "300px" }} />
              </td>
            </TableRow>
            <TableRow selected={false}>
              <td>
                <Skeleton variant="text" level="title-sm" sx={{ width: "150px" }} />
              </td>
              <td>
                <Skeleton variant="text" sx={{ width: "300px" }} />
              </td>
            </TableRow>
            <TableRow selected={false}>
              <td>
                <Skeleton variant="text" level="title-sm" sx={{ width: "150px" }} />
              </td>
              <td>
                <Skeleton variant="text" sx={{ width: "300px" }} />
              </td>
            </TableRow>
          </>
        ) : (
          rules.map((rule) => (
            <TableRow
              selected={rule.id === selectedRuleId}
              key={rule.id}
              onClick={() => onSelectRule(rule.id)}
            >
              <td>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography level="title-sm">{rule.operationName}</Typography>
                </Stack>
              </td>
              <td>{rule.endpoint}</td>
            </TableRow>
          ))
        )}
      </tbody>
    </Table>
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
