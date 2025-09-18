import { FC, useState, useTransition } from "react";

import { Close } from "@mui/icons-material";
import {
  AccordionSummary as JoyAccordionSummary,
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
  Box,
} from "@mui/joy";

import { Rule } from "../../../../common/types/rule";
import { RuleIcon } from "../../../components/RuleIcon";
import { CopyButton } from "../../../ui/CopyButton";
import { Description } from "../../../ui/Description";

import { RuleScenariosList } from "./RuleScenariosList";

type RulePanelProps = {
  rule: Rule;
  disabled?: boolean;
  onClose?: () => void;
};

export const RulePanel: FC<RulePanelProps> = ({ rule, disabled = false, onClose }) => {
  const [index, setIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (index: number) => {
    startTransition(() => {
      setIndex(index);
    });
  };

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
          <RuleIcon disabled={disabled} operationName={rule.operationName} />
          <Typography
            level="title-sm"
            textColor={disabled ? "neutral.plainDisabledColor" : "neutral.plainColor"}
          >
            {rule.operationName}
          </Typography>
        </Stack>
        <IconButton disabled={disabled} size="sm" onClick={onClose} variant="plain">
          <Close />
        </IconButton>
      </Stack>

      {isPending && <>Something</>}
      <Tabs
        size="sm"
        value={index}
        onChange={(_, value) => handleTabChange(value as number)}
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
        <TabPanel value={0} sx={{ padding: "0", flex: "1 1 0" }}>
          <Stack height="100%">
            <Box>
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
                            {rule.operationName}
                          </Typography>
                        </Description.RowValue>
                        <Description.RowActions>
                          <CopyButton disabled={disabled} value={rule.operationName} />
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
                          <Link disabled={disabled} href={rule.endpoint} target="_blank">
                            {rule.endpoint}
                          </Link>
                        </Description.RowValue>
                        <Description.RowActions>
                          <CopyButton disabled={disabled} value={rule.endpoint} />
                        </Description.RowActions>
                      </Description.Row>
                    </Description.Root>
                  </AccordionDetails>
                </Accordion>
              </AccordionGroup>
            </Box>
            <RuleScenariosList
              disabled={disabled}
              graphQLRequestTarget={rule}
              scenarios={rule.scenarios}
              activeScenarioId={rule.activeScenarioId}
            />
          </Stack>
        </TabPanel>
      </Tabs>
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
