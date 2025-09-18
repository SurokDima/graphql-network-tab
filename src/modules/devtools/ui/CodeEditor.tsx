/* eslint-disable import/default */

import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { FC } from "react";

import { Editor, EditorProps, loader } from "@monaco-editor/react";
import { atom, useAtom } from "jotai";
import { format } from "prettier";
import jsonParser from "prettier/plugins/babel";
import estreeParser from "prettier/plugins/estree";
import graphQLParser from "prettier/plugins/graphql";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

export type Monaco = typeof monaco;
export type Editor = monaco.editor.IStandaloneCodeEditor;

loader.config({ monaco });

const setEditorFormatters = (monaco: Monaco) => {
  monaco.languages.registerDocumentFormattingEditProvider("json", {
    async provideDocumentFormattingEdits(model) {
      const formattedCode = await format(model.getValue(), {
        parser: "json",
        useTabs: false,
        tabWidth: 2,
        plugins: [jsonParser, estreeParser],
      });

      return [
        {
          range: model.getFullModelRange(),
          text: formattedCode,
        },
      ];
    },
  });

  monaco.languages.registerDocumentFormattingEditProvider("graphql", {
    async provideDocumentFormattingEdits(model) {
      const formattedCode = await format(model.getValue(), {
        parser: "graphql",
        useTabs: false,
        tabWidth: 2,
        plugins: [graphQLParser, estreeParser],
      });

      return [
        {
          range: model.getFullModelRange(),
          text: formattedCode,
        },
      ];
    },
  });
};

