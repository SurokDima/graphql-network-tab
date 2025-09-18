import { FC, useRef, useState } from "react";

import { Close, DataObject, Fullscreen, FullscreenExit } from "@mui/icons-material";
import { Box, Modal, ModalDialog, Stack } from "@mui/joy";

import { CodeEditor, Editor } from "../CodeEditor";
import { Toolbar, ToolbarItem, ToolbarItemsGroup } from "../Toolbar";

export type CodeEditorInputProps = {
  value: string;
  onChange: (value: string) => void;
  height: string | number;
  language: "json" | "graphql";
};

export const CodeEditorInput: FC<CodeEditorInputProps> = ({
  value,
  language,
  height,
  onChange,
}) => {
  const editorRef = useRef<Editor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMount = (editor: Editor) => {
    editorRef.current = editor;
  };

  const handlePrettify = () => {
    editorRef.current?.getAction("editor.action.formatDocument")?.run();
  };

  const handleFullscreen = () => {
    setIsModalOpen(true);
  };

  const handleExitFullscreen = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          "& .monaco-editor, & .overflow-guard": {
            borderRadius: (theme) => theme.radius.sm,
          },
          borderRadius: (theme) => theme.radius.sm,
          border: (theme) => `1px solid ${theme.palette.neutral[700]}`,
        }}
      >
        <Toolbar>
          <ToolbarItemsGroup>
            <ToolbarItem tooltipTitle="Open in fullscreen" onClick={handleFullscreen}>
              <Fullscreen />
            </ToolbarItem>
            <ToolbarItem tooltipTitle="Prettify" onClick={handlePrettify}>
              <DataObject />
            </ToolbarItem>
          </ToolbarItemsGroup>
        </Toolbar>
        <CodeEditorInputInternal
          onMount={handleMount}
          language={language}
          height={height}
          onChange={(value) => onChange(value ?? "")}
          value={value}
        />
      </Box>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalDialog layout="fullscreen" sx={{ pb: 0, px: 0, pt: 0 }}>
          {/* <ModalClose /> */}
          <Stack height="100%">
            <Toolbar justify="space-between">
              <ToolbarItemsGroup>
                <ToolbarItem
                  size="md"
                  color="primary"
                  tooltipTitle="Exit fullscreen"
                  onClick={handleExitFullscreen}
                >
                  <FullscreenExit />
                </ToolbarItem>
                <ToolbarItem size="md" tooltipTitle="Prettify" onClick={handlePrettify}>
                  <DataObject />
                </ToolbarItem>
              </ToolbarItemsGroup>
              <ToolbarItemsGroup>
                <ToolbarItem
                  position="end"
                  size="md"
                  tooltipTitle="Exit"
                  onClick={handleExitFullscreen}
                >
                  <Close />
                </ToolbarItem>
              </ToolbarItemsGroup>
            </Toolbar>
            <CodeEditorInputInternal
              height="100%"
              value={value}
              language={language}
              onChange={onChange}
            />
          </Stack>
        </ModalDialog>
      </Modal>
    </>
  );
};

type CodeEditorInputInternalProps = {
  value: string;
  language: "json" | "graphql";
  onChange: (value: string) => void;
  height: string | number;
  onMount?: (editor: Editor) => void;
};

const CodeEditorInputInternal: FC<CodeEditorInputInternalProps> = ({
  onMount,
  language,
  height,
  value,
  onChange,
}) => {
  return (
    <CodeEditor
      onMount={onMount}
      language={language}
      height={height}
      onChange={(value) => onChange(value ?? "")}
      value={value}
      options={{
        minimap: { enabled: false },
        contextmenu: false,
        dropIntoEditor: {
          enabled: false,
        },
        showFoldingControls: "never",
        multiCursorLimit: 1,
      }}
    />
  );
};
