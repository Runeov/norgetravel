'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { TripMapProvider } from '@/context/TripMapContext';
import { TripProvider } from '@/context/TripContext';
import { NorwayMapOverlay } from '@/components/modules/trip-map/NorwayMapOverlay';
import { MinimizedTripPlanner } from '@/components/modules/trip-map/MinimizedTripPlanner';

interface RootLayoutContentProps {
  children: React.ReactNode;
}

export function RootLayoutContent({ children }: RootLayoutContentProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  // Admin routes get their own layout without the main site's Navbar/Footer
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Regular pages get the full site layout with Navbar and Footer
  return (
    <TripMapProvider>
      <TripProvider>
        <Navbar />
        <span id="main-content" tabIndex={-1} className="sr-only" />
        {children}
        <Footer />
        <CookieBanner />
        <NorwayMapOverlay />
        <MinimizedTripPlanner />
      </TripProvider>
    </TripMapProvider>
  );
}
