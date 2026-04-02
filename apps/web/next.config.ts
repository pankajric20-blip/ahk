import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@aihkya/db"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Security: restrict which external image domains can be loaded via <Image>
  // Add any CDN or logo hosting domains your tools use here.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Broad fallback — tighten to specific CDN hosts when known
      },
    ],
  },
  // Security headers
  async headers() {
    return [
      // Security headers for all routes
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            // Enforce HTTPS for 1 year; include subdomains
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
      // Cache Next.js static bundles (JS/CSS) forever — they are fingerprinted
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache public images/icons for 7 days
      {
        source: "/:file(.*\\.(?:png|jpg|jpeg|svg|ico|webp|gif))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
