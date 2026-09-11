import assert from "node:assert/strict";
import { once } from "node:events";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { after, before, test } from "node:test";
import { gzipSync } from "node:zlib";
import sharp from "sharp";
import { createStaticServer, staticDirectory } from "../scripts/serve-static.mjs";
import { heroImages } from "../lib/media-config.mjs";

const origin = "https://creax.digital";
const locales = { ru: "ru", en: "en", "zh-hans": "zh-Hans" };
const sections = ["", "creative", "products", "systems", "work"];
const routes = ["/", ...Object.keys(locales).flatMap((locale) => sections.map((section) => `/${locale}/${section ? `${section}/` : ""}`))];
const read = (file) => readFile(path.join(staticDirectory, file), "utf8");
const documents = new Map(await Promise.all(routes.map(async (route) => [route, await read(`${route.slice(1)}index.html`)])));
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">");
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, name, value]) => [name.toLowerCase(), decode(value)]));
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "gi"))].map(([value]) => attributes(value));
const noScripts = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
const canonical = (html) => tags(html, "link").find((tag) => tag.rel === "canonical")?.href;
const alternates = (html) => Object.fromEntries(tags(html, "link").filter((tag) => tag.rel === "alternate" && tag.hreflang).map((tag) => [tag.hreflang, tag.href]));
const localFile = (url) => path.join(staticDirectory, decodeURIComponent(url.pathname), url.pathname.endsWith("/") ? "index.html" : "");
let server;
let address;

before(async () => {
  server = createStaticServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  address = `http://127.0.0.1:${server.address().port}`;
});
after(async () => { if (server) await new Promise((resolve) => server.close(resolve)); });

test("all 16 pages have complete, indexable, localized HTML without running JavaScript", () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const [route, html] of documents) {
    const content = noScripts(html);
    const language = locales[route.split("/")[1]] ?? "en";
    assert.equal(tags(html, "html")[0]?.lang, language, route);
    assert.equal(tags(content, "h1").length, 1, route);
    assert.match(content, /<main\b/);
    assert.doesNotMatch(content, /__next_error__|noindex|HTTP Error/i);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    const description = tags(html, "meta").find((tag) => tag.name === "description")?.content;
    assert.ok(title?.length > 12 && description?.length > 20, route);
    assert.equal((title.match(/CREAX/gi) ?? []).length, 1, route);
    assert.ok(!titles.has(title) && !descriptions.has(description), `Duplicate metadata: ${route}`);
    titles.add(title); descriptions.add(description);
    assert.equal(new URL(canonical(html)).href, `${origin}${route}`, route);
    assert.ok(tags(html, "meta").some((tag) => tag.name === "viewport" && tag.content.includes("width=device-width")));
    if (route !== "/") {
      assert.ok(content.replace(/<[^>]*>/g, "").length > 500, `Missing readable text: ${route}`);
      assert.ok(tags(content, "h2").length >= 4, `Missing sections: ${route}`);
      assert.ok(content.includes('id="contact"') && content.includes('href="mailto:info@creaxdigital.ru"'));
    }
  }
});

test("hreflang is reciprocal and keeps users on the equivalent service", () => {
  for (const [route, html] of documents) {
    const links = alternates(html);
    assert.deepEqual(Object.keys(links).sort(), ["en", "ru", "x-default", "zh-Hans"].sort());
    const section = route.split("/")[2] ?? "";
    for (const [locale, language] of Object.entries(locales)) {
      const expected = `/${locale}/${section ? `${section}/` : ""}`;
      assert.equal(new URL(links[language]).pathname, expected, route);
      const reciprocal = alternates(documents.get(expected));
      assert.deepEqual(reciprocal, links, `Missing return alternate: ${route}`);
    }
    assert.equal(new URL(links["x-default"]).pathname, section ? `/en/${section}/` : "/");
  }
});

