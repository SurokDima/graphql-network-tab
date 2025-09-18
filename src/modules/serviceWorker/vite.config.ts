import { join } from "path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  root: __dirname,
  plugins: [react()],
  build: {
    lib: {
      entry: "./index.ts",
      name: "serviceWorker",
      formats: ["iife"],
      fileName: "service-worker",
    },
    outDir: join(__dirname, "dist"),
  },
});
