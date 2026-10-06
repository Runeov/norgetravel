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
        source: '/kunnskapsbank/:path*',
        destination: '/travel-guides/:path*',
        permanent: true,
      },
      // Duplicate DNT cabin guides merged into the canonical dnt-cabin-guide
      {
        source: '/:lang(en|zh|ja)/travel-guides/planning/:slug(dnt-cabin-guide-western|dnt-cabin-guide-china|dnt-cabin-guide-combined)',
        destination: '/:lang/travel-guides/planning/dnt-cabin-guide',
        permanent: true,
      },
      {
        source: '/travel-guides/planning/:slug(dnt-cabin-guide-western|dnt-cabin-guide-china|dnt-cabin-guide-combined)',
        destination: '/travel-guides/planning/dnt-cabin-guide',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;