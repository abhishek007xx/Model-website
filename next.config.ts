import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    // Allow optimization of local portfolio images
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
  },
};

export default nextConfig;
