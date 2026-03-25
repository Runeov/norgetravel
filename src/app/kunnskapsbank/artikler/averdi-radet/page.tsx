import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  HeartPulse,
  Coins,
  FileWarning,
  BookOpen,
  Scale,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';

export const metadata: Metadata = {
  title: 'Sosioøkonomiske forskjeller uten at samfunnet ser det | Averdi Analyse',
  description: 'En dybdeanalyse av friksjonskostnadene i Sápmi, og hvorfor systemene som skal støtte folk i nord bryter ned heller enn å bygge opp.',
};

export default function DeepDivePremium() {
  // Hent ekspertdata, med fallback for å unngå krasj
  const expertData = getExpert('elle-maret');
  
  const author = expertData || {
    name: 'Averdi Analyse',
    image: null,
    initials: 'AV',
    role: 'Redaksjonen',
    bio: 'Analyseteamet i Averdi jobber med å kartlegge nordnorsk verdiskaping.',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': 'Sosioøkonomiske forskjeller uten at samfunnet ser det',
    'author': {
      '@type': 'Person',
      'name': author.name,
      'jobTitle': 'Strategisk Rådgiver',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Averdi',
    },
    'datePublished': '2025-12-11',
    'description':
      'En analyse av tidsbruk, helseulemper og kapitalgapet som preger Sápmi – og hvorfor disse kostnadene ikke ses i nasjonale systemer.',
  };

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      <AverdiBackground />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">

        {/* Breadcrumb */}
        <Link
          href="/kunnskapsbank"
          className="inline-flex items-center text-slate-500 hover:text-[#E86C1F] mb-12 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tilbake til Kunnskapsbanken
        </Link>

        {/* HEADER */}
        <header className="mb-20 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-widest mb-6">
            <BookOpen className="w-4 h-4" />
            Averdi Innsikt
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Sosioøkonomiske forskjeller<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E86C1F] to-[#F4B223]">
              uten at samfunnet ser det
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl">
            I Sápmi oppstår kostnader som ikke fanges opp i statistikken. De viser seg som
            tapt tid, svakere helse og kapital som aldri får vokse. Denne analysen gjør
            forskjellene synlige.
          </p>
        </header>

        {/* AUTHOR BLOCK */}
        <div className="bg-white border-l-4 border-[#E86C1F] p-8 rounded-r-xl shadow-lg mb-20 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-shrink-0">
            {author.image ? (
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-100 relative">
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-400 border-2 border-slate-200">
                {author.initials}
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-slate-900">{author.name}</h3>
              <span className="bg-[#E86C1F]/10 text-[#E86C1F] text-xs px-2 py-0.5 rounded-full font-bold">
                Ny i Averdi
              </span>
            </div>
            {author.bio && (
                <p className="text-slate-600 text-sm mb-3 italic">
                "{author.bio}"
                </p>
            )}
            <p className="text-slate-500 text-sm leading-relaxed">
              Elle leder Averdis arbeid med strategisk rådgivning. Hun arbeider der
              forvaltning, kapital og kultur møtes, og utvikler løsninger som gjør
              systemsvikt synlig og håndterbar.
            </p>
          </div>
        </div>

        {/* BODY */}
        <div className="prose prose-lg prose-slate max-w-none">

          {/* INTRO QUOTE */}
          <div className="mb-20">
            <p className="lead text-2xl font-serif text-slate-800 italic border-l-4 border-slate-300 pl-6 py-2 my-8">
              "Vi ser ikke budsjettet som politikk. Vi ser det som et regnskap. Og tallene går ikke opp."
            </p>
            <p>
              Etter at Sannhets- og forsoningskommisjonen la frem sin rapport, sto Sápmi
              igjen med en oppgave som ikke passer inn i ordinær forvaltning. Det handler
              om reparasjon, ikke administrasjon. Og reparasjonen starter med å forstå de
              usynlige kostnadene.
            </p>
          </div>

          {/* SECTION: DEN USYNLIGE SKATTEN */}
          <section className="mb-20">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-8">
              <Scale className="w-8 h-8 text-[#E86C1F]" />
              Den usynlige skatten i nord
            </h2>
            <p>
              Når staten beregner ulikhet brukes mål som inntekt og avstand til tjenester.
              Disse målene fanger lite av realiteten i Sápmi. Der ligger
              hovedkostnaden i friksjonen mellom lokale livsformer og et system som
              fungerer best for store, enhetlige befolkninger.
            </p>
            <p>
              Denne friksjonen trekker tid, svekker helse og stopper kapital fra å vokse.
              Den er ikke synlig i SSBs modeller, men den vises i hverdagen.
            </p>
          </section>

          {/* SECTION: TID */}
          <section className="mb-20">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-6">
              <Clock className="w-8 h-8 text-[#E86C1F]" />
              1. Tidstapet
            </h2>
            <p>
              For reindrift, småbedrifter og kombinasjonsnæringer er tid grunnlaget for
              produksjon. Når mellom <strong>20 og 40 prosent</strong> av et årsverk går til møter,
              konsultasjoner og søknadsarbeid som ikke er tilpasset virkeligheten i nord,
              svekkes både næring og helse.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                <h4 className="font-bold text-slate-800 mb-2">Konsultasjonsutmattelse</h4>
                <p className="text-sm text-slate-600">
                  Tiltakshaver stiller med jurister. Rettighetshavere møter etter arbeidstid.
                  Manglende oppmøte tolkes som samtykke. Det skaper press og stress.
                </p>
              </div>
              <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                <h4 className="font-bold text-slate-800 mb-2">Digital friksjon</h4>
                <p className="text-sm text-slate-600">
                  Altinn og søknadsregimer favoriserer dem som behersker byråkratisk norsk.
                  Små aktører taper før prosessen starter.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION: HELSE */}
          <section className="mb-20">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-6">
              <HeartPulse className="w-8 h-8 text-red-600" />
              2. Helsetapet
            </h2>
            <p>
              Folkehelsemeldingen slår fast at manglende språkkompetanse
              <em> truer pasientsikkerheten</em>. Når familiemedlemmer brukes som tolker
              skjules symptomer, behandling forsinkes og sykdom oppdages senere.
            </p>

            <div className="bg-slate-100 p-6 rounded-xl my-10">
              <h4 className="font-bold text-slate-900 mb-2">Hvorfor blir diagnosen sen?</h4>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                <li>pasienten skjuler informasjon når slekt tolker</li>
                <li>ufaglærte tolker feiltolker medisinske begreper</li>
                <li>kulturelle tabuer gjør det vanskelig å snakke om psykisk helse</li>
              </ul>
            </div>
          </section>

          {/* SECTION: KAPITAL */}
          <section className="mb-20">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-6">
              <Coins className="w-8 h-8 text-yellow-600" />
              3. Kapitalgapet
            </h2>
            <p>
              Boliger i Finnmark koster ofte mer å bygge enn bankene mener de er verdt.
              Dette skaper et gap få klarer å dekke.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <div className="bg-white border-2 border-slate-200 p-6 rounded-xl">
                <h4 className="text-xs uppercase font-bold text-slate-500 mb-2">
                  Byggekostnad
                </h4>
                <p className="text-xl font-bold text-slate-900">
                  <McpDataSpan
                    id="bygg-premium"
                    value="6,5 mill"
                  />
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  Faktisk kostnad for nybygg i Indre Finnmark.
                </p>
              </div>

              <div className="bg-white border-2 border-slate-200 p-6 rounded-xl">
                <h4 className="text-xs uppercase font-bold text-slate-500 mb-2">
                  Bankens vurdering
                </h4>
                <p className="text-xl font-bold text-red-600">
                  <McpDataSpan
                    id="takst-premium"
                    value="2,5 mill"
                  />
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  Algoritmer basert på få salg driver verdien ned.
                </p>
              </div>
            </div>

            <p>
              Dette gir et kapitalgap på
              <McpDataSpan
                id="gap-premium"
                value="4 millioner"
                className="font-bold ml-1"
              />
              som må dekkes privat. Det stopper boligbygging og hindrer låneopptak for
              næring.
            </p>
          </section>

          {/* SECTION: BIRGEJUPMI */}
          <section className="mb-20">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900 mb-6">
              <FileWarning className="w-8 h-8 text-blue-600" />
              4. Birgejupmi-fellen
            </h2>
            <p>
              Birgejupmi handler om evnen til å klare seg. I møte med dagens forvaltning
              blir denne evnen også en uformell subsidie. Når folk ordner opp selv, slipper
              systemet å levere.
            </p>

            <div className="bg-slate-100 p-6 rounded-xl my-10">
              <h4 className="font-bold text-slate-900 mb-2">Konsekvenser</h4>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                <li>kommunene sparer penger</li>
                <li>statens systemsvikt skjules</li>
                <li>ansvaret flyttes til familier og nærmiljø</li>
              </ul>
            </div>
          </section>

          {/* TEASER: STRATEGI LINK */}
          <section className="mt-16 mb-20">
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl transition-transform hover:scale-[1.01] duration-300 group cursor-pointer">
                {/* Background effects */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#E86C1F]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#E86C1F]/30 transition-all"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                
                <Link href="/kunnskapsbank/artikler/averdi-radet" className="block p-10 md:p-12 relative z-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E86C1F] text-white text-xs font-bold uppercase tracking-widest mb-4">
                                <ShieldCheck className="w-4 h-4" />
                                Løsningen
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                                Fra dugnad til faktura
                            </h2>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                Staten har abdisert fra ansvaret, og vi kan ikke vente på neste stortingsmelding. 
                                Averdi lanserer nå <strong>Averdi-rådet</strong> – en konkret strategi for hvordan Sápmi kan gå fra å være offer for systemsvikt til å bli en kommersiell leverandør av løsninger.
                            </p>
                        </div>
                        
                        <div className="flex-shrink-0">
                            <span className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-[#E86C1F] hover:text-white transition-all shadow-lg group-hover:shadow-xl">
                                Les strategien
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </span>
                        </div>
                    </div>
                </Link>
            </div>
          </section>

         {/* SOURCES */}
          <div className="mt-12 text-xs text-slate-400 border-t border-slate-100 pt-6">
            <p className="font-bold mb-2">Kilder & Grunnlag:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Meld. [cite_start]St. 19 (2022–2023) - Sannhets- og forsoningskommisjonen [cite: 7]</li>
              <li>Meld. [cite_start]St. 13 (2022–2023) - Utdanning [cite: 11]</li>
              <li>Meld. [cite_start]St. 12 (2023–2024) - Folkehelse [cite: 11]</li>
              <li>Meld. [cite_start]St. 17 (2024–2025) - Kommunale tjenester [cite: 12]</li>
              <li>Prop. [cite_start]1 S (2025–2026) - Statsbudsjettet [cite: 128]</li>
              [cite_start]<li>SAMINOR 2 / Senter for samisk helseforskning [cite: 74]</li>
              [cite_start]<li>Sámi logut muitalit / Samiske tall forteller [cite: 256, 271]</li>
            </ul>
            <p className="mt-4">
              Analysen er utarbeidet av Averdi AS v/{' '}
              <McpDataSpan id="author-name" value="Elle Máret" source="Averdi" />. 
              Tall og satser er basert på gjeldende forslag for{' '}
              <McpDataSpan id="budget-year" value="2026" source="Statsbudsjettet" />.
            </p>
          </div>
        </div>
      </article>

      {/* END CTA */}
      <section className="bg-white py-16 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <CtaBlock
            title="Trenger din bedrift støtte i Sápmi?"
            description="Vi oversetter systemkrav til lønnsomhet. Fra tilskudd til kapitalstrategi."
            primaryButtonText="Se våre tjenester"
            primaryButtonLink="/tjenester"
            secondaryButtonText="Les mer i Kunnskapsbanken"
            secondaryButtonLink="/kunnskapsbank"
          />
        </div>
      </section>
    </main>
  );
}

// --- LOCAL COMPONENT DEFINITION ---
function CtaBlock({ title, description, primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink }: any) {
    return (
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center md:text-left relative overflow-hidden my-12">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                    <p className="text-slate-300 text-lg mb-0">{description}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full md:w-auto">
                    {primaryButtonLink && (
                        <Link href={primaryButtonLink} className="inline-flex items-center justify-center px-6 py-3 bg-[#E86C1F] text-white font-bold rounded-full hover:bg-[#d65f18] transition-all">
                            {primaryButtonText || 'Les mer'}
                        </Link>
                    )}
                    {secondaryButtonLink && (
                        <Link href={secondaryButtonLink} className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm">
                            {secondaryButtonText || 'Tilbake'}
                        </Link>
                    )}
                </div>
            </div>
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E86C1F]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>
    );
}