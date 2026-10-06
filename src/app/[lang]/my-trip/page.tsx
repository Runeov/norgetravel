import { TripPlannerView } from '@/components/modules/trip-planner/TripPlannerView';
import { localizedMetadata } from '@/lib/i18n-seo';

export const generateMetadata = localizedMetadata('my-trip', {
  title: 'My Trip | NorgeTravel',
  description: 'View and manage your saved Norway trip items. Plan your route across Northern Lights tours, fjord cruises, and Arctic adventures.',
});

export default function MyTripPage() {
  return (
    <section className="min-h-screen bg-slate-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TripPlannerView />
      </div>
    </section>
  );
}
