#!/usr/bin/env bash
set -euo pipefail

# 1) install (avoid peer issues)
npm install --legacy-peer-deps

# 2) ensure export mode
if [ ! -f next.config.js ]; then
cat > next.config.js <<'JS'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};
module.exports = nextConfig;
JS
fi

# 3) build -> out/
npm run build

if [ ! -d out ]; then
  echo "❌ out/ not found. Ensure next.config.js has output:'export'."
  exit 1
fi

# 4) Create loaderless copy
rm -rf out_loaderless
cp -R out out_loaderless

# 5) Patch all HTML files: remove loader div + add CSS kill-switch
node <<'NODE'
const fs = require("fs");
const path = require("path");

const ROOT = path.join(process.cwd(), "out_loaderless");

function walk(dir){
  const res = [];
  for(const e of fs.readdirSync(dir, {withFileTypes:true})){
    const p = path.join(dir, e.name);
    if(e.isDirectory()) res.push(...walk(p));
    else res.push(p);
  }
  return res;
}

const htmlFiles = walk(ROOT).filter(f => f.endsWith(".html"));

for(const f of htmlFiles){
  let html = fs.readFileSync(f, "utf8");

  // 1) remove common fullscreen loader blocks (z-[100], fixed inset-0)
  html = html.replace(/<div[^>]*class="[^"]*fixed[^"]*inset-0[^"]*z-\\[100\\][^"]*"[^>]*>[\\s\\S]*?<\\/div>\\s*/gi, "");

  // 2) also remove any obvious "loader" ids/classes
  html = html.replace(/<div[^>]*(id|class)="[^"]*(loader|loading)[^"]*"[^>]*>[\\s\\S]*?<\\/div>\\s*/gi, "");

  // 3) Add a CSS kill-switch so لو أي Overlay فضل، يتقفل
  const killCSS = `
<style>
/* Kill any full-screen overlay/loader that blocks the page */
[class*="fixed"][class*="inset-0"][class*="z-[100]"],
[id*="loader"], [class*="loader"], [class*="loading"]{
  display:none !important;
  opacity:0 !important;
  pointer-events:none !important;
}
</style>
`.trim();

  if(!html.includes("Kill any full-screen overlay/loader")){
    html = html.replace(/<\/head>/i, killCSS + "\n</head>");
  }

  fs.writeFileSync(f, html, "utf8");
}

console.log("✅ Patched", htmlFiles.length, "HTML files in out_loaderless/");
NODE

echo ""
echo "✅ DONE"
echo "➡️ Original export:        ./out/"
echo "➡️ Loaderless export:      ./out_loaderless/"
echo ""
echo "Test locally:"
echo "  cd out_loaderless && python3 -m http.server 3001"
