import { FC } from "react";

import { Rule } from "@mui/icons-material";
import { Avatar } from "@mui/joy";
import { useAtom } from "jotai";

import { graphQLRequestsAtom } from "../store";

import { GraphQLRequestIcon } from "./GraphQLRequestIcon";

export type GraphQLRequestRuleIconProps = {
  operationName: string;
  disabled?: boolean;
};

export const GraphQLRequestRuleIcon: FC<GraphQLRequestRuleIconProps> = ({
  operationName,
  disabled = false,
}) => {
  const [graphQLRequests] = useAtom(graphQLRequestsAtom);

  const operationType = graphQLRequests.find((request) => request.operation.name === operationName)
    ?.operation.type;

  return !operationType ? (
    <Avatar
      size="sm"
      sx={{
        backgroundColor: (theme) =>
          disabled ? theme.palette.neutral.softDisabledBg : theme.palette.neutral.softBg,
        color: (theme) =>
          disabled ? theme.palette.neutral.softDisabledColor : theme.palette.neutral.softColor,
      }}
    >
      <Rule
        sx={{
          backgroundColor: (theme) =>
            disabled ? theme.palette.neutral.softDisabledBg : theme.palette.neutral.softBg,
          color: (theme) =>
            disabled ? theme.palette.neutral.softDisabledColor : theme.palette.neutral.softColor,
        }}
        size="sm"
      />
    </Avatar>
  ) : (
    <GraphQLRequestIcon disabled={disabled} operationType={operationType} />
  );
};
