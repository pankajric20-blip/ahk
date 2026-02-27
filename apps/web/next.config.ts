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
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
