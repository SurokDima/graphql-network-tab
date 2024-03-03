import { useState } from "react";

import { Stack, CssBaseline } from "@mui/joy";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { GraphQLRequestPanel } from "./components/GraphQLRequestPanel.tsx";
import { GraphQLRequestsList } from "./components/GraphQLRequestsList.tsx";
import { mockedGraphQLRequests } from "./mock/mockedGraphQLRequests.ts";

function App() {
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const handleSelectRequest = (requestId: string) => {
    if (selectedRequestId === requestId) {
      setSelectedRequestId(null);
      return;
    }

    setSelectedRequestId(requestId);
  };

  const selectedRequest = mockedGraphQLRequests.find((request) => request.id === selectedRequestId);

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
              requests={[...mockedGraphQLRequests]}
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
          requests={[...mockedGraphQLRequests]}
        />
      )}
    </Stack>
  );
}

export default App;
