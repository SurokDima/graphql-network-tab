import { FC } from "react";

import { ContentCopy } from "@mui/icons-material";
import { IconButton } from "@mui/joy";
import toast from "react-hot-toast";

import { useCopy } from "../hooks/useCopy";

type CopyButtonProps = {
  value: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ value }) => {
  const { copy } = useCopy({
    onSuccess: () => toast.success("Copied"),
  });

  return (
    <IconButton
      onClick={() => {
        copy(value);
      }}
      variant="plain"
      color="success"
    >
      <ContentCopy />
    </IconButton>
  );
};
