import { join } from "path";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  build: {
    lib: {
      entry: "./index.ts",
      name: "injectedScript",
      formats: ["iife"],
      fileName: "injected-script",
    },
    outDir: join(__dirname, "dist"),
  },
});
