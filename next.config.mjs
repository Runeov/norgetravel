/** @type {import('next').NextConfig} */
const nextConfig = {
  // Stable in v15+: Renamed from experimental.serverComponentsExternalPackages
  serverExternalPackages: ['chart.js'],

  reactStrictMode: true,

  // Force static export for GitHub Pages compatibility
  output: 'export', 

  // Dynamically handle repo-name subpaths for GitHub Pages
  // If using a custom domain (e.g., NorgeTravel.com), keep this as ''
  basePath: process.env.NODE_ENV === 'production' ? '' : '',

  images: {
    // REQUIRED for 'output: export': GitHub Pages does not have a 
    // runtime server to resize images on the fly.
    unoptimized: true, 
    formats: ['image/avif', 'image/webp'],
  },

  // SEO: Ensure clean URLs by removing the .html extension
  trailingSlash: true,
};

export default nextConfig;