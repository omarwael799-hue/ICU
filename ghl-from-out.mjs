import fs from "fs";
import path from "path";

const OUT = path.join(process.cwd(), "out");
const DEST = path.join(process.cwd(), "ghl-pages");

function walk(dir){
  const res = [];
  for(const e of fs.readdirSync(dir, {withFileTypes:true})){
    const p = path.join(dir, e.name);
    if(e.isDirectory()) res.push(...walk(p));
    else res.push(p);
  }
  return res;
}

function ensureDir(p){ fs.mkdirSync(p, {recursive:true}); }

function readText(p){
  try { return fs.readFileSync(p, "utf8"); } catch { return ""; }
}

function inlineFile(html, htmlPath, attr, ext){
  const re = new RegExp(`<${attr}[^>]+(?:href|src)="([^"]+\\.${ext})"[^>]*>`, "gi");
  return html.replace(re, (m, url)=>{
    if(!url.startsWith("./") && !url.startsWith("../")) return m; // keep external
    const abs = path.resolve(path.dirname(htmlPath), url);
    const txt = readText(abs);
    if(!txt) return ""; // drop missing
    if(ext === "css") return `<style>\n${txt}\n</style>`;
    if(ext === "js") return `<script>\n${txt}\n</script>`;
    return m;
  });
}

function stripNext(html){
  // remove next preloads/scripts that 404 on GHL
  html = html.replace(/<link[^>]+href="\/_next\/static\/[^"]+"[^>]*>\s*/gi, "");
  html = html.replace(/<link[^>]+as="script"[^>]+href="\/_next\/static\/[^"]+"[^>]*>\s*/gi, "");
  html = html.replace(/<script[^>]+src="\/_next\/static\/[^"]+"[^>]*>\s*<\/script>\s*/gi, "");
  // remove fullscreen loader overlays
  html = html.replace(/<div[^>]*class="[^"]*fixed[^"]*inset-0[^"]*z-\[100\][^"]*"[^>]*>[\s\S]*?<\/div>\s*/gi, "");
  return html;
}

const fonts = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
`.trim();

const killCSS = `
<style>
[class*="fixed"][class*="inset-0"][class*="z-[100]"],
[id*="loader" i],[class*="loader" i],[class*="loading" i]{
  display:none!important;opacity:0!important;pointer-events:none!important;
}
</style>
`.trim();

if(!fs.existsSync(OUT)){
  console.error("❌ out/ not found. Run: npm run build (with output:'export') first.");
  process.exit(1);
}

if(fs.existsSync(DEST)) fs.rmSync(DEST, {recursive:true, force:true});
ensureDir(DEST);

const htmlFiles = walk(OUT).filter(f=>f.endsWith(".html"));
for(const f of htmlFiles){
  let html = fs.readFileSync(f, "utf8");
  html = stripNext(html);

  // inline relative css/js produced by export-pages (./xxx.css ./xxx.js)
  html = inlineFile(html, f, "link", "css");
  html = inlineFile(html, f, "script", "js");

  // add fonts + killCSS
  if(!html.includes("fonts.googleapis.com")) html = html.replace(/<\/head>/i, fonts + "\n</head>");
  if(!html.includes("pointer-events:none")) html = html.replace(/<\/head>/i, killCSS + "\n</head>");

  const rel = path.relative(OUT, f);
  const outPath = path.join(DEST, rel);
  ensureDir(path.dirname(outPath));
  fs.writeFileSync(outPath, html, "utf8");
}

console.log("✅ Done. Standalone pages here:", DEST);
