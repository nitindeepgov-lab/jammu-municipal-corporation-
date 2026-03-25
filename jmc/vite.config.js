import { defineConfig } from "vite";
import { loadEnv } from "vite";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import tailwindConfig from "./tailwind.config.js";

const rootDir = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, "");
  const strapiTarget = env.VITE_STRAPI_URL || "http://localhost:1338";

  return {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss(tailwindConfig), autoprefixer],
      },
    },
    server: {
      proxy: {
        "/admin": {
          target: strapiTarget,
          changeOrigin: true,
          ws: false, // Don't proxy WebSocket upgrades — prevents "Upgrade Required" from Strapi
          // Only proxy actual HTTP requests to /admin, not HMR websockets
          bypass(req) {
            // Let Vite handle WebSocket upgrade requests itself
            if (req.headers.upgrade === "websocket") return req.url;
          },
        },
      },
    },
  };
});
