import { FC, useState } from "react";

import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Chip,
  IconButton,
  Sheet,
  Tab,
  TabList,
  TabPanel,
  Table,
  Tabs,
  Typography,
} from "@mui/joy";

import { Scenario } from "../../../../common/types/graphQL-request-rule";
import { NetworkRequestStatus } from "../../../components/NetworkRequestStatus";
import {
  CodeView,
  CodeViewCloseToolbarItem,
  CodeViewContainer,
  CodeViewExitFullscreenToolbarItem,
  CodeViewFoldToolbarItem,
  CodeViewFullscreenToolbarItem,
  CodeViewUnfoldToolbarItem,
  FullscreenCodeView,
} from "../../../ui/CodeView";
import { Toolbar, ToolbarItemsGroup } from "../../../ui/Toolbar";

export type GraphQLRequestRuleScenariosTableProps = {
  scenarios: Scenario[];
  activeScenarioId: string | null;
  onActiveScenarioChange?: (scenarioId: string) => void;
  onDeleteScenario?: (scenarioId: string) => void;
  renderToolbarAction?: () => React.ReactNode;
  disabled?: boolean;
};

export const GraphQLRequestRuleScenariosTable: FC<GraphQLRequestRuleScenariosTableProps> = ({
  scenarios,
  activeScenarioId,
  disabled = false,
  onActiveScenarioChange,
  renderToolbarAction,
}) => {
  return (
    <Sheet
      variant="outlined"
      sx={{
        width: "100%",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          py: 1,
          pl: { sm: 1 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          level="title-sm"
          textColor={disabled ? "neutral.plainDisabledColor" : "neutral.plainColor"}
          sx={{ flex: "1 1 100%" }}
          id="tableTitle"
          component="div"
        >
          Scenarios
        </Typography>

        {renderToolbarAction?.()}
      </Box>
      <Table
        size="sm"
        aria-label="collapsible table"
        sx={{
          '& > tbody > tr:nth-child(odd) > td, & > tbody > tr:nth-child(odd) > th[scope="row"]': {
            borderBottom: 0,
          },
        }}
      >
        <thead>
          <tr>
            <th style={{ width: 40 }} aria-label="empty" />
            <th style={{ width: "40%" }}>
              <Typography
                textColor={disabled ? "neutral.plainDisabledColor" : "neutral.plainColor"}
              >
                Name
              </Typography>
            </th>
            <th>
              <Typography
                textColor={disabled ? "neutral.plainDisabledColor" : "neutral.plainColor"}
              >
                Status
              </Typography>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((scenario) => (
            <Row
              key={scenario.id}
              disabled={disabled}
              scenario={scenario}
              isActive={scenario.id === activeScenarioId}
              onChange={() => onActiveScenarioChange?.(scenario.id)}
            />
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

type RowProps = {
  scenario: Scenario;
  isActive: boolean;
  onChange?: () => void;
  defaultOpen?: boolean;
  disabled?: boolean;
};

const Row: FC<RowProps> = ({
  scenario,
  isActive,
  onChange,
  defaultOpen = false,
  disabled = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <>
      <tr>
        <td>
          <IconButton
            aria-label="expand row"
            variant="plain"
            color="neutral"
            size="sm"
            disabled={disabled}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDown /> : <KeyboardArrowDown />}
          </IconButton>
        </td>

        <th scope="row">
          <Typography
            level="body-xs"
            textColor={disabled ? "neutral.plainDisabledColor" : "neutral.plainColor"}
          >
            {scenario.name}
          </Typography>
        </th>
        <td>
          <NetworkRequestStatus
            disabled={disabled}
            statusCode={Number(scenario.response.statusCode)}
          />
        </td>
        <td>
          <Chip
            variant="plain"
            size="sm"
            color={isActive ? "success" : "neutral"}
            disabled={disabled}
          >
            <Checkbox
              size="sm"
              disableIcon
              disabled={disabled}
              overlay
              color={isActive ? "success" : "neutral"}
              label={isActive ? "Active" : "Disabled"}
              checked={isActive}
              variant={isActive ? "soft" : "outlined"}
              onChange={onChange}
              slotProps={{
                action: ({ checked }) => ({
                  sx: checked
                    ? {
                        border: "1px solid",
                      }
                    : {},
                }),
              }}
            />
          </Chip>
        </td>
      </tr>
      <tr>
        <td style={{ height: 0, padding: 0 }} colSpan={4}>
          {open && (
            <Tabs size="sm" sx={{ background: (theme) => theme.palette.background.level1 }}>
              <TabList>
                {/* <Tab disabled={disabled}>Request</Tab>
                <Tab disabled={disabled}>Response</Tab> */}
                <Tab disabled={disabled}>Body</Tab>
              </TabList>
              {/* <TabPanel value={0} sx={{ background: (theme) => theme.palette.background.level1 }}>
                <Typography
                  level="title-md"
                  textColor={disabled ? "neutral.plainDisabledColor" : "neutral.plainColor"}
                >
                  Headers
                </Typography>
                <Description.Root>
                  {mockHeaders.map((header) => (
                    <Description.Row key={header.name}>
                      <Description.RowLabel>
                        <Typography
                          textColor={disabled ? "neutral.plainDisabledColor" : "neutral.plainColor"}
                        >
                          {header.name}
                        </Typography>
                      </Description.RowLabel>
                      <Description.RowValue>
                        <Typography
                          textColor={disabled ? "neutral.plainDisabledColor" : "neutral.plainColor"}
                        >
                          {header.value}
                        </Typography>
                      </Description.RowValue>
                      <Description.RowActions>
                        <CopyButton disabled={disabled} value={header.value} />
                      </Description.RowActions>
                    </Description.Row>
                  ))}
                </Description.Root>
              </TabPanel>
              <TabPanel value={1} sx={{ background: (theme) => theme.palette.background.level1 }}>
                <Typography level="title-md">Headers</Typography>
                <Description.Root>
                  {mockHeaders.map((header) => (
                    <Description.Row key={header.name}>
                      <Description.RowLabel>
                        <Typography
                          textColor={disabled ? "neutral.plainDisabledColor" : "neutral.plainColor"}
                        >
                          {header.name}
                        </Typography>
                      </Description.RowLabel>
                      <Description.RowValue>
                        <Typography
                          textColor={disabled ? "neutral.plainDisabledColor" : "neutral.plainColor"}
                        >
                          {header.value}
                        </Typography>
                      </Description.RowValue>
                      <Description.RowActions>
                        <CopyButton disabled={disabled} value={header.value} />
                      </Description.RowActions>
                    </Description.Row>
                  ))}
                </Description.Root>
              </TabPanel> */}
              <TabPanel
                value={0}
                sx={{ background: (theme) => theme.palette.background.level1, padding: 0 }}
              >
                <CodeViewContainer>
                  <Toolbar>
                    <CodeViewFullscreenToolbarItem size="sm" />
                    <CodeViewFoldToolbarItem size="sm" />
                    <CodeViewUnfoldToolbarItem size="sm" />
                  </Toolbar>
                  <CodeView code={scenario.response.body} height="200px" language="json" />
                  <FullscreenCodeView>
                    <Toolbar justify="space-between">
                      <ToolbarItemsGroup>
                        <CodeViewExitFullscreenToolbarItem size="md" />
                        <CodeViewFoldToolbarItem size="md" />
                        <CodeViewUnfoldToolbarItem size="md" />
                      </ToolbarItemsGroup>
                      <CodeViewCloseToolbarItem size="md" />
                    </Toolbar>
                  </FullscreenCodeView>
                </CodeViewContainer>
              </TabPanel>
            </Tabs>
          )}
        </td>
      </tr>
    </>
  );
};
