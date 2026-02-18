#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="out"
DEST_DIR="ghl-split-export"
REMOVE_LOADER=1

echo "✅ GHL Split Export starting..."

# Kill any running dev server locks (safe)
pkill -f "next dev" >/dev/null 2>&1 || true
rm -f .next/dev/lock >/dev/null 2>&1 || true

# Ensure Next static export is enabled
node <<'NODE'
const fs = require("fs");
const path = require("path");
const p = path.resolve("next.config.js");

function writeDefault(){
  fs.writeFileSync(p, `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
};
module.exports = nextConfig;
`, "utf8");
  console.log("🧩 Created next.config.js with output:'export'");
}

if (!fs.existsSync(p)) {
  writeDefault();
  process.exit(0);
}

let s = fs.readFileSync(p, "utf8");
if (!/output\s*:\s*['"]export['"]/.test(s)) {
  if (/module\.exports\s*=\s*\{/.test(s)) {
    s = s.replace(/module\.exports\s*=\s*\{\s*/m, (m)=> m + "\n  output: 'export',\n  images: { unoptimized: true },\n");
  } else if (/const\s+nextConfig\s*=\s*\{/.test(s)) {
    s = s.replace(/const\s+nextConfig\s*=\s*\{\s*/m, (m)=> m + "\n  output: 'export',\n  images: { unoptimized: true },\n");
  } else {
    s += "\n\nmodule.exports = { output:'export', images:{unoptimized:true} };\n";
  }
  fs.writeFileSync(p, s, "utf8");
  console.log("🧩 Patched next.config.js => output:'export'");
} else {
  console.log("🧩 next.config.js already has output:'export'");
}
NODE

echo "🏗️  Building..."
npm run build

if [ ! -d "$OUT_DIR" ]; then
  echo "❌ No ./out folder found after build. Check next.config.js output:'export'."
  exit 1
fi

echo "🧰 Splitting pages into index.html + page.css + page.js ..."

node <<'NODE'
const fs = require("fs");
const path = require("path");

const OUT_DIR = path.resolve("out");
const DEST_DIR = path.resolve("ghl-split-export");
const REMOVE_LOADER = true;

const ensureDir = (p) => fs.mkdirSync(p, { recursive: true });
const readIfExists = (p) => { try { return fs.readFileSync(p, "utf8"); } catch { return ""; } };

function walk(dir) {
  let res = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) res = res.concat(walk(p));
    else res.push(p);
  }
  return res;
}

function removeLoader(html){
  html = html.replace(/<div[^>]+id=["'](?:__next_loader|loader|loading|preloader)["'][\s\S]*?<\/div>\s*/gi, "");
  html = html.replace(/<div[^>]+class=["'][^"']*(?:loader|loading|preloader|spinner)[^"']*["'][\s\S]*?<\/div>\s*/gi, "");

  const killer = `
<style id="kill-loader-ghl">
[id*="loader"], [class*="loader"], [id*="preloader"], [class*="preloader"], [id*="loading"], [class*="loading"], [class*="spinner"]{
  display:none !important;
  opacity:0 !important;
  visibility:hidden !important;
  pointer-events:none !important;
}
</style>`.trim();

  if (!html.includes('id="kill-loader-ghl"')) {
    html = html.replace(/<\/head>/i, `${killer}\n</head>`);
  }
  return html;
}

function splitPage(htmlPath){
  const rel = path.relative(OUT_DIR, htmlPath);        // e.g. faq/index.html
  const pageDirRel = path.dirname(rel);               // e.g. faq
  const pageDestDir = path.join(DEST_DIR, pageDirRel);
  ensureDir(pageDestDir);

  let html = fs.readFileSync(htmlPath, "utf8");

  // collect Next CSS
  const cssHrefs = [];
  html = html.replace(/<link\s+[^>]*rel=["']stylesheet["'][^>]*>/gi, (tag)=>{
    const m = tag.match(/href=["']([^"']+)["']/i);
    if (m && m[1] && m[1].includes("/_next/static/") && m[1].endsWith(".css")) {
      cssHrefs.push(m[1]);
      return ""; // remove it
    }
    return tag;
  });

  // collect Next JS
  const jsSrcs = [];
  html = html.replace(/<script\s+[^>]*src=["'][^"']+["'][^>]*>\s*<\/script>/gi, (tag)=>{
    const m = tag.match(/src=["']([^"']+)["']/i);
    if (m && m[1] && m[1].includes("/_next/static/") && m[1].endsWith(".js")) {
      jsSrcs.push(m[1]);
      return ""; // remove it
    }
    return tag;
  });

  // bundle assets
  let cssBundle = "";
  for (const href of [...new Set(cssHrefs)]) {
    const fp = path.join(OUT_DIR, href.replace(/^\//, ""));
    cssBundle += `\n/* ==== ${href} ==== */\n` + readIfExists(fp) + "\n";
  }

  let jsBundle = "";
  for (const src of [...new Set(jsSrcs)]) {
    const fp = path.join(OUT_DIR, src.replace(/^\//, ""));
    jsBundle += `\n/* ==== ${src} ==== */\n` + readIfExists(fp) + "\n";
  }

  fs.writeFileSync(path.join(pageDestDir, "page.css"), (cssBundle.trim() || "/* page css (empty) */") + "\n", "utf8");
  fs.writeFileSync(path.join(pageDestDir, "page.js"),  (jsBundle.trim()  || "// page js (empty)") + "\n", "utf8");

  // inject page.css + page.js
  const inject = `<link rel="stylesheet" href="./page.css">\n<script defer src="./page.js"></script>`;
  html = html.replace(/<\/head>/i, `${inject}\n</head>`);

  // remove loader
  if (REMOVE_LOADER) html = removeLoader(html);

  fs.writeFileSync(path.join(pageDestDir, "index.html"), html, "utf8");
}

if (fs.existsSync(DEST_DIR)) fs.rmSync(DEST_DIR, { recursive:true, force:true });
ensureDir(DEST_DIR);

// copy _next assets as-is (fonts/images/chunks)
const nextSrc = path.join(OUT_DIR, "_next");
const nextDst = path.join(DEST_DIR, "_next");
if (fs.existsSync(nextSrc)) fs.cpSync(nextSrc, nextDst, { recursive:true });

// process html pages
const htmlFiles = walk(OUT_DIR).filter(p => p.endsWith(".html") && !p.includes(path.sep + "_next" + path.sep));
for (const f of htmlFiles) splitPage(f);

console.log("✅ DONE");
console.log("📁 Export folder:", DEST_DIR);
console.log("▶️ Test:\n   cd ghl-split-export && python3 -m http.server 3001");
NODE

echo ""
echo "✅ FINISHED"
echo "➡️ Output: ./$DEST_DIR/"
