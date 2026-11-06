import { EventsCalendarPage } from '@/components/modules/events/EventsCalendarPage';
import { CALENDAR_COPY } from '@/i18n/events-copy';
import { localizedMetadata } from '@/lib/i18n-seo';

// Hourly, so "On now" and ended events follow the date without a redeploy
export const revalidate = 3600;

export const generateMetadata = localizedMetadata('travel/events', {
  title: CALENDAR_COPY.upcoming.title,
  description: CALENDAR_COPY.upcoming.description,
});

export default function EventsPage() {
  return <EventsCalendarPage window="upcoming" />;
}
