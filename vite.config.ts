import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const API_BASE_URL = env.VITE_API_URL || env.VITE_API_BASE_URL || "http://localhost:3050";

  console.log(`Vite Config: Final API_BASE_URL for proxy: ${API_BASE_URL}`);

  return {
    plugins: [ react()],
    server: {
      proxy: {
        '/api': {
          target: API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api'), // Ensure the /api prefix is retained
          secure: false, // Set to true if your ngrok URL is HTTPS and you have valid certs
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        },
        '/auth': {
          target: API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/auth/, '/auth'),
          secure: false,
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        },
      },
    },
  };
});
