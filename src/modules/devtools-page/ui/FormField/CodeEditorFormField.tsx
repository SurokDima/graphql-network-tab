import { Box } from "@mui/joy";
import { Control, Controller, FieldErrors, FieldPath, FieldValues } from "react-hook-form";

import { CodeEditorInput } from "../Input/CodeEditorInput";

import { FormFieldBase } from "./FormFieldBase";

export type CodeEditorFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  height: string | number;
  helperText?: string;
  label?: string;
  control: Control<TFieldValues, TName>;
  errors: FieldErrors<TFieldValues>;
  name: TName;
  language: "json" | "graphql";
};

export function CodeEditorFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  language,
  height,
  label,
  helperText,
  control,
  errors,
  name,
}: CodeEditorFormFieldProps<TFieldValues, TName>) {
  return (
    <FormFieldBase
      label={label}
      helperText={helperText}
      control={control}
      errors={errors}
      name={name}
    >
      <Box
        sx={{
          "& .monaco-editor, & .overflow-guard": {
            borderRadius: (theme) => theme.radius.sm,
          },
          borderRadius: (theme) => theme.radius.sm,
          border: (theme) => `1px solid ${theme.palette.neutral[700]}`,
        }}
      >
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <CodeEditorInput
              language={language}
              height={height}
              onChange={(value) => onChange(value ?? "")}
              value={value}
            />
          )}
        />
      </Box>
    </FormFieldBase>
  );
}
