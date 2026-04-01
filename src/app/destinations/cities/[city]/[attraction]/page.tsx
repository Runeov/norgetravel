import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowLeft, MapPin, Info } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import {
  getCity,
  getAttraction,
  getCityAttractions,
  getAllAttractionParams,
} from '@/data/city-attractions';

interface PageProps {
  params: Promise<{ city: string; attraction: string }>;
}

export async function generateStaticParams() {
  return getAllAttractionParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug, attraction: attractionSlug } = await params;
  const attraction = getAttraction(citySlug, attractionSlug);
  if (!attraction) return { title: 'Not found | NorgeTravel' };
  return {
    title: `${attraction.title} | ${attraction.cityName} | NorgeTravel`,
    description: attraction.metaDescription,
  };
}

export default async function AttractionPage({ params }: PageProps) {
  const { city: citySlug, attraction: attractionSlug } = await params;
  const city = getCity(citySlug);
  const attraction = getAttraction(citySlug, attractionSlug);
  if (!city || !attraction) notFound();

  const otherAttractions = getCityAttractions(citySlug).filter(
    (a) => a.slug !== attractionSlug
  );

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <Image
          src={attraction.heroImage}
          alt={attraction.heroImageAlt}
          fill
          priority
          quality={75}
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/80" />
        <div className="relative z-10 container mx-auto px-4 py-24 lg:py-36">
          <div className="flex items-center gap-2 mb-6">
            <Link
              href={`/destinations/cities/${citySlug}`}
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {city.name}
            </Link>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00CC6A]/20 text-[#00CC6A] text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            {city.name}
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 max-w-3xl">
            {attraction.title}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8 font-medium">
            {attraction.tagline}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-slate-300">
            {attraction.stats.map((stat) => (
              <span
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-sm"
              >
                <span className="text-[#5CBFEE] font-medium">{stat.label}:</span>{' '}
                {stat.value}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Overview</h2>
            {attraction.overview.map((paragraph, i) => (
              <p
                key={i}
                className="text-slate-600 text-base leading-relaxed mb-5"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="relative py-16 overflow-hidden">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Highlights</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
            {attraction.highlights.map((h) => (
              <div
                key={h.title}
                className="bg-white rounded-lg p-6 shadow-sm border border-slate-200/50"
              >
                <span className="text-3xl mb-4 block">{h.icon}</span>
                <h3 className="font-bold text-slate-900 mb-2">{h.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {h.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Info className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
              <h2 className="text-3xl font-bold text-slate-900">
                Practical information
              </h2>
            </div>
            <div className="space-y-6">
              {attraction.practicalInfo.map((info) => (
                <div
                  key={info.title}
                  className="border-l-4 border-[#1A365D] pl-5"
                >
                  <h3 className="font-bold text-slate-800 mb-1">
                    {info.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {info.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* More in this city */}
      {otherAttractions.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              More in {city.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherAttractions.map((other) => (
                <Link
                  key={other.slug}
                  href={`/destinations/cities/${citySlug}/${other.slug}`}
                  className="group bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-shadow"
                >
                  <p className="text-xs font-semibold text-[#1A365D] uppercase tracking-wide mb-1">
                    {city.name}
                  </p>
                  <h3 className="font-bold text-slate-800 mb-1 group-hover:text-[#1A365D] transition-colors">
                    {other.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-3 line-clamp-2">
                    {other.tagline}
                  </p>
                  <span className="inline-flex items-center text-sm font-semibold text-[#1A365D] group-hover:text-[#00D084] transition-colors">
                    Read guide
                    <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Plan your {city.name} trip
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {city.name} has more to offer. Explore the full city guide or browse
            other Norwegian cities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/destinations/cities/${citySlug}`}
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-md hover:shadow-lg transition-all"
            >
              {city.name} guide <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/destinations/cities"
              className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-bold rounded-md hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              All cities
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
