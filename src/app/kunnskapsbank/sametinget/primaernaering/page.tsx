import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertTriangle, FileText, Coins, TrendingUp, MapPin, Anchor, Tractor, Fish } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { CtaBlock } from '@/components/modules/kunnskapsbank/CtaBlock';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Støtte til Fiske og Landbruk | Sametinget',
  description: 'Investeringstilskudd til fiskefartøy, redskap, mottaksanlegg og jordbruk i STN-området. Vi veileder deg gjennom regelverket.',
};

export default function SametingetPrimaryPage() {
  const janAtle = getExpert('jan-atle');

  const faqData = [
    { question: "Kan jeg få støtte til kjøp av min første sjark?", answer: "Ja. Sametinget prioriterer førstegangsetablerere i fiskerinæringen. Du må være registrert på blad B i Fiskermanntallet, og båten må være under 11 meter. Både nye og brukte fartøy kan støttes ved førstegangsetablering." },
    { question: "Gjelder støtten for brukt utstyr i landbruk?", answer: "Som hovedregel gis det kun støtte til nye investeringer og nybygg. Brukte maskiner og utstyr støttes normalt ikke. Nedre grense for tilskudd er 30 000 kr." },
    { question: "Må jeg stå i Fiskermanntallet?", answer: "Ja. For å søke støtte til fiskeriformål må du være registrert på blad B i Fiskermanntallet. Mottaksanlegg må ha mottaks- og kjøpegodkjenning." }
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
          { '@type': 'ListItem', position: 3, name: 'Primærnæring', item: 'https://www.averdi.no/kunnskapsbank/sametinget/primaernaering' },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <AverdiBackground />

      <article className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Breadcrumb */}
        <Link href="/kunnskapsbank/sametinget" className="inline-flex items-center text-slate-500 hover:text-[#E86C1F] mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til Sametinget-hub
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
            Marine næringer & Landbruk
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Kapital til <span className="text-[#E86C1F]">Kyst og Vidde</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Skal du investere i eget fartøy, bygge nytt fjøs eller modernisere driften? 
            Sametinget har øremerkede midler for å sikre at primærnæringene i nord forblir lønnsomme og bærekraftige.
          </p>
        </div>

        {/* --- GEOGRAFI-SJEKK --- */}
        <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-2xl mb-12 flex items-start gap-4 shadow-sm">
          <div className="p-2 bg-white rounded-full text-indigo-600 shadow-sm mt-1 shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-indigo-900 text-lg mb-1">STN-området er inngangsbilletten</h3>
            <p className="text-indigo-800 text-sm leading-relaxed">
              Disse ordningene er eksklusive for bedrifter og personer bosatt i <em>Sametingets virkeområde for næring</em>. 
              Dette gjelder store deler av Finnmark og Troms, samt utvalgte kommuner i Nordland.
            </p>
          </div>
        </div>

        {/* --- EYECATCHER: FINANSIERINGSOVERSIKT --- */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-16 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white rounded-full text-blue-600 shadow-sm mt-1">
              <Anchor className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-blue-900 text-lg">Finansieringsrammer 2026</h3>
              <p className="text-blue-800 text-sm mb-4">
                Satsene varierer etter næring. Jordbruk har høyest tak, marine næringer har egne satser.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Boks 1: Maks Beløp */}
                <div className="bg-white p-3 rounded-lg border border-blue-100 flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Maks Investeringstøtte</span>
                  <div className="flex items-baseline gap-1">
                    <McpDataSpan 
                      id="sameting-marine-maks-sats" 
                      value="500 000" 
                      format="currency" 
                      source="Sametinget 2026"
                      className="font-bold text-2xl text-slate-900" 
                    />
                    <span className="text-sm text-slate-500 font-medium">NOK</span>
                  </div>
                  <span className="text-xs text-slate-400 mt-1">Jordbruk maks | Marine: 300 000 kr</span>
                </div>

                {/* Boks 2: Støttegrad */}
                <div className="bg-white p-3 rounded-lg border border-blue-100 flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Dekningsgrad</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="font-bold text-xl text-slate-900">Inntil 35%</span>
                  </div>
                  <span className="text-xs text-slate-400 mt-1">Av godkjent kostnadsoverslag</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nøkkelinformasjon Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
              <CheckCircle2 className="text-green-500 w-5 h-5" /> Hvem kvalifiserer?
            </h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li>• Fiskere på blad B i Fiskermanntallet</li>
              <li>• Jordbruksforetak i STN-området</li>
              <li>• Mottaksanlegg med kjøpegodkjenning</li>
              <li>• Førstegangsetablerere prioriteres</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
              <AlertTriangle className="text-[#E86C1F] w-5 h-5" /> Viktige begrensninger
            </h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li>• Fartøy må være under 11 meter</li>
              <li>• Maks 50% samlet offentlig støtte</li>
              <li>• Prosjekter over 8 mill. kr støttes ikke</li>
            </ul>
          </div>
        </div>

        {/* Expert Insight */}
        {janAtle && (
          <ExpertInsight 
            title="Lønnsomhet i småskala" 
            quote="Mange tror at de store pengene kun ligger i de store kvotene. Men med riktig finansiering fra Sametinget, kan en mindre sjark eller et modernisert gårdsbruk gi en svært solid driftsmargin, spesielt når gjeldsgraden holdes nede."
            expert={janAtle}
          >
            <p>
              Vi ser ofte at kunder undervurderer verdien av tilleggsnæring. 
              Kombinasjonen av tradisjonelt fiske og lokal videreforedling er akkurat den typen "robust økonomi" Sametinget ønsker å støtte.
            </p>
          </ExpertInsight>
        )}

        {/* Main Content Sections */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 my-16">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Hva kan du søke støtte til?
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Sametinget deler primærnæringene inn i to hovedkategorier utenom reindrift (som har egne prosesser). 
            Her er mulighetene for deg som lever av naturen:
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {/* Marine Næringer */}
            <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <Fish className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-lg">Marine Næringer</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• <strong>Fiskefartøy:</strong> Kjøp/ombygging (førstegangsetablering prioritert).</li>
                <li>• <strong>Redskap:</strong> Maks 50 000 kr (kun ved fartøykjøp).</li>
                <li>• <strong>Mottak/service:</strong> Maks 300 000 kr (35%).</li>
                <li>• <strong>Ungdomsfiske:</strong> Maks 100 000 kr (for kommuner).</li>
              </ul>
            </div>

            {/* Jordbruk */}
            <div className="p-5 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-center gap-2 mb-3">
                <Tractor className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-slate-900 text-lg">Jordbruk & Tilleggsnæring</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• <strong>Driftsbygninger:</strong> Maks 500 000 kr (35%).</li>
                <li>• <strong>Maskinringer:</strong> Maks 100 000 kr for fellestiltak.</li>
                <li>• <strong>Videreforedling:</strong> Utstyr for lokalmatproduksjon.</li>
                <li>• <strong>Rovvilttap:</strong> Dokumentasjonsprosjekter prioritert.</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            Spesielt for fiskere: Førstegangsetablering
          </h3>
          
          <p className="text-slate-600 mb-6">
            Er du ung fisker i et sjøsamisk område? Da har du noen av de beste vilkårene i virkemiddelapparatet. 
            Sametinget ønsker å rekruttere unge til kysten.
          </p>

          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 mb-8">
            <h3 className="font-bold text-indigo-900 mb-3 text-lg">Kriterier for investeringstilskudd til fartøy:</h3>
            <ul className="grid sm:grid-cols-2 gap-4 text-sm text-indigo-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-indigo-600" />
                <span>Søker må være registrert på blad B i Fiskermanntallet.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-indigo-600" />
                <span>Fartøyet må være under 11 meter.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-indigo-600" />
                <span>Ikke mottatt fartøystøtte fra Sametinget tidligere.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-indigo-600" />
                <span>Bosatt i STN-området (majoritetseier ved AS).</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
            <h3 className="font-bold text-yellow-800 flex items-center gap-2 mb-2 text-lg">
              <FileText className="w-5 h-5" /> Dokumentasjon er nøkkelen
            </h3>
            <p className="text-sm text-yellow-800 leading-relaxed">
              For primærnæringene er kravene til lønnsomhetsberegning strenge. 
              Du må vise et realistisk driftsbudsjett for de neste årene. 
              Vi hjelper deg å sette opp dette slik at saksbehandleren ser potensialet umiddelbart.
            </p>
          </div>
        </div>

        {/* CTA Component */}
        <CtaBlock
          title="Klar for å satse?"
          description="Vi kjenner reglene for både sjark og fjøs. La oss ta papirarbeidet, så kan du fokusere på driften."
          primaryButtonText="Start søknadsprosessen"
          primaryButtonLink="/kontakt"
          secondaryButtonText="Se alle støtteordninger"
          secondaryButtonLink="/kunnskapsbank/sametinget"
        />

        {/* FAQ Section */}
        <div className="mt-16 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Ofte stilte spørsmål om primærnæring</h2>
          <FaqAccordion items={faqData} themeColor="#3b82f6" />
        </div>

      </article>
    </main>
  );
}