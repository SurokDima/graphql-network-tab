import { FC } from "react";

import { Avatar } from "@mui/joy";

import { GraphQLOperationType } from "../types/graphQL-request";

type GraphQLRequestIconProps = {
  operationType: GraphQLOperationType;
};

export const GraphQLRequestIcon: FC<GraphQLRequestIconProps> = ({ operationType }) => {
  return operationType === "mutation" ? <MutationIcon /> : <QueryIcon />;
};

export const MutationIcon: FC = () => {
  return (
    <Avatar size="sm" color="danger">
      M
    </Avatar>
  );
};

export const QueryIcon: FC = () => {
  return (
    <Avatar size="sm" color="success">
      Q
    </Avatar>
  );
};
