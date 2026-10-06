import type { Metadata } from 'next';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { ArrowRight, Star } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import heroImage from '@/assets/karasjok_Over.avif';
import { asLocale, brandTitle, localeAlternates } from '@/lib/i18n-seo';
import { NORTHERN_LIGHTS_COPY } from '@/i18n/northern-lights-copy';

const PATH = 'tjenester/northern-lights';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale = asLocale(lang);
  const { meta } = NORTHERN_LIGHTS_COPY[locale];
  return {
    // English keeps its title as written; zh and ja end with the localized brand
    title: brandTitle(meta.title, locale),
    description: meta.description,
    alternates: localeAlternates(PATH, locale),
  };
}

const operatorRel = 'noopener noreferrer sponsored';

export default async function NorthernLightsPage({ params }: { params: Promise<{ lang: string }> }) {
  const copy = NORTHERN_LIGHTS_COPY[asLocale((await params).lang)];

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
          src={heroImage}
          alt={copy.hero.alt}
          fill
          className="object-cover opacity-50"
          priority
          quality={75}
          placeholder="blur"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/85" />
        <div className="relative z-10 container mx-auto px-4 py-32 lg:py-48">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00CC6A]/20 text-[#00CC6A] text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00CC6A] animate-pulse" />
            {copy.hero.badge}
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 max-w-3xl">
            {copy.hero.heading}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            {copy.hero.body}
          </p>
          <div className="flex gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-2"><Star className="w-4 h-4 text-[#00CC6A]" fill="currentColor" /> {copy.hero.price}</span>
            <span className="flex items-center gap-2">🌌 {copy.hero.season}</span>
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

      {/* Operators */}
      <section className="relative py-20 overflow-hidden">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">{copy.operators.heading}</h2>
          <p className="text-slate-500 text-sm mb-10">
            {copy.operators.disclosure}
          </p>
          <div className="grid lg:grid-cols-3 gap-6">
            {copy.operators.items.map((op) => (
              <div key={op.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 flex flex-col">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-1">{op.name}</h3>
                  <p className="text-sm text-slate-500 mb-3">{op.type}</p>
                  <p className="text-2xl font-bold text-[#1B3A5C] mb-4">{op.priceFrom}</p>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{op.highlight}</p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-400 mb-3">{copy.operators.commission}{op.commission}</p>
                  <a
                    href="#"
                    rel={operatorRel}
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-full hover:shadow-lg hover:shadow-[#1B3A5C]/30 hover:-translate-y-0.5 transition-all"
                  >
                    {copy.operators.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">{copy.tips.heading}</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
            {copy.tips.items.map((t) => (
              <div key={t.title} className="border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-2">{t.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions travellers ask */}
      <section aria-labelledby="northern-lights-faq" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 id="northern-lights-faq" className="text-3xl font-bold text-slate-900 mb-8">{copy.faqHeading}</h2>
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

      {/* Destination CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{copy.cta.heading}</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">{copy.cta.body}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/destinations/northern-norway" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-full hover:shadow-lg transition-all">
              {copy.cta.northernNorway} <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="/destinations/svalbard" className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm">
              {copy.cta.svalbard}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
