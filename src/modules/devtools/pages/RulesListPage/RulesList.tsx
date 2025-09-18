import { FC } from "react";

import { Alert, Skeleton, Stack, Table, Typography, styled } from "@mui/joy";

import { Rule } from "../../../common/types/rule";
import { RuleIcon } from "../../components/RuleIcon";
import { InlineAlert } from "../../ui/InlineAlert";

type RulesListProps = {
  rules: Rule[];
  selectedRuleId: string | null;
  loading: boolean;
  error: Error | null;
  disabled?: boolean;
  onSelectRule: (ruleId: string) => void;
};

export const RulesList: FC<RulesListProps> = ({
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
            <th>
              <Typography
                textColor={disabled ? "neutral.plainDisabledColor" : "neutral.plainColor"}
              >
                Operation name
              </Typography>
            </th>
            <th>
              <Typography
                textColor={disabled ? "neutral.plainDisabledColor" : "neutral.plainColor"}
              >
                Endpoint
              </Typography>
            </th>
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
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <RuleIcon disabled={disabled} operationName={rule.operationName} />
                    <Typography
                      level="title-sm"
                      textColor={disabled ? "neutral.plainDisabledColor" : "neutral.plainColor"}
                    >
                      {rule.operationName}
                    </Typography>
                  </Stack>
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
