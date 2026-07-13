#!/usr/bin/env node
/**
 * Lightweight dependency vulnerability scan for CI.
 * Runs `npm audit --json` (works with the committed package-lock.json)
 * and fails the build when high or critical advisories are present.
 *
 * Run manually: `npm run security:scan`
 * Wired into CI via .github/workflows/ci.yml.
 */
import { execSync } from "node:child_process";

const THRESHOLD = new Set(["high", "critical"]);

function runAudit() {
  try {
    const out = execSync("npm audit --omit=dev --json", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return JSON.parse(out);
  } catch (err) {
    // npm audit exits non-zero when it finds vulns; stdout still holds the JSON
    const stdout = err.stdout?.toString?.() ?? "";
    if (!stdout) throw err;
    return JSON.parse(stdout);
  }
}

const report = runAudit();
const vulns = report.vulnerabilities ?? {};
const bad = Object.entries(vulns).filter(([, v]) => THRESHOLD.has(v.severity));

if (bad.length === 0) {
  console.log("✅ No high/critical vulnerabilities found.");
  process.exit(0);
}

console.error(`❌ Found ${bad.length} high/critical vulnerabilities:`);
for (const [name, v] of bad) {
  console.error(`  • ${name} (${v.severity}) — ${v.via?.map?.((x) => x.title ?? x).join(", ") ?? ""}`);
}
process.exit(1);
