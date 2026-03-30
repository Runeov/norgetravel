import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import '../index.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    template: '%s | NorgeTravel',
    default: 'Travel Guide | NorgeTravel.com',
  },
  description: 'Expert travel guides for Norway — Northern Lights, fjord cruises, Arctic trekking, and remote cabin stays.',
  keywords: ['Norway travel guide', 'Northern Lights', 'fjord cruises', 'Arctic adventures', 'Lofoten', 'Svalbard'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://norgetravel.com',
    siteName: 'NorgeTravel.com',
    images: [
      {
        url: '/norgeTravel.png',
        width: 1200,
        height: 630,
        alt: 'NorgeTravel.com — The Real Norway, Unfiltered',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.variable, "font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col")}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
