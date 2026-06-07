#!/usr/bin/env node
// Validates canonicals (index.html), robots.txt and sitemap.xml before build.
// Fails the build if any required SEO invariant is broken.
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = "https://metodotrader.online";
const root = process.cwd();
const errors = [];
const warn = (m) => console.warn("⚠️  " + m);
const err = (m) => errors.push(m);

// ---- index.html ----
const indexPath = resolve(root, "index.html");
if (!existsSync(indexPath)) err("index.html not found");
else {
  const html = readFileSync(indexPath, "utf8");
  // Canonical and og:url are intentionally NOT hardcoded in index.html.
  // setPageSEO (src/lib/seo.ts) injects per-route canonical/og:url at runtime
  // so each route gets its own URL for JS-executing crawlers.
  const canon = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  if (canon && !canon[1].startsWith(SITE_URL))
    err(`index.html: canonical (if present) must start with ${SITE_URL} (got ${canon[1]})`);
  const ogUrl = html.match(/property=["']og:url["'][^>]*content=["']([^"']+)["']/i);
  if (ogUrl && !ogUrl[1].startsWith(SITE_URL))
    err(`index.html: og:url (if present) must start with ${SITE_URL}`);


  if (!/name=["']description["']/i.test(html)) err("index.html: missing meta description");
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) err("index.html: missing <title>");
  else if (titleMatch[1].length > 60) warn(`index.html: <title> is ${titleMatch[1].length} chars (>60)`);

  if (!/google-site-verification/i.test(html)) warn("index.html: no google-site-verification tag");
}

// ---- robots.txt ----
const robotsPath = resolve(root, "public/robots.txt");
if (!existsSync(robotsPath)) err("public/robots.txt not found");
else {
  const robots = readFileSync(robotsPath, "utf8");
  if (/^\s*Disallow:\s*\/\s*$/im.test(robots) && !/Allow:\s*\//i.test(robots))
    err("robots.txt: site is fully disallowed");
  if (!/Sitemap:\s*https?:\/\//i.test(robots)) err("robots.txt: missing Sitemap: directive");
  else {
    const sm = robots.match(/Sitemap:\s*(\S+)/i)[1];
    if (!sm.startsWith(SITE_URL)) err(`robots.txt: Sitemap URL must start with ${SITE_URL} (got ${sm})`);
  }
}

// ---- sitemap.xml ----
const sitemapPath = resolve(root, "public/sitemap.xml");
if (!existsSync(sitemapPath)) err("public/sitemap.xml not found");
else {
  const xml = readFileSync(sitemapPath, "utf8");
  if (!xml.trim().startsWith("<?xml")) err("sitemap.xml: missing XML declaration");
  if (!/<urlset[^>]+xmlns=/i.test(xml)) err("sitemap.xml: missing <urlset> with xmlns");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (locs.length === 0) err("sitemap.xml: no <loc> entries");
  const seen = new Set();
  for (const loc of locs) {
    if (!loc.startsWith(SITE_URL)) err(`sitemap.xml: <loc> must start with ${SITE_URL} (got ${loc})`);
    if (seen.has(loc)) err(`sitemap.xml: duplicate <loc> ${loc}`);
    seen.add(loc);
    if (/\s/.test(loc)) err(`sitemap.xml: whitespace in <loc> ${loc}`);
  }
  // tag balance
  const open = (xml.match(/<url>/g) || []).length;
  const close = (xml.match(/<\/url>/g) || []).length;
  if (open !== close) err(`sitemap.xml: <url> tags unbalanced (${open} open / ${close} close)`);
}

if (errors.length) {
  console.error("\n❌ SEO validation failed:\n" + errors.map((e) => "  - " + e).join("\n") + "\n");
  process.exit(1);
}
console.log(`✅ SEO validation passed (canonical, robots, sitemap).`);
