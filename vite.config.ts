import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Check if VITE_API_URL is defined
const apiUrl = "https://pickems.ball.farm/";

if (!apiUrl) {
  throw new Error("VITE_API_URL is not defined. Please check your .env files.");
}

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/games": {
        target: apiUrl, // Use the environment variable
        changeOrigin: true,
      },
    },
  },
});
