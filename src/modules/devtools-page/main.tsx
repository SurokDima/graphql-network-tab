import hljs from "highlight.js";
import graphql from "highlight.js/lib/languages/graphql";
import React from "react";

import { CssVarsProvider } from "@mui/joy";
import ReactDOM from "react-dom/client";

import App from "./App";
import { GraphQLRequestsProvider } from "./providers/GraphQLRequestsProvider";
import { NetworkRequestsProvider } from "./providers/NetworkRequestsProvider";
import { ToastProvider } from "./providers/ToastProvider";

import "./index.scss";
import "highlight.js/styles/atom-one-dark.css";

hljs.registerLanguage("javascript", graphql);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssVarsProvider defaultMode="dark">
      <NetworkRequestsProvider>
        <GraphQLRequestsProvider>
          <ToastProvider />
          <App />
        </GraphQLRequestsProvider>
      </NetworkRequestsProvider>
    </CssVarsProvider>
  </React.StrictMode>
);
