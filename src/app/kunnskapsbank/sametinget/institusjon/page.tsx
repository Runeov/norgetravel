import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Building2, Calendar, FileCheck, Coins, TrendingUp, ShieldCheck } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { CtaBlock } from '@/components/modules/kunnskapsbank/CtaBlock';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Driftstilskudd 2026: Sametinget Institusjoner & Festivaler | Averdi',
  description: 'Sikre driften for 2026. Vi hjelper samiske institusjoner og festivaler med rapportering, regnskapsskille og søknader. Se frister her.',
};

export default function InstitusjonPage() {
  const janAtle = getExpert('jan-atle');

  const faqData = [
    { 
      question: "Kan vi bruke driftstilskudd til å dekke underskudd på prosjekter?", 
      answer: "Nei. Driftstilskudd skal dekke faste kostnader ved helårsdrift. Prosjektunderskudd må dekkes av andre midler eller oppspart egenkapital, med mindre annet er spesifisert i tildelingsbrevet." 
    },
    { 
      question: "Er det krav om revisor for alle institusjoner?", 
      answer: "Ja. Alle som mottar fast driftstilskudd over Sametingets budsjett skal levere revidert regnskap. Dette sikrer kvalitet og tillit hos bevilgende myndighet." 
    },
    { 
      question: "Mister vi støtten hvis vi ikke bruker opp pengene?", 
      answer: "Ja, det er en risiko. Ubrukte midler kan kreves tilbakebetalt hvis de ikke er periodisert korrekt i regnskapet eller omsøkt overført til neste år." 
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: faqData.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Kunnskapsbank', item: 'https://www.averdi.no/kunnskapsbank' },
          { '@type': 'ListItem', position: 2, name: 'Sametinget', item: 'https://www.averdi.no/kunnskapsbank/sametinget' },
          { '@type': 'ListItem', position: 3, name: 'Institusjon', item: 'https://www.averdi.no/kunnskapsbank/sametinget/institusjon' },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <AverdiBackground />

      <article className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Breadcrumb */}
        <Link href="/kunnskapsbank/sametinget" className="inline-flex items-center text-slate-500 hover:text-[#E86C1F] mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til Sametinget-hub
        </Link>

        {/* Hero */}
        <div className="mb-12 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            <ShieldCheck className="w-4 h-4" />
            For Institusjoner & Festivaler
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Fra ildsjel til <span className="text-purple-600">institusjon</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Kulturbygging krever forutsigbarhet. Vi rydder i skillet mellom drift og prosjekt, 
            slik at dere oppfyller kravene fra Sametinget og sikrer 
            <McpDataSpan id="text-handlingsrom" value="økonomisk handlingsrom" source="Averdi" className="mx-1 font-medium text-purple-700" />
            til å skape kunst.
          </p>
        </div>

        {/* --- EYECATCHER: DRIFTSMIDLER --- */}
        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-xl mb-16 shadow-sm max-w-4xl">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white rounded-full text-purple-600 shadow-sm mt-1">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-purple-900 text-lg">Rapporteringsfrist for 2026</h3>
              <p className="text-purple-800 text-sm mb-4">
                Det offentlige setter rammene. For å beholde status som fast post på budsjettet, må rapporteringen være feilfri.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Boks 1: Frist */}
                <div className="bg-white p-3 rounded-lg border border-purple-100 flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Innsending</span>
                  <div className="flex items-center gap-2">
                    <McpDataSpan 
                      id="sameting-frist-institusjon-hero-v2" 
                      value="01.03.2026" 
                      source="Sametinget"
                      className="font-bold text-2xl text-slate-900" 
                    />
                  </div>
                  <span className="text-xs text-slate-500 mt-1">Absolutt frist</span>
                </div>

                {/* Boks 2: Formål */}
                <div className="bg-white p-3 rounded-lg border border-purple-100 flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Gjelder for</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="font-bold text-xl text-slate-900">Driftstilskudd</span>
                  </div>
                  <span className="text-xs text-slate-400 mt-1">Lønn, husleie og adm.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nøkkelinformasjon Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
              <Building2 className="text-purple-600 w-5 h-5" /> Hva dekkes?
            </h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold">•</span> 
                Lønn til daglig leder og fast ansatte
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold">•</span> 
                Husleie, strøm og infrastruktur
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold">•</span> 
                Styrearbeid og kompetanseheving
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
              <FileCheck className="text-[#E86C1F] w-5 h-5" /> Rammer og krav
            </h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#E86C1F] font-bold">•</span> 
                Årsregnskap revidert av revisor
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E86C1F] font-bold">•</span> 
                Tydelig skille mellom drift og prosjekt
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E86C1F] font-bold">•</span> 
                Rapport på måloppnåelse
              </li>
            </ul>
          </div>
        </div>

        {/* Expert Insight: Jan-Atle */}
        {janAtle && (
          <div className="max-w-4xl">
            <ExpertInsight 
              title="Kulturell trygghet gjennom tall" 
              quote="Et rent avdelingsregnskap er ikke byråkrati – det er deres fremste forhandlingskort. Når vi skiller drift fra prosjekt, bygger vi tilliten som sikrer neste års bevilgning."
              expert={janAtle}
            >
              <p>
                Mange institusjoner opplever usikkerhet rundt økonomien. Ved å sette opp rigide skiller i regnskapet, fjerner vi tvil. 
                Dette gir styret ro til å fokusere på innholdet, mens vi sikrer at rapporteringen oppfyller Sametingets regelverk til punkt og prikke.
              </p>
            </ExpertInsight>
          </div>
        )}

        {/* --- STYRKET SPRÅKSENTER-FINANSIERING 2026 --- */}
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6 mb-16 shadow-sm max-w-4xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl text-purple-600 shadow-sm">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Styrket i 2026</span>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Økt finansiering til språksentre</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Flere samiske språksentre får styrket driftstilskudd med <strong className="text-purple-700">+800 000 kr</strong> i 2026.
                Dette gir økt handlingsrom for ansettelser og aktiviteter. Kontakt oss for å sikre at regnskapet dokumenterer behovet for videre økning.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 my-16 max-w-4xl">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Strategisk bruk av driftstilskudd
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Mens prosjektmidler er "bensin" til bålet, er driftstilskuddet selve "grua" – fundamentet som holder varmen året rundt.
            For å bygge sterke samiske institusjoner (Birgejupmi), må økonomistyringen reflektere langsiktighet.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="p-5 bg-purple-50 rounded-xl border border-purple-100">
              <h3 className="font-bold text-slate-900 mb-2 text-lg">Kulturhus & Sentra</h3>
              <p className="text-sm text-slate-600 mb-3">
                Språksentre og museer med helårsdrift. Her er nøkkelen å vise stabil aktivitet som rettferdiggjør faste stillinger.
              </p>
              <span className="text-xs text-purple-600 font-medium">+800 000 kr til flere sentre i 2026</span>
            </div>
            <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="font-bold text-slate-900 mb-2 text-lg">Store Festivaler</h3>
              <p className="text-sm text-slate-600 mb-3">
                Har dere fast administrasjon? Da bør dere flyttes fra prosjektstøtte til fast driftstilskudd for bedre forutsigbarhet.
              </p>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            Rapportering som verktøy
          </h3>
          <p className="text-slate-600 mb-4">
            Vi ser på rapporteringen som en mulighet, ikke en plikt. En god rapport synliggjør institusjonens verdi for samfunnet og kan brukes som argumentasjon for økte rammer i fremtiden.
          </p>

          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
            <h3 className="font-bold text-yellow-800 flex items-center gap-2 mb-2 text-lg">
              <Coins className="w-5 h-5" /> Unngå tilbakebetaling
            </h3>
            <p className="text-sm text-yellow-800 leading-relaxed">
              Ubrukte midler ved årsslutt er et faresignal. Vi hjelper dere med periodisering og søknad om overføring, slik at pengene forblir i institusjonen der de hører hjemme.
            </p>
          </div>
        </div>

        {/* CTA Component */}
        <div className="max-w-4xl">
          <CtaBlock
            title="Trenger styret avlastning?"
            description="La Averdi fungere som deres økonomiavdeling. Vi kjenner reglene, dere kjenner kulturen. Sammen skaper vi resultater."
            primaryButtonText="Kontakt Jan-Atle"
            primaryButtonLink="/kontakt"
            secondaryButtonText="Se Næringsstøtte"
            secondaryButtonLink="/kunnskapsbank/sametinget/naering"
          />
        </div>

        {/* FAQ Section */}
        <div className="mt-16 mb-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Ofte stilte spørsmål</h2>
          <FaqAccordion items={faqData} themeColor="#8B5CF6" />
        </div>

      </article>
    </main>
  );
}