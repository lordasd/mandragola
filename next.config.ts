import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  experimental: {
    // Two root layouts ((en) and (he)) -> unmatched URLs need app/global-not-found.tsx
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Optimized images are content-addressed by query; cache them for 31 days instead of revalidating.
    minimumCacheTTL: 2678400,
  },
  async headers() {
    return [
      {
        // Demo build: keep every response out of search indexes (assignment rule)
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        // Logos/photos in public/images rarely change: 1 day fresh, then serve stale while revalidating.
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
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
