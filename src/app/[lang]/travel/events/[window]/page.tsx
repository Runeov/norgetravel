import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EventsCalendarPage } from '@/components/modules/events/EventsCalendarPage';
import { CALENDAR_COPY } from '@/i18n/events-copy';
import { CALENDAR_WINDOWS, isCalendarWindow, windowRoute } from '@/lib/event-calendar';
import { brandTitle, localeAlternates, LOCALES } from '@/lib/i18n-seo';

// Hourly, so "On now" and ended events follow the date without a redeploy
export const revalidate = 3600;
export const dynamicParams = false;

interface Props {
  params: Promise<{ lang: string; window: string }>;
}

/** Every window except the default, which is /travel/events itself. */
export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    CALENDAR_WINDOWS.filter((w) => w !== 'upcoming').map((window) => ({ lang, window }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, window } = await params;
  if (!isCalendarWindow(window) || window === 'upcoming') return {};
  const copy = CALENDAR_COPY[window];
  return {
    title: brandTitle(copy.title, lang),
    description: copy.description,
    alternates: localeAlternates(windowRoute(window), lang),
  };
}

export default async function EventsWindowPage({ params }: Props) {
  const { window } = await params;
  if (!isCalendarWindow(window) || window === 'upcoming') notFound();
  return <EventsCalendarPage window={window} />;
}
