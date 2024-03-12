import { FC } from "react";

import { Close } from "@mui/icons-material";
import { IconButton, Tab, TabList, TabPanel as JoyTabPanel, Tabs, styled, Box } from "@mui/joy";

import { GraphQLRequest } from "../types/graphql-request.ts";
import { JsonView } from "../ui/JsonView.tsx";

import { GraphQLRequestView } from "./GraphQLRequestView.tsx";
import { NetworkRequestHeaders } from "./NetworkReqestHeaders.tsx";
import { RawResponseView } from "./RawResponseView.tsx";

type GraphQLRequestPanelProps = {
  request: GraphQLRequest;
  onClose?: () => void;
};

export const GraphQLRequestPanel: FC<GraphQLRequestPanelProps> = ({ request, onClose }) => {
  return (
    <Tabs sx={{ height: "100%" }}>
      {/* TODO: Add adaptivity for a tabs list*/}
      <TabList>
        <IconButton
          sx={{
            borderRadius: "0",
          }}
          onClick={onClose}
          variant="plain"
        >
          <Close />
        </IconButton>
        <Tab>Headers</Tab>
        <Tab>Request</Tab>
        <Tab>Response</Tab>
        <Tab>Response (Raw)</Tab>
      </TabList>
      <TabPanel value={0}>
        <NetworkRequestHeaders networkRequest={request.networkRequest} />
      </TabPanel>
      <TabPanel value={1}>
        <GraphQLRequestView request={request} />
      </TabPanel>
      <TabPanel value={2}>
        <Box sx={{ padding: "0.75rem" }}>
          <JsonView json={JSON.parse(request.networkRequest.response.body)} />
        </Box>
      </TabPanel>
      <TabPanel value={3}>
        <Box sx={{ padding: "0.75rem" }}>
          <RawResponseView response={request.networkRequest.response.body} />
        </Box>
      </TabPanel>
    </Tabs>
  );
};

const TabPanel = styled(JoyTabPanel)`
  padding-top: 0;
  padding-left: 0;
  padding-right: 0;
  overflow: auto;
`;
