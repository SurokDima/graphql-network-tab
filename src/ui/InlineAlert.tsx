import { FC } from "react";

import { CheckCircle, Warning, Report, Info, CloseRounded } from "@mui/icons-material";
import { Alert, ColorPaletteProp, IconButton, Typography } from "@mui/joy";

export type InlineAlertProps = {
  message: string;
  type: AlertType;
  showClosingIcon?: boolean;
  onClose?: () => void;
};

type AlertType = "success" | "warning" | "error" | "info";

const items: {
  [K in AlertType]: {
    title: string;
    color: ColorPaletteProp;
    icon: React.ReactElement;
  };
} = {
  success: { title: "Success", color: "success", icon: <CheckCircle /> },
  warning: { title: "Warning", color: "warning", icon: <Warning /> },
  error: { title: "Error", color: "danger", icon: <Report /> },
  info: { title: "Neutral", color: "neutral", icon: <Info /> },
};

export const InlineAlert: FC<InlineAlertProps> = ({
  message,
  type,
  showClosingIcon = false,
  onClose,
}) => {
  const { title, color, icon } = items[type];

  return (
    <Alert
      key={title}
      sx={{ alignItems: "flex-start" }}
      startDecorator={icon}
      variant="soft"
      color={color}
      endDecorator={
        showClosingIcon ? (
          <IconButton variant="soft" color={color} onClick={onClose}>
            <CloseRounded />
          </IconButton>
        ) : undefined
      }
    >
      <div>
        <div>{title}</div>
        <Typography level="body-sm" color={color}>
          {message}
        </Typography>
      </div>
    </Alert>
  );
};
