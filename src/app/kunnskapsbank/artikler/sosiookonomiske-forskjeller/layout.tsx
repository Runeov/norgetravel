import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Den usynlige skatten i Nord | Averdi Innsikt',
  description:
    'En interaktiv, Instagram-lignende samling av korte innlegg — en humoristisk, skarp regnskapsvinkel på alvorlige problemer i nord.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
