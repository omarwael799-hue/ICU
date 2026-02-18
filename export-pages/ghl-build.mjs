import fs from "fs";
import path from "path";

const pages = [
  "home",
  "advisory",
  "community",
  "contact",
  "faq",
  "councils",
  "governance",
  "join",
  "memberships",
  "partners",
  "pyramid",
  "services",
  "verify",
];

const killCSS = `
/* ✅ Kill any full-screen overlay/loader that blocks the page */
[class*="fixed"][class*="inset-0"][class*="z-[100]"],
[id*="loader" i], [class*="loader" i], [class*="loading" i]{
  display:none !important;
  opacity:0 !important;
  pointer-events:none !important;
}
`.trim();

const killJS = `
(function(){
  try{
    // remove common fullscreen overlays
    document.querySelectorAll('[class*="fixed"][class*="inset-0"][class*="z-[100]"]').forEach(el=>el.remove());
    document.querySelectorAll('[id*="loader" i], [class*="loader" i], [class*="loading" i]').forEach(el=>el.remove());
  }catch(e){}
})();
`.trim();

function readIfExists(p){
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "";
}

function stripNextStuff(html){
  // remove _next preloads/scripts (cause 404 in GHL)
  html = html.replace(/<link[^>]+href="\/_next\/static\/[^"]+"[^>]*>\s*/gi, "");
  html = html.replace(/<link[^>]+as="script"[^>]+href="\/_next\/static\/[^"]+"[^>]*>\s*/gi, "");
  html = html.replace(/<script[^>]+src="\/_next\/static\/[^"]+"[^>]*>\s*<\/script>\s*/gi, "");

  // remove react hidden markers sometimes present
  html = html.replace(/<div hidden="">\s*<!--\$-->\s*<!--\/\$-->\s*<\/div>\s*/gi, "");

  // remove common fullscreen loader blocks
  html = html.replace(/<div[^>]*class="[^"]*fixed[^"]*inset-0[^"]*z-\[100\][^"]*"[^>]*>[\s\S]*?<\/div>\s*/gi, "");

  return html;
}

function inlineCss(html, css){
  // remove external css link if exists
  html = html.replace(/<link[^>]+href="\.\/[a-z0-9_-]+\.css"[^>]*>\s*/gi, "");
  // inject css before </head>
  const style = `<style>\n${css}\n\n${killCSS}\n</style>\n`;
  if (html.match(/<\/head>/i)) return html.replace(/<\/head>/i, style + "</head>");
  return style + html;
}

function inlineJs(html, js){
  // remove external js script if exists
  html = html.replace(/<script[^>]+src="\.\/[a-z0-9_-]+\.js"[^>]*>\s*<\/script>\s*/gi, "");
  // inject js before </body>
  const script = `<script>\n${js}\n\n${killJS}\n</script>\n`;
  if (html.match(/<\/body>/i)) return html.replace(/<\/body>/i, script + "</body>");
  return html + script;
}

function ensureFonts(html){
  // if already has google fonts import in <style> we keep it
  if (html.includes("fonts.googleapis.com")) return html;
  const fonts = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
`.trim() + "\n";
  return html.replace(/<\/head>/i, fonts + "</head>");
}

for (const name of pages){
  const htmlFile = path.resolve(`${name}.html`);
  if (!fs.existsSync(htmlFile)){
    console.log(`- skip ${name} (no ${name}.html)`);
    continue;
  }

  let html = fs.readFileSync(htmlFile, "utf8");
  const css = readIfExists(path.resolve(`${name}.css`));
  const js  = readIfExists(path.resolve(`${name}.js`));

  html = stripNextStuff(html);
  html = ensureFonts(html);
  html = inlineCss(html, css);
  html = inlineJs(html, js);

  // optional: replace next font module className junk with normal font
  html = html.replace(/class="[^"]*cairo_[^"]*variable[^"]*ibm_plex[^"]*variable[^"]*"/gi, 'class="font-sans antialiased"');

  const out = path.resolve(`${name}_ghl.html`);
  fs.writeFileSync(out, html, "utf8");
  console.log(`✅ built: ${out}`);
}

console.log("\nDone. Upload *_ghl.html to GHL Custom HTML.");
