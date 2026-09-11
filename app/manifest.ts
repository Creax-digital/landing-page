import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CREAX.digital",
    short_name: "CREAX",
    description: "AI content, digital products and intelligent automation.",
    start_url: "/",
    display: "standalone",
    background_color: "#050607",
    theme_color: "#050607",
    icons: [192, 512].map((size) => ({ src: `/optimized/icon-${size}.png`, sizes: `${size}x${size}`, type: "image/png" })),
  };
}
