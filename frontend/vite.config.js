import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages user site (repo named clauslarbietech.github.io):
// served at root https://clauslarbietech.github.io/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 5173,
  },
});
