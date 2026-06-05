import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { execSync } from "node:child_process";

// Runs scripts/validate-seo.mjs at build start. Fails the build on SEO regressions
// (broken canonical, robots, or sitemap).
function seoValidatePlugin() {
  return {
    name: "seo-validate",
    apply: "build" as const,
    buildStart() {
      try {
        execSync("node scripts/validate-seo.mjs", { stdio: "inherit" });
      } catch {
        throw new Error("SEO validation failed — see output above.");
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    seoValidatePlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
