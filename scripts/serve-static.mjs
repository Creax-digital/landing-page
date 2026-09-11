import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const staticDirectory = fileURLToPath(new URL("../dist/github-pages/", import.meta.url));
const mimeTypes = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".rsc": "text/x-component", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".webmanifest": "application/manifest+json", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml" };

// No application server and no SPA fallback: files, directory redirects, real 404s.
export function createStaticServer() {
  return createServer(async (request, response) => {
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405, { Allow: "GET, HEAD" }).end();
      return;
    }
    let pathname;
    try { pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname); }
    catch { response.writeHead(400).end(); return; }
    const target = path.resolve(staticDirectory, `.${pathname}`);
    if (!target.startsWith(`${staticDirectory.replace(/\/$/, "")}${path.sep}`) && target !== staticDirectory.replace(/\/$/, "")) {
      response.writeHead(400).end(); return;
    }
    try {
      const info = await stat(target);
      if (info.isDirectory() && !pathname.endsWith("/")) {
        const url = new URL(request.url, "http://localhost");
        response.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end();
        return;
      }
      const file = info.isDirectory() ? path.join(target, "index.html") : target;
      const body = await readFile(file);
      response.writeHead(200, { "Content-Type": mimeTypes[path.extname(file)] ?? "application/octet-stream", "Content-Length": body.length });
      response.end(request.method === "HEAD" ? undefined : body);
    } catch {
      const body = await readFile(path.join(staticDirectory, "404.html")).catch(() => Buffer.from("Not found"));
      response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      response.end(request.method === "HEAD" ? undefined : body);
    }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4173);
  createStaticServer().listen(port, "127.0.0.1", () => console.log(`Static preview: http://127.0.0.1:${port}/ru/`));
}
