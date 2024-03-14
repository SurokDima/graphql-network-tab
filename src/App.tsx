import { useState } from "react";

import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { Stack, CssBaseline, Input, IconButton, Box } from "@mui/joy";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { GraphQLRequestPanel } from "./components/GraphQLRequestPanel";
import { GraphQLRequestsList } from "./components/GraphQLRequestsList";
import { useGraphQLRequests } from "./hooks/useGraphQLRequests";
import { useSet } from "./hooks/useSet";
import { GraphQLOperationType } from "./types/graphql-request";
import { TagsList } from "./ui/TagsList";

// TODO Fix list horizontal overflow
// TODO Change Table header height
// TODO Add adaptivity for a tabs list
function App() {
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const { graphQLRequests, clearRequests } = useGraphQLRequests();

  const handleSelectRequest = (requestId: string) => {
    if (selectedRequestId === requestId) {
      setSelectedRequestId(null);
      return;
    }

    setSelectedRequestId(requestId);
  };

  const selectedRequest = graphQLRequests.find((request) => request.id === selectedRequestId);
  const [filter, setFilter] = useState("");

  const [enabledOperationTypes, { has: isOperationTypeEnabled, toggle: toggleOperationType }] =
    useSet<GraphQLOperationType>(["query", "mutation"]);

  return (
    <Stack direction="column" sx={{ height: "100%", position: "relative" }}>
      <Stack
        sx={{
          flexDirection: "row",
          gap: 2,
          padding: 1,
          backgroundColor: (theme) => theme.palette.background.surface,
          borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
        }}
      >
        <IconButton variant="plain" size="sm" onClick={clearRequests}>
          <NotInterestedIcon />
        </IconButton>
        <Input
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          sx={{ width: "250px" }}
          placeholder="Filter..."
          size="sm"
        />
      </Stack>
      <CssBaseline />
      <PanelGroup direction="horizontal">
        <Panel>
          <Stack
            sx={{
              background: (theme) => theme.palette.background.surface,
              height: "100%",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <GraphQLRequestsList
              type={selectedRequest ? "short" : "long"}
              selectedRequestId={selectedRequestId}
              onSelectRequest={handleSelectRequest}
              graphQLRequests={graphQLRequests}
              startsWith={filter}
              operationTypes={enabledOperationTypes}
            />
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.background.surface,
                borderTop: (theme) => `2px solid ${theme.palette.divider}`,
              }}
            >
              <TagsList
                tags={[
                  {
                    label: "Query",
                    value: "query",
                    color: "success",
                    isSelected: isOperationTypeEnabled("query"),
                  },
                  {
                    label: "Mutation",
                    value: "mutation",
                    color: "danger",
                    isSelected: isOperationTypeEnabled("mutation"),
                  },
                ]}
                onTagChange={(tag) => toggleOperationType(tag as GraphQLOperationType)}
              />
            </Box>
          </Stack>
        </Panel>
        {selectedRequest && (
          <>
            <PanelResizeHandle />
            <Panel>
              <GraphQLRequestPanel
                request={selectedRequest!}
                onClose={() => setSelectedRequestId(null)}
              />
            </Panel>
          </>
        )}
      </PanelGroup>
    </Stack>
  );
}

export default App;
