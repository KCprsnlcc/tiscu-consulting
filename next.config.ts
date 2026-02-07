import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    proxyPrefetch: 'strict',
  },
  // Enable SSR for better SEO
  output: undefined, // Default is 'standalone' for SSR
  // Redirect non-www to www
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'tiscuconsulting.com',
          },
        ],
        destination: 'https://www.tiscuconsulting.com/:path*',
      },
    ];
  },
};

export default nextConfig;
