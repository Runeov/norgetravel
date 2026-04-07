import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  MapPin,
  Ship,
  BedDouble,
  Compass,
  Mountain,
  UtensilsCrossed,
  Calendar,
} from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { TravelCard } from '@/components/modules/travel/TravelCard';
import { experiencesStore } from '@/lib/admin/travel-experiences';
import { accommodationStore } from '@/lib/admin/travel-accommodation';
import { eventsStore } from '@/lib/admin/travel-events';
import { extractRatings } from '@/lib/ratings';

export const metadata: Metadata = {
  title: 'Travel Norway 2026 | NorgeTravel',
  description:
    'Plan your Norway trip — experiences, accommodation, events, and transport across Northern Norway, Lofoten, the Fjords, and Svalbard.',
};

const destinations = [
  {
    id: 'northern-norway',
    name: 'Northern Norway',
    tagline: 'Aurora capital of the world',
    description:
      '3,500 km of Arctic coastline from Bodø to the Russian border. Tromsø sits inside the auroral oval. Dog sledding, whale watching, and the midnight sun.',
    image: '/pics/Tromso/tromso_banner.jpeg',
    imageAlt: 'Tromsø harbour with the Arctic Cathedral and snow-covered mountains',
    href: '/destinations/northern-norway',
    color: '#00CC6A',
    stats: [
      { label: 'Aurora season', value: 'Oct – Mar' },
      { label: 'Midnight sun', value: 'May – Jul' },
    ],
  },
  {
    id: 'lofoten',
    name: 'Lofoten Islands',
    tagline: 'Mountains straight out of the sea',
    description:
      '170 km of jagged granite peaks rising 1,000m from the Norwegian Sea. Red rorbuer, stockfish racks, and the E10. 800,000 visitors in summer, 24,000 residents year-round.',
    image: '/pics/Lofoten/lofoten_banner.jpeg',
    imageAlt: 'Lofoten Islands red rorbuer cabins against dramatic mountain backdrop',
    href: '/destinations/lofoten',
    color: '#5CBFEE',
    stats: [
      { label: 'Best trekking', value: 'Jun – Sep' },
      { label: 'Skrei season', value: 'Jan – Apr' },
    ],
  },
  {
    id: 'fjords',
    name: 'Norwegian Fjords',
    tagline: 'Two UNESCO sites, zero-emission from 2026',
    description:
      'Geirangerfjord and Nærøyfjord carry UNESCO World Heritage status. Bergen, Stavanger, Ålesund, and Trondheim serve as basecamps for the fjord region.',
    image: '/pics/Fjords/fjords_banner.jpeg',
    imageAlt: 'Norwegian fjord with steep green cliffs and calm blue water',
    href: '/destinations/fjords',
    color: '#5CBFEE',
    stats: [
      { label: 'UNESCO fjords', value: '2' },
      { label: 'Best cruise', value: 'May – Sep' },
    ],
  },
  {
    id: 'svalbard',
    name: 'Svalbard',
    tagline: '78°N — the far Arctic',
    description:
      'Polar bears outnumber people 3:1. A direct 3-hour flight from Oslo lands you in Longyearbyen. Four months of polar night, four of midnight sun.',
    image: '/pics/Svalbard/svalbard_banner.jpeg',
    imageAlt: 'Svalbard glacier meeting the Arctic sea with mountain backdrop',
    href: '/destinations/svalbard',
    color: '#00CC6A',
    stats: [
      { label: 'Latitude', value: '78°N' },
      { label: 'Polar bears', value: '~3,000' },
    ],
  },
];

const categories = [
  {
    slug: 'experiences',
    name: 'Experiences',
    icon: Mountain,
    tagline: 'Activities and tours',
    href: '/travel/experiences',
  },
  {
    slug: 'accommodation',
    name: 'Accommodation',
    icon: BedDouble,
    tagline: 'Where to stay',
    href: '/travel/accommodation',
  },
  {
    slug: 'events',
    name: 'Events',
    icon: Calendar,
    tagline: 'Festivals and gatherings',
    href: '/travel/events',
  },
  {
    slug: 'transport',
    name: 'Transport',
    icon: Ship,
    tagline: 'Getting around Norway',
    href: '/travel/transport',
  },
  {
    slug: 'guides',
    name: 'Guides',
    icon: Compass,
    tagline: 'Expert local guides',
    href: '/travel/guides',
  },
  {
    slug: 'restaurants',
    name: 'Restaurants',
    icon: UtensilsCrossed,
    tagline: 'Where to eat',
    href: '/travel/restaurants',
  },
];

