import { FC } from "react";

import { CircularProgress, Stack } from "@mui/joy";

export const LoadingOverlay: FC = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      bgcolor="background.surface"
    >
      <CircularProgress />
    </Stack>
  );
};
