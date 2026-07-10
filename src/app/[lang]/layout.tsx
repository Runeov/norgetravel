import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '@/index.css';
import { cn } from '@/lib/utils';
import { RootLayoutContent } from '@/components/layout/RootLayoutContent';
import { getSiteUrl } from '@/lib/site-url';
import { getDictionary } from '@/i18n/get-dictionary';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const siteUrl = getSiteUrl();

// 1. Viewport is handled separately in Next.js 15+
export const viewport: Viewport = {
  themeColor: '#1B3A5C',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';

  if (lang === 'zh') {
    return {
      metadataBase: new URL(siteUrl),
      title: {
        template: '%s | 挪威旅行 (NorgeTravel)',
        default: '挪威旅行 2026 – 午夜太阳探险、峡湾游轮与北极徒步',
      },
      description: '2026年挪威旅行的权威指南。拥有当地专家见解的午夜太阳皮划艇、零排放峡湾游轮、冰川徒步及可持续的北极探险。',
      keywords: [
        '挪威旅游',
        '挪威峡湾',
        '挪威徒步指南',
        '挪威午夜太阳',
        '去挪威旅游',
        '北极峡湾皮划艇',
        '挪威极光',
        '特罗姆瑟旅游',
        '斯瓦尔巴群岛',
        'NorgeTravel',
      ],
      icons: {
        icon: '/norgeTravel_noText.png',
        shortcut: '/norgeTravel_noText.png',
        apple: '/norgeTravel_noText.png',
      },
      openGraph: {
        type: 'website',
        locale: 'zh_CN',
        url: siteUrl,
        siteName: 'NorgeTravel',
        images: [{ url: '/og-image-2026.jpg', width: 1200, height: 630, alt: '挪威峡湾上空的北极光' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: '挪威旅行 2026 | 北极探险',
        description: '提供午夜太阳探险、峡湾游轮和可持续的挪威旅游专家指南。',
        images: ['/og-image-2026.jpg'],
      },
    };
  }

  return {
    metadataBase: new URL(siteUrl),
    title: {
      template: '%s | NorgeTravel.com',
      default: 'NorgeTravel 2026 – Midnight Sun Adventures, Fjord Cruises & Arctic Hiking',
    },
    description: 'The definitive guide to Norge travel in 2026. Midnight sun kayaking, zero-emission fjord cruises, glacier hikes, and sustainable Arctic adventures with expert local insights.',
    keywords: [
      'Norge travel 2026',
      'Norge fjords',
      'Norge hiking guides',
      'Norge midnight sun',
      'Travel to Norge',
      'Arctic fjord kayaking summer',
      'Zero-emission Norge fjord cruises',
      'Lofoten midnight sun hiking',
      'Sustainable Arctic travel 2026',
      'Norge glacier hiking',
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
      images: [{ url: '/og-image-2026.jpg', width: 1200, height: 630, alt: 'Northern Lights over a Norwegian Fjord' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'NorgeTravel 2026 | Arctic Summer Adventures',
      description: 'Expert guides for midnight sun adventures, fjord cruises, and sustainable Norway travel.',
      images: ['/og-image-2026.jpg'],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = (resolvedParams.lang || 'en') as 'en' | 'zh';
  const dict = await getDictionary(lang);
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
    <html lang={lang} className="scroll-smooth">
      <head>
        {/* Injecting Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Affiliate ownership verification — Emerald */}
        <Script
          src="https://emrld.ltd/NTE0MTc1.js?t=514175"
          strategy="afterInteractive"
        />
      </head>
      <body suppressHydrationWarning className={cn(
        inter.variable, 
        "font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col"
      )}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:border-2 focus:border-black focus:rounded focus:shadow-lg"
        >
          Skip to main content
        </a>
        <RootLayoutContent dict={dict.navigation}>
          <main id="main-content">
            {children}
          </main>
        </RootLayoutContent>
        {lang !== 'zh' && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
};