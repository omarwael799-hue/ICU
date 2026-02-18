import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "out");                 // Next export output
const DEST = path.join(ROOT, "ghl-split-export");   // final output

function ensureDir(p){ fs.mkdirSync(p, { recursive: true }); }
function rmDir(p){ fs.rmSync(p, { recursive: true, force: true }); }
function read(p){ return fs.readFileSync(p, "utf8"); }
function write(p, s){ ensureDir(path.dirname(p)); fs.writeFileSync(p, s, "utf8"); }
function exists(p){ return fs.existsSync(p); }

function walk(dir){
  const res = [];
  for (const name of fs.readdirSync(dir)){
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) res.push(...walk(p));
    else res.push(p);
  }
  return res;
}

function stripLoaderHTML(html){
  // remove common loader containers/overlays (flex/center/fixed/inset/z-100 etc.)
  html = html.replace(/<div[^>]*(id|class)=["'][^"']*(loader|loading|preloader)[^"']*["'][^>]*>[\s\S]*?<\/div>\s*/gi, "");
  html = html.replace(/<div[^>]*class=["'][^"']*fixed[^"']*inset-0[^"']*(z-\[?100\]?|z-50|z-40)[^"']*["'][^>]*>[\s\S]*?<\/div>\s*/gi, "");
  html = html.replace(/<div[^>]*class=["'][^"']*(overlay|backdrop)[^"']*["'][^>]*>[\s\S]*?<\/div>\s*/gi, "");
  return html;
}

function stripLoaderJS(js){
  // remove common patterns that lock scrolling or wait for load to hide loader
  js = js.replace(/document\.body\.style\.overflow\s*=\s*["']hidden["'];?/gi, "");
  js = js.replace(/document\.documentElement\.style\.overflow\s*=\s*["']hidden["'];?/gi, "");
  js = js.replace(/(const|let|var)\s+\w+\s*=\s*document\.querySelector\([^)]*(loader|preloader|loading)[^)]*\);\s*/gi, "");
  js = js.replace(/document\.querySelector\([^)]*(loader|preloader|loading)[^)]*\)\?\.remove\(\);?/gi, "");
  js = js.replace(/document\.querySelector\([^)]*(loader|preloader|loading)[^)]*\)\?\.classList\.(add|remove)\([^)]*\);?/gi, "");
  js = js.replace(/window\.addEventListener\(\s*["']load["'][\s\S]*?\);\s*/gi, ""); // broad but effective
  return js.trim() + "\n";
}

function stripLoaderCSS(css){
  // remove patterns that hide page or lock it behind loader
  css = css.replace(/overflow\s*:\s*hidden\s*;?/gi, match => match); // keep general overflow hidden if used elsewhere
  css = css.replace(/(#|\.)(loader|loading|preloader)[^{]*\{[\s\S]*?\}\s*/gi, "");
  css = css.replace(/(\.)(overlay|backdrop)[^{]*\{[\s\S]*?\}\s*/gi, "");
  // remove rules that force body hidden (common in loaders)
  css = css.replace(/body\s*\{[\s\S]*?overflow\s*:\s*hidden\s*;[\s\S]*?\}\s*/gi, (block) => {
    return block.replace(/overflow\s*:\s*hidden\s*;?/gi, "");
  });
  return css.trim() + "\n";
}

function normalizeHtml(html, cssName, jsName){
  // remove next runtime junk (keep HTML clean)
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>\s*/gi, (m) => {
    // keep only scripts that are NOT next chunks when exporting from your custom html folder
    // but if this is from Next out/, we will rewrite scripts anyway.
    return m;
  });

  // remove existing local css/js refs and re-inject ours
  html = html.replace(/<link[^>]+rel=["']stylesheet["'][^>]*>\s*/gi, "");
  html = html.replace(/<script[^>]+src=["'][^"']+["'][^>]*>\s*<\/script>\s*/gi, "");

  // ensure charset + viewport
  if (!/charset=/i.test(html)) {
    html = html.replace(/<head>/i, `<head>\n<meta charset="utf-8">`);
  }
  if (!/name=["']viewport["']/i.test(html)) {
    html = html.replace(/<head>/i, `<head>\n<meta name="viewport" content="width=device-width, initial-scale=1">`);
  }

  // inject css + js
  html = html.replace(/<\/head>/i, `  <link rel="stylesheet" href="./${cssName}">\n</head>`);
  html = html.replace(/<\/body>/i, `  <script src="./${jsName}" defer></script>\n</body>`);

  return html;
}

function main(){
  if (!exists(OUT)) {
    console.error("❌ out/ مش موجود. شغّل: npm run build && npx next export (أو next build لو عندك export جاهز).");
    process.exit(1);
  }

  rmDir(DEST);
  ensureDir(DEST);

  const htmlFiles = walk(OUT).filter(f => f.endsWith(".html"));

  for (const file of htmlFiles){
    const rel = path.relative(OUT, file);
    const dirRel = rel.endsWith("index.html") ? path.dirname(rel) : rel.replace(/\.html$/i, "");
    const pageDir = path.join(DEST, dirRel);

    ensureDir(pageDir);

    let html = read(file);
    html = stripLoaderHTML(html);

    // Extract inline <style> and inline <script> (if any)
    let collectedCSS = "";
    let collectedJS = "";

    html = html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_, css) => {
      collectedCSS += "\n" + css + "\n";
      return "";
    });

    html = html.replace(/<script(?![^>]+src=)[^>]*>([\s\S]*?)<\/script>/gi, (_, js) => {
      collectedJS += "\n" + js + "\n";
      return "";
    });

    collectedCSS = stripLoaderCSS(collectedCSS);
    collectedJS  = stripLoaderJS(collectedJS);

    // Create per-page files
    const cssName = "page.css";
    const jsName  = "page.js";

    html = normalizeHtml(html, cssName, jsName);

    write(path.join(pageDir, "index.html"), html);
    write(path.join(pageDir, cssName), collectedCSS || "/* page css (empty) */\n");
    write(path.join(pageDir, jsName),  collectedJS  || "// page js (empty)\n");
  }

  console.log("✅ DONE");
  console.log("📁 Export folder:", DEST);
  console.log("▶️ Test:");
  console.log("   cd ghl-split-export && python3 -m http.server 3001");
}

main();
