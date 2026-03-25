import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, School, BookOpen, CalendarClock, Users, FileCheck, ShieldCheck, AlertTriangle, Sparkles } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { CtaBlock } from '@/components/modules/kunnskapsbank/CtaBlock';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Skole & Barnehage: Finansiering av Samisk Opplæring 2026 | Averdi',
  description: 'Guide for skoleeiere: Slik får dere dekket vikarutgifter ved videreutdanning og midler til samisk i barnehagen. Se satser og frister her.',
};

export default function OffentligPage() {
  const janAtle = getExpert('jan-atle');

  const faqData = [
    { 
      question: "Dekker staten vikarutgifter fullt ut?", 
      answer: "Ja, i hovedsak. Statsforvalteren bruker faste satser (ofte basert på adjunkt med 10 års ansiennitet) for å refundere vikarutgifter når lærere tar studiepermisjon i samisk." 
    },
    { 
      question: "Må barnehagen være samisk for å få støtte?", 
      answer: "Nei. Norskspråklige barnehager kan også søke om midler til samisk språkopplæring for enkeltbarn, men satsene er lavere enn for rene samiske avdelinger." 
    },
    { 
      question: "Hvem sender søknaden om studiepermisjon?", 
      answer: "Skoleeier (kommunen). Selv om det er læreren som skal studere, må søknaden om midler komme fra arbeidsgiver innen fristen." 
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
          { '@type': 'ListItem', position: 3, name: 'Offentlig sektor', item: 'https://www.averdi.no/kunnskapsbank/sametinget/offentlig' },
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-4">
            <School className="w-4 h-4" />
            For Oppvekstsektoren
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Snu lærerkrisen til en <span className="text-indigo-600">investering</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Mangel på samisk kompetanse er en utfordring, men også en mulighet. 
            Staten tar regningen for vikarer mens dine ansatte videreutdanner seg. 
            Dette er <McpDataSpan id="text-kompetanseheving" value="gratis kompetanseheving" source="Averdi" className="mx-1 font-medium text-indigo-700" /> 
            hvis dere navigerer regelverket riktig.
          </p>
        </div>

        {/* --- EYECATCHER: KRITISKE FRISTER SKOLEÅRET 26/27 --- */}
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl mb-16 shadow-sm max-w-4xl">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white rounded-full text-indigo-600 shadow-sm mt-1">
              <CalendarClock className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-indigo-900 text-lg">Handlingsrommet for 2026</h3>
              <p className="text-indigo-800 text-sm mb-4">
                Skoleåret 26/27 planlegges nå. Glemmer dere fristen 1. april, må dere vente et helt år på neste mulighet for refundert utdanning.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Boks 1: Lærere */}
                <div className="bg-white p-3 rounded-lg border border-indigo-100 flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Studiepermisjon (Lærere)</span>
                  <div className="flex items-center gap-2">
                    <McpDataSpan 
                      id="frist-studiepermisjon-2026-v2" 
                      value="01.04.2026" 
                      source="Statsforvalteren"
                      className="font-bold text-xl text-slate-900" 
                    />
                  </div>
                  <span className="text-xs text-slate-500 mt-1">Søknad fra skoleeier</span>
                </div>

                {/* Boks 2: Barnehage */}
                <div className="bg-white p-3 rounded-lg border border-indigo-100 flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Barnehagetilskudd</span>
                  <div className="flex items-center gap-2">
                    <McpDataSpan 
                      id="frist-barnehage-2026-v2" 
                      value="01.09.2026" 
                      source="Sametinget"
                      className="font-bold text-xl text-slate-900" 
                    />
                  </div>
                  <span className="text-xs text-slate-500 mt-1">Søkes for inneværende år</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nøkkelinformasjon Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
              <ShieldCheck className="text-indigo-600 w-5 h-5" /> Hvem kvalifiserer?
            </h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 font-bold">•</span> 
                Barnehageeiere (Private og kommunale)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 font-bold">•</span> 
                Skoleeiere (Søker om vikarrefusjon)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 font-bold">•</span> 
                Forlag (Utvikling av læremidler)
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
              <FileCheck className="text-[#E86C1F] w-5 h-5" /> Dokumentasjon
            </h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#E86C1F] font-bold">•</span> 
                Timelister for samisk opplæring
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E86C1F] font-bold">•</span> 
                Revisorbekreftet refusjonskrav
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E86C1F] font-bold">•</span> 
                Dokumentasjon på vikarutgifter
              </li>
            </ul>
          </div>
        </div>

        {/* Expert Insight */}
        {janAtle && (
          <div className="max-w-4xl">
            <ExpertInsight 
              title="Gratis kompetanseheving" 
              quote="Kommuner går glipp av millioner fordi de tror kompetanseheving er en ren kostnad. Med 'Stipend for lærere' og refusjon av vikarutgifter, tar staten regningen for at dere skal bygge fremtidens skole."
              expert={janAtle}
            >
              <p>
                En klassisk feil er å sende søknaden til feil instans. Sametinget forvalter barnehagemidlene, men det er ofte 
                <strong> Statsforvalteren i Troms og Finnmark</strong> som sitter på pengesekken for lærerutdanning – uansett hvor i landet dere holder til.
              </p>
            </ExpertInsight>
          </div>
        )}

        {/* Main Content Sections */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 my-16 max-w-4xl">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Slik fungerer pengestrømmen
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Systemet er designet for å fjerne den økonomiske risikoen ved å sende ansatte på skolebenken. 
            Forståelsen av hvem som betaler hva er avgjørende for budsjetteringen.
          </p>

          
          
          <div className="grid sm:grid-cols-2 gap-6 my-12">
            <div className="p-5 bg-indigo-50 rounded-xl border border-indigo-100">
              <div className="flex items-center gap-3 mb-3">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-lg">Læreren</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Beholder full lønn under studiene (inntil 100% permisjon). Forplikter seg til bindingstid for å sikre at kompetansen blir i kommunen (Birgejupmi).
              </p>
            </div>

            <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-lg">Skoleeier</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Får refundert vikarutgifter etter faste satser. Dette gjør at dere kan ansette en vikar uten at lønnsbudsjettet sprekker.
              </p>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            Velg riktig barnehagemodell
          </h3>
          
          <p className="text-slate-600 mb-6">
            Støtten til barnehager er ikke "one-size-fits-all". Nivået på støtten avhenger av hvor sterkt det samiske miljøet er definert i barnehagens struktur. Det lønner seg å være tydelig.
          </p>

          {/* --- NYTT I 2026: TOSPRÅKLIGHETSTILSKUDD --- */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5 mb-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg text-amber-600 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Ny modell fra 2026</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Tospråklighetstilskudd endres</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  Fra 2026 innføres en ny modell for tospråklighetstilskudd til kommuner. Kommunene kategoriseres nå i ulike grupper basert på
                  <strong> språksituasjon og behov</strong>. Dette påvirker hvordan midlene fordeles.
                </p>
                <div className="flex items-start gap-2 text-xs text-amber-800 bg-amber-100/50 p-2 rounded-lg">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Kommuner bør gjennomgå sin kategorisering og dokumentere språkbehov for å sikre riktig tilskuddsnivå.</span>
                </div>
              </div>
            </div>
          </div>

          <ul className="list-disc list-inside space-y-2 text-slate-600 mb-8 ml-2 mt-6">
            <li><strong>Samiske barnehager:</strong> Krever vedtektsfestet samisk formål. Utløser høyeste sats.</li>
            <li><strong>Avdelinger med samisk tilbud:</strong> Støtte per avdeling som driftes på samisk.</li>
            <li><strong>Språkopplæring:</strong> Støtte per barn. For norskspråklige barnehager som vil gi et tilbud.</li>
          </ul>

          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
            <h3 className="font-bold text-yellow-800 flex items-center gap-2 mb-2 text-lg">
              <BookOpen className="w-5 h-5" /> Mulighet: Læremidler
            </h3>
            <p className="text-sm text-yellow-800 leading-relaxed">
              Markedet skriker etter digitale læremidler på lule- og sørsamisk. For teknologiselskaper og forlag er dette en nisje med betydelig investeringsvilje fra Sametinget.
            </p>
          </div>
        </div>

        {/* CTA Component */}
        <div className="max-w-4xl">
          <CtaBlock
            title="Trenger kommunen hjelp?"
            description="Averdi avlaster oppvekstetaten. Vi sikrer at søknader sendes rett, frister holdes, og at refusjonskravet er dokumentert slik revisor krever."
            primaryButtonText="Kontakt oss"
            primaryButtonLink="/kontakt"
            secondaryButtonText="Se kulturstøtte"
            secondaryButtonLink="/kunnskapsbank/sametinget/kultur-sprak"
          />
        </div>

        {/* FAQ Section */}
        <div className="mt-16 mb-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Ofte stilte spørsmål</h2>
          <FaqAccordion items={faqData} themeColor="#6366f1" />
        </div>

      </article>
    </main>
  );
}