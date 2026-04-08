import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, MapPin, Waves, Mountain, Calendar, Ship, Clock } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { notFound } from 'next/navigation';
import { getFjord, getAllFjordSlugs } from '@/data/fjords';

interface PageProps {
  params: Promise<{ fjord: string }>;
}

export async function generateStaticParams() {
  return getAllFjordSlugs().map((slug) => ({ fjord: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { fjord: fjordSlug } = await params;
  const fjord = getFjord(fjordSlug);
  if (!fjord) return { title: 'Fjord not found | NorgeTravel' };
  return {
    title: fjord.metaTitle,
    description: fjord.metaDescription,
  };
}

export default async function FjordPage({ params }: PageProps) {
  const { fjord: fjordSlug } = await params;
  const fjord = getFjord(fjordSlug);
  if (!fjord) notFound();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <Image
          src={fjord.heroImage}
          alt={fjord.heroImageAlt}
          fill
          priority
          quality={75}
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/80" />
        <div className="relative z-10 container mx-auto px-4 py-32 lg:py-44">
          <Link
            href="/destinations/fjords"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            All fjords
          </Link>
          <div className="flex items-center gap-3 mb-6 ml-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5CBFEE]/20 text-[#5CBFEE] text-sm font-medium">
              <Waves className="w-4 h-4" />
              Fjord Guide
            </div>
            {fjord.unesco && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#00CC6A]/20 text-[#00CC6A] text-sm font-medium">
                UNESCO World Heritage
              </span>
            )}
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 max-w-3xl">
            {fjord.name}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            {fjord.overview[0].split('.').slice(0, 2).join('.') + '.'}
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            {fjord.stats.slice(0, 4).map((stat) => (
              <span key={stat.label} className="flex items-center gap-2">
                <span className="text-[#5CBFEE] font-medium">{stat.label}:</span> {stat.value}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="relative py-20 overflow-hidden">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">About {fjord.name}</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {fjord.overview.map((paragraph, i) => (
                <p key={i} className="text-slate-600 leading-relaxed">{paragraph}</p>
              ))}
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Key facts</h3>
                <dl className="space-y-3">
                  {fjord.stats.map((stat) => (
                    <div key={stat.label} className="flex justify-between text-sm">
                      <dt className="text-slate-500">{stat.label}</dt>
                      <dd className="font-medium text-slate-800">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wide">Best time to visit</h3>
                <p className="text-sm text-slate-600">{fjord.bestSeason}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Mountain className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
            <h2 className="text-3xl font-bold text-slate-900">What to do at {fjord.name}</h2>
          </div>
          <p className="text-slate-600 mb-12 max-w-2xl">
            {fjord.activities.length} activities with practical details and honest assessments.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {fjord.activities.map((activity) => (
              <div
                key={activity.title}
                className="bg-slate-50 rounded-lg border border-slate-200 p-6"
              >
                <h3 className="text-lg font-bold text-slate-800 mb-3">{activity.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{activity.description}</p>
                <div className="flex flex-wrap gap-3 text-xs">
                  {activity.duration && (
                    <span className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2 py-1 rounded-sm text-slate-600">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {activity.duration}
                    </span>
                  )}
                  {activity.price && (
                    <span className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2 py-1 rounded-sm text-slate-600">
                      {activity.price}
                    </span>
                  )}
                  {activity.season && (
                    <span className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2 py-1 rounded-sm text-slate-600">
                      <Calendar className="w-3 h-3" aria-hidden="true" />
                      {activity.season}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Ship className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
            <h2 className="text-3xl font-bold text-slate-900">How to reach {fjord.name}</h2>
          </div>
          <p className="text-slate-600 mb-12 max-w-2xl">
            Actual routes and real driving times. Not what the map app says.
          </p>
          <div className="grid lg:grid-cols-2 gap-6">
            {fjord.gettingThere.map((route, i) => (
              <div key={i} className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#5CBFEE] mt-0.5 shrink-0" aria-hidden="true" />
                  <p className="text-sm text-slate-700 leading-relaxed">{route}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Basecamps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Where to base yourself</h2>
          <p className="text-slate-600 mb-12 max-w-2xl">
            {fjord.basecamps.length} towns along {fjord.name}, each with a different purpose on your itinerary.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fjord.basecamps.map((basecamp) => (
              <div key={basecamp.name} className="bg-slate-50 rounded-lg border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-1">{basecamp.name}</h3>
                {basecamp.distance && (
                  <p className="text-xs text-[#5CBFEE] font-medium mb-3">{basecamp.distance}</p>
                )}
                <p className="text-sm text-slate-600 leading-relaxed">{basecamp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Notes */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">When to visit</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-[#00CC6A]" />
                <h3 className="font-bold text-slate-900">Summer (June to August)</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{fjord.seasonalNotes.summer}</p>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-[#5CBFEE]" />
                <h3 className="font-bold text-slate-900">Winter (November to March)</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{fjord.seasonalNotes.winter}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tours */}
      {fjord.relatedTours.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-12">Itineraries that include {fjord.name}</h2>
            <div className="space-y-4">
              {fjord.relatedTours.map((tour, i) => (
                <div key={i} className="bg-slate-50 rounded-lg border border-slate-200 p-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1A365D]/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#1A365D]" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-slate-700 font-medium">{tour}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Expert Byline */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/om-oss/ingrid-solheim"
              className="group flex items-start gap-5 bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-slate-200">
                <Image
                  src="/pics/team/ingrid_profile.png"
                  alt="Ingrid Solheim, Fjord Logistics Editor at Norgetravel"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#0E7490] uppercase tracking-wide mb-1">Fjord Norway</p>
                <h3 className="font-bold text-slate-800 group-hover:text-[#1A365D] transition-colors">Ingrid Solheim</h3>
                <p className="text-sm text-slate-500 mb-2">Reise-pragmatiker | Fjord Logistics Editor</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Former regional tour operator in Bergen (11 years). AutoPASS and ferry network specialist. She has watched hundreds of tourists miss ferries and rebuilt their itineraries. Her guides are written so that does not happen to you.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Plan your {fjord.name} trip</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {fjord.name} is one fjord. Norway has 1,700. Explore the others or start planning your route.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/destinations/fjords"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-md hover:shadow-lg transition-all"
            >
              All fjords <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/travel"
              className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-bold rounded-md hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              Explore tours
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
