import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { cities } from '@/data/city-attractions';

export const metadata: Metadata = {
  title: 'Cities of Norway Travel Guide 2026 | NorgeTravel',
  description:
    'Oslo, Bergen, Trondheim, Stavanger, and Kristiansund: five entry points to five different Norways. Practical city guides with no brochure-speak.',
};

export default function CitiesIndexPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white -mt-20 pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A5C] to-slate-900" />
        <div className="relative z-10 container mx-auto px-4 py-32 lg:py-44">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00CC6A]/20 text-[#00CC6A] text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            City Guides
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 max-w-3xl">
            Cities of Norway
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            Five cities, five entry points. Oslo runs on public transport and forest trails. Bergen runs on rain and fish markets. Trondheim runs on cathedrals and craft beer. Each opens a different door into Norway.
          </p>
        </div>
      </section>

      {/* City Cards */}
      <section className="relative py-20 overflow-hidden">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Choose your basecamp</h2>
          <p className="text-slate-600 mb-12 max-w-2xl">
            Each city has its own rhythm, its own food, and its own version of Norway behind it. Pick the one that matches your trip.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/destinations/cities/${city.slug}`}
                className="group bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={city.heroImage}
                    alt={city.heroImageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-2xl font-bold text-white">{city.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-medium text-[#1A365D] mb-2">{city.tagline}</p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {city.heroDescription.slice(0, 160)}...
                  </p>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {city.stats.slice(0, 2).map((stat) => (
                      <span key={stat.label} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-sm">
                        {stat.label}: {stat.value}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center text-sm font-semibold text-[#1A365D] group-hover:text-[#00D084] transition-colors">
                    Explore {city.name}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Plan your Norwegian city trip</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Each city connects to a different Norway. Oslo reaches the forest. Bergen reaches the fjords. Stavanger reaches Preikestolen. Pick your basecamp and go.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/destinations/northern-norway"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-md hover:shadow-lg transition-all"
            >
              Northern Norway <ArrowRight className="ml-2 w-4 h-4" />
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
      <section className="relative z-10 py-10 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <ShareButtons url="/destinations/cities/" title="Cities of Norway Travel Guide" />
        </div>
      </section>
    </main>
  );
}
