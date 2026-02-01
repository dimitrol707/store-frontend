import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const envDir = path.resolve(__dirname, "../..");
  const env = loadEnv(mode, envDir, "");
  const apiUrl = env.VITE_API_URL || "http://localhost:8080";

  return {
    root: __dirname,
    envDir,
    cacheDir: "../../node_modules/.vite/apps/main",
    server: {
      port: 4200,
      proxy: {
        "/api": {
          target: apiUrl,
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
  };
});
