import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves this project from https://<user>.github.io/ggtank/
// so the build must be base-pathed to "/ggtank/".
export default defineConfig({
  base: "/ggtank/",
  plugins: [react(), tailwindcss()],
});
