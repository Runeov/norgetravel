import type { Metadata } from 'next';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';

// Revalidate the whole page every 24 hours so Google ratings stay current without a manual deploy
export const revalidate = 86400;
import { ArrowRight, MapPin, Clock, Thermometer, Compass } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { TromsoActivities } from '@/components/modules/destinations/TromsoActivities';
import { TromsoBasecamps } from '@/components/modules/destinations/TromsoBasecamps';
import { tromso } from '@/data/city-guides/tromso';
import { asLocale, brandTitle, localeAlternates } from '@/lib/i18n-seo';
import { TROMSO_COPY } from '@/i18n/tromso-copy';

const PATH = 'destinations/tromso';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale = asLocale(lang);
  const { meta } = TROMSO_COPY[locale];
  return {
    // English keeps its title as written; zh and ja end with the localized brand
    title: brandTitle(meta.title, locale),
    description: meta.description,
    alternates: localeAlternates(PATH, locale),
  };
}

export default async function TromsoPage({ params }: { params: Promise<{ lang: string }> }) {
  const copy = TROMSO_COPY[asLocale((await params).lang)];

  // The Q&A section as FAQPage structured data, in the locale being shown
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': copy.faq.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white -mt-20 pt-20">
        <Image
          src={tromso.heroImageSrc}
          alt={copy.hero.alt}
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
            {copy.hero.badge}
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">{copy.hero.heading}</h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">{copy.hero.body}</p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            {copy.heroStats.map((stat) => (
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

      {/* Quick answer: the first block of the main content, written to be quoted */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <aside aria-label={copy.quickAnswerLabel} className="max-w-3xl bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-xs font-bold text-[#1B3A5C] uppercase tracking-wider mb-3">{copy.quickAnswerLabel}</p>
            <p className="text-base text-slate-700 leading-relaxed">{copy.quickAnswer}</p>
          </aside>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-16 bg-[#1B3A5C] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {copy.facts.map((f) => (
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

      {/* Overview */}
      <section className="relative py-20 overflow-hidden bg-white">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{copy.about.heading}</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {copy.about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-slate-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">{copy.about.keyFacts}</h3>
                <dl className="space-y-3">
                  {copy.facts.map((f) => (
                    <div key={f.label} className="flex justify-between gap-4 text-sm">
                      <dt className="text-slate-500 shrink-0">{f.label}</dt>
                      <dd className="font-medium text-slate-800 text-right">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wide">{copy.about.bestTimeHeading}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {copy.about.bestTimeBody}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities tabs */}
      <section className="relative py-20 overflow-hidden">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <TromsoActivities copy={copy.activities} />
        </div>
      </section>

      {/* When to visit */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{copy.seasons.heading}</h2>
          <p className="text-slate-600 mb-10 max-w-2xl">
            {copy.seasons.intro}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {copy.seasons.windows.map((w) => (
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

      {/* Getting there */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">{copy.gettingThere.heading}</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">✈️</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">{copy.gettingThere.flights.title}</p>
                <p className="text-slate-600 text-sm mb-3">
                  {copy.gettingThere.flights.body}
                </p>
                <a
                  href="https://www.kiwi.com/deep?from=OSL&to=TOS"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  {copy.gettingThere.flights.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">{copy.gettingThere.hurtigruten.title}</p>
                <p className="text-slate-600 text-sm mb-3">
                  {copy.gettingThere.hurtigruten.body}
                </p>
                <a
                  href="https://www.hurtigruten.com/en"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  {copy.gettingThere.hurtigruten.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">🚗</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">{copy.gettingThere.driving.title}</p>
                <p className="text-slate-600 text-sm mb-3">
                  {copy.gettingThere.driving.body}
                </p>
                <a
                  href="https://www.discovercars.com/?pos=TOS"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  {copy.gettingThere.driving.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">🚌</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">{copy.gettingThere.bus.title}</p>
                <p className="text-slate-600 text-sm mb-3">
                  {copy.gettingThere.bus.body}
                </p>
                <a
                  href="https://svipper.no"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  {copy.gettingThere.bus.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Basecamps — where to base yourself */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <TromsoBasecamps copy={copy.basecamps} />
        </div>
      </section>

      {/* Related Tours */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{copy.itineraries.heading}</h2>
          <p className="text-slate-600 mb-12 max-w-2xl">
            {copy.itineraries.intro}
          </p>
          <div className="space-y-4">
            {copy.itineraries.items.map((tour, i) => (
              <div key={i} className="bg-white rounded-lg border border-slate-200 p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1A365D]/10 flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5 text-[#1A365D]" aria-hidden="true" />
                </div>
                <p className="text-sm text-slate-700 font-medium">{tour}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Byline — Bjørn Haugen */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/om-oss/bjorn-haugen"
              className="group flex items-start gap-5 bg-slate-50 rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-slate-200">
                <Image
                  src="/pics/team/bjorn_profile.jpg"
                  alt={copy.expert.alt}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#6D28D9] uppercase tracking-wide mb-1">{copy.expert.zone}</p>
                <h3 className="font-bold text-slate-800 group-hover:text-[#1A365D] transition-colors">Bjørn Haugen</h3>
                <p className="text-sm text-slate-500 mb-2">{copy.expert.role}</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {copy.expert.bio}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Questions travellers ask */}
      <section aria-labelledby="tromso-faq" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 id="tromso-faq" className="text-3xl font-bold text-slate-900 mb-8">{copy.faqHeading}</h2>
          <div className="space-y-4">
            {copy.faq.map((item) => (
              <div key={item.question} className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-2">{item.question}</h3>
                <p className="text-base text-slate-700 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{copy.cta.heading}</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {copy.cta.body}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tjenester/northern-lights"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-md hover:shadow-lg transition-all"
            >
              {copy.cta.northernLights} <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/destinations/northern-norway"
              className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-bold rounded-md hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              {copy.cta.northernNorway}
            </Link>
          </div>
        </div>
      </section>
      <section className="relative z-10 py-10 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <ShareButtons url="/destinations/tromso/" title={copy.share.title} label={copy.share.label} />
        </div>
      </section>
    </main>
  );
}
