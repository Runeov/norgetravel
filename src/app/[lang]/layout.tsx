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
import { asLocale, HTML_LANG, localeUrl, OG_LOCALE, SITE_NAME, type Locale } from '@/lib/i18n-seo';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const siteUrl = getSiteUrl();

// 1. Viewport is handled separately in Next.js 15+
export const viewport: Viewport = {
  themeColor: '#1B3A5C',
  width: 'device-width',
  initialScale: 1,
};

// Per-locale defaults. Chinese and Japanese titles lead with 挪威旅游攻略 and
// ノルウェー旅行, the head search terms that the brand name translates to.
const LOCALE_META: Record<Locale, {
  title: string;
  description: string;
  keywords: string[];
  ogAlt: string;
  twitterTitle: string;
}> = {
  en: {
    title: 'Norge Travel | Norway Travel Guides from Local Experts',
    description: 'Norway travel guides from local experts: Northern Lights, fjord cruises, Arctic hiking, winter driving and sustainable places to stay.',
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
      'Norge travel',
      'Norge northern lights',
      'Norge fjords',
      'Norge Lofoten',
      'Norge Tromsø',
      'Norge Norway travel guide',
      'Norge Travel',
      'NorgeTravel',
    ],
    ogAlt: 'Northern Lights over Otertind in Signaldalen, Northern Norway',
    twitterTitle: 'Norge Travel | Arctic Norway Travel Guides',
  },
  zh: {
    title: '挪威旅游攻略 | Norge Travel 挪威旅行',
    description: '住在挪威的编辑撰写的挪威旅游攻略：哪里看极光、峡湾自驾与渡轮、罗弗敦群岛、旅行费用和最佳旅行时间。',
    keywords: [
      '挪威旅游',
      '挪威旅游攻略',
      '挪威旅行',
      '挪威自由行',
      '挪威极光',
      '特罗姆瑟极光',
      '挪威峡湾',
      '罗弗敦群岛',
      '斯瓦尔巴群岛',
      '挪威旅游费用',
      '挪威旅游最佳时间',
      'Norge Travel',
      '挪威 Norge',
      'NorgeTravel',
    ],
    ogAlt: '挪威北部西格纳尔山谷奥特廷峰上空的北极光',
    twitterTitle: '挪威旅游攻略 | Norge Travel 挪威旅行',
  },
  ja: {
    title: 'ノルウェー旅行・観光ガイド | Norge Travel ノルウェー旅行',
    description: 'ノルウェーに住む編集者が書くノルウェー旅行ガイド。オーロラの時期と場所、フィヨルドのフェリーとドライブ、ロフォーテン諸島、旅行費用とベストシーズン。',
    keywords: [
      'ノルウェー旅行',
      'ノルウェー観光',
      'ノルウェー オーロラ',
      'トロムソ オーロラ',
      'ノルウェー フィヨルド',
      'ロフォーテン諸島',
      'ノルウェー旅行 費用',
      'ノルウェー ベストシーズン',
      'Norge Travel',
      'NorgeTravel',
    ],
    ogAlt: 'ノルウェー北部シグナルダーレンのオーテルティン山にかかるオーロラ',
    twitterTitle: 'ノルウェー旅行・観光ガイド | Norge Travel ノルウェー旅行',
  },
};

// Ownership tags for Google Search Console, Baidu Search Resource Platform and
// Bing Webmaster Tools. Set as env vars so adding one needs no code change.
function siteVerification(): Metadata['verification'] {
  const other = Object.fromEntries(
    Object.entries({
      'baidu-site-verification': process.env.BAIDU_SITE_VERIFICATION,
      'msvalidate.01': process.env.BING_SITE_VERIFICATION,
    }).filter((entry): entry is [string, string] => !!entry[1])
  );
  return {
    ...(process.env.GOOGLE_SITE_VERIFICATION && { google: process.env.GOOGLE_SITE_VERIFICATION }),
    ...(Object.keys(other).length > 0 && { other }),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = asLocale((await params).lang);
  const meta = LOCALE_META[locale];

  return {
    metadataBase: new URL(siteUrl),
    verification: siteVerification(),
    title: {
      // Page titles already carry the brand ("… | NorgeTravel"), so no suffix here
      template: '%s',
      default: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    icons: {
      icon: '/norgeTravel_noText.png',
      shortcut: '/norgeTravel_noText.png',
      apple: '/norgeTravel_noText.png',
    },
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[locale],
      url: localeUrl(locale, ''),
      siteName: SITE_NAME[locale],
      images: [{ url: '/og-image-2026.jpg', width: 1200, height: 630, alt: meta.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.twitterTitle,
      description: meta.description,
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
  const lang = asLocale(resolvedParams.lang);
  const dict = await getDictionary(lang);
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Norge Travel',
    'alternateName': ['NorgeTravel', 'NorgeTravel.com', '挪威旅行', 'ノルウェー旅行'],
    'url': `${siteUrl}/`,
    'inLanguage': ['en', 'zh-Hans', 'ja'],
  };
  // 2. JSON-LD Structured Data (Organization & Travel Agency)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    'name': 'NorgeTravel.com',
    'alternateName': ['Norge Travel', '挪威旅行', 'ノルウェー旅行'],
    'url': siteUrl,
    'logo': `${siteUrl}/norgeTravel.jpg`,
    'description': 'Leading provider of sustainable Arctic adventures and Northern Lights tours for the 2026 season.',
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'NO',
    },
    'areaServed': 'Norway',
    'priceRange': '$$ - $$$',
  };

  return (
    <html lang={HTML_LANG[lang]} className="scroll-smooth">
      <head>
        {/* Injecting Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
          {dict.navigation.skipToContent}
        </a>
        <RootLayoutContent dict={dict.navigation} footerDict={dict.footer}>
          <main id="main-content">
            {children}
          </main>
        </RootLayoutContent>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};