import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr({
    svgrOptions: {
      icon: true
    },
    include: "**/*.svg"
  })],
  base: "/pomo/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  }
})
