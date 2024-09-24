import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/games": {
        target: "https://pickems.ball.farm/",
        changeOrigin: true,
      },
    },
  },
});
