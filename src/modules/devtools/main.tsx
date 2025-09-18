import hljs from "highlight.js";
import graphql from "highlight.js/lib/languages/graphql";
import React from "react";

import { CssVarsProvider } from "@mui/joy";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AppliedRulesProvider } from "./providers/AppliedRulesProvider";
import { NetworkRequestsProvider } from "./providers/NetworkRequestsProvider";
import { ToastProvider } from "./providers/ToastProvider";
import { WebsiteConfigProvider } from "./providers/WebsiteConfigProvider";

import "./index.css";
import "highlight.js/styles/atom-one-dark.css";

hljs.registerLanguage("javascript", graphql);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssVarsProvider defaultMode="dark">
      <ToastProvider />
      <WebsiteConfigProvider>
        <NetworkRequestsProvider>
          <AppliedRulesProvider>
            <App />
          </AppliedRulesProvider>
        </NetworkRequestsProvider>
      </WebsiteConfigProvider>
    </CssVarsProvider>
  </React.StrictMode>
);
