import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.join(__dirname, "out");
const DEST_DIR = path.join(__dirname, "ghl-export");

function ensureDir(p){ fs.mkdirSync(p, { recursive: true }); }

function walk(dir){
  const res = [];
  for(const e of fs.readdirSync(dir, { withFileTypes:true })){
    const p = path.join(dir, e.name);
    if(e.isDirectory()) res.push(...walk(p));
    else res.push(p);
  }
  return res;
}

function readText(p){
  try { return fs.readFileSync(p, "utf8"); } catch { return null; }
}

function removeNextStuff(html){
  // remove next preload/script tags
  html = html.replace(/<link[^>]+href="\/_next\/static\/[^"]+"[^>]*>\s*/gi, "");
  html = html.replace(/<link[^>]+as="script"[^>]+href="\/_next\/static\/[^"]+"[^>]*>\s*/gi, "");
  html = html.replace(/<script[^>]+src="\/_next\/static\/[^"]+"[^>]*>\s*<\/script>\s*/gi, "");
  // remove react flight markers / hidden next markers (safe)
  html = html.replace(/<div hidden="">\s*<!--\$-->\s*<!--\/\$-->\s*<\/div>\s*/gi, "");
  // remove common fullscreen loader overlays (fixed inset-0 z-[100] …)
  html = html.replace(/<div[^>]*class="[^"]*fixed[^"]*inset-0[^"]*z-\[100\][^"]*"[^>]*>[\s\S]*?<\/div>\s*/gi, "");
  return html;
}

function inlineLocalCss(html, htmlPath){
  // inline <link rel="stylesheet" href="./something.css">
  html = html.replace(/<link\s+rel="stylesheet"\s+href="([^"]+\.css)"\s*\/?>/gi, (m, href)=>{
    if(!href.startsWith(".")) return ""; // drop absolute css links
    const cssPath = path.resolve(path.dirname(htmlPath), href);
    const css = readText(cssPath);
    if(!css) return "";
    return `<style>\n${css}\n</style>`;
  });
  return html;
}

function inlineLocalJs(html, htmlPath){
  // inline <script src="./something.js"></script>
  html = html.replace(/<script\s+src="([^"]+\.js)"><\/script>/gi, (m, src)=>{
    if(!src.startsWith(".")) return ""; // drop absolute js links
    const jsPath = path.resolve(path.dirname(htmlPath), src);
    const js = readText(jsPath);
    if(!js) return "";
    return `<script>\n${js}\n</script>`;
  });
  return html;
}

function addFonts(html){
  if(html.includes("fonts.googleapis.com")) return html;
  const fonts =
`<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">`;
  return html.replace(/<\/head>/i, `${fonts}\n</head>`);
}

function hardKillLoaderCSS(html){
  // Even if some loader survives, force-hide it with CSS
  const css = `<style>
/* Force-hide common fullscreen loaders */
[class*="fixed"][class*="inset-0"][class*="z-[100]"]{display:none!important;opacity:0!important;pointer-events:none!important;}
</style>`;
  return html.replace(/<\/head>/i, `${css}\n</head>`);
}

function main(){
  if(!fs.existsSync(OUT_DIR)){
    console.error("❌ out/ not found. Build first.");
    process.exit(1);
  }

  // fresh DEST_DIR
  if(fs.existsSync(DEST_DIR)) fs.rmSync(DEST_DIR, { recursive:true, force:true });
  ensureDir(DEST_DIR);

  const htmlFiles = walk(OUT_DIR).filter(p=>p.endsWith(".html"));

  for(const htmlPath of htmlFiles){
    const rel = path.relative(OUT_DIR, htmlPath);
    const destPath = path.join(DEST_DIR, rel);
    ensureDir(path.dirname(destPath));

    let html = fs.readFileSync(htmlPath, "utf8");
    html = removeNextStuff(html);
    html = inlineLocalCss(html, htmlPath);
    html = inlineLocalJs(html, htmlPath);
    html = addFonts(html);
    html = hardKillLoaderCSS(html);

    // make body class simpler if it references next font modules
    html = html.replace(/class="[^"]*cairo_[^"]*?variable[^"]*?ibm_plex[^"]*?variable[^"]*?"/gi, 'class="font-sans antialiased"');

    fs.writeFileSync(destPath, html, "utf8");
  }

  console.log("✅ Done!");
  console.log("📁 GHL files: ./ghl-export/");
}
main();
