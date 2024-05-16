import { FC } from "react";

import { Close } from "@mui/icons-material";
import {
  IconButton,
  Tab,
  TabList,
  TabPanel as JoyTabPanel,
  Tabs,
  styled,
  Box,
  Stack,
  Typography,
} from "@mui/joy";

import { GraphQLRequest } from "../../../../common/types/graphQL-request";
import { GraphQLRequestIcon } from "../../../components/GraphQLRequestIcon";
import { JsonView } from "../../../ui/JsonView";

import { CreateMockRuleButton } from "./CreateMockRuleButton";
import { GraphQLRequestView } from "./GraphQLRequestView";
import { NetworkRequestHeaders } from "./NetworkReqestHeaders";
import { RawResponseView } from "./RawResponseView";

export type GraphQLRequestPanelProps = {
  graphQLRequest: GraphQLRequest;
  onClose?: () => void;
};

export const GraphQLRequestPanel: FC<GraphQLRequestPanelProps> = ({ graphQLRequest, onClose }) => {
  return (
    <Stack height="100%">
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.surface,
          borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
          borderLeft: (theme) => `2px solid ${theme.palette.divider}`,
        }}
      >
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between", padding: "0.25rem" }}>
          <Stack sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}>
            <GraphQLRequestIcon operationType={graphQLRequest.operation.type} />
            <Typography level="title-sm">{graphQLRequest.operation.name}</Typography>
            <CreateMockRuleButton selectedRequest={graphQLRequest} />
          </Stack>
          <IconButton size="sm" onClick={onClose} variant="plain">
            <Close />
          </IconButton>
        </Stack>
      </Box>
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
          <Tab>Headers</Tab>
          <Tab>Request</Tab>
          <Tab>Response</Tab>
          <Tab>Response (Raw)</Tab>
        </TabList>
        <TabPanel value={0}>
          <NetworkRequestHeaders networkRequest={graphQLRequest.networkRequest} />
        </TabPanel>
        <TabPanel value={1}>
          <GraphQLRequestView request={graphQLRequest} />
        </TabPanel>
        <TabPanel value={2}>
          <Box sx={{ padding: "0.75rem" }}>
            <JsonView json={JSON.parse(graphQLRequest.networkRequest.response.body)} />
          </Box>
        </TabPanel>
        <TabPanel value={3}>
          <Box sx={{ padding: "0.75rem" }}>
            <RawResponseView response={graphQLRequest.networkRequest.response.body} />
          </Box>
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