const setEditorTheme = (monaco: Monaco) => {
  monaco?.editor?.defineTheme("custom-theme", {
    base: "vs-dark",
    colors: {
      "activityBar.background": "#333842",
      "activityBar.foreground": "#D7DAE0",
      "editorInlayHint.background": "#2C313A",
      "editorInlayHint.foreground": "#636e83",
      "notebook.cellEditorBackground": "#2C313A",
      "activityBarBadge.background": "#528BFF",
      "activityBarBadge.foreground": "#D7DAE0",
      "button.background": "#4D78CC",
      "button.foreground": "#FFFFFF",
      "button.hoverBackground": "#6087CF",
      "diffEditor.insertedTextBackground": "#00809B33",
      "dropdown.background": "#353b45",
      "dropdown.border": "#181A1F",
      "editorIndentGuide.activeBackground": "#626772",
      "editor.background": "#171A1C",
      "editor.foreground": "#ABB2BF",
      "editor.lineHighlightBackground": "#99BBFF0A",
      "editor.selectionBackground": "#3E4451",
      "editorCursor.foreground": "#528BFF",
      "editor.findMatchHighlightBackground": "#528BFF3D",
      "editorGroup.background": "#21252B",
      "editorGroup.border": "#181A1F",
      "editorGroupHeader.tabsBackground": "#21252B",
      "editorIndentGuide.background": "#ABB2BF26",
      "editorLineNumber.foreground": "#636D83",
      "editorLineNumber.activeForeground": "#ABB2BF",
      "editorWhitespace.foreground": "#ABB2BF26",
      "editorRuler.foreground": "#ABB2BF26",
      "editorHoverWidget.background": "#21252B",
      "editorHoverWidget.border": "#181A1F",
      "editorSuggestWidget.background": "#21252B",
      "editorSuggestWidget.border": "#181A1F",
      "editorSuggestWidget.selectedBackground": "#2C313A",
      "editorWidget.background": "#21252B",
      "editorWidget.border": "#3A3F4B",
      "input.background": "#1B1D23",
      "input.border": "#181A1F",
      focusBorder: "#528BFF",
      "list.activeSelectionBackground": "#2C313A",
      "list.activeSelectionForeground": "#D7DAE0",
      "list.focusBackground": "#2C313A",
      "list.hoverBackground": "#2C313A66",
      "list.highlightForeground": "#D7DAE0",
      "list.inactiveSelectionBackground": "#2C313A",
      "list.inactiveSelectionForeground": "#D7DAE0",
      "notification.background": "#21252B",
      "pickerGroup.border": "#528BFF",
      "scrollbarSlider.background": "#4E566680",
      "scrollbarSlider.activeBackground": "#747D9180",
      "scrollbarSlider.hoverBackground": "#5A637580",
      "sideBar.background": "#21252B",
      "sideBarSectionHeader.background": "#333842",
      "statusBar.background": "#21252B",
      "statusBar.foreground": "#9DA5B4",
      "statusBarItem.hoverBackground": "#2C313A",
      "statusBar.noFolderBackground": "#21252B",
      "tab.activeBackground": "#282C34",
      "tab.activeForeground": "#D7DAE0",
      "tab.border": "#181A1F",
      "tab.inactiveBackground": "#21252B",
      "titleBar.activeBackground": "#21252B",
      "titleBar.activeForeground": "#9DA5B4",
      "titleBar.inactiveBackground": "#21252B",
      "titleBar.inactiveForeground": "#9DA5B4",
      "statusBar.debuggingForeground": "#FFFFFF",
      "extensionButton.prominentBackground": "#2BA143",
      "extensionButton.prominentHoverBackground": "#37AF4E",
      "badge.background": "#528BFF",
      "badge.foreground": "#D7DAE0",
      "peekView.border": "#528BFF",
      "peekViewResult.background": "#21252B",
      "peekViewResult.selectionBackground": "#2C313A",
      "peekViewTitle.background": "#1B1D23",
      "peekViewEditor.background": "#1B1D23",
    },
    inherit: true,
    rules: [
      { token: "", foreground: "D4D4D4", background: "1E1E1E" },
      { token: "invalid", foreground: "f44747" },
      { token: "emphasis", fontStyle: "italic" },
      { token: "strong", fontStyle: "bold" },

      { token: "variable", foreground: "74B0DF" },
      { token: "variable.predefined", foreground: "4864AA" },
      { token: "variable.parameter", foreground: "9CDCFE" },
      { token: "constant", foreground: "569CD6" },
      { token: "comment", foreground: "608B4E" },
      { token: "number", foreground: "B5CEA8" },
      { token: "number.hex", foreground: "5BB498" },
      { token: "regexp", foreground: "B46695" },
      { token: "annotation", foreground: "cc6666" },
      { token: "type", foreground: "3DC9B0" },

      { token: "delimiter", foreground: "DCDCDC" },
      { token: "delimiter.html", foreground: "808080" },
      { token: "delimiter.xml", foreground: "808080" },

      { token: "tag", foreground: "569CD6" },
      { token: "tag.id.pug", foreground: "4F76AC" },
      { token: "tag.class.pug", foreground: "4F76AC" },
      { token: "meta.scss", foreground: "A79873" },
      { token: "meta.tag", foreground: "CE9178" },
      { token: "metatag", foreground: "DD6A6F" },
      { token: "metatag.content.html", foreground: "9CDCFE" },
      { token: "metatag.html", foreground: "569CD6" },
      { token: "metatag.xml", foreground: "569CD6" },
      { token: "metatag.php", fontStyle: "bold" },

      { token: "key", foreground: "9CDCFE" },
      { token: "string.key.json", foreground: "9CDCFE" },
      { token: "string.value.json", foreground: "CE9178" },

      { token: "attribute.name", foreground: "9CDCFE" },
      { token: "attribute.value", foreground: "CE9178" },
      { token: "attribute.value.number.css", foreground: "B5CEA8" },
      { token: "attribute.value.unit.css", foreground: "B5CEA8" },
      { token: "attribute.value.hex.css", foreground: "D4D4D4" },

      { token: "string", foreground: "CE9178" },
      { token: "string.sql", foreground: "FF0000" },

      { token: "keyword", foreground: "569CD6" },
      { token: "keyword.flow", foreground: "C586C0" },
      { token: "keyword.json", foreground: "CE9178" },
      { token: "keyword.flow.scss", foreground: "569CD6" },

      { token: "operator.scss", foreground: "909090" },
      { token: "operator.sql", foreground: "778899" },
      { token: "operator.swift", foreground: "909090" },
      { token: "predefined.sql", foreground: "FF00FF" },
    ],
  });
};

const isEditorConfiguredAtom = atom(false);

export const CodeEditor: FC<EditorProps> = ({ beforeMount, ...props }) => {
  const [isEditorConfigured, setIsEditorConfigured] = useAtom(isEditorConfiguredAtom);

  const handleBeforeMount = (monaco: Monaco) => {
    if (!isEditorConfigured) {
      setEditorTheme(monaco);
      setEditorFormatters(monaco);
      setIsEditorConfigured(true);
    }

    beforeMount?.(monaco);
  };

  return <Editor theme="custom-theme" beforeMount={handleBeforeMount} {...props} />;
};
