import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
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
