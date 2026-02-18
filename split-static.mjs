import fs from "fs";
import path from "path";

const OUT_DIR = path.resolve(process.cwd(), "out");
const DEST_DIR = path.resolve(process.cwd(), "export-pages");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function readFileSafe(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "";
}

function uniq(arr) {
  return [...new Set(arr)];
}

function normRouteFromFile(htmlFile) {
  const rel = path.relative(OUT_DIR, htmlFile).replaceAll("\\", "/");
  if (rel === "index.html") return "home";
  // e.g. "faq/index.html" -> "faq"
  return rel.replace(/\/index\.html$/, "").replace(/\.html$/, "").replaceAll("/", "_");
}

function extractAssets(html) {
  // Next export assets in out/_next/static/...
  const css = [];
  const js = [];

  // <link rel="stylesheet" href="/_next/static/...css">
  const linkRe = /<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+\.css)["'][^>]*>/g;
  // <script ... src="/_next/static/...js">
  const scriptRe = /<script[^>]+src=["']([^"']+\.js)["'][^>]*>\s*<\/script>/g;

  let m;
  while ((m = linkRe.exec(html))) css.push(m[1]);
  while ((m = scriptRe.exec(html))) js.push(m[1]);

  return { css: uniq(css), js: uniq(js) };
}

function assetPathToDisk(assetHref) {
  // assetHref may be "/_next/..." OR "_next/..."
  const clean = assetHref.startsWith("/") ? assetHref.slice(1) : assetHref;
  return path.join(OUT_DIR, clean);
}

function stripNextAssets(html) {
  // remove Next CSS links + Next JS scripts
  html = html.replace(/<link[^>]+rel=["']stylesheet["'][^>]+href=["'][^"']*_next\/static\/[^"']+\.css["'][^>]*>\s*/g, "");
  html = html.replace(/<script[^>]+src=["'][^"']*_next\/static\/[^"']+\.js["'][^>]*>\s*<\/script>\s*/g, "");
  return html;
}

function injectSplitRefs(html, routeName) {
  // inject before </head> and before </body>
  const cssTag = `<link rel="stylesheet" href="./${routeName}.css">`;
  const jsTag = `<script defer src="./${routeName}.js"></script>`;

  if (html.includes("</head>")) html = html.replace("</head>", `  ${cssTag}\n</head>`);
  else html = cssTag + "\n" + html;

  if (html.includes("</body>")) html = html.replace("</body>", `  ${jsTag}\n</body>`);
  else html = html + "\n" + jsTag;

  return html;
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error("❌ مفيش فولدر out. لازم تعمل npm run build الأول.");
    process.exit(1);
  }

  ensureDir(DEST_DIR);

  const files = walk(OUT_DIR).filter((f) => f.endsWith(".html"));

  let count = 0;

  for (const htmlFile of files) {
    const htmlRaw = readFileSafe(htmlFile);
    if (!htmlRaw) continue;

    const routeName = normRouteFromFile(htmlFile);
    const routeDir = path.join(DEST_DIR, routeName);
    ensureDir(routeDir);

    const { css, js } = extractAssets(htmlRaw);

    // concat assets
    let cssBundle = "";
    for (const href of css) {
      const disk = assetPathToDisk(href);
      const content = readFileSafe(disk);
      if (content) cssBundle += `\n/* ===== ${href} ===== */\n` + content + "\n";
    }

    let jsBundle = "";
    for (const src of js) {
      const disk = assetPathToDisk(src);
      const content = readFileSafe(disk);
      if (content) jsBundle += `\n/* ===== ${src} ===== */\n` + content + "\n";
    }

    // rewrite html to use local route.css/js
    let html = stripNextAssets(htmlRaw);
    html = injectSplitRefs(html, routeName);

    fs.writeFileSync(path.join(routeDir, `${routeName}.html`), html, "utf8");
    fs.writeFileSync(path.join(routeDir, `${routeName}.css`), cssBundle, "utf8");
    fs.writeFileSync(path.join(routeDir, `${routeName}.js`), jsBundle, "utf8");

    count++;
  }

  console.log(`✅ Done. Exported ${count} pages into: ${DEST_DIR}`);
  console.log("📌 كل صفحة هتلاقيها جوه فولدر باسمها: page.html + page.css + page.js");
}

main();