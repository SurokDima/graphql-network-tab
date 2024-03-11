import hljs from "highlight.js";
import graphql from "highlight.js/lib/languages/graphql";
import React from "react";

import { CssVarsProvider } from "@mui/joy";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { ToastProvider } from "./providers/ToastProvider.tsx";

import "./index.scss";
import "highlight.js/styles/atom-one-dark.css";

hljs.registerLanguage("javascript", graphql);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssVarsProvider defaultMode="dark">
      <ToastProvider />
      <App />
    </CssVarsProvider>
  </React.StrictMode>
);
