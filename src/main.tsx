import React from "react";

import { CssVarsProvider } from "@mui/joy";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssVarsProvider defaultMode="dark">
      <App />
    </CssVarsProvider>
  </React.StrictMode>
);
