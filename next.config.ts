import type { NextConfig } from "next";
import path from "path";

/**
 * Where /api/v1/* goes when the AWS load balancer isn't routing it to the API directly (Amplify, local
 * `npm run dev`). Unset in environments where the ALB/CloudFront path rule sends /api/v1/* to the API.
 */
const apiOrigin = process.env.API_ORIGIN?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    return apiOrigin ? [{ source: "/api/v1/:path*", destination: `${apiOrigin}/api/v1/:path*` }] : [];
  },
  // "How it works" was retired; keep old links working.
  async redirects() {
    return [{ source: "/how-it-works", destination: "/features", permanent: true }];
  },
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
};

export default nextConfig;
