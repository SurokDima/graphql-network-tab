import { FC } from "react";

import { Avatar } from "@mui/joy";

import { GraphQLOperationType } from "../../common/types/graphQL-request";

type GraphQLRequestIconProps = {
  operationType: GraphQLOperationType;
  disabled?: boolean;
};

export const GraphQLRequestIcon: FC<GraphQLRequestIconProps> = ({
  operationType,
  disabled = false,
}) => {
  return operationType === "mutation" ? (
    <MutationIcon disabled={disabled} />
  ) : (
    <QueryIcon disabled={disabled} />
  );
};

type MutationIconProps = {
  disabled?: boolean;
};

export const MutationIcon: FC<MutationIconProps> = ({ disabled = false }) => {
  return (
    <Avatar
      size="sm"
      color="danger"
      sx={{
        backgroundColor: (theme) =>
          disabled ? theme.palette.danger.softDisabledBg : theme.palette.danger.softBg,
      }}
    >
      M
    </Avatar>
  );
};

type QueryIconProps = {
  disabled?: boolean;
};

export const QueryIcon: FC<QueryIconProps> = ({ disabled = false }) => {
  return (
    <Avatar
      size="sm"
      color="success"
      sx={{
        backgroundColor: (theme) =>
          disabled ? theme.palette.success.softDisabledBg : theme.palette.success.softBg,
        color: (theme) =>
          disabled ? theme.palette.success.softDisabledColor : theme.palette.success.softColor,
      }}
    >
      Q
    </Avatar>
  );
};