test("sitemap and robots describe the actual public pages, not build timestamps", async () => {
  const sitemap = await read("sitemap.xml");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => url);
  assert.deepEqual(urls.sort(), routes.map((route) => `${origin}${route}`).sort());
  assert.doesNotMatch(sitemap, /<lastmod>/);
  assert.equal((sitemap.match(/<xhtml:link /g) ?? []).length, routes.length * 4);
  const robots = await read("robots.txt");
  assert.match(robots, /User-Agent: \*\s+Allow: \/\s/);
  assert.match(robots, /Sitemap: https:\/\/creax.digital\/sitemap.xml/);
  assert.doesNotMatch(robots, /Disallow:\s*\/\s/);
  assert.equal((await read("CNAME")).trim(), "creax.digital");
  await stat(path.join(staticDirectory, ".nojekyll"));
});

test("structured data connects the agency, website and services using truthful page content", () => {
  for (const [route, html] of documents) {
    if (route === "/") continue;
    const raw = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
    const data = JSON.parse(raw);
    assert.equal(data["@context"], "https://schema.org");
    const graph = data["@graph"];
    const ids = new Set(graph.map((entry) => entry["@id"]));
    const organization = graph.find((entry) => entry["@type"] === "Organization");
    assert.equal(organization["@id"], `${origin}/#organization`);
    assert.equal(organization.email, "info@creaxdigital.ru");
    const page = graph.find((entry) => ["WebPage", "CollectionPage"].includes(entry["@type"]));
    assert.equal(page.url, `${origin}${route}`);
    assert.equal(page.inLanguage, locales[route.split("/")[1]]);
    assert.ok(ids.has(page.isPartOf["@id"]));
    const service = graph.find((entry) => entry["@type"] === "Service");
    if (["creative", "products", "systems"].includes(route.split("/")[2])) {
      assert.equal(service.url, page.url);
      assert.ok(ids.has(service.provider["@id"]));
      const visible = decode(noScripts(html).replace(/<[^>]*>/g, ""));
      assert.ok(visible.includes(service.name), route);
      assert.ok(visible.includes(service.description), route);
    } else assert.equal(service, undefined);
    assert.doesNotMatch(raw, /aggregateRating|reviewCount|priceCurrency|ProfessionalService/);
  }
});

test("every local page, anchor, image, stylesheet and script reference resolves", async () => {
  for (const [route, html] of [...documents, ["/404.html", await read("404.html")]]) {
    // Keep script tags with src, but exclude serialized React payloads from scanning.
    const markup = html.replace(/(<script\b[^>]*>)[\s\S]*?<\/script>/gi, "$1</script>");
    for (const tag of tags(markup, "(?:a|link|img|source|script)")) {
      const refs = [tag.href, tag.src, ...(tag.srcset?.split(",").map((item) => item.trim().split(/\s+/)[0]) ?? [])].filter(Boolean);
      for (const reference of refs) {
        const url = new URL(reference, `${origin}${route}`);
        if (url.origin !== origin) continue;
        const info = await stat(localFile(url)).catch(() => null);
        assert.ok(info?.isFile(), `${route} references missing ${reference}`);
        if (url.hash) {
          const destination = documents.get(url.pathname);
          assert.ok(destination, `${reference}: anchor destination is not a page`);
          assert.ok(tags(noScripts(destination), "[a-z][a-z0-9]*").some((item) => item.id === decodeURIComponent(url.hash.slice(1))), `${route} has broken anchor ${reference}`);
        }
      }
    }
    assert.doesNotMatch(markup, /\/(?:_vinext|_next)\/image\?|chatgpt\.site|localhost|127\.0\.0\.1|\/api\//);
  }
});

test("responsive image descriptors and intrinsic dimensions match real files", async () => {
  for (const [name, source] of Object.entries(heroImages)) {
    for (const width of source.widths) {
      const file = path.join(staticDirectory, `optimized/${name}-${width}.webp`);
      const image = await sharp(file).metadata();
      assert.equal(image.width, width);
      assert.equal(image.format, "webp");
      assert.ok((await stat(file)).size < 80000);
    }
    const image = await sharp(path.join(staticDirectory, source.src)).metadata();
    assert.equal(image.width, source.width);
    assert.equal(image.height, source.height);
  }
  const icon = await sharp(path.join(staticDirectory, "optimized/icon-48.png")).metadata();
  assert.equal(icon.width, 48);
  assert.ok((await stat(path.join(staticDirectory, "optimized/icon-48.png"))).size < 6000);
});

test("social previews, app icons, directory links and CSS/JS dependencies exist", async () => {
  for (const html of documents.values()) {
    const image = tags(html, "meta").find((tag) => tag.property === "og:image")?.content;
    assert.ok(image, "Missing social preview");
    await stat(localFile(new URL(image, origin)));
  }
  const manifest = JSON.parse(await read("manifest.webmanifest"));
  for (const icon of manifest.icons) {
    const metadata = await sharp(localFile(new URL(icon.src, origin))).metadata();
    assert.equal(`${metadata.width}x${metadata.height}`, icon.sizes);
  }
  for (const [, href] of (await read("llms.txt")).matchAll(/\]\((https:\/\/creax\.digital[^)]*)\)/g)) {
    assert.ok(documents.has(new URL(href).pathname), href);
  }
  const directory = path.join(staticDirectory, "_next/static");
  for (const file of await readdir(path.join(directory, "chunks"))) {
    if (!file.endsWith(".js")) continue;
    const source = await read(`_next/static/chunks/${file}`);
    for (const [, specifier] of source.matchAll(/\b(?:from|import)\s*(?:\(\s*)?["']([^"']+)["']/g)) {
      if (!specifier.startsWith(".") && !specifier.startsWith("/")) continue;
      await stat(localFile(new URL(specifier, `${origin}/_next/static/chunks/${file}`)));
    }
  }
  for (const file of await readdir(path.join(directory, "css"))) {
    const source = await read(`_next/static/css/${file}`);
    for (const [, reference] of source.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
      const url = new URL(reference, `${origin}/_next/static/css/${file}`);
      if (url.origin === origin) await stat(localFile(url));
    }
  }
});

