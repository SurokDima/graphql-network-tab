import { FC, useState } from "react";

import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Chip,
  IconButton,
  Link,
  Sheet,
  Tab,
  TabList,
  TabPanel,
  Table,
  Tabs,
  Typography,
} from "@mui/joy";

import { NetworkRequestStatus } from "../../../components/NetworkRequestStatus";
import { Scenario } from "../../../types/graphQL-request-rule";
import { Description } from "../../../ui/Description";

export type GraphQLRequestRuleScenariosTableProps = {
  scenarios: Scenario[];
  activeScenarioId: string | null;
  onActiveScenarioChange?: (scenarioId: string) => void;
  onDeleteScenario?: (scenarioId: string) => void;
  renderToolbarAction?: () => React.ReactNode;
};

export const GraphQLRequestRuleScenariosTable: FC<GraphQLRequestRuleScenariosTableProps> = ({
  scenarios,
  activeScenarioId,
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
          textColor="neutral.plainColor"
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
            <th style={{ width: "40%" }}>Name</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((scenario) => (
            <Row
              key={scenario.id}
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
};

const Row: FC<RowProps> = ({ scenario, isActive, onChange, defaultOpen = false }) => {
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
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDown /> : <KeyboardArrowDown />}
          </IconButton>
        </td>

        <th scope="row">{scenario.name}</th>
        <td>
          <NetworkRequestStatus statusCode={Number(scenario.response.statusCode)} />
        </td>
        <td>
          <Chip variant="plain" size="sm" color={isActive ? "success" : "neutral"}>
            <Checkbox
              size="sm"
              disableIcon
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
                <Tab>Request</Tab>
                <Tab>Response</Tab>
                <Tab>Body</Tab>
              </TabList>
              <TabPanel value={0} sx={{ background: (theme) => theme.palette.background.level1 }}>
                <Typography level="title-md">Headers</Typography>
                <Description
                  rows={mockHeaders.map((header) => ({
                    label: header.name,
                    value: header.value,
                  }))}
                />
              </TabPanel>
              <TabPanel value={1} sx={{ background: (theme) => theme.palette.background.level1 }}>
                <Typography level="title-md">Headers</Typography>
                <Description
                  rows={mockHeaders.map((header) => ({
                    label: header.name,
                    value: header.value,
                  }))}
                />
              </TabPanel>
              <TabPanel value={2} sx={{ background: (theme) => theme.palette.background.level1 }}>
                <Link level="body-sm">See body</Link>
              </TabPanel>
            </Tabs>
          )}
        </td>
      </tr>
    </>
  );
};

const mockHeaders = [
  {
    name: "Authorization",
    value: "Bearer fe0e8768-3b2f-4f63-983d-1a74c26dde1e",
  },
  {
    name: "access-control-allow-credentials",
    value: "true",
  },
  {
    name: "access-control-allow-origin",
    value: "https://www.google.com",
  },
  {
    name: "set-cookie",
    value:
      "SIDCC=fe0e8768-3b2f-4f63-983d-1a74c26dde1efe0e8768-3b2f-4f63-983d-1a74c26dde1e; expires=Thu, 14-Apr-2022 08:09:50 GMT; path=/; domain=.google.com; priority=high",
  },
];
