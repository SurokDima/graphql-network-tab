import { FC, useState } from "react";

import { Add } from "@mui/icons-material";
import { Box, Button, Input, Stack, Switch } from "@mui/joy";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { GraphQLRequestRuleCreationModal } from "../../features/GraphQLRequestRuleCreationModal/GraphQLRequestRuleCreationModal";
import { useGraphQLRules } from "../../hooks/useGraphQLRequestRules";

import { GraphQLRequestRulePanel } from "./GraphQLRequestRulePanel/GraphQLRequestRulePanel";
import { GraphQLRequestRulesList } from "./GraphQLRequestRulesList";

export const GraphQLRequestRulesListPage: FC = () => {
  const { graphQLRules, loading, error } = useGraphQLRules();
  const [checked, setChecked] = useState(true);

  const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);
  const selectedRule = graphQLRules.find((rule) => rule.id === selectedRuleId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startsWith, setStartsWith] = useState("");

  return (
    <>
      <Stack direction="column" sx={{ position: "relative", height: "100%" }}>
        <Stack
          sx={{
            gap: (theme) => theme.spacing(1),
            padding: "0.25rem",
            flexDirection: "row",
            backgroundColor: (theme) => theme.palette.background.surface,
            borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
          }}
        >
          <Input
            value={startsWith}
            onChange={(e) => {
              setStartsWith(e.target.value);
            }}
            sx={{ width: "250px" }}
            placeholder="Filter..."
            size="sm"
          />
          <Switch
            checked={checked}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setChecked(event.target.checked)
            }
            color={checked ? "success" : "neutral"}
            variant={checked ? "solid" : "outlined"}
            endDecorator={checked ? "On" : "Off"}
            slotProps={{
              endDecorator: {
                sx: {
                  minWidth: 24,
                },
              },
            }}
          />
        </Stack>
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
                disabled={!checked}
                selectedRuleId={selectedRuleId}
                onSelectRule={setSelectedRuleId}
              />
              <Box
                sx={{
                  padding: "0.25rem",
                  borderTop: (theme) => `2px solid ${theme.palette.divider}`,
                }}
              >
                <Button
                  startDecorator={<Add />}
                  disabled={!checked}
                  onClick={() => setIsModalOpen(true)}
                >
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
