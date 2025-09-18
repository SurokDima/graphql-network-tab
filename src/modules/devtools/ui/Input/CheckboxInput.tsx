import { FC } from "react";

import { Checkbox } from "@mui/joy";

export type CheckboxInputProps = {
  label: string;
  value: boolean;
  size?: "sm" | "md" | "lg";
  onChange: (value: boolean) => void;
};

export const CheckboxInput: FC<CheckboxInputProps> = ({ label, size, value, onChange }) => {
  return (
    <Checkbox
      size={size}
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
      label={label}
    />
  );
};
