import type { NextConfig } from "next";

// Sitio 100% estático (sin servidor): `next build` genera la carpeta /out lista para
// Netlify, Cloudflare Pages, Vercel o cualquier hosting estático.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true }, // las imágenes ya están optimizadas (webp) en /public/img
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