export default async function TravelPage() {
  const [featuredExperiences, featuredEvents, recentAccommodation] =
    await Promise.all([
      experiencesStore.getFeatured(),
      eventsStore.getFeatured(),
      accommodationStore.getPublished().then((items) => items.slice(0, 6)),
    ]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1B3A5C] text-white">
        <NorgeBackground />
        <div className="relative z-10 container mx-auto px-4 py-24 lg:py-36 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            Travel{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5CBFEE] to-[#00CC6A]">
              Norway
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Experiences, accommodation, events, and transport across Northern Norway, Lofoten, the Fjords, and Svalbard.
          </p>

          {/* Quick category nav */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={cat.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white text-sm font-medium rounded-md hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Destination sections — full-width banners like bestarctic.com */}
      {destinations.map((dest, i) => (
        <section key={dest.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
          <div className="container mx-auto px-4 py-16 lg:py-24">
            <div className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 items-center`}>
              {/* Image */}
              <div className="w-full lg:w-1/2 relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-200">
                <Image
                  src={dest.image}
                  alt={dest.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 flex gap-3">
                  {dest.stats.map((stat) => (
                    <span
                      key={stat.label}
                      className="text-xs font-medium text-white bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-sm"
                    >
                      <span className="text-[#5CBFEE]">{stat.label}:</span> {stat.value}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <span
                  className="inline-block text-xs font-bold uppercase tracking-wider mb-3 px-2.5 py-1 rounded-sm"
                  style={{ backgroundColor: `${dest.color}20`, color: dest.color }}
                >
                  {dest.tagline}
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  {dest.name}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {dest.description}
                </p>
                <Link
                  href={dest.href}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A365D] text-white text-sm font-semibold rounded-md hover:bg-[#152d52] transition-colors"
                >
                  Explore {dest.name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Featured experiences */}
      {featuredExperiences.length > 0 && (
        <section className="relative py-20 overflow-hidden">
          <NorgeBackground />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Mountain className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
                  <h2 className="text-3xl font-bold text-slate-900">Featured experiences</h2>
                </div>
                <p className="text-slate-600">
                  {featuredExperiences.length} hand-picked activities across Norway.
                </p>
              </div>
              <Link
                href="/travel/experiences"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#1A365D] hover:text-[#00D084] transition-colors"
              >
                All experiences
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredExperiences.slice(0, 6).map((exp) => (
                <TravelCard key={exp.id} item={exp} category="experiences" ratings={extractRatings(exp)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured events */}
      {featuredEvents.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
                  <h2 className="text-3xl font-bold text-slate-900">Upcoming events</h2>
                </div>
                <p className="text-slate-600">
                  Festivals, concerts, and cultural gatherings.
                </p>
              </div>
              <Link
                href="/travel/events"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#1A365D] hover:text-[#00D084] transition-colors"
              >
                All events
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.slice(0, 6).map((ev) => (
                <TravelCard key={ev.id} item={ev} category="events" ratings={extractRatings(ev)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Accommodation preview */}
      {recentAccommodation.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <BedDouble className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
                  <h2 className="text-3xl font-bold text-slate-900">Where to stay</h2>
                </div>
                <p className="text-slate-600">
                  Hotels, rorbuer, cabins, and camping across Norway.
                </p>
              </div>
              <Link
                href="/travel/accommodation"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#1A365D] hover:text-[#00D084] transition-colors"
              >
                All accommodation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentAccommodation.map((acc) => (
                <TravelCard key={acc.id} item={acc} category="accommodation" ratings={extractRatings(acc)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center">Explore by category</h2>
          <p className="text-slate-600 text-center mb-12 max-w-xl mx-auto">
            Six pillars for planning your Norwegian trip.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={cat.href}
                  className="group flex items-center gap-4 p-5 bg-slate-50 border border-slate-200 rounded-lg hover:shadow-md hover:border-[#1A365D]/20 transition-all"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-[#1A365D] text-white shrink-0 group-hover:bg-[#00D084] transition-colors">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-800 group-hover:text-[#1A365D] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-slate-500">{cat.tagline}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 ml-auto shrink-0 group-hover:text-[#1A365D] group-hover:translate-x-1 transition-all" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start planning your Norway trip</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Browse destinations, book experiences, and build your itinerary.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/destinations/northern-norway"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-[#1B3A5C] font-medium rounded-md hover:shadow-lg transition-all text-sm"
            >
              Northern Norway
            </Link>
            <Link
              href="/destinations/lofoten"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white/10 text-white font-medium rounded-md hover:bg-white/20 transition-all text-sm"
            >
              Lofoten
            </Link>
            <Link
              href="/destinations/fjords"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white/10 text-white font-medium rounded-md hover:bg-white/20 transition-all text-sm"
            >
              Fjords
            </Link>
            <Link
              href="/destinations/svalbard"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white/10 text-white font-medium rounded-md hover:bg-white/20 transition-all text-sm"
            >
              Svalbard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
