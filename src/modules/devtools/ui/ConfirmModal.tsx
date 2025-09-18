import { FC } from "react";

import { WarningRounded } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
  Stack,
} from "@mui/joy";

export type ConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
  content?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  title?: string;
  riskLevel?: "low" | "medium" | "high";
};

export const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  size = "lg",
  riskLevel = "medium",
  title = "Confirmation",
  confirmText = "Confirm",
  content = "Are you sure you want to do this?",
  cancelText = "Cancel",
}) => {
  const color = riskLevel === "low" ? "primary" : riskLevel === "medium" ? "warning" : "danger";

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog size={size} variant="outlined" role="alertdialog" color={color}>
        <DialogTitle>
          <WarningRounded />
          {title}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Stack gap={2}>{content}</Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="solid" color={color} onClick={onConfirm}>
            {confirmText}
          </Button>
          <Button variant="plain" color="neutral" onClick={onCancel}>
            {cancelText}
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};
