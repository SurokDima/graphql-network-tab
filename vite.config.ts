import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // Make vite bundle these pages
        devtools: "devtools_page.html",
        index: "index.html",
        mockRequestsAPIScript: "./src/content-scripts/mock-fetch-request.ts",
        contentScript: "./src/content-scripts/index.ts",
      },
      output: {
        assetFileNames: "assets/[ext]/[name][extname]",
        entryFileNames: "assets/[name].js",
      },
    },
  },
});
