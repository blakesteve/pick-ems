import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Load environment variables
const env = loadEnv(process.env.NODE_ENV || "development", process.cwd());

console.log("VITE_API_URL:", env.VITE_API_URL); // Check if VITE_API_URL is defined

const apiUrl = env.VITE_API_URL;

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
