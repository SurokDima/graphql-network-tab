import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "./src/service-worker/index.ts",
      name: "serviceWorker",
      formats: ["iife"],
      fileName: "service-worker",
    },
    outDir: "dist/service-worker",
  },
});
