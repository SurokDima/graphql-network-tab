import { FC } from "react";

import { Alert, Skeleton, Stack, Table, Typography, styled } from "@mui/joy";

import { GraphQLRequestRule } from "../../../common/types/graphQL-request-rule";
import { InlineAlert } from "../../ui/InlineAlert";

type GraphQLRequestRulesListProps = {
  rules: GraphQLRequestRule[];
  selectedRuleId: string | null;
  loading: boolean;
  error: Error | null;
  disabled?: boolean;
  onSelectRule: (ruleId: string) => void;
};

export const GraphQLRequestRulesList: FC<GraphQLRequestRulesListProps> = ({
  rules,
  loading,
  error,
  selectedRuleId,
  disabled = false,
  onSelectRule,
}) => {
  return (
    <>
      <Table
        size="sm"
        stickyHeader
        hoverRow={!loading && !error && !disabled}
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
                onClick={() => !disabled && onSelectRule(rule.id)}
              >
                <td>
                  <Typography
                    level="title-sm"
                    textColor={disabled ? "neutral.plainDisabledColor" : "neutral.plainColor"}
                  >
                    {rule.operationName}
                  </Typography>
                </td>
                <td>
                  <Typography
                    level="title-sm"
                    textColor={disabled ? "neutral.plainDisabledColor" : "neutral.plainColor"}
                  >
                    {rule.endpoint}
                  </Typography>
                </td>
              </TableRow>
            ))
          )}
        </tbody>
      </Table>

      {rules.length === 0 && (
        <Stack justifyContent="center" alignItems="center" flex="1 1 auto">
          <Alert variant="plain" color="neutral">
            No requests found
          </Alert>
        </Stack>
      )}
    </>
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
