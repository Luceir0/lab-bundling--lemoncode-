import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import checker from "vite-plugin-checker";
import { analyzer } from "vite-bundle-analyzer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    checker({ typescript: true }),
    analyzer({
      analyzerMode: "static",
      openAnalyzer: false,
      fileName: "bundle-report",
    }),
  ],
});
