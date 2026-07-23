import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages user site (repo named <user>.github.io): served at root https://<user>.github.io/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 5173,
  },
});
