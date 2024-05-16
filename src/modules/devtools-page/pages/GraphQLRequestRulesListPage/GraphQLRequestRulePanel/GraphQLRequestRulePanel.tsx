import { FC } from "react";

import { Close } from "@mui/icons-material";
import {
  AccordionSummary as JoyAccordionSummary,
  Box,
  Link,
  Tab,
  TabList,
  TabPanel as JoyTabPanel,
  Tabs,
  styled,
  Accordion,
  AccordionDetails,
  AccordionGroup,
  accordionDetailsClasses,
  accordionSummaryClasses,
  Stack,
  Typography,
  IconButton,
} from "@mui/joy";

import { GraphQLRequestRule } from "../../../../common/types/graphQL-request-rule";
import { GraphQLRequestRuleIcon } from "../../../components/GraphQLRequestRuleIcon";
import { CopyButton } from "../../../ui/CopyButton";
import { Description } from "../../../ui/Description";

import { GraphQLRequestRuleScenariosList } from "./GraphQLRequestRuleScenariosList";

type GraphQLRequestRulePanelProps = {
  graphQlRequestRule: GraphQLRequestRule;
  disabled?: boolean;
  onClose?: () => void;
};

export const GraphQLRequestRulePanel: FC<GraphQLRequestRulePanelProps> = ({
  graphQlRequestRule,
  disabled = false,
  onClose,
}) => {
  return (
    <Stack height="100%">
      <Stack
        sx={{
          gap: (theme) => theme.spacing(1),
          justifyContent: "space-between",
          flexDirection: "row",
          padding: "0.25rem",
          backgroundColor: (theme) => theme.palette.background.surface,
          borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
          borderLeft: (theme) => `2px solid ${theme.palette.divider}`,
        }}
      >
        <Stack gap={1} flexDirection="row" alignItems="center">
          <GraphQLRequestRuleIcon
            disabled={disabled}
            operationName={graphQlRequestRule.operationName}
          />
          <Typography
            level="title-sm"
            textColor={disabled ? "neutral.plainDisabledColor" : "neutral.plainColor"}
          >
            {graphQlRequestRule.operationName}
          </Typography>
        </Stack>
        <IconButton disabled={disabled} size="sm" onClick={onClose} variant="plain">
          <Close />
        </IconButton>
      </Stack>
      <Box
        sx={{
          flex: "1 1 auto",
          backgroundColor: (theme) => theme.palette.background.surface,
        }}
      >
        <Tabs
          size="sm"
          sx={{
            height: "100%",
            flex: "1 1 auto",
            borderLeft: (theme) => `2px solid ${theme.palette.divider}`,
          }}
        >
          {/* TODO: Add adaptivity for a tabs list*/}
          <TabList sx={{ boxShadow: (theme) => `inset 0 -2px ${theme.palette.divider}` }}>
            <Tab disabled={disabled}>Rule info</Tab>
          </TabList>
          <TabPanel value={0}>
            <AccordionGroup
              size="sm"
              sx={{
                [`& .${accordionSummaryClasses.button}:hover`]: {
                  bgcolor: "transparent",
                },
                [`& .${accordionDetailsClasses.content}`]: {
                  boxShadow: (theme) => `inset 0 1px ${theme.vars.palette.divider}`,
                  [`&.${accordionDetailsClasses.expanded}`]: {
                    paddingBlock: "0.75rem",
                  },
                },
              }}
            >
              <Accordion disabled={disabled} defaultExpanded>
                <AccordionSummary>General</AccordionSummary>
                <AccordionDetails variant="soft">
                  <Description.Root>
                    <Description.Row>
                      <Description.RowLabel>
                        <Typography
                          textColor={disabled ? "neutral.plainDisabledColor" : "text.plainColor"}
                        >
                          Operation name
                        </Typography>
                      </Description.RowLabel>
                      <Description.RowValue>
                        <Typography
                          textColor={disabled ? "neutral.plainDisabledColor" : "text.plainColor"}
                        >
                          {graphQlRequestRule.operationName}
                        </Typography>
                      </Description.RowValue>
                      <Description.RowActions>
                        <CopyButton disabled={disabled} value={graphQlRequestRule.operationName} />
                      </Description.RowActions>
                    </Description.Row>
                    <Description.Row>
                      <Description.RowLabel>
                        <Typography
                          textColor={disabled ? "neutral.plainDisabledColor" : "text.plainColor"}
                        >
                          Endpoint
                        </Typography>
                      </Description.RowLabel>
                      <Description.RowValue>
                        <Link
                          disabled={disabled}
                          href={graphQlRequestRule.endpoint}
                          target="_blank"
                        >
                          {graphQlRequestRule.endpoint}
                        </Link>
                      </Description.RowValue>
                      <Description.RowActions>
                        <CopyButton disabled={disabled} value={graphQlRequestRule.endpoint} />
                      </Description.RowActions>
                    </Description.Row>
                  </Description.Root>
                </AccordionDetails>
              </Accordion>
            </AccordionGroup>
            <GraphQLRequestRuleScenariosList
              disabled={disabled}
              graphQLRequestTarget={graphQlRequestRule}
              scenarios={graphQlRequestRule.scenarios}
              activeScenarioId={graphQlRequestRule.activeScenarioId}
            />
          </TabPanel>
        </Tabs>
      </Box>
    </Stack>
  );
};

const TabPanel = styled(JoyTabPanel)`
  padding-top: 0;
  padding-left: 0;
  padding-right: 0;
  overflow: auto;
  background: ${({ theme }) => theme.palette.background.level1};
`;

const AccordionSummary = styled(JoyAccordionSummary)`
  background: ${({ theme }) => theme.palette.background.surface};
`;
