import { FC } from "react";

import { Badge, Typography } from "@mui/joy";

export type NetworkRequestStatusProps = {
  statusCode: number;
};

export const NetworkRequestStatus: FC<NetworkRequestStatusProps> = ({ statusCode }) => {
  return (
    <Badge size="sm" color={mapStatusCodeToColor(statusCode)}>
      <Typography level="body-sm">{statusCode}</Typography>
    </Badge>
  );
};

const mapStatusCodeToColor = (statusCode: number) => {
  if (isStatusCodeSuccess(statusCode)) return "success";
  if (isStatusCodeRedirect(statusCode)) return "warning";
  if (isStatusCodeError(statusCode)) return "danger";
  return "primary";
};

const isStatusCodeSuccess = (statusCode: number) => statusCode >= 200 && statusCode < 300;
const isStatusCodeRedirect = (statusCode: number) => statusCode >= 300 && statusCode < 400;
const isStatusCodeError = (statusCode: number) => statusCode >= 400;
