import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as process from "process";
import { config } from "dotenv";

// Load environment variables from .env
config();

console.log("VITE_API_URL:", process.env.VITE_API_URL); // Check if VITE_API_URL is defined

const apiUrl = process.env.VITE_API_URL;

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
