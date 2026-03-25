import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import '../index.css'; // Sørger for at Tailwind styles lastes
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    template: '%s | Averdi',
    default: 'Averdi - Statsautorisert regnskapsførerselskap i Nord-Norge',
  },
  description: 'Averdi er et statsautorisert regnskapsførerselskap med base i Karasjok. Vi hjelper organisasjoner, småbedrifter og handel i Tiltakssonen med regnskap, lønn og økonomisk rådgivning.',
  keywords: ['regnskapsfører', 'Finnmark', 'Karasjok', 'tiltakssonen', 'lønn', 'årsoppgjør', 'sametinget tilskudd'],
  openGraph: {
    type: 'website',
    locale: 'nb_NO',
    url: 'https://averdi.no',
    siteName: 'Averdi',
    images: [
      {
        url: '/logo_thumbail.avif', // Sørg for at denne finnes i public/ mappen
        width: 1200,
        height: 630,
        alt: 'Averdi - Trygg økonomistyring',
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
    <html lang="nb" className="scroll-smooth">
      <body className={cn(inter.variable, "font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col")}>
        {/* Navbar vises øverst på alle sider */}
        <Navbar />
        
        {/* Hovedinnholdet (siden du besøker) */}
        {children}
        
        {/* Footer vises nederst på alle sider */}
        <Footer />
      </body>
    </html>
  );
}