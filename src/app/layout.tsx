import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '../index.css';
import { cn } from '@/lib/utils';
import { RootLayoutContent } from '@/components/layout/RootLayoutContent';
import { getSiteUrl } from '@/lib/site-url';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const siteUrl = getSiteUrl();

// 1. Viewport is handled separately in Next.js 15+
export const viewport: Viewport = {
  themeColor: '#1B3A5C',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | NorgeTravel.com',
    default: 'NorgeTravel 2026 – Northern Lights Solar Maximum & Sustainable Fjord Cruises',
  },
  description: 'The definitive guide to Norways 2026 Solar Maximum. Experience zero-emission fjord cruises, Tromsø Northern Lights tours, and sustainable Arctic adventures with expert local insights.',
  keywords: [
    'Solar Maximum 2026 Northern Lights',
    'Zero-emission Norway fjord cruises',
    'Sustainable Arctic travel 2026',
    'Tromsø Aurora tours',
    'Norway luxury eco-travel',
    'Lofoten sustainable trekking',
    'NorgeTravel',
  ],
  icons: {
    icon: '/norgeTravel_noText.png',
    shortcut: '/norgeTravel_noText.png',
    apple: '/norgeTravel_noText.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'NorgeTravel.com',
    images: [
      {
        url: '/og-image-2026.jpg', // You should create a high-quality "Aurora + Fjord" image
        width: 1200,
        height: 630,
        alt: 'Northern Lights over a Norwegian Fjord - NorgeTravel 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NorgeTravel 2026 | Arctic Adventures',
    description: 'Expert guides for the 2026 Solar Maximum and Sustainable Norway Travel.',
    images: ['/og-image-2026.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2. JSON-LD Structured Data (Organization & Travel Agency)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    'name': 'NorgeTravel.com',
    'url': siteUrl,
    'logo': `${siteUrl}/norgeTravel.png`,
    'description': 'Leading provider of sustainable Arctic adventures and Northern Lights tours for the 2026 season.',
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'NO',
    },
    'areaServed': 'Norway',
    'priceRange': '$$ - $$$',
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Injecting Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn(
        inter.variable, 
        "font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col"
      )}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:border-2 focus:border-black focus:rounded focus:shadow-lg"
        >
          Skip to main content
        </a>
        <RootLayoutContent>
          <main id="main-content">
            {children}
          </main>
        </RootLayoutContent>
        <Analytics />
      </body>
    </html>
  );
};