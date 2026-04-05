import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/bai-dang',
        destination: '/posts'
      }
    ]
  }
};

export default nextConfig;
