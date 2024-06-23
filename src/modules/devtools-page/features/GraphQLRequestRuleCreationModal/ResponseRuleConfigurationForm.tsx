import { FC, useState } from "react";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Button, Modal, ModalDialog, ModalClose, Typography } from "@mui/joy";
import { useForm } from "react-hook-form";

import { CodeEditorFormField } from "../../ui/FormField/CodeEditorFormField";
import { HttpStatusCodeSelectorFormField } from "../../ui/FormField/HttpStatusCodeSelectorFormField";

export type ResponseRuleConfigurationFormProps = {
  onSubmit: (data: ResponseRuleConfigurationFormData) => void;
  onBack?: () => void;
  lastResponseBody: string | null;
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
  lastResponseBody,
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    setValue,
  } = useForm<ResponseRuleConfigurationFormData>({
    defaultValues: {
      statusCode: "",
      body: "",
    },
    resolver: zodResolver(validationSchema),
  });

  const handleUseLastResponseBody = () => {
    if (!lastResponseBody) return;

    if (dirtyFields.body) {
      setIsConfirmModalOpen(true);
    } else {
      setValue("body", lastResponseBody);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <HttpStatusCodeSelectorFormField
            control={control}
            name="statusCode"
            errors={errors}
            helperText="Status code for the response"
            label="Status"
          />
          <Stack gap={1}>
            <CodeEditorFormField
              language="json"
              control={control}
              errors={errors}
              height={200}
              label="Body"
              name="body"
            />
            {lastResponseBody && (
              <Stack direction="row" justifyContent="flex-end">
                <Button variant="plain" color="neutral" onClick={() => handleUseLastResponseBody()}>
                  Use last response body
                </Button>
              </Stack>
            )}
          </Stack>
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
      {lastResponseBody && (
        <Modal open={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
          <ModalDialog
            sx={(theme) => ({
              [theme.breakpoints.only("xs")]: {
                top: "unset",
                bottom: 0,
                left: 0,
                right: 0,
                borderRadius: 0,
                transform: "none",
                maxWidth: "unset",
              },
            })}
          >
            <ModalClose />
            <Typography id="nested-modal-title" level="title-md">
              Are you absolutely sure?
            </Typography>
            <Typography id="nested-modal-description" textColor="text.tertiary">
              You&apos;ve made changes to the response body. Are you sure you want to discard them
              and apply the last response body?
            </Typography>
            <Stack
              sx={{
                mt: 1,
                display: "flex",
                gap: 1,
                flexDirection: { xs: "column", sm: "row-reverse" },
              }}
            >
              <Button
                variant="solid"
                color="primary"
                onClick={() => {
                  setIsConfirmModalOpen(false);
                  setValue("body", lastResponseBody);
                }}
              >
                Continue
              </Button>
              <Button
                variant="outlined"
                color="neutral"
                onClick={() => setIsConfirmModalOpen(false)}
              >
                Cancel
              </Button>
            </Stack>
          </ModalDialog>
        </Modal>
      )}
    </>
  );
};
