import assert from "node:assert/strict";
import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = path.join(root, "dist/client");
const output = path.join(root, "dist/github-pages");
const languages = { ru: "ru", en: "en", "zh-hans": "zh-Hans" };
const routes = ["", "creative", "products", "systems", "work"];
const requiredHtml = ["index.html", "404.html", ...Object.keys(languages).flatMap((locale) => routes.map((route) => route ? `${locale}/${route}.html` : `${locale}.html`))];

// Fail before packaging if the exporter silently skips a required page.
for (const file of requiredHtml) {
  const html = await readFile(path.join(source, file), "utf8");
  assert.match(html, /<h1[\s>]/, `Incomplete exported page: ${file}`);
  assert.doesNotMatch(html, /id="__next_error__"/, `Export error: ${file}`);
}

async function files(directory, prefix = "") {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = path.posix.join(prefix, entry.name);
    assert.ok(!entry.isSymbolicLink(), `Unexpected symbolic link: ${relative}`);
    if (entry.isDirectory()) result.push(...await files(path.join(directory, entry.name), relative));
    else result.push(relative);
  }
  return result;
}

// Keep unused source artwork in the repository, but not in the public payload.
// Add future public assets here; link tests catch references to missing assets.
const publicFiles = new Set(await files(path.join(root, "public")));
const publicAssets = new Set(["CNAME", ".nojekyll", "llms.txt", "media/products/ui.jpg", "media/creative/ai-production.jpg"]);
for (const file of await files(source)) {
  if (publicFiles.has(file) && !publicAssets.has(file) && !file.startsWith("optimized/")) continue;
  if (file.endsWith(".map")) continue;
  let target = file;
  if (file.endsWith(".html") && !["index.html", "404.html"].includes(file)) target = `${file.slice(0, -5)}/index.html`;
  await mkdir(path.dirname(path.join(output, target)), { recursive: true });
  if (file.endsWith(".html")) {
    let html = await readFile(path.join(source, file), "utf8");
    const locale = file.split(/[/.]/)[0];
    // Root layouts do not receive child locale params. Emit lang in actual HTML,
    // so crawlers and no-JS readers need neither hydration nor language detection.
    html = html.replace(/(<html\b[^>]*\blang=")[^"]*(")/, `$1${languages[locale] ?? "en"}$2`);
    if (file === "404.html") {
      html = html.replace(/<meta\b(?=[^>]*\bname="robots")[^>]*>/gi, "");
      html = html.replace("</head>", '<meta name="robots" content="noindex, follow"/></head>');
    }
    await writeFile(path.join(output, target), html);
  } else {
    await copyFile(path.join(source, file), path.join(output, target));
  }
}

// vinext beta exports static metadata files, but not metadata functions.
// Materialize those same route handlers at build time; no server is deployed.
const { default: handler } = await import(new URL("../dist/server/index.js", import.meta.url));
assert.equal(typeof handler, "function", "Run the static build before packaging.");
for (const [file, type] of [["robots.txt", "text/plain"], ["sitemap.xml", "xml"], ["manifest.webmanifest", "json"]]) {
  const response = await handler(new Request(`https://creax.digital/${file}`));
  assert.equal(response.status, 200, file);
  assert.ok(response.headers.get("content-type")?.includes(type), `Wrong content type for ${file}`);
  await writeFile(path.join(output, file), await response.text());
}
console.log(`GitHub Pages artifact ready: dist/github-pages (${requiredHtml.length - 1} pages + 404).`);
