import { useState } from "react";

import { Stack, CssBaseline } from "@mui/joy";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { GraphQLRequestPanel } from "./components/GraphQLRequestPanel";
import { GraphQLRequestsList } from "./components/GraphQLRequestsList";
import { useGraphQLRequests } from "./hooks/useGraphQLRequests";

// TODO Fix list horizontal overflow
// TODO Change Table header height
// TODO Add adaptivity for a tabs list
function App() {
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const graphQLRequests = useGraphQLRequests();

  const handleSelectRequest = (requestId: string) => {
    if (selectedRequestId === requestId) {
      setSelectedRequestId(null);
      return;
    }

    setSelectedRequestId(requestId);
  };

  const selectedRequest = graphQLRequests.find((request) => request.id === selectedRequestId);

  return (
    <Stack direction="column" spacing={4} sx={{ height: "100%", position: "relative" }}>
      <CssBaseline />
      {selectedRequest ? (
        <PanelGroup direction="horizontal">
          <Panel>
            <GraphQLRequestsList
              type="short"
              selectedRequestId={selectedRequestId}
              onSelectRequest={handleSelectRequest}
              graphQLRequests={graphQLRequests}
            />
          </Panel>
          <PanelResizeHandle />
          <Panel>
            <GraphQLRequestPanel
              request={selectedRequest!}
              onClose={() => setSelectedRequestId(null)}
            />
          </Panel>
        </PanelGroup>
      ) : (
        <GraphQLRequestsList
          type="long"
          selectedRequestId={selectedRequestId}
          onSelectRequest={handleSelectRequest}
          graphQLRequests={graphQLRequests}
        />
      )}
    </Stack>
  );
}

export default App;
