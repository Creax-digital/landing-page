import { mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { heroImages } from "../lib/media-config.mjs";

const output = new URL("../public/optimized/", import.meta.url);
// This fixed directory contains only derived files created by this script.
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

// Derived build assets only: original artwork stays untouched.
for (const [name, source] of Object.entries(heroImages)) {
  for (const width of source.widths) {
    await sharp(fileURLToPath(new URL(`../public${source.src}`, import.meta.url)))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(fileURLToPath(new URL(`${name}-${width}.webp`, output)));
  }
}
for (const size of [48, 180, 192, 512]) {
  await sharp(fileURLToPath(new URL("../public/favicon.png", import.meta.url)))
    .resize(size, size)
    .png({ palette: true, compressionLevel: 9 })
    .toFile(fileURLToPath(new URL(`icon-${size}.png`, output)));
}
await sharp(fileURLToPath(new URL("../public/og.png", import.meta.url)))
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(fileURLToPath(new URL("og.jpg", output)));
console.log("Prepared responsive WebP images, compact icons, and social preview.");
