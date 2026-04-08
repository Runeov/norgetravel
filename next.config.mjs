/** @type {import('next').NextConfig} */
const nextConfig = {
  // Stable in v15+: Renamed from experimental.serverComponentsExternalPackages
  serverExternalPackages: ['chart.js'],

  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // SEO: Ensure clean URLs by removing the .html extension
  trailingSlash: true,
};

export default nextConfig;