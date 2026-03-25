import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertTriangle, FileText, Coins, TrendingUp, MapPin } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { CtaBlock } from '@/components/modules/kunnskapsbank/CtaBlock';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Næringsstøtte fra Sametinget | Guide for Bedrifter',
  description: 'Slik søker du om tilskudd til Duodji, samisk reiseliv og tilleggsnæringer. Få inntil 800.000 i støtte i STN-området. Vi hjelper deg med søknaden.',
};

export default function SametingetNaeringPage() {
  const janAtle = getExpert('jan-atle');

  const faqData = [
    { question: "Hvor mye kan jeg få i støtte til variert næringsliv?", answer: "Du kan få inntil 800 000 kroner i investeringstilskudd. Støttesatsen varierer: inntil 40% for ordinære bedrifter, inntil 50% for mat fra samiske områder, og inntil 70% for samiske organisasjoner. Minimumskostnad for prosjektet er 30 000 kr." },
    { question: "Hvilke bedrifter kan søke Sametinget?", answer: "Ordningen gjelder for bedrifter etablert i STN-området (Sametingets virkeområde for næring). Prosjektet må ha en samisk kulturell forankring eller bidra til lokalsamfunnet." },
    { question: "Kan jeg søke støtte til brukt utstyr?", answer: "Hovedregelen er at Sametinget støtter kjøp av nytt utstyr. Kjøp av brukt utstyr støttes normalt ikke, med mindre det er særskilte grunner for det." }
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
          { '@type': 'ListItem', position: 3, name: 'Næring og tilleggsnæringer', item: 'https://www.averdi.no/kunnskapsbank/sametinget/naering' },
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
            For Bedrifter & Etablerere
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Tilskudd til <span className="text-[#E86C1F]">Næringsutvikling</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Sametinget gir støtte til bedrifter som bygger opp under samisk kultur og bosetting. 
            Dette er risikokapital som kan være avgjørende for å realisere ditt prosjekt i nord.
          </p>
        </div>

        {/* --- GEOGRAFI-SJEKK (NY) --- */}
        <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-2xl mb-12 flex items-start gap-4 shadow-sm">
          <div className="p-2 bg-white rounded-full text-indigo-600 shadow-sm mt-1 shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-indigo-900 text-lg mb-1">Gjelder kun STN-området</h3>
            <p className="text-indigo-800 text-sm leading-relaxed">
              For å være kvalifisert til søke må bedriften din ha forretningsadresse i <em>Sametingets virkeområde for næring</em> (STN). 
              Dette omfatter kommuner og kretser i Finnmark, Troms og Nordland hvor samisk språk og kultur står sterkt.
            </p>
          </div>
        </div>

        {/* --- EYECATCHER: FINANSIERINGSOVERSIKT --- */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-16 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white rounded-full text-blue-600 shadow-sm mt-1">
              <Coins className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-blue-900 text-lg">Finansieringsrammer for 2026</h3>
              <p className="text-blue-800 text-sm mb-4">
                Midlene tildeles løpende. Det betyr at potten kan gå tom før året er omme.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Boks 1: Maks Beløp */}
                <div className="bg-white p-3 rounded-lg border border-blue-100 flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Maks Investeringstøtte</span>
                  <div className="flex items-baseline gap-1">
                    <McpDataSpan 
                      id="sameting-naering-maks-sats-hero" 
                      value="800 000" 
                      format="currency" 
                      source="Sametinget 2026"
                      className="font-bold text-2xl text-slate-900" 
                    />
                    <span className="text-sm text-slate-500 font-medium">NOK</span>
                  </div>
                </div>

                {/* Boks 2: Støttegrad */}
                <div className="bg-white p-3 rounded-lg border border-blue-100 flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Dekningsgrad</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="font-bold text-xl text-slate-900">40-70%</span>
                  </div>
                  <span className="text-xs text-slate-400 mt-1">40% ordinær, 50% mat, 70% org.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nøkkelinformasjon Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
              <CheckCircle2 className="text-green-500 w-5 h-5" /> Hvem kan søke?
            </h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li>• Bedrifter registrert i Enhetsregisteret</li>
              <li>• Enkeltpersonforetak (ENK) og AS</li>
              <li>• Etablerere med forretningsadresse i virkeområdet</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
              <AlertTriangle className="text-[#E86C1F] w-5 h-5" /> Viktige krav
            </h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li>• Prosjektet må ha samisk kulturelement</li>
              <li>• Søknad MÅ sendes <em>før</em> investeringen gjøres</li>
              <li>• Måloppnåelse vektlegges tungt</li>
            </ul>
          </div>
        </div>

        {/* Expert Insight */}
        {janAtle && (
          <ExpertInsight 
            title="Slik knekker du 'Kultur-koden' i søknaden" 
            quote="Det vanligste feilen bedrifter gjør, er å skrive en ren forretningsplan. Sametinget er ikke en bank. Du må forklare hvordan din bedrift styrker samisk språk, kultur eller lokalsamfunn."
            expert={janAtle}
          >
            <p>
              Når vi bistår kunder med søknader, starter vi alltid med "kultur-kapittelet". 
              Om du skal starte en reiselivsbedrift holder det ikke å selge nordlys. 
              Du må vise hvordan du formidler samisk historie på en autentisk måte.
            </p>
          </ExpertInsight>
        )}

        {/* Main Content Sections */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 my-16">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Hvilke næringer prioriteres?
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Sametingets næringspolitikk er tydelig på at de ønsker variert næringsliv. 
            Her er hovedkategoriene som ofte får støtte:
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="p-5 bg-orange-50 rounded-xl border border-orange-100">
              <h3 className="font-bold text-slate-900 mb-2 text-lg">Duodji (Håndverk)</h3>
              <p className="text-sm text-slate-600">
                Egne ordninger for driftstilskudd, investeringer i verksted, og markedstiltak.
                Krever ofte fagbrev eller dokumentert kompetanse.
              </p>
            </div>
            <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="font-bold text-slate-900 mb-2 text-lg">Samisk Reiseliv</h3>
              <p className="text-sm text-slate-600">
                Utvikling av opplevelser basert på samisk kultur. Støtte til fysiske fasiliteter (f.eks. lavvo, gamme) og markedsføring.
              </p>
            </div>
            <div className="p-5 bg-green-50 rounded-xl border border-green-100">
              <h3 className="font-bold text-slate-900 mb-2 text-lg">Tilleggsnæring</h3>
              <p className="text-sm text-slate-600">
                Kombinasjonsdrift i primærnæringene. F.eks. videreforedling av kjøtt/fisk eller "Inn på tunet"-tjenester.
              </p>
            </div>
            <div className="p-5 bg-purple-50 rounded-xl border border-purple-100">
              <h3 className="font-bold text-slate-900 mb-2 text-lg">Kreative næringer</h3>
              <p className="text-sm text-slate-600">
                Design, musikkproduksjon, forlag og arkitektur som bygger på samisk egenart.
              </p>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            Hvordan beregnes støtten?
          </h3>
          
          <p className="text-slate-600 mb-4">
            Selv om rammen er høy, fullfinansierer Sametinget sjelden prosjekter. 
            Det er en forutsetning at du har egenkapital eller lån i bunnen.
            Støttegraden varierer fra prosjekt til prosjekt, men følger disse retningslinjene:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 mb-8 ml-2">
            <li>
              <strong>Hovedregel:</strong> Inntil{' '}
              <McpDataSpan id="sameting-investering-prosent" value="40" format="percentage" source="Sametinget 2026" className="font-bold text-slate-900" />{' '}
              av godkjente kostnader.
            </li>
            <li>
              <strong>Nedre grense:</strong> Prosjekter med totalbudsjett under{' '}
              <McpDataSpan id="sameting-naering-min-grense" value="30 000" format="currency" source="Sametinget 2026" className="font-bold text-slate-900" />{' '}
              prioriteres sjelden.
            </li>
            <li>
              <strong>Mat fra samiske områder:</strong> Inntil 50% dekning for videreforedling og økt omsetning av lokal mat (maks kr 800 000).
            </li>
            <li>
              <strong>Samiske organisasjoner:</strong> Inntil 70% dekning for interesse- og næringsorganisasjoner (maks kr 500 000).
            </li>
            <li>
              <strong>Øvre grense:</strong> Maksimalt tilskudd er{' '}
              <McpDataSpan id="sameting-naering-maks-grense" value="800 000" format="currency" source="Sametinget 2026" className="font-bold text-slate-900" />{' '}
              per prosjekt.
            </li>
          </ul>

          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
            <h3 className="font-bold text-yellow-800 flex items-center gap-2 mb-2 text-lg">
              <FileText className="w-5 h-5" /> Husk prosjektregnskap!
            </h3>
            <p className="text-sm text-yellow-800 leading-relaxed">
              Mottar du støtte, må du føre eget prosjektregnskap som viser at pengene er brukt til formålet. 
              Dette må ofte attesteres av statsautorisert revisor/regnskapsfører (det er oss!). 
              Manglende rapportering fører til krav om tilbakebetaling.
            </p>
          </div>
        </div>

        {/* CTA Component */}
        <CtaBlock
          title="Har du en forretningsidé?"
          description="Vi kan hjelpe deg å vurdere om prosjektet kvalifiserer til støtte, og bistå med budsjett og søknadsskriving."
          primaryButtonText="Bestill rådgivningstime"
          primaryButtonLink="/kontakt"
          secondaryButtonText="Les om Kulturstøtte i stedet"
          secondaryButtonLink="/kunnskapsbank/sametinget/kultur-sprak"
        />

        {/* FAQ Section */}
        <div className="mt-16 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Ofte stilte spørsmål</h2>
          <FaqAccordion items={faqData} themeColor="#3b82f6" />
        </div>

      </article>
    </main>
  );
}