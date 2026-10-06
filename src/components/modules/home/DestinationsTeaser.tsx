import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { SiteSeason } from '@/lib/season';

const destinations = [
  {
    slug: 'northern-norway',
    name: 'Northern Norway',
    tagline: 'Midnight sun & aurora',
    image: '/pics/Tromso/tromso_banner.jpeg',
    stat: 'Jun–Aug midnight sun',
    winter: { tagline: 'Aurora & polar night', stat: 'Aurora season Sep–Mar' },
  },
  {
    slug: 'lofoten',
    name: 'Lofoten',
    tagline: 'Hiking & midnight sun',
    image: '/images/lofoten/landscapes/lofoten-landscape-hero_jorn-eriksen.jpg',
    stat: 'Jun–Jul 24-hour daylight',
    winter: { tagline: 'Skrei season & winter light', stat: 'Skrei cod season Jan–Apr' },
  },
  {
    slug: 'fjords',
    name: 'Fjords',
    tagline: 'Zero-emission from 2026',
    image: '/images/narvik/fjord-railway/ofoten-railway-fjord_christina-myrland.jpg',
    stat: '2 UNESCO World Heritage',
  },
  {
    slug: 'svalbard',
    name: 'Svalbard',
    tagline: '78°N – glacier hiking Jul–Aug',
    image: '/images/svalbard/landscapes/svalbard-landscape_emilien-gigandet-2.jpg',
    stat: 'Whale watching Jun–Aug',
    winter: { tagline: '78°N – polar night & aurora', stat: 'Sun below horizon 26 Oct–15 Feb' },
  },
  {
    slug: 'cities',
    name: 'Cities of Norway',
    tagline: 'Oslo, Bergen, Trondheim & more',
    image: '/pics/cities/Bergen_banner.jpeg',
    stat: '5 city guides',
  },
];

export default function DestinationsTeaser({ season = 'summer' }: { season?: SiteSeason }) {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A365D] mb-2">
              Five destinations. One country.
            </h2>
            <p className="text-slate-600 text-lg">
              Each destination has its own logistics, its own weather, and its own set of rules. We cover them all.
            </p>
          </div>
          <Link
            href="/destinations"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#1A365D] hover:text-[#00D084] transition-colors"
          >
            All destinations
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {destinations.map((dest) => {
            const copy = (season === 'winter' && dest.winter) || dest;
            return (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-slate-200"
              >
                <Image
                  src={dest.image}
                  alt={`${dest.name}, Norway`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-xs text-white/60 font-medium uppercase tracking-wide">
                    {copy.tagline}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-2">{dest.name}</h3>
                  <span className="text-sm text-white/80">{copy.stat}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A365D] hover:text-[#00D084] transition-colors min-h-[44px]"
          >
            All destinations
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
