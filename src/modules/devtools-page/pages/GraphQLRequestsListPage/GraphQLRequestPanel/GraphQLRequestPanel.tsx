import { FC, useState } from "react";

import { Close, Splitscreen } from "@mui/icons-material";
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
import {
  CodeView,
  CodeViewContainer,
  CodeViewFoldToolbarItem,
  CodeViewUnfoldToolbarItem,
} from "../../../ui/CodeView";
import { Toolbar, ToolbarItem, ToolbarItemsGroup } from "../../../ui/Toolbar";

import { CreateMockRuleButton } from "./CreateMockRuleButton";
import { GraphQLRequestVariablesView } from "./GraphQLRequestVariablesView";
import { GraphQLRequestView } from "./GraphQLRequestView";
import { NetworkRequestHeaders } from "./NetworkReqestHeaders";
import { ResponseView } from "./ResponseView";
import { SplitScreen, SplitScreenModal } from "./SplitCodeViewModal";

export type GraphQLRequestPanelProps = {
  graphQLRequest: GraphQLRequest;
  onClose?: () => void;
};

export const GraphQLRequestPanel: FC<GraphQLRequestPanelProps> = ({ graphQLRequest, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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
              <IconButton size="sm" onClick={() => setIsModalOpen(true)} variant="plain">
                <Splitscreen />
              </IconButton>
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
            <Tab>Variables</Tab>
            <Tab>Response</Tab>
          </TabList>
          <TabPanel value={0}>
            <NetworkRequestHeaders networkRequest={graphQLRequest.networkRequest} />
          </TabPanel>
          <TabPanel value={1}>
            <GraphQLRequestView request={graphQLRequest} />
          </TabPanel>
          <TabPanel value={2}>
            <GraphQLRequestVariablesView request={graphQLRequest} />
          </TabPanel>
          <TabPanel value={3}>
            <ResponseView response={graphQLRequest.networkRequest.response.body} />
          </TabPanel>
        </Tabs>
      </Stack>
      <SplitScreenModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SplitScreen>
          <CodeViewContainer>
            <Toolbar>
              <CodeViewFoldToolbarItem />
              <CodeViewUnfoldToolbarItem />
            </Toolbar>
            <CodeView code={graphQLRequest.rawGraphQL} language="graphql" />
          </CodeViewContainer>
        </SplitScreen>
        <SplitScreen>
          <CodeViewContainer>
            <Toolbar justify="space-between">
              <ToolbarItemsGroup>
                <CodeViewFoldToolbarItem />
                <CodeViewUnfoldToolbarItem />
              </ToolbarItemsGroup>
              <ToolbarItemsGroup>
                <ToolbarItem size="md" tooltipTitle="Close" onClick={() => setIsModalOpen(false)}>
                  <Close />
                </ToolbarItem>
              </ToolbarItemsGroup>
            </Toolbar>
            <CodeView code={graphQLRequest.networkRequest.response.body} language="json" />
          </CodeViewContainer>
        </SplitScreen>
      </SplitScreenModal>
    </>
  );
};

const TabPanel = styled(JoyTabPanel)`
  padding-top: 0;
  padding-left: 0;
  flex: 1 1 0;
  padding-right: 0;
  overflow: auto;
  background: ${({ theme }) => theme.palette.background.level1};
`;
