import { FC, ReactNode } from "react";

import { Box, FormControl, FormHelperText, FormLabel } from "@mui/joy";

import { CodeEditorInput } from "../Input/CodeEditorInput";

export type CodeEditorFormFieldProps = {
  value: string;
  onChange: (value: string) => void;
  height: string | number;
  label?: ReactNode;
  helperText?: ReactNode;
  language: "json" | "graphql";
};

export const CodeEditorFormField: FC<CodeEditorFormFieldProps> = ({
  value,
  language,
  height,
  label,
  helperText,
  onChange,
}) => {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <Box
        sx={{
          "& .monaco-editor, & .overflow-guard": {
            borderRadius: (theme) => theme.radius.sm,
          },
          borderRadius: (theme) => theme.radius.sm,
          border: (theme) => `1px solid ${theme.palette.neutral[700]}`,
        }}
      >
        <CodeEditorInput
          language={language}
          height={height}
          onChange={(value) => onChange(value ?? "")}
          value={value}
        />
      </Box>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
