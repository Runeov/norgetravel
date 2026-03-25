import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dette peker Next.js til riktig rotmappe for å løse "inferred workspace root" warning
  outputFileTracingRoot: __dirname,

  // Next.js 15: `experimental.serverComponentsExternalPackages` -> `serverExternalPackages`
  serverExternalPackages: ['chart.js'],

  reactStrictMode: true,

  // Enable static export for GitHub Pages
  output: process.env.EXPORT === 'true' ? 'export' : undefined,

  // Set basePath for GitHub Pages (if needed)
  basePath: process.env.BASE_PATH || '',

  images: {
    qualities: [75, 85, 90],
    // Uncomment the following line if using GitHub Pages with a custom domain or subdirectory
    // unoptimized: true,
  },
};

export default nextConfig;
