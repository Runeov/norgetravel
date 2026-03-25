import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Briefcase,
  Anchor,
  Scissors,
  Scroll,
  Landmark,
  BookOpen,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Languages,
  Sparkles,
  FileText,
  Clock,
  CheckCircle
} from 'lucide-react';
import { BudgetAnalysis } from '@/components/modules/kunnskapsbank/BudgetAnalysis';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

// --- 1. SEO & METADATA ---
export const metadata: Metadata = {
  title: 'Sametingets budsjett 2026 | Prosjektregnskap og tilskuddsforvaltning',
  description: '1,98 milliarder kroner til samiske formål i 2026. Sametinget forvalter 788 millioner. Vi hjelper med prosjektregnskap, dokumentasjon og rapportering.',
  metadataBase: new URL('https://www.averdi.no'),
  alternates: {
    canonical: '/kunnskapsbank/sametinget',
  },
  authors: [{ name: 'Jan Atle - Averdi', url: 'https://www.averdi.no/eksperter/jan-atle' }],
  openGraph: {
    title: 'Sametingets budsjett 2026 | Averdi',
    description: '1,98 milliarder kroner til samiske formål. Sametinget forvalter 788 millioner. Krav til prosjektregnskap, rapportering og dokumentasjon.',
    url: 'https://www.averdi.no/kunnskapsbank/sametinget',
    siteName: 'Averdi - Tolken av Nord-Norge',
    images: [{ url: '/og-images/sametinget-guide-2026.jpg', width: 1200, height: 630, alt: 'Averdi guide til Sametinget 2026' }],
    locale: 'nb_NO',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sametingets budsjett 2026 | Prosjektregnskap og tilskuddsforvaltning',
    description: '1,98 milliarder kroner til samiske formål. Vi hjelper med prosjektregnskap, dokumentasjon og rapportering.',
    images: ['/og-images/sametinget-guide-2026.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
  }
};

// Lokal CategoryCard
function LocalCategoryCard({ title, description, href, icon: Icon }: { title: string; description: string; href: string; icon: React.ElementType }) {
  return (
    <Link href={href} aria-label={`${title} — Les mer`} className="group flex flex-col p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-[#E86C1F] transition-all h-full">
      <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 text-[#E86C1F] group-hover:bg-[#E86C1F] group-hover:text-white transition-colors">
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#E86C1F] transition-colors">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed flex-grow">{description}</p>
    </Link>
  );
}

export default function SametingetHub() {
  const janAtle = getExpert('jan-atle');

  // --- FAQ CONTENT ---
  const sametingetFaq = [
    {
      question: 'Er jeg i riktig område (STN)?',
      answer: <>Du kan være i Tiltakssonen (skattfordeler) men utenfor STN-området (tilskudd). STN inkluderer hele <strong>Finnmark</strong> og <strong>7 kommuner i Nord-Troms</strong>, pluss spesifikke kretser i Troms og Nordland. Vi sjekker postnummeret ditt mot gjeldende kart før søknad sendes.</>
    },
    {
      question: 'Hva er forskjellen på Sametingets budsjett og samlet bevilgning til samiske formål?',
      answer: <>Sametinget forvalter <McpDataSpan id="sametinget-budsjett" source="Sametingets budsjettvedtak" value={788000000} format="currency" className="font-bold text-slate-900 bg-orange-50 px-2 py-0.5 rounded border-b-2 border-[#E86C1F]" />. Totalt foreslås <strong>1 979 731 000 kroner</strong> til samiske formål i 2026. Forskjellen ligger i at midler også bevilges gjennom andre departement og ordninger utenfor Sametingets direkte forvaltning.</>
    },
    {
      question: 'Hva kreves av prosjektregnskap?',
      answer: <>Midlene forutsetter separat prosjektregnskap. Det holder ikke å føre alt samlet i ordinært regnskap. Kostnader må knyttes direkte til det godkjente formålet, og regnskapet skal kunne fremlegges ved kontroll.</>
    },
    {
      question: 'Hva skjer hvis rapporteringen ikke er korrekt?',
      answer: <>Tilskuddet kan reduseres. Midler kan kreves tilbakebetalt. Fremtidige søknader kan bli svekket. Vi setter opp strukturen slik at rapporteringen stemmer med vedtaket.</>
    }
  ];

  // --- JSON-LD ---
  const jsonLdData = [
    { q: 'Er jeg i riktig område (STN)?', a: 'Du kan være i Tiltakssonen (skattfordeler) men utenfor STN-området (tilskudd). STN inkluderer hele Finnmark og 7 kommuner i Nord-Troms.' },
    { q: 'Hva er forskjellen på Sametingets budsjett og samlet bevilgning?', a: 'Sametinget forvalter 788 millioner kroner. Totalt foreslås 1 979 731 000 kroner til samiske formål i 2026.' },
    { q: 'Hva kreves av prosjektregnskap?', a: 'Midlene forutsetter separat prosjektregnskap. Kostnader må knyttes direkte til det godkjente formålet.' },
    { q: 'Hva skjer hvis rapporteringen ikke er korrekt?', a: 'Tilskuddet kan reduseres. Midler kan kreves tilbakebetalt. Fremtidige søknader kan bli svekket.' }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        'mainEntity': jsonLdData.map(item => ({
          '@type': 'Question',
          'name': item.q,
          'acceptedAnswer': { '@type': 'Answer', 'text': item.a }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Kunnskapsbank', 'item': 'https://www.averdi.no/kunnskapsbank' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Sametinget', 'item': 'https://www.averdi.no/kunnskapsbank/sametinget' }
        ]
      },
      {
        '@type': 'Service',
        'name': 'Prosjektregnskap og tilskuddsforvaltning — Sametinget',
        'serviceType': 'Regnskap og rådgivning for samiske midler',
        'provider': { '@type': 'Organization', 'name': 'Averdi' },
        'description': 'Vi setter opp prosjektregnskap, sørger for at dokumentasjon stemmer med vedtaket, og følger opp rapportering.',
        'areaServed': 'Nord-Troms og Finnmark'
      }
    ]
  };

  return (
    <main className="min-h-screen font-sans">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO — bg-slate-50 ── */}
      <section className="bg-slate-50 relative overflow-hidden pt-12 pb-16">
        <AverdiBackground />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-4xl">
          <Link href="/kunnskapsbank" className="inline-flex items-center text-slate-500 hover:text-[#E86C1F] mb-10 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Tilbake til oversikt
          </Link>
          <span className="text-[#E86C1F] font-bold tracking-wider uppercase text-sm mb-3 block">
            Tolken av Nord-Norge
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-slate-900 leading-tight">
            Sametinget setter rammene. <br className="hidden md:block" />
            <span className="text-[#E86C1F]">Vi finner mulighetene.</span>
          </h1>
          <div className="max-w-3xl space-y-4">
            <p className="text-xl text-slate-600 leading-relaxed">
              Sametinget forvalter et budsjett på{' '}
              <McpDataSpan
                id="sametinget-budsjett"
                source="Sametingets budsjettvedtak"
                value={788000000}
                format="currency"
                className="font-bold text-slate-900 bg-orange-50 px-2 py-0.5 rounded border-b-2 border-[#E86C1F]"
              />.
              Det er mer enn støtteordninger. Det er en investeringsmotor.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Når du forstår regelverket og bruker det riktig, kan midlene bidra til å bygge både kulturell trygghet og birgejupmi.
            </p>
            <p className="text-lg text-slate-700 font-medium">
              Vi hjelper deg å gjøre regelverk om til reelle muligheter.
            </p>
          </div>
        </div>
      </section>

      {/* ── AVERDI INNSIKT — bg-white ── */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <BudgetAnalysis />
        </div>
      </section>

      {/* ── TRE FORHOLD — bg-slate-50 ── */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Tre forhold du må være oppmerksom på</h2>
          <p className="text-slate-500 text-sm mb-8">Basert på Sametingets budsjettvedtak og gjeldende tilskuddsregelverk.</p>
          <div className="space-y-4">

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#E86C1F]/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-[#E86C1F]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Krav til prosjektregnskap</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Midlene forutsetter separat prosjektregnskap. Det holder ikke å føre alt samlet i ordinært regnskap.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#E86C1F]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#E86C1F]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Rapportering og frister</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Manglende rapportering kan føre til avkorting eller tilbakebetaling. Fristene gjelder uavhengig av om prosjektet er ferdigstilt.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#E86C1F]/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#E86C1F]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Dokumentasjon av bruk</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Kostnader må kunne dokumenteres og knyttes direkte til formålet. Generelle driftskostnader godkjennes ikke uten at de er spesifisert i vedtaket.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── RISIKO + FAGLIG PRESISERING — bg-white ── */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-6">

          <div className="border border-slate-200 rounded-xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <h2 className="text-lg font-bold text-slate-900">Hva skjer hvis rapporteringen ikke er korrekt?</h2>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-slate-600 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0 mt-1.5" />
                Tilskuddet kan reduseres.
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0 mt-1.5" />
                Midler kan kreves tilbakebetalt.
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0 mt-1.5" />
                Fremtidige søknader kan bli svekket.
              </li>
            </ul>
            <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <p className="text-slate-600 text-sm flex-1">Vi setter opp strukturen riktig fra start. Book et møte før søknad sendes.</p>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#E86C1F] to-[#F4B223] rounded-full hover:shadow-lg hover:shadow-[#E86C1F]/30 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap flex-shrink-0"
              >
                Book møte
              </Link>
            </div>
          </div>


        </div>
      </section>

      {/* ── NYTT I 2026 — bg-slate-50 ── */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xl text-blue-600 shadow-sm flex-shrink-0">
                <Languages className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-500" aria-hidden="true" />
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Nytt i 2026</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Etablering av nye språksentre</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  Sametinget har satt av <strong className="text-blue-700">3,7 millioner kroner</strong> til etablering av nye samiske språksentre i 2026.
                  Kommuner og organisasjoner som ønsker å styrke samisk språk lokalt kan søke om midler.
                </p>
                <Link
                  href="/kunnskapsbank/sametinget/kultur-sprak"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Les om språkstøtte →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ORDNINGENE — bg-white ── */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Utvalgte ordninger</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            <LocalCategoryCard
              title="Variert Næringsliv"
              description="Støtte til service, reiseliv og småindustri i STN-området. Inntil 800 000 kr. Støttesats 40–70 %."
              href="/kunnskapsbank/sametinget/naering"
              icon={Briefcase}
            />

            <LocalCategoryCard
              title="Fiske og primærnæring"
              description="Investeringsstøtte til primærnæringer i STN-området. Krav til bosted i sonen og fartøy under 11 meter."
              href="/kunnskapsbank/sametinget/primaernaering"
              icon={Anchor}
            />

            <LocalCategoryCard
              title="Duodji og håndverk"
              description="Driftstilskudd og markedsutvikling for duodji-utøvere. Krav til registrering i Sámi Duodji-merke."
              href="/kunnskapsbank/sametinget/duodji"
              icon={Scissors}
            />

            <LocalCategoryCard
              title="Kultur og språk"
              description="Kulturprosjekter, språktiltak og nye språksentre. 3,7 mill. kr satt av til språksentre i 2026. Nordisk Kulturfond: frister 13. feb og 4. sept."
              href="/kunnskapsbank/sametinget/kultur-sprak"
              icon={Scroll}
            />

            <LocalCategoryCard
              title="Institusjonsutvikling"
              description="Driftstilskudd til samiske institusjoner. Prioritert over prosjekttilskudd i 2026. Krav til årsregnskap og aktivitetsrapport."
              href="/kunnskapsbank/sametinget/institusjon"
              icon={Landmark}
            />

            <LocalCategoryCard
              title="Offentlig sektor"
              description="Samisk språkopplæring i barnehage og skole. Divvun tildelt 13,9 mill. kr til digitale språkverktøy i 2026."
              href="/kunnskapsbank/sametinget/offentlig"
              icon={BookOpen}
            />

          </div>
        </div>
      </section>

      {/* ── FAQ — bg-slate-50 ── */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Spørsmål vi ofte løser</h2>
          <FaqAccordion items={sametingetFaq} themeColor="#E86C1F" />
        </div>
      </section>

      {/* ── AVSLUTNING + KILDER — bg-white ── */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">

          <div className="border border-slate-200 rounded-xl p-8 mb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Jobber du med samiske midler?</h2>
            <p className="text-slate-600 mb-2 leading-relaxed">
              Da bør prosjektregnskapet settes opp riktig fra start.
              Strukturen avgjør om rapporteringen blir enkel eller krevende.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Kontakt oss hvis du vil gjennomgå oppsettet før søknad eller rapportering.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#E86C1F] to-[#F4B223] rounded-full hover:shadow-lg hover:shadow-[#E86C1F]/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Ta kontakt
            </Link>
          </div>

          <div className="border-t border-slate-200 pt-8 pb-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-slate-500">
              <div className="flex items-start gap-3 max-w-2xl">
                <ShieldCheck className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-slate-700 mb-1">Kilder</p>
                  <p>
                    Sametingets budsjett 2026 (vedtatt desember 2025).
                    Meld. St. 37 (2020–2021).
                    Sametingets tilskuddsregelverk.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://sametinget.no/stipend-og-tilskudd/oversikt-over-tilskuddsordninger/naring/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#E86C1F] transition-colors">
                  Sametinget.no — Næring <span className="sr-only">(åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
                <a href="https://www.regjeringen.no/no/dokumenter/meld.-st.-37-20202021/id2861398/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#E86C1F] transition-colors">
                  Meld. St. 37 <span className="sr-only">(åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
