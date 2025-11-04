import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/apps/main",
  server: {
    port: 4200,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
  build: {
    outDir: "../../dist/apps/main",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/chunk-[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        manualChunks: (id) => {
          if (id.includes("node_modules")) return "vender";
          const match = id.match(/\/libs\/([^/]+)\//);
          if (match) return match[1];
        },
      },
    },
  },
  resolve: {},
}));
