import { FC, useState } from "react";

import { Add } from "@mui/icons-material";
import { Box, Button, Input, Stack, Switch, Typography } from "@mui/joy";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { CreateRuleModal } from "../../features/RuleCreationModal/CreateRuleCreationModal";
import { useGraphQLRules } from "../../hooks/useGraphQLRequestRules";
import { useWebsiteConfig } from "../../providers/WebsiteConfigProvider";
import { setFeatureEnabled } from "../../services/rules";
import { ConfirmModal } from "../../ui/ConfirmModal";
import { InlineAlert } from "../../ui/InlineAlert";
import { ToolbarItem } from "../../ui/ToolbarItem";

import { RulePanel } from "./RulePanel/RulePanel";
import { RulesList } from "./RulesList";

export const RulesListPage: FC = () => {
  const { graphQLRules, loading, error } = useGraphQLRules();
  // const [checked, setChecked] = useState(false);
  const websiteConfig = useWebsiteConfig();

  // const { loading: rulesEnabledLoading } = useStorageItem<WebsiteConfig[] | null | undefined>(
  //   "requestRules",
  //   {
  //     onComplete: async (storageWebsiteConfigs) => {
  //       const websiteConfigs = storageWebsiteConfigs ?? [];
  //       const currentTab = await getCurrentTab();
  //       if (!currentTab.url) return;
  //       const domainResult = getDomain(currentTab.url);
  //       if (!domainResult.ok) return;
  //       const domain = domainResult.value;

  //       const isEnabled = websiteConfigs.some(
  //         (websiteConfig) => websiteConfig.domain === domain && websiteConfig.enabled
  //       );

  //       if (isEnabled) {
  //         setHasUserBeenWarned(true);
  //       }

  //       setChecked(isEnabled);
  //     },
  //   }
  // );

  const [hasUserBeenWarned, setHasUserBeenWarned] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);
  const selectedRule = graphQLRules.find((rule) => rule.id === selectedRuleId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startsWith, setStartsWith] = useState("");

  const setGraphQLRulesEnabled = async (checked: boolean) => {
    // TODO maybe reuse it from provider
    setFeatureEnabled(checked);
  };

  const rulesEnabled = websiteConfig.enabled;

  return (
    <>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        riskLevel="medium"
        content={
          <>
            <InlineAlert
              type="info"
              message='The feature relies on substituting global "fetch" function. This may cause issues with other extensions or websites.'
            />

            <Typography level="body-md" display="inline">
              Are you sure you want to enable it?
            </Typography>
          </>
        }
        onCancel={() => setIsConfirmModalOpen(false)}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => {
          setHasUserBeenWarned(true);
          setIsConfirmModalOpen(false);
          setGraphQLRulesEnabled(true);
        }}
      />
      <ToolbarItem>
        <Switch
          checked={websiteConfig.enabled}
          onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
            const checked = event.target.checked;

            if (!hasUserBeenWarned && checked) {
              setIsConfirmModalOpen(true);
              return;
            }

            setGraphQLRulesEnabled(checked);
          }}
          color={rulesEnabled ? "success" : "neutral"}
          variant={rulesEnabled ? "solid" : "outlined"}
          endDecorator={rulesEnabled ? "On" : "Off"}
          slotProps={{
            endDecorator: {
              sx: {
                minWidth: 24,
              },
            },
          }}
        />
      </ToolbarItem>
      <Stack direction="column" sx={{ position: "relative", height: "100%" }}>
        <PanelGroup direction="horizontal">
          <Panel>
            <Stack
              height="100%"
              direction="column"
              justifyContent="space-between"
              sx={{ background: (theme) => theme.palette.background.surface }}
            >
              <Stack>
                <Stack
                  sx={{
                    gap: (theme) => theme.spacing(1),
                    padding: "0.25rem",
                    flexDirection: "row",
                    height: "min-content",
                    backgroundColor: (theme) => theme.palette.background.surface,
                    borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
                  }}
                >
                  <Input
                    value={startsWith}
                    disabled={!rulesEnabled}
                    onChange={(e) => {
                      setStartsWith(e.target.value);
                    }}
                    sx={{ width: "250px" }}
                    placeholder="Filter..."
                    size="sm"
                  />
                </Stack>
                <RulesList
                  rules={graphQLRules}
                  error={error}
                  loading={loading}
                  disabled={!rulesEnabled}
                  selectedRuleId={selectedRuleId}
                  onSelectRule={setSelectedRuleId}
                />
              </Stack>
              <Box
                sx={{
                  padding: "0.25rem",
                  borderTop: (theme) => `2px solid ${theme.palette.divider}`,
                }}
              >
                <Button
                  startDecorator={<Add />}
                  disabled={!rulesEnabled}
                  onClick={() => setIsModalOpen(true)}
                >
                  Create new rule
                </Button>
              </Box>
            </Stack>
          </Panel>
          {selectedRule && (
            <>
              <PanelResizeHandle disabled={!rulesEnabled} />
              <Panel>
                <RulePanel
                  disabled={!rulesEnabled}
                  rule={selectedRule}
                  onClose={() => setSelectedRuleId(null)}
                />
              </Panel>
            </>
          )}
        </PanelGroup>
      </Stack>
      {isModalOpen && (
        <CreateRuleModal
          isOpen={isModalOpen}
          onSubmit={() => setIsModalOpen(false)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
