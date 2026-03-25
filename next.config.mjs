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

  images: {
    qualities: [75, 85, 90],
  },
};

export default nextConfig;
