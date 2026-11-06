import type { Metadata } from 'next';
import Image from 'next/image';
import { Brygada_1918, Figtree } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AppSidebar, AppTabBar } from '@/components/modules/app/AppNav';
import { AppLinkScope } from '@/components/modules/app/AppLinkScope';
import { AppCopyProvider } from '@/components/modules/app/AppCopy';
import { appCopy, clientCopy } from '@/i18n/app-copy';
import { APP_ROOT_ID, THEME_INIT_SCRIPT } from '@/components/modules/app/theme';
import '@/components/modules/app/app-theme.css';

const figtree = Figtree({ subsets: ['latin', 'latin-ext'], variable: '--font-figtree', display: 'swap' });
const brygada = Brygada_1918({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '700'],
  variable: '--font-brygada',
  display: 'swap',
});

// The app re-presents listings that have their own /travel pages, so it stays
// out of search results until that is decided. Links are still followed.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

/**
 * Shell for the /app section: the event-discovery layout modelled on EVE's
 * web app. Sidebar on desktop, tab bar on phones, and the landscape photo
 * behind everything in the default theme. The site navbar and footer are left
 * out for this path in RootLayoutContent. Text follows the page language;
 * listing data stays English.
 */
export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const copy = appCopy((await params).lang);
  return (
    <div
      id={APP_ROOT_ID}
      data-app-theme="fjord"
      suppressHydrationWarning
      className={cn(
        figtree.variable,
        brygada.variable,
        'nt-app relative isolate min-h-screen bg-app-bg font-app text-app-ink antialiased'
      )}
    >
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      <div className="app-photo pointer-events-none absolute inset-x-0 top-0 -z-10 h-screen" aria-hidden="true">
        <Image
          src="/images/lofoten/landscapes/lofoten-landscape-hero_jorn-eriksen.jpg"
          alt=""
          fill
          priority
          quality={60}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-app-bg/50 via-app-bg/80 to-app-bg" />
      </div>

      <AppCopyProvider copy={clientCopy(copy)}>
        <AppLinkScope>
          <AppSidebar />
          <div className="pb-24 lg:pb-10 lg:pl-64">{children}</div>
          <AppTabBar />
        </AppLinkScope>
      </AppCopyProvider>
    </div>
  );
}
