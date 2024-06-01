import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Close, Folder, FolderOff, Fullscreen, FullscreenExit } from "@mui/icons-material";
import { Box, Modal, ModalDialog, Stack } from "@mui/joy";

import { noop } from "../../common/utils/function.utils";

import { CodeEditor, Editor } from "./CodeEditor";
import { ToolbarItem, ToolbarItemProps } from "./Toolbar";

export type CodeViewProps = {
  code: string;
  language: "json" | "graphql" | "text";
  height?: string;
};

export const CodeView: FC<CodeViewProps> = ({ code, language, height = "100%" }) => {
  const editorRef = useRef<Editor | null>(null);
  const { registerEditor, registerCode, registerLanguage } = useCodeView();

  useEffect(() => {
    registerCode(code);
    registerLanguage(language);
  }, [code, language, registerCode, registerLanguage]);

  const handleMount = (editor: Editor) => {
    registerEditor(editor);
    editorRef.current = editor;
  };

  return <CodeViewInternal onMount={handleMount} language={language} height={height} code={code} />;
};

type CodeViewInternalProps = {
  code: string;
  language: "json" | "graphql" | "text";
  height: string;
  onMount?: (editor: Editor) => void;
};

const CodeViewInternal: FC<CodeViewInternalProps> = ({
  code,
  language,
  height = "100%",
  onMount,
}) => {
  const editorRef = useRef<Editor | null>(null);

  // We have to use state to trigger prettify action
  // because we can't call "format" action when editor is readonly
  // But we want to be it that way to prevent the user from editing the code
  const [shouldPrettify, setShouldPrettify] = useState(false);

  const handleMount = async (editor: Editor) => {
    editorRef.current = editor;
    setShouldPrettify(true);
    onMount?.(editor);
  };

  useEffect(() => {
    if (shouldPrettify && editorRef.current) {
      editorRef.current
        .getAction?.("editor.action.formatDocument")
        ?.run()
        ?.then(() => setShouldPrettify(false));
    }
  }, [shouldPrettify]);

  useEffect(() => {
    if (editorRef.current) {
      setShouldPrettify(true);
    }
  }, [code, language]);

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Show box that covers the editor to prevent the user from editing the code while it's being formatted */}
      {shouldPrettify && (
        <Box sx={{ position: "absolute", zIndex: 20, height: "100%", width: "100%" }} />
      )}
      <CodeEditor
        language={language}
        height={height}
        width="100%"
        value={code}
        onMount={handleMount}
        options={{
          readOnly: !shouldPrettify,
          domReadOnly: !shouldPrettify,
          minimap: { enabled: false },
          lineNumbers: "off",
          tabFocusMode: false,
          contextmenu: false,
          dropIntoEditor: {
            enabled: false,
          },
          multiCursorLimit: 1,
        }}
      />
    </Box>
  );
};

type CodeViewContextValue = {
  foldAll: () => void;
  unfoldAll: () => void;
  fullscreen: () => void;
  exitFullscreen: () => void;
  isFullscreen: boolean;
  editor: Editor | null;
  code: string | null;
  language: "json" | "graphql" | "text" | null;
  registerEditor: (editor: Editor) => void;
  registerCode: (code: string) => void;
  registerLanguage: (language: "json" | "graphql" | "text") => void;
};

const CodeViewContext = createContext<CodeViewContextValue | null>({
  foldAll: noop,
  unfoldAll: noop,
  fullscreen: noop,
  exitFullscreen: noop,
  isFullscreen: false,
  editor: null,
  code: null,
  language: null,
  registerCode: noop,
  registerLanguage: noop,
  registerEditor: noop,
});

const useCodeView = () => {
  const context = useContext(CodeViewContext);

  if (!context) {
    throw new Error("The component must be wrapped in <CodeViewContainer >");
  }

  return context;
};

export type CodeViewContainerProps = {
  children: ReactNode;
};

export const CodeViewContainer: FC<CodeViewContainerProps> = ({ children }) => {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [language, setLanguage] = useState<"json" | "graphql" | "text" | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  const handleExitFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  const handleFoldAll = useCallback(() => {
    editor?.getAction?.("editor.foldAll")?.run();
  }, [editor]);

  const handleUnfoldAll = useCallback(() => {
    editor?.getAction?.("editor.unfoldAll")?.run();
  }, [editor]);

  const contextValue = useMemo(
    () => ({
      foldAll: handleFoldAll,
      unfoldAll: handleUnfoldAll,
      fullscreen: handleFullscreen,
      exitFullscreen: handleExitFullscreen,
      editor,
      code,
      language,
      isFullscreen,
      registerCode: setCode,
      registerLanguage: setLanguage,
      registerEditor: setEditor,
    }),
    [
      handleFoldAll,
      handleUnfoldAll,
      handleFullscreen,
      handleExitFullscreen,
      editor,
      code,
      language,
      isFullscreen,
    ]
  );

  return (
    <CodeViewContext.Provider value={contextValue}>
      <Stack height="100%">{children}</Stack>
    </CodeViewContext.Provider>
  );
};

export const CodeViewUnfoldToolbarItem: FC<Omit<ToolbarItemProps, "tooltipTitle">> = (props) => {
  const { unfoldAll } = useCodeView();

  return (
    <ToolbarItem size="md" tooltipTitle="Unfold all" onClick={unfoldAll} {...props}>
      <FolderOff />
    </ToolbarItem>
  );
};

export const CodeViewFoldToolbarItem: FC<Omit<ToolbarItemProps, "tooltipTitle">> = (props) => {
  const { foldAll } = useCodeView();

  return (
    <ToolbarItem size="md" tooltipTitle="Fold all" onClick={foldAll} {...props}>
      <Folder />
    </ToolbarItem>
  );
};

export const CodeViewFullscreenToolbarItem: FC<Omit<ToolbarItemProps, "tooltipTitle">> = (
  props
) => {
  const { fullscreen } = useCodeView();

  return (
    <ToolbarItem size="md" tooltipTitle="Open in fullscreen" onClick={fullscreen} {...props}>
      <Fullscreen />
    </ToolbarItem>
  );
};

export const CodeViewExitFullscreenToolbarItem: FC<Omit<ToolbarItemProps, "tooltipTitle">> = (
  props
) => {
  const { exitFullscreen } = useCodeView();

  return (
    <ToolbarItem
      size="md"
      tooltipTitle="Exit fullscreen"
      color="primary"
      onClick={exitFullscreen}
      {...props}
    >
      <FullscreenExit />
    </ToolbarItem>
  );
};

export const CodeViewCloseToolbarItem: FC<Omit<ToolbarItemProps, "tooltipTitle">> = (props) => {
  const { exitFullscreen } = useCodeView();

  return (
    <ToolbarItem size="md" tooltipTitle="Close" onClick={exitFullscreen} {...props}>
      <Close />
    </ToolbarItem>
  );
};

export type FullscreenCodeView = {
  children?: ReactNode;
};

export const FullscreenCodeView: FC<FullscreenCodeView> = ({ children }) => {
  const { code, language, isFullscreen } = useCodeView();

  return code && language ? (
    <Modal open={isFullscreen}>
      <ModalDialog layout="fullscreen" sx={{ pb: 0, px: 0, pt: 0 }}>
        <Stack height="100%">
          {children}

          <CodeViewInternal height="100%" code={code} language={language} />
        </Stack>
      </ModalDialog>
    </Modal>
  ) : null;
};
