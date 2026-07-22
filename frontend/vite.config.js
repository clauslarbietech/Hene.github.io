import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project site: https://<user>.github.io/HENE.com/
export default defineConfig({
  base: "/HENE.com/",
  plugins: [react()],
  server: {
    port: 5173,
  },
});
