import { join } from "path";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  build: {
    lib: {
      entry: "./index.ts",
      name: "contentScript",
      formats: ["iife"],
      fileName: "content-script",
    },
    outDir: join(__dirname, "dist"),
  },
});
