import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, MountainSnow, TrendingUp, Anchor, Coins, Tractor, ShieldAlert, BadgeCheck } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { CtaBlock } from '@/components/modules/kunnskapsbank/CtaBlock';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Tilskudd til Reindrift & Tilleggsnæring 2026 | Averdi',
  description: 'Optimaliser siida-økonomien. Vi bistår med søknader om utviklingsmidler, erstatning og tilleggsnæring. Se satser og frister for 2026 her.',
};

export default function ReindriftPage() {
  const janAtle = getExpert('jan-atle');

  const faqData = [
    { 
      question: "Kan vi søke støtte til innkjøp av snøskuter?", 
      answer: "Normalt ikke over Sametingets ordninger. Sametinget prioriterer fellesinvesteringer (anlegg/gjerder) eller tiltak som øker kvinneandelen. Driftsmidler (skuter/ATV) må som regel finansieres over driftsoverskuddet eller via Innovasjon Norge." 
    },
    { 
      question: "Hva menes med tilleggsnæring?", 
      answer: "Dette er virksomhet som drives i kombinasjon med reindriften, for eksempel turisme, videreforedling av kjøtt/skinn, eller 'Inn på tunet'-tjenester. Sametinget har egne potter for å stimulere til dette." 
    },
    { 
      question: "Er erstatning for rovdyrtap skattepliktig?", 
      answer: "Ja, erstatning for tap av rein regnes som virksomhetsinntekt og er skattepliktig på lik linje med salgsinntekter. Det kan periodiseres, men må inn i næringsoppgaven." 
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
          { '@type': 'ListItem', position: 3, name: 'Reindrift', item: 'https://www.averdi.no/kunnskapsbank/sametinget/reindrift' },
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <MountainSnow className="w-4 h-4" />
            For Siidaandeler & Distrikter
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Tradisjonell næring, <span className="text-blue-600">moderne marginer</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Reindrift er mer enn en livsstil; det er en kompleks økonomisk operasjon. 
            Vi hjelper dere å utnytte handlingsrommet mellom statlige erstatningsordninger og Sametingets utviklingsmidler for å sikre 
            <McpDataSpan id="text-birgejupmi" value="Birgejupmi" source="Averdi" className="mx-1 font-medium text-blue-700" />
            (utkomme) for neste generasjon.
          </p>
        </div>

        {/* --- EYECATCHER: SØKNADSFRIST --- */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-16 shadow-sm max-w-4xl">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white rounded-full text-blue-600 shadow-sm mt-1">
              <Tractor className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-blue-900 text-lg">Investeringer for 2026</h3>
              <p className="text-blue-800 text-sm mb-4">
                Skal dere bygge gjerder, slakteanlegg eller investere i tilleggsnæring? Sametinget har løpende søknadsfrister, men budsjettet tømmes ofte tidlig på høsten.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Boks 1: Frist */}
                <div className="bg-white p-3 rounded-lg border border-blue-100 flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Anbefalt Frist</span>
                  <div className="flex items-center gap-2">
                    <McpDataSpan 
                      id="reindrift-frist-anbefalt-2026" 
                      value="01.03.2026" 
                      source="Averdi Anbefaling"
                      className="font-bold text-xl text-slate-900" 
                    />
                  </div>
                  <span className="text-xs text-slate-500 mt-1">For å sikre behandling før sesongstart</span>
                </div>

                {/* Boks 2: Formål */}
                <div className="bg-white p-3 rounded-lg border border-blue-100 flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Gjelder for</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="font-bold text-xl text-slate-900">Utviklingstiltak</span>
                  </div>
                  <span className="text-xs text-slate-400 mt-1">Ikke ordinær drift</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nøkkelinformasjon Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
              <BadgeCheck className="text-blue-600 w-5 h-5" /> Hva støtter Sametinget?
            </h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <strong>Tilleggsnæring:</strong> Turisme, matforedling, duodji.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <strong>Likestilling:</strong> Tiltak for å styrke kvinners posisjon.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <strong>Infrastruktur:</strong> Felles gjerder og anlegg (via distriktet).
              </li>
            </ul>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs text-blue-800 font-medium">
                <strong>Tilleggsnæring-satser:</strong> Inntil 45% av godkjent kostnadsoverslag, maks kr 500 000.
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
              <ShieldAlert className="text-[#E86C1F] w-5 h-5" /> Krav til dokumentasjon
            </h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#E86C1F] font-bold">•</span> 
                Godkjent Melding om Reindrift
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E86C1F] font-bold">•</span> 
                Næringsoppgave eller driftsplan
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E86C1F] font-bold">•</span> 
                Dokumentasjon på eierforhold i siidaen
              </li>
            </ul>
          </div>
        </div>

        {/* Expert Insight */}
        {janAtle && (
          <div className="max-w-4xl">
            <ExpertInsight 
              title="Unngå lappeteppe-økonomi" 
              quote="Reindriftsutøvere må forholde seg til Landbruksdirektoratet for driftstilskudd, Statsforvalteren for erstatning, og Sametinget for utvikling. Kunsten er å se disse i sammenheng for å redusere skattetrykket."
              expert={janAtle}
            >
              <p>
                Mange glemmer at tilskudd til tilleggsnæring kan utløse investeringsmuligheter som også gagner den ordinære driften, 
                så lenge kostnadsfordelingen er pinlig nøyaktig. Vi kaller dette å bygge <strong>økonomisk immunitet</strong> mot dårlige beiteår.
              </p>
            </ExpertInsight>
          </div>
        )}

        {/* Main Content Sections */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 my-16 max-w-4xl">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Fra råvareleverandør til merkevare
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Tradisjonelt har reindriften handlet om å levere slakt. Fremtidens reindrift handler om å eie verdikjeden. 
            Sametinget ønsker å finansiere reindriftsutøvere som vil foredle eget kjøtt eller selge opplevelser, ikke bare kilo.
          </p>

          
          
          <div className="grid sm:grid-cols-2 gap-6 my-12">
            <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <Anchor className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-lg">Tilleggsnæring</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Kombiner reindrift med turisme eller samisk design. Investeringer her kan ofte avskrives raskere og gir flere ben å stå på.
              </p>
            </div>

            <div className="p-5 bg-purple-50 rounded-xl border border-purple-100">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <h3 className="font-bold text-slate-900 text-lg">Rekruttering</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Er du under 35 år? Det finnes egne midler for etablering og førstegangsinvesteringer som skal sikre rekruttering til næringen.
              </p>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            Siida-andelen som AS?
          </h3>
          <p className="text-slate-600 mb-4">
            Dette er et spørsmål vi ofte får. Mens selve retten til å drive reindrift er personlig, kan tilleggsnæringer (foredling, turisme) 
            med fordel skilles ut i egne aksjeselskaper. Dette reduserer risikoen for privatøkonomien og gir bedre sosiale rettigheter.
          </p>

          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
            <h3 className="font-bold text-yellow-800 flex items-center gap-2 mb-2 text-lg">
              <Coins className="w-5 h-5" /> Husk mva-kompensasjon
            </h3>
            <p className="text-sm text-yellow-800 leading-relaxed">
              Ved bygging av felles anlegg (gjerder, slakteplasser) kan distriktet få kompensert merverdiavgiften. Dette må planlegges <i>før</i> spaden settes i jorda for å ikke tape fradraget.
            </p>
          </div>
        </div>

        {/* CTA Component */}
        <div className="max-w-4xl">
          <CtaBlock
            title="Skal du levere Melding om Reindrift?"
            description="Vi kvalitetssikrer tallene før du sender dem inn. En korrekt melding er grunnlaget for både erstatning og tilskudd neste år."
            primaryButtonText="Bestill gjennomgang"
            primaryButtonLink="/kontakt"
            secondaryButtonText="Se næringsstøtte"
            secondaryButtonLink="/kunnskapsbank/sametinget/naering"
          />
        </div>

        {/* FAQ Section */}
        <div className="mt-16 mb-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Ofte stilte spørsmål</h2>
          <FaqAccordion items={faqData} themeColor="#2563EB" />
        </div>

      </article>
    </main>
  );
}