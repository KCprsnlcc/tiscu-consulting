import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    middlewarePrefetch: 'strict',
  },
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
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
