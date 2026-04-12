import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Revalidate the whole page every 24 hours so Google ratings stay current without a manual deploy
export const revalidate = 86400;
import { ArrowRight, MapPin, Clock, Thermometer } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { TromsoCityTabs } from '@/components/modules/destinations/TromsoCityTabs';
import { RestaurantGrid } from '@/components/modules/destinations/RestaurantGrid';
import { experiencesStore } from '@/lib/admin/travel-experiences';
import { eventsStore } from '@/lib/admin/travel-events';
import { accommodationStore } from '@/lib/admin/travel-accommodation';
import { guidesStore } from '@/lib/admin/travel-guides';
import { tromso } from '@/data/city-guides/tromso';
import { fetchGoogleRatings } from '@/lib/google-places';
import { CITY_EXPERIENCE_PREFIXES } from '@/lib/city-experience-prefixes';

export const metadata: Metadata = {
  title: tromso.metaTitle,
  description: tromso.metaDescription,
};

export default async function TromsoPage() {
  // Collect Place IDs for restaurants that have one configured
  const placeIds = tromso.restaurants
    .map((r) => r.placeId)
    .filter((id): id is string => Boolean(id));

  const [activities, events, accommodation, tours, liveRatings] = await Promise.all([
    experiencesStore.filterByIdPrefixes(CITY_EXPERIENCE_PREFIXES['tromso']),
    eventsStore.filterByDestination('northern-norway'),
    accommodationStore.filterByDestination('northern-norway'),
    guidesStore.filterByDestination('northern-norway'),
    fetchGoogleRatings(placeIds),
  ]);

  // Merge live Google ratings over stored fallback data
  const restaurants = tromso.restaurants.map((r) => {
    const live = r.placeId ? liveRatings[r.placeId] : null;
    if (!live) return r;
    return {
      ...r,
      ratings: {
        ...r.ratings,
        google: { score: live.score, reviewCount: live.reviewCount },
      },
    };
  });

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white -mt-20 pt-20">
        <Image
          src={tromso.heroImageSrc}
          alt={tromso.heroImageAlt}
          fill
          priority
          quality={60}
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/85" />
        <div className="relative z-10 container mx-auto px-4 py-32 lg:py-48">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00CC6A]/20 text-[#00CC6A] text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            {tromso.taglineBadge}
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">{tromso.heroHeadline}</h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">{tromso.heroBody}</p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            {tromso.heroStats.map((stat) => (
              <span key={stat.text} className="flex items-center gap-2">
                {stat.icon === 'map-pin' && <MapPin className="w-4 h-4 text-[#5CBFEE]" aria-hidden="true" />}
                {stat.icon === 'thermometer' && <Thermometer className="w-4 h-4 text-[#5CBFEE]" aria-hidden="true" />}
                {stat.icon === 'clock' && <Clock className="w-4 h-4 text-[#00CC6A]" aria-hidden="true" />}
                {(stat.icon === 'moon' || stat.icon === 'sun') && (
                  <span className="w-4 h-4 text-center text-xs">{stat.icon === 'moon' ? '🌙' : '☀️'}</span>
                )}
                {stat.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-16 bg-[#1B3A5C] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {tromso.facts.map((f) => (
              <div key={f.label} className="text-center">
                <p className="text-[#00CC6A] text-xs font-bold uppercase tracking-wider mb-1">
                  {f.label}
                </p>
                <p className="font-bold text-sm">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to visit */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">When to visit Tromsø</h2>
          <p className="text-slate-600 mb-10 max-w-2xl">
            Tromsø runs on light. What you can do — and see — changes completely by season.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tromso.seasonalWindows.map((w) => (
              <div
                key={w.label}
                className="border border-slate-200 rounded-lg p-6"
              >
                <p className="text-xs font-bold text-[#1B3A5C] uppercase tracking-wider mb-1">
                  {w.months}
                </p>
                <h3 className="font-bold text-slate-900 mb-3">{w.label}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{w.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities tabs */}
      <section className="relative py-20 overflow-hidden">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Explore Tromsø</h2>
          <p className="text-slate-600 mb-12 max-w-2xl">
            Activities, events, accommodation, and guided tours from licensed operators.
          </p>
          <TromsoCityTabs
            activities={activities}
            events={events}
            accommodation={accommodation}
            tours={tours}
            fallbackActivities={tromso.experiences}
          />
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Where to eat in Tromsø
          </h2>
          <p className="text-slate-600 mb-10 max-w-2xl">
            Five restaurants worth your time — from the cod tongue pub that predates the
            tourist industry to the tasting menu that put Arctic ingredients on the map.
          </p>
          <RestaurantGrid restaurants={restaurants} cityName="Troms\u00F8" />
        </div>
      </section>

      {/* Getting there */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">How to get to Tromsø</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">✈️</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Direct flights from Oslo (OSL) to Tromsø (TOS)</p>
                <p className="text-slate-600 text-sm mb-3">
                  SAS and Norwegian fly multiple times daily. Flight time: 2 hours. Fares from
                  NOK 799 return in shoulder season. Book 6-8 weeks ahead for winter aurora season.
                </p>
                <a
                  href="https://www.kiwi.com/deep?from=OSL&to=TOS"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Search flights <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Hurtigruten coastal ferry</p>
                <p className="text-slate-600 text-sm mb-3">
                  Tromsø is a stop on the Bergen-Kirkenes coastal route. The northbound sailing
                  arrives at 14:30 and departs at 18:30. 12-hour transit from Bergen to Tromsø
                  by Hurtigruten is not realistic. Fly in, sail a segment out.
                </p>
                <a
                  href="https://www.hurtigruten.com/en"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Browse sailings <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">🚗</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Driving — E8 from Finland or E6 from the south</p>
                <p className="text-slate-600 text-sm mb-3">
                  From Narvik via E6: 3.5 hours (209 km). From the Finnish border (Skibotn) via
                  E8: 2 hours. Winter driving requires studded tyres. Norwegian law between
                  November 1 and first Sunday after Easter in Nord-Norge.
                </p>
                <a
                  href="https://www.discovercars.com/?pos=TOS"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Compare car rentals <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">🚌</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Express bus from Narvik</p>
                <p className="text-slate-600 text-sm mb-3">
                  The Tromskortet express runs Narvik-Tromsø in 4 hours with multiple daily
                  departures. Narvik has direct rail connections from Stockholm
                  via the Ofoten Line. A scenic entry point for train travellers.
                </p>
                <a
                  href="https://svipper.no"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Book on Svipper <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to book Tromsø?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Northern Lights tours, whale safaris, and Arctic trekking — all with
            commission-transparent affiliate links.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tjenester/northern-lights"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-md hover:shadow-lg transition-all"
            >
              Northern Lights Tours <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/destinations/northern-norway"
              className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-bold rounded-md hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              All Northern Norway
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
