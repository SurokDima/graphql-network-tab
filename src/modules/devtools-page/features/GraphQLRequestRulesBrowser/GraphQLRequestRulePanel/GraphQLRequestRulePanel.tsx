import { FC } from "react";

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
} from "@mui/joy";

import { GraphQLRequestRule } from "../../../../common/types/graphQL-request-rule";
import { Description } from "../../../ui/Description";

import { GraphQLRequestRuleScenariosList } from "./GraphQLRequestRuleScenariosList";

type GraphQLRequestRulePanelProps = {
  graphQlRequestRule: GraphQLRequestRule;
};

export const GraphQLRequestRulePanel: FC<GraphQLRequestRulePanelProps> = ({
  graphQlRequestRule,
}) => {
  return (
    <Box
      sx={{
        height: "100%",
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
          <Tab>Rule info</Tab>
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
            <Accordion defaultExpanded>
              <AccordionSummary>General</AccordionSummary>
              <AccordionDetails variant="soft">
                <Description
                  rows={[
                    {
                      label: "Operation name",
                      value: graphQlRequestRule.operationName,
                    },
                    {
                      label: "Endpoint",
                      value: (
                        <Link href={graphQlRequestRule.endpoint} target="_blank">
                          {graphQlRequestRule.endpoint}
                        </Link>
                      ),
                    },
                  ]}
                />
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
          <GraphQLRequestRuleScenariosList
            graphQLRequestTarget={graphQlRequestRule}
            scenarios={graphQlRequestRule.scenarios}
            activeScenarioId={graphQlRequestRule.activeScenarioId}
          />
        </TabPanel>
      </Tabs>
    </Box>
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
