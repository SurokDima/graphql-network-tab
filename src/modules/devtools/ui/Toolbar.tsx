import { FC } from "react";

import { ColorPaletteProp, IconButton, IconButtonProps, Stack, Tooltip } from "@mui/joy";

export type ToolbarProps = {
  children?: React.ReactNode;
  justify?: "space-between" | "space-around" | "flex-start" | "flex-end";
};

export const Toolbar: FC<ToolbarProps> = ({ children, justify = "flex-start" }) => {
  return (
    <Stack
      direction="row"
      sx={{
        background: (theme) => theme.palette.background.level1,
        justifyContent: justify,
      }}
    >
      {children}
    </Stack>
  );
};

export type ToolbarItemsGroupProps = {
  children?: React.ReactNode;
};

export const ToolbarItemsGroup: FC<ToolbarItemsGroupProps> = ({ children }) => {
  return <Stack direction="row">{children}</Stack>;
};

export type ToolbarItemProps = {
  size?: "sm" | "md" | "lg";
  color?: ColorPaletteProp;
  tooltipTitle: string;
  position?: "end";
} & IconButtonProps;

export const ToolbarItem: FC<ToolbarItemProps> = ({
  tooltipTitle,
  sx,
  children,
  size = "sm",
  color = "neutral",
  position,
  ...props
}) => {
  return (
    <Tooltip title={tooltipTitle}>
      <IconButton
        sx={{ borderRadius: 0, alignSelf: position === "end" ? "flex-end" : undefined, ...sx }}
        variant="plain"
        color={color}
        size={size}
        {...props}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};
