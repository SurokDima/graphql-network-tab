import { Control, Controller, FieldErrors, FieldPath, FieldValues } from "react-hook-form";

import { HttpStatusCodeInput } from "../Input/HttpStatusCodeInput";

import { FormFieldBase } from "./FormFieldBase";

export type HttpStatusCodeSelectorFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  label?: string;
  helperText?: string;
  control: Control<TFieldValues, TName>;
  errors: FieldErrors<TFieldValues>;
  name: TName;
};

export function HttpStatusCodeSelectorFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  helperText,
  errors,
  control,
  name,
}: HttpStatusCodeSelectorFormFieldProps<TFieldValues, TName>) {
  return (
    <FormFieldBase
      label={label}
      errors={errors}
      helperText={helperText}
      name={name}
      control={control}
    >
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ref: _, ...field } }) => (
          <HttpStatusCodeInput onInputChange={onChange} {...field} />
        )}
      />
    </FormFieldBase>
  );
}
