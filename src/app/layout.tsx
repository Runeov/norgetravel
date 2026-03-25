import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../index.css';
import { cn } from '@/lib/utils';
import { RootLayoutContent } from '@/components/layout/RootLayoutContent';
import { getSiteUrl } from '@/lib/site-url';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | NorgeTravel',
    default: 'NorgeTravel.com – Sustainable Arctic Adventures, Fjord Cruises & Northern Lights Tours',
  },
  description: 'Discover Norway\'s most breathtaking experiences. Expert guides for Northern Lights tours in Tromsø, sustainable fjord cruises, luxury Arctic trekking, and remote cabin stays across Norway.',
  keywords: [
    'Norway travel',
    'Northern Lights tours Tromsø',
    'Norway fjord cruises',
    'Arctic adventures Norway',
    'sustainable travel Norway',
    'Lofoten trekking',
    'Svalbard expeditions',
    'NorgeTravel',
  ],
  icons: {
    icon: '/logo_thumbail.avif',
    shortcut: '/logo_thumbail.avif',
    apple: '/logo_thumbail.avif',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'NorgeTravel.com – Sustainable Arctic Adventures',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={cn(inter.variable, "font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col")}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:border-2 focus:border-black focus:rounded focus:shadow-lg"
        >
          Skip to main content
        </a>
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  );
}
