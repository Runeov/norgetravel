import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowLeft, MapPin, UtensilsCrossed, Mountain, BedDouble } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { getCity, getCityAttractions, getAllCitySlugs } from '@/data/city-attractions';
import { RestaurantGrid } from '@/components/modules/destinations/RestaurantGrid';
import { TravelCard } from '@/components/modules/travel/TravelCard';
import { experiencesStore } from '@/lib/admin/travel-experiences';
import { accommodationStore } from '@/lib/admin/travel-accommodation';
import { CITY_EXPERIENCE_PREFIXES } from '@/lib/city-experience-prefixes';
import { CITY_ACCOMMODATION_TOWNS } from '@/lib/city-accommodation-towns';
import { extractRatings } from '@/lib/ratings';
import type { CityRestaurant } from '@/types/city-guide';

async function getCityRestaurants(citySlug: string): Promise<CityRestaurant[]> {
  const loaders: Record<string, () => Promise<{ [key: string]: CityRestaurant[] }>> = {
    oslo: () => import('@/data/city-guides/restaurants-oslo'),
    bergen: () => import('@/data/city-guides/restaurants-bergen'),
    trondheim: () => import('@/data/city-guides/restaurants-trondheim'),
    stavanger: () => import('@/data/city-guides/restaurants-stavanger'),
    tromso: () => import('@/data/city-guides/restaurants-tromso'),
    alta: () => import('@/data/city-guides/restaurants-alta'),
    bodo: () => import('@/data/city-guides/restaurants-bodo'),
    hammerfest: () => import('@/data/city-guides/restaurants-hammerfest'),
    narvik: () => import('@/data/city-guides/restaurants-narvik'),
    senja: () => import('@/data/city-guides/restaurants-senja'),
    nordkapp: () => import('@/data/city-guides/restaurants-nordkapp'),
    lyngen: () => import('@/data/city-guides/restaurants-lyngen'),
  };
  const loader = loaders[citySlug];
  if (!loader) return [];
  const mod = await loader();
  const exportName = `${citySlug}Restaurants`;
  return (mod as Record<string, CityRestaurant[]>)[exportName] ?? Object.values(mod)[0] ?? [];
}

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({ city: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) return { title: 'City not found | NorgeTravel' };
  return {
    title: `${city.name} Travel Guide 2026 | NorgeTravel`,
    description: city.metaDescription,
  };
}

export default async function CityPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) notFound();

  const cityAttractions = getCityAttractions(citySlug);

  const prefixes = CITY_EXPERIENCE_PREFIXES[citySlug] ?? [];
  const towns = CITY_ACCOMMODATION_TOWNS[citySlug] ?? [];

  const [experiences, accommodation, cityRestaurants] = await Promise.all([
    prefixes.length > 0 ? experiencesStore.filterByIdPrefixes(prefixes) : Promise.resolve([]),
    towns.length > 0 ? accommodationStore.filterByNearestTowns(towns) : Promise.resolve([]),
    getCityRestaurants(citySlug),
  ]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <Image
          src={city.heroImage}
          alt={city.heroImageAlt}
          fill
          priority
          quality={75}
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/80" />
        <div className="relative z-10 container mx-auto px-4 py-32 lg:py-44">
          <Link
            href="/destinations/cities"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            All cities
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00CC6A]/20 text-[#00CC6A] text-sm font-medium mb-6 ml-4">
            <MapPin className="w-4 h-4" />
            City Guide
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 max-w-3xl">
            {city.name}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            {city.heroDescription}
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            {city.stats.map((stat) => (
              <span key={stat.label} className="flex items-center gap-2">
                <span className="text-[#5CBFEE] font-medium">{stat.label}:</span> {stat.value}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Attractions */}
      <section className="relative py-20 overflow-hidden">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">What to see in {city.name}</h2>
          <p className="text-slate-600 mb-12 max-w-2xl">
            {cityAttractions.length} guides with practical info, honest assessments, and no filler.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {cityAttractions.map((attraction) => (
              <Link
                key={attraction.slug}
                href={`/destinations/cities/${citySlug}/${attraction.slug}`}
                className="group bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <p className="text-xs font-semibold text-[#1A365D] uppercase tracking-wide mb-2">
                    {city.name}
                  </p>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#1A365D] transition-colors">
                    {attraction.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium mb-3">{attraction.tagline}</p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {attraction.overview[0]}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {attraction.stats.slice(0, 3).map((stat) => (
                      <span key={stat.label} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-sm">
                        {stat.value}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center text-sm font-semibold text-[#1A365D] group-hover:text-[#00D084] transition-colors">
                    Read full guide
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences & Activities */}
      {experiences.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Mountain className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
              <h2 className="text-3xl font-bold text-slate-900">Things to do in {city.name}</h2>
            </div>
            <p className="text-slate-600 mb-12 max-w-2xl">
              {experiences.length} activities and tours based in {city.name}.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.slice(0, 9).map((exp) => (
                <TravelCard key={exp.id} item={exp} category="experiences" ratings={extractRatings(exp)} />
              ))}
            </div>
            {experiences.length > 9 && (
              <div className="mt-10 text-center">
                <Link
                  href="/travel/experiences"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A365D] text-white text-sm font-semibold rounded-md hover:bg-[#152d52] transition-colors"
                >
                  See all {experiences.length} activities
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Accommodation */}
      {accommodation.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <BedDouble className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
              <h2 className="text-3xl font-bold text-slate-900">Where to stay in {city.name}</h2>
            </div>
            <p className="text-slate-600 mb-12 max-w-2xl">
              {accommodation.length} properties in {city.name}. Hotels, cabins, and apartments — booked via Booking.com.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {accommodation.slice(0, 9).map((acc) => (
                <TravelCard key={acc.id} item={acc} category="accommodation" ratings={extractRatings(acc)} />
              ))}
            </div>
            {accommodation.length > 9 && (
              <div className="mt-10 text-center">
                <Link
                  href="/travel/accommodation"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A365D] text-white text-sm font-semibold rounded-md hover:bg-[#152d52] transition-colors"
                >
                  See all {accommodation.length} properties
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Restaurants */}
      {cityRestaurants && cityRestaurants.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <UtensilsCrossed className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
              <h2 className="text-3xl font-bold text-slate-900">Where to eat in {city.name}</h2>
            </div>
            <p className="text-slate-600 mb-12 max-w-2xl">
              {cityRestaurants.length} restaurants rated by NorgeTravel. Scores combine Google, TripAdvisor, Facebook, and Yelp ratings.
            </p>
            <RestaurantGrid
              restaurants={cityRestaurants}
              cityName={city.name}
            />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Plan your {city.name} trip</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {city.name} is one basecamp. Norway has many. Explore the other cities or head into the fjords and mountains.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/destinations/cities"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-md hover:shadow-lg transition-all"
            >
              All cities <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/destinations/fjords"
              className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-bold rounded-md hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              Norwegian Fjords
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
