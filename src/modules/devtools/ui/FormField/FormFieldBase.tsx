import { get } from "lodash-es";

import { InfoOutlined } from "@mui/icons-material";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";
import { Control, FieldErrors, FieldPath, FieldValues } from "react-hook-form";

export type FormFieldBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  label?: string;
  helperText?: string;
  control: Control<TFieldValues, TName>;
  errors: FieldErrors<TFieldValues>;
  name: TName;
  children: React.ReactNode;
};

export function FormFieldBase<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ label, children, name, errors, helperText }: FormFieldBaseProps<TFieldValues, TName>) {
  const error = get(errors, name);

  return (
    <FormControl error={!!error}>
      {label && <FormLabel>{label}</FormLabel>}
      {children}
      <FormHelperText>
        {errors.statusCode ? (
          <>
            <InfoOutlined />
            {errors.statusCode.message}
          </>
        ) : (
          helperText
        )}
      </FormHelperText>
    </FormControl>
  );
}
