import { FC } from "react";

import { Stack, Button, Box } from "@mui/joy";
import { Outlet, useLocation, useNavigate } from "react-router";

export const MainLayout: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Stack height="100%">
      <Stack
        sx={{
          height: "min-content",
          flexDirection: "row",
          gap: 2,
          padding: "0.25rem",
          backgroundColor: (theme) => theme.palette.background.surface,
          borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
        }}
      >
        <Button
          variant="plain"
          aria-pressed={location.pathname === "/" ? "true" : "false"}
          component="a"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          href="/"
          color="neutral"
        >
          Requests
        </Button>
        <Button
          aria-pressed={location.pathname === "/rules" ? "true" : "false"}
          variant="plain"
          component="a"
          onClick={(e) => {
            e.preventDefault();
            navigate("/rules");
          }}
          href="/rules"
          color="neutral"
        >
          Rules
        </Button>
      </Stack>
      <Box sx={{ flex: "1 1 auto", overflow: "hidden" }}>
        <Outlet />
      </Box>
    </Stack>
  );
};
