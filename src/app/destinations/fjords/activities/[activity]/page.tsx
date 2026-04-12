import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, Clock, MapPin, ExternalLink } from 'lucide-react';
import {
  ACTIVITY_BLURBS,
  ACTIVITY_LABELS,
  ACTIVITY_SLUGS,
  FJORD_HREFS,
  FJORD_LABELS,
  getToursByCategory,
  type ActivityCategory,
} from '@/data/fjord-tours';

interface PageProps {
  params: Promise<{ activity: string }>;
}

export function generateStaticParams() {
  return ACTIVITY_SLUGS.map((activity) => ({ activity }));
}

function isValidActivity(slug: string): slug is ActivityCategory {
  return (ACTIVITY_SLUGS as string[]).includes(slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { activity } = await params;
  if (!isValidActivity(activity)) return { title: 'Activity not found | NorgeTravel' };
  const label = ACTIVITY_LABELS[activity];
  return {
    title: `${label} in the Norwegian Fjords 2026 | NorgeTravel`,
    description: ACTIVITY_BLURBS[activity],
    alternates: { canonical: `https://norgetravel.com/destinations/fjords/activities/${activity}` },
  };
}

export default async function FjordActivityPage({ params }: PageProps) {
  const { activity } = await params;
  if (!isValidActivity(activity)) notFound();

  const label = ACTIVITY_LABELS[activity];
  const blurb = ACTIVITY_BLURBS[activity];
  const tours = getToursByCategory(activity);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden h-screen flex items-center bg-slate-900 text-white -mt-20 pt-20">
        <Image
          src="/images/narvik/fjord-railway/ofoten-railway-fjord_christina-myrland.jpg"
          alt="Fjord landscape — steep mountains dropping into calm water"
          fill
          className="object-cover opacity-50"
          priority
          quality={75}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/80" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              {label}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5CBFEE] to-[#00CC6A]">
                Norwegian Fjords
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              {blurb}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="#tours"
                className="inline-flex items-center justify-center rounded-full text-base font-medium transition-all focus-visible:outline-none bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white hover:shadow-lg hover:shadow-[#00CC6A]/30 hover:-translate-y-0.5 h-12 px-8"
              >
                Browse {tours.length} {tours.length === 1 ? 'tour' : 'tours'}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/destinations/fjords"
                className="inline-flex items-center justify-center rounded-full text-base font-medium transition-all focus-visible:outline-none border border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 h-12 px-8"
              >
                Back to fjords
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00CC6A]" aria-hidden="true" />
                <span>Across four UNESCO fjords</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00CC6A]" aria-hidden="true" />
                <span>Vetted operators</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00CC6A]" aria-hidden="true" />
                <span>Peak season May–Sep</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tours" className="container mx-auto px-4 sm:px-6 py-12 md:py-20">
        {tours.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-10 text-center">
            <h2 className="text-xl font-bold text-[#1A365D] mb-2">No tours tagged yet</h2>
            <p className="text-slate-600 text-sm">Check back soon. We are adding operators across all four UNESCO fjords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour, i) => (
              <article
                key={`${tour.fjord}-${i}`}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <Link
                      href={FJORD_HREFS[tour.fjord]}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A365D] uppercase tracking-wide hover:text-[#00D084] transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      {FJORD_LABELS[tour.fjord]}
                    </Link>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {tour.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1A365D] mb-2 leading-tight">{tour.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{tour.highlight}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-700 font-medium mb-5">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {tour.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[#1A365D] font-semibold">
                      {tour.price}
                    </span>
                  </div>
                  <a
                    href={tour.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-[#1A365D] bg-[#00D084] hover:bg-[#00B875] rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00D084]"
                  >
                    Book this tour
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-16 bg-white border border-slate-200 rounded-lg p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A365D] mb-4">Browse other fjord activities</h2>
          <div className="flex flex-wrap gap-3">
            {ACTIVITY_SLUGS.filter((slug) => slug !== activity).map((slug) => (
              <Link
                key={slug}
                href={`/destinations/fjords/activities/${slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-100 hover:bg-[#1A365D] hover:text-white text-sm font-semibold text-slate-700 transition-colors"
              >
                {ACTIVITY_LABELS[slug]}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
