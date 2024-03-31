import { FC } from "react";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { InfoOutlined } from "@mui/icons-material";
import {
  Stack,
  FormControl,
  FormLabel,
  Autocomplete,
  FormHelperText,
  AutocompleteOption,
  Typography,
  Button,
  Input,
} from "@mui/joy";
import { Controller, useForm } from "react-hook-form";

import { GraphQLRequestIcon } from "../../components/GraphQLRequestIcon";
import { useGraphQLRequests } from "../../hooks/useGraphQLRequests";
import { unique } from "../../utils/array.utils";

export type RequestRuleConfigurationFormProps = {
  onSubmit: (data: RequestRuleConfigurationFormData) => void;
  defaultValues?: RequestRuleConfigurationFormData;
};

export type RequestRuleConfigurationFormData = {
  graphQLEndpoint: string;
  operationName: string;
  scenarioName: string;
};

const validationSchema = z.object({
  scenarioName: z.string().min(1, "Scenario name is required"),
  graphQLEndpoint: z.string().min(1, "GraphQL endpoint is required").url(),
  operationName: z.string().min(1, "Operation name is required"),
});

export const RequestRuleConfigurationForm: FC<RequestRuleConfigurationFormProps> = ({
  onSubmit,
  defaultValues = {
    scenarioName: "",
    graphQLEndpoint: "",
    operationName: "",
  },
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestRuleConfigurationFormData>({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const { graphQLRequests } = useGraphQLRequests();

  const mentionedGraphQLEndpoints = unique(
    graphQLRequests.map((request) => request.networkRequest.request.url)
  );

  const graphQLRequestsWithUniqueOperations = unique(
    graphQLRequests,
    (request1, request2) => request1.operation.name === request2.operation.name
  );

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <FormControl error={!!errors.scenarioName}>
          <FormLabel>Scenario name</FormLabel>
          <Controller
            name="scenarioName"
            control={control}
            render={({ field }) => <Input placeholder="Scenario name" {...field} />}
          />
          {errors.scenarioName && (
            <FormHelperText>
              <InfoOutlined />
              {errors.scenarioName.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl error={!!errors.graphQLEndpoint}>
          <FormLabel>GraphQL endpoint</FormLabel>
          <Controller
            name="graphQLEndpoint"
            control={control}
            render={({ field: { onChange, ref: _, ...field } }) => (
              <Autocomplete
                freeSolo={true}
                autoHighlight={true}
                autoComplete={true}
                options={mentionedGraphQLEndpoints}
                placeholder="GraphQL endpoint"
                onInputChange={(_, val) => onChange(val)}
                {...field}
              />
            )}
          />
          <FormHelperText>
            {errors.graphQLEndpoint ? (
              <>
                <InfoOutlined />
                {errors.graphQLEndpoint.message}
              </>
            ) : (
              "The URL of the GraphQL endpoint"
            )}
          </FormHelperText>
        </FormControl>
        <FormControl error={!!errors.operationName}>
          <FormLabel>Operation name</FormLabel>
          <Controller
            name="operationName"
            control={control}
            render={({ field: { onChange, ref: _, ...field } }) => (
              <Autocomplete
                freeSolo={true}
                autoHighlight={true}
                autoComplete={true}
                renderOption={(props, option) => (
                  <AutocompleteOption {...props}>
                    <GraphQLRequestIcon operationType={option.graphQLRequest.operation.type} />
                    <Typography level="body-sm">{option.label}</Typography>
                  </AutocompleteOption>
                )}
                options={graphQLRequestsWithUniqueOperations.map((graphQLRequest) => ({
                  label: graphQLRequest.operation.name,
                  graphQLRequest,
                  value: graphQLRequest.operation.name,
                }))}
                placeholder="Operation name"
                onInputChange={(_, val) => onChange(val)}
                {...field}
              />
            )}
          />
          <FormHelperText>
            {errors.operationName ? (
              <>
                <InfoOutlined />
                {errors.operationName.message}
              </>
            ) : (
              "The name of query or mutation"
            )}
          </FormHelperText>
        </FormControl>
      </Stack>
      <Stack direction="row">
        <Button
          variant="solid"
          color="primary"
          sx={{ flex: "1 1 auto" }}
          onClick={handleSubmit(onSubmit)}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  );
};
