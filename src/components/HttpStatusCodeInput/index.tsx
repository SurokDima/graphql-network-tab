import { FC, FocusEventHandler } from "react";

import { Autocomplete, AutocompleteOption } from "@mui/joy";

import { HTTP_STATUS_CODES, HTTP_STATUS_CODE_GROUPS } from "./http-status-codes";

type HttpStatusCodeInputProps = {
  value?: string;
  onInputChange?: (value: string) => void;
  onChange?: (value: string) => void;
  onBlur?: FocusEventHandler<HTMLDivElement>;
  disabled?: boolean;
  name?: string;
};

export const HttpStatusCodeInput: FC<HttpStatusCodeInputProps> = ({
  value,
  disabled,
  name,
  onChange,
  onInputChange,
  onBlur,
}) => {
  return (
    <Autocomplete
      freeSolo={true}
      autoHighlight={true}
      autoComplete={true}
      value={value}
      renderOption={(props, option) => (
        <AutocompleteOption {...props}>
          {option.status} - {option.message}
        </AutocompleteOption>
      )}
      groupBy={(option) => HTTP_STATUS_CODE_GROUPS[Math.floor(option.status / 100) - 1]}
      options={HTTP_STATUS_CODES}
      getOptionLabel={(option) => (typeof option === "string" ? option : String(option.status))}
      onInputChange={(_, val) => onInputChange?.(val)}
      onChange={(_, val) => onChange?.(String(val))}
      placeholder="HTTP Code"
      onBlur={onBlur}
      disabled={disabled}
      name={name}
    />
  );
};
