import { FC } from "react";

import { Rule } from "@mui/icons-material";
import { Avatar } from "@mui/joy";

import { useGraphQLRequests } from "../hooks/useGraphQLRequests";

import { GraphQLRequestIcon } from "./GraphQLRequestIcon";

export type RuleIconProps = {
  operationName: string;
  disabled?: boolean;
};

export const RuleIcon: FC<RuleIconProps> = ({ operationName, disabled = false }) => {
  const { graphQLRequests } = useGraphQLRequests();

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
