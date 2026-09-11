import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // vinext beta's prerenderer does not follow its own trailing-slash redirects.
  // Export flat HTML first; prepare-static emits GitHub's /path/index.html layout.
  trailingSlash: process.env.CREAX_STATIC_EXPORT !== "1",
  ...(process.env.CREAX_STATIC_EXPORT === "1"
    ? { output: "export" as const, images: { unoptimized: true } }
    : {}),
};

export default nextConfig;
