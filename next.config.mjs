/** @type {import('next').NextConfig} */
const nextConfig = {
  // Stable in v15+: Renamed from experimental.serverComponentsExternalPackages
  serverExternalPackages: ['chart.js'],

  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75, 85],
  },

  // SEO: Ensure clean URLs by removing the .html extension
  trailingSlash: true,

  async redirects() {
    return [
      {
        source: '/travel-guides/:path*',
        destination: '/travel-guides/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;