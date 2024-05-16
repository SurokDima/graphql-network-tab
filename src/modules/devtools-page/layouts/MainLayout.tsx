import { FC, Fragment } from "react";

import { Stack, Button, Box, ButtonGroup } from "@mui/joy";
import { Outlet, useLocation, useNavigate } from "react-router";

import { useToolbar } from "../hooks/useToolbar";

export const MainLayout: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { items } = useToolbar();

  return (
    <Stack height="100%">
      <Stack
        sx={{
          position: "relative",
          height: "min-content",
          flexDirection: "row",
          gap: 2,
          justifyContent: "center",
          padding: "0.25rem",
          backgroundColor: (theme) => theme.palette.background.surface,
          borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
        }}
      >
        <ButtonGroup variant="outlined">
          <Button
            variant="outlined"
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
            variant="outlined"
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
        </ButtonGroup>
        <Stack
          sx={{
            flexDirection: "row",
            gap: 2,
            position: "absolute",
            right: 0,
            top: 0,
            height: "100%",
            alignItems: "center",
            paddingRight: 2,
          }}
        >
          {items.map((item) => (
            <Fragment key={item.id}>{item.renderer()}</Fragment>
          ))}
        </Stack>
      </Stack>
      <Box sx={{ flex: "1 1 auto", overflow: "hidden" }}>
        <Outlet />
      </Box>
    </Stack>
  );
};
