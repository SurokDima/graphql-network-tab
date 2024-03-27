import { FC, useState } from "react";

import { Box } from "@mui/joy";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { useGraphQLRequests } from "../../hooks/useGraphQLRequests";

import { GraphQLRequestPanel } from "./GraphQLRequestPanel";
import { GraphQLRequestsListPanel } from "./GraphQLRequestsListPanel";

export const GraphQLRequestsBrowser: FC = () => {
  const { graphQLRequests, clearRequests } = useGraphQLRequests();
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const handleSelectRequest = (requestId: string) => {
    if (selectedRequestId === requestId) {
      setSelectedRequestId(null);
      return;
    }

    setSelectedRequestId(requestId);
  };

  const selectedRequest = graphQLRequests.find((request) => request.id === selectedRequestId);

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <PanelGroup direction="horizontal">
        <Panel>
          <GraphQLRequestsListPanel
            type={selectedRequest ? "short" : "long"}
            graphQLRequests={graphQLRequests}
            onSelectRequest={handleSelectRequest}
            selectedRequestId={selectedRequestId}
            onClearRequests={clearRequests}
          />
        </Panel>
        {selectedRequest && (
          <>
            <PanelResizeHandle />
            <Panel>
              <GraphQLRequestPanel
                graphQLRequest={selectedRequest!}
                onClose={() => setSelectedRequestId(null)}
              />
            </Panel>
          </>
        )}
      </PanelGroup>
    </Box>
  );
};
