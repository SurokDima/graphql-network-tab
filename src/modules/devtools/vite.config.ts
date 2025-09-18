import { join } from "path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [react()],
  build: {
    outDir: join(__dirname, "dist"),
    rollupOptions: {
      input: {
        // Make vite bundle these pages
        devtools: join(__dirname, "devtools_page.html"),
        index: join(__dirname, "index.html"),
      },
      output: {
        assetFileNames: "assets/[ext]/[name][extname]",
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name]-chunk.js",
      },
    },
  },
});
