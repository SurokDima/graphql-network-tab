import { FC } from "react";

import { ContentCopy } from "@mui/icons-material";
import { IconButton } from "@mui/joy";
import toast from "react-hot-toast";

import { useCopy } from "../hooks/useCopy";

type CopyButtonProps = {
  value: string;
  disabled?: boolean;
};

export const CopyButton: FC<CopyButtonProps> = ({ value, disabled = false }) => {
  const { copy } = useCopy({
    onSuccess: () => toast.success("Copied"),
  });

  return (
    <IconButton
      size="sm"
      onClick={() => {
        copy(value);
      }}
      disabled={disabled}
      variant="plain"
      color="success"
    >
      <ContentCopy />
    </IconButton>
  );
};
