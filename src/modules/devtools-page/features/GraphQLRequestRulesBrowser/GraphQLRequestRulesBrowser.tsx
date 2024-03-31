import { FC, useState } from "react";

import { Add } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/joy";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { useGraphQLRules } from "../../hooks/useGraphQLRequestRules";
import { GraphQLRequestRuleCreationModal } from "../GraphQLRequestRuleCreationModal/GraphQLRequestRuleCreationModal";

import { GraphQLRequestRulePanel } from "./GraphQLRequestRulePanel/GraphQLRequestRulePanel";
import { GraphQLRequestRulesList } from "./GraphQLRequestRulesList";

export const GraphQLRequestRulesBrowser: FC = () => {
  const { graphQLRules, loading, error } = useGraphQLRules();

  const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);
  const selectedRule = graphQLRules.find((rule) => rule.id === selectedRuleId);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Stack direction="column" sx={{ position: "relative", height: "100%" }}>
        <PanelGroup direction="horizontal">
          <Panel>
            <Stack
              height="100%"
              direction="column"
              justifyContent="space-between"
              sx={{ background: (theme) => theme.palette.background.surface }}
            >
              <GraphQLRequestRulesList
                rules={graphQLRules}
                error={error}
                loading={loading}
                selectedRuleId={selectedRuleId}
                onSelectRule={setSelectedRuleId}
              />
              <Box
                sx={{
                  padding: "0.25rem",
                  borderTop: (theme) => `2px solid ${theme.palette.divider}`,
                }}
              >
                <Button startDecorator={<Add />} onClick={() => setIsModalOpen(true)}>
                  Create new rule
                </Button>
              </Box>
            </Stack>
          </Panel>
          {selectedRule && (
            <>
              <PanelResizeHandle />
              <Panel>
                <GraphQLRequestRulePanel graphQlRequestRule={selectedRule} />
              </Panel>
            </>
          )}
        </PanelGroup>
      </Stack>
      {isModalOpen && (
        <GraphQLRequestRuleCreationModal
          isOpen={isModalOpen}
          onSubmit={() => setIsModalOpen(false)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
