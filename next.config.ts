import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    middlewarePrefetch: 'strict',
  },
};

export default nextConfig;
