import { nanoid } from "nanoid";
import { FC, useState } from "react";

import { Check } from "@mui/icons-material";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardOverflow,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Stack,
  Step,
  StepButton,
  StepIndicator,
  Stepper,
  Typography,
} from "@mui/joy";
import { useNavigate } from "react-router";

import { GraphQLRequest } from "../../../common/types/graphQLRequest";
import { Scenario } from "../../../common/types/rule";
import { useGraphQLRules } from "../../hooks/useGraphQLRequestRules";
import { logger } from "../../logger";
import { saveScenario } from "../../services/rules";
import { getCurrentTab } from "../../services/tabs";

import { RequestForm, RequestFormData } from "./RequestForm";
import { ResponseForm, ResponseFormData } from "./ResponseForm";

export type CreateRuleModalProps = {
  isOpen: boolean;
  selectedRequest?: GraphQLRequest | null;
  onSubmit?: () => void;
  onClose?: () => void;
};

type RuleState = {
  responseRule: {
    statusCode: string;
    body: string;
  };
  requestRule: {
    scenarioName: string;
    graphQLEndpoint: string;
    operationName: string;
  };
};

const STEPS = ["General", "Response", "Done"];

// TODO create general field components
// TODO improve UI
export const CreateRuleModal: FC<CreateRuleModalProps> = ({
  isOpen,
  selectedRequest,
  onSubmit,
  onClose,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const { refresh: refreshGraphQLRules } = useGraphQLRules();

  const [requestRule, setRequestRuleFormData] = useState<RequestFormData | null>(null);

  const handleRequestRuleSubmit = (requestRule: RuleState["requestRule"]) => {
    setRequestRuleFormData(requestRule);
    setActiveStep(1);
  };

  const handleResponseRuleSubmit = async (responseRule: ResponseFormData) => {
    if (!requestRule) return;

    const currentTab = await getCurrentTab();

    if (!currentTab.url || !currentTab.id) {
      logger.error("Unable to get current tab's URL and ID.", currentTab);

      return;
    }

    const scenario: Scenario = {
      id: nanoid(),
      name: requestRule.scenarioName,
      response: {
        statusCode: Number(responseRule.statusCode),
        headers: {},
        body: responseRule.body,
      },
    };

    await saveScenario(
      scenario,
      {
        operationName: requestRule.operationName,
        endpoint: requestRule.graphQLEndpoint,
      },
      currentTab.url
    );

    await refreshGraphQLRules();
    setActiveStep(2);
  };

  return (
    <Modal onClose={onClose} open={isOpen}>
      <ModalDialog layout="fullscreen">
        <ModalClose />
        <Typography level="title-lg">Create a new rule</Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Stepper sx={{ maxWidth: "800px", width: "100%" }}>
            {STEPS.map((step, index) => (
              <Step
                orientation="vertical"
                key={step}
                indicator={
                  <StepIndicator
                    variant={activeStep <= index ? "soft" : "solid"}
                    color={activeStep < index ? "neutral" : "primary"}
                  >
                    {activeStep <= index ? index + 1 : <Check />}
                  </StepIndicator>
                }
                sx={{
                  "&::after": {
                    ...(activeStep > index && index !== 2 && { bgcolor: "primary.solidBg" }),
                  },
                }}
              >
                {activeStep > index ? (
                  <StepButton onClick={() => setActiveStep(index)}>{step}</StepButton>
                ) : (
                  step
                )}
              </Step>
            ))}
          </Stepper>
        </Box>

        <Stack height="100%" alignItems="center" justifyContent="center">
          <Sheet
            variant="outlined"
            sx={{
              borderRadius: "sm",
              padding: 2,
              maxWidth: "800px",
              width: "100%",
              display: activeStep === 0 ? "block" : "none",
            }}
          >
            <Typography id="rank" level="body-sm" fontWeight="lg" sx={{ mb: 1.5 }}>
              Configure request filter
            </Typography>
            <RequestForm
              onSubmit={handleRequestRuleSubmit}
              defaultValues={
                selectedRequest
                  ? {
                      scenarioName: "",
                      graphQLEndpoint: selectedRequest.networkRequest.request.url,
                      operationName: selectedRequest.operation.name,
                    }
                  : undefined
              }
            />
          </Sheet>
          <Sheet
            variant="outlined"
            sx={{
              borderRadius: "sm",
              padding: 2,
              maxWidth: "800px",
              width: "100%",
              display: activeStep === 1 ? "block" : "none",
            }}
          >
            <Typography id="rank" level="body-sm" fontWeight="lg" sx={{ mb: 1.5 }}>
              Configure desired response
            </Typography>
            <ResponseForm
              onSubmit={handleResponseRuleSubmit}
              onBack={() => setActiveStep(0)}
              lastResponseBody={selectedRequest?.networkRequest?.response?.body ?? null}
            />
          </Sheet>
          {activeStep === 2 && (
            <Card
              sx={{
                textAlign: "center",
                alignItems: "center",
                width: 343,
                // to make the demo resizable
                overflow: "auto",
                "--icon-size": "100px",
              }}
            >
              <CardOverflow variant="solid" color="success">
                <AspectRatio
                  variant="outlined"
                  color="success"
                  ratio="1"
                  sx={{
                    m: "auto",
                    transform: "translateY(50%)",
                    borderRadius: "50%",
                    width: "var(--icon-size)",
                    boxShadow: "sm",
                    bgcolor: "background.surface",
                    position: "relative",
                  }}
                >
                  <div>
                    <Check color="success" sx={{ fontSize: "4rem" }} />
                  </div>
                </AspectRatio>
              </CardOverflow>
              <Typography level="title-lg" sx={{ mt: "calc(var(--icon-size) / 2)" }}>
                Success
              </Typography>
              <CardContent sx={{ maxWidth: "40ch" }}>
                Your rule has been created successfully. You can now see it in the list of rules or
                go back to GraphQL Browser
              </CardContent>
              <CardActions
                orientation="vertical"
                buttonFlex={1}
                sx={{
                  "--Button-radius": "40px",
                  width: "clamp(min(100%, 160px), 50%, min(100%, 200px))",
                }}
              >
                <Button
                  variant="solid"
                  color="success"
                  onClick={() => {
                    onSubmit?.();
                    navigate("/");
                  }}
                >
                  To GraphQL List
                </Button>
                <Button
                  variant="plain"
                  color="neutral"
                  onClick={() => {
                    onSubmit?.();
                    navigate("/rules");
                  }}
                >
                  See the rule
                </Button>
              </CardActions>
            </Card>
          )}
        </Stack>
      </ModalDialog>
    </Modal>
  );
};
