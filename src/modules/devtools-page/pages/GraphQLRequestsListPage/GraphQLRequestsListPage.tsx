import { FC, useState } from "react";

import { Box } from "@mui/joy";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { useGraphQLRequests } from "../../providers/GraphQLRequestsProvider";

import { GraphQLRequestPanel } from "./GraphQLRequestPanel";
import { GraphQLRequestsListPanel } from "./GraphQLRequestsListPanel";

export const GraphQLRequestsListPage: FC = () => {
  const { graphQLRequests, clearRequests, setShouldPreserveLog, settings } = useGraphQLRequests();
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
            shouldPreserveLog={settings.shouldPreserveLog}
            onPreserveLogChange={setShouldPreserveLog}
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
