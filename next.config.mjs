/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // Turbopack configuration
  turbopack: {},

  reactCompiler: true,
  serverExternalPackages: ["@upstash/redis"],

  experimental: {
    // Enable Turbopack filesystem caching for faster dev startup
    turbopackFileSystemCacheForDev: true,
  },
};

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