test("static HTTP works for direct visits, crawlers and missing routes without a backend", async () => {
  for (const route of routes) {
    const response = await fetch(`${address}${route}`, { headers: { "User-Agent": "Googlebot", "Accept-Language": "de-DE" } });
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get("content-type"), /text\/html/);
    assert.equal(await response.text(), documents.get(route));
  }
  const redirect = await fetch(`${address}/ru/products?utm_source=test`, { redirect: "manual" });
  assert.equal(redirect.status, 301);
  assert.equal(redirect.headers.get("location"), "/ru/products/?utm_source=test");
  for (const route of ["/missing-page/", "/ru/missing/", "/fr/", "/assets/missing.png"]) {
    const response = await fetch(`${address}${route}`);
    assert.equal(response.status, 404, route);
    const html = await response.text();
    assert.match(html, /Page not found/);
    assert.ok(tags(html, "meta").some((tag) => tag.name === "robots" && tag.content.includes("noindex")));
  }
  for (const file of ["robots.txt", "sitemap.xml", "llms.txt", "manifest.webmanifest"]) assert.equal((await fetch(`${address}/${file}`)).status, 200, file);
});

test("the deployable artifact stays within its size budgets and excludes source/server files", async () => {
  const walk = async (folder) => {
    const result = [];
    for (const item of await readdir(folder, { withFileTypes: true })) {
      const file = path.join(folder, item.name);
      assert.ok(!item.isSymbolicLink());
      if (item.isDirectory()) result.push(...await walk(file)); else result.push(file);
    }
    return result;
  };
  const files = await walk(staticDirectory);
  let total = 0;
  let compressedJs = 0;
  for (const file of files) {
    const relative = path.relative(staticDirectory, file);
    assert.doesNotMatch(relative, /(?:^|\/)(?:node_modules|server|\.env|\.git|\.openai)(?:\/|$)|\.(?:ts|tsx|map|mp4)$/);
    const buffer = await readFile(file);
    total += buffer.length;
    if (file.endsWith(".js")) compressedJs += gzipSync(buffer).length;
    if (file.endsWith(".html")) assert.ok(gzipSync(buffer).length < 40000, relative);
  }
  assert.ok(total < 3 * 1024 * 1024, `Artifact grew to ${total} bytes`);
  assert.ok(compressedJs < 180000, `Client JS grew to ${compressedJs} gzip bytes`);
  console.log(`Artifact: ${(total / 1024 / 1024).toFixed(2)} MiB; all JS: ${(compressedJs / 1024).toFixed(1)} KiB gzip.`);
});
