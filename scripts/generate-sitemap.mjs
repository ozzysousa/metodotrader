// Auto-generates public/sitemap.xml from route list + blog slugs.
// Runs on `predev` and `prebuild` so the sitemap always reflects live routes.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE = "https://metodotrader.lovable.app";
const today = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/blog", priority: "0.9", changefreq: "weekly" },
  { path: "/termos-de-uso", priority: "0.5", changefreq: "monthly" },
  { path: "/politica-de-privacidade", priority: "0.5", changefreq: "monthly" },
  { path: "/cookies", priority: "0.5", changefreq: "monthly" },
  { path: "/regulamentacao", priority: "0.5", changefreq: "monthly" },
];

// Extract slugs from src/data/blogPosts.ts
const src = readFileSync(resolve("src/data/blogPosts.ts"), "utf8");
const slugs = [...src.matchAll(/^\s{4}slug:\s*"([^"]+)"/gm)].map((m) => m[1]);

const urls = [
  ...staticRoutes.map(
    (r) =>
      `  <url><loc>${BASE}${r.path}</loc><lastmod>${today}</lastmod><changefreq>${r.changefreq}</changefreq><priority>${r.priority}</priority></url>`
  ),
  ...slugs.map(
    (s) =>
      `  <url><loc>${BASE}/blog/${s}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`
  ),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`✓ sitemap.xml regenerated (${staticRoutes.length + slugs.length} URLs)`);
