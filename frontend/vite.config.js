import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project site for repo "Hene.github.io":
// served at https://clauslarbietech.github.io/Hene.github.io/
export default defineConfig({
  base: "/Hene.github.io/",
  plugins: [react()],
  server: {
    port: 5173,
  },
});
