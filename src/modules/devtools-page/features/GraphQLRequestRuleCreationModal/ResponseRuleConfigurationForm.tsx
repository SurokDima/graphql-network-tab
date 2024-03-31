import { FC } from "react";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { InfoOutlined } from "@mui/icons-material";
import { Stack, FormControl, FormLabel, FormHelperText, Button, Textarea } from "@mui/joy";
import { Controller, useForm } from "react-hook-form";

import { HttpStatusCodeInput } from "../../components/HttpStatusCodeInput";

export type ResponseRuleConfigurationFormProps = {
  onSubmit: (data: ResponseRuleConfigurationFormData) => void;
  onBack?: () => void;
};

export type ResponseRuleConfigurationFormData = {
  statusCode: string;
  body: string;
};

const validationSchema = z.object({
  statusCode: z
    .number({
      coerce: true,
      invalid_type_error: "Status code must be a number",
      required_error: "Status code is required",
    })
    .nonnegative(),
  body: z.string(),
});

export const ResponseRuleConfigurationForm: FC<ResponseRuleConfigurationFormProps> = ({
  onSubmit,
  onBack,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResponseRuleConfigurationFormData>({
    defaultValues: {
      statusCode: "",
      body: "",
    },
    resolver: zodResolver(validationSchema),
  });

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <FormControl error={!!errors.statusCode}>
          <FormLabel>Status</FormLabel>
          <Controller
            name="statusCode"
            control={control}
            render={({ field: { onChange, ref: _, ...field } }) => (
              <HttpStatusCodeInput onInputChange={onChange} {...field} />
            )}
          />
          <FormHelperText>
            {errors.statusCode ? (
              <>
                <InfoOutlined />
                {errors.statusCode.message}
              </>
            ) : (
              "Status code for the response"
            )}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Body</FormLabel>
          <Controller
            name="body"
            control={control}
            render={({ field }) => (
              <Textarea placeholder="Response body" minRows={10} maxRows={10} {...field} />
            )}
          />
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" color="neutral" sx={{ flex: "1 1 auto" }} onClick={onBack}>
          Back
        </Button>
        <Button
          variant="solid"
          color="primary"
          sx={{ flex: "1 1 auto" }}
          onClick={handleSubmit(onSubmit)}
        >
          Create rule
        </Button>
      </Stack>
    </Stack>
  );
};
