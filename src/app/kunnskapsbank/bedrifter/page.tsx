import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowLeft, 
  TrendingUp, 
  Briefcase, 
  Truck, 
  Calculator, 
  ShieldCheck, 
  Coins, 
  BookOpen, 
  ExternalLink,
  Users,
  Building2,
  FileText,
  Settings
} from 'lucide-react';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Regnskap for småbedrifter i Tiltakssonen | 0% AGA & Skattefordeler 2026',
  description: 'Regnskapsfører for små og mellomstore bedrifter i Finnmark og Nord-Troms. Guide til 0% arbeidsgiveravgift, Finnmarksfradraget og skatteoptimalisering i 2026.',
  alternates: {
    canonical: '/kunnskapsbank/bedrifter',
  },
  openGraph: {
    title: 'Regnskap for småbedrifter i Tiltakssonen | Averdi',
    description: 'Vi er regnskapsfører for enkeltmannsforetak, gründere og SMB i Finnmark. 0% arbeidsgiveravgift, Finnmarksfradrag og skatteoptimalisering.',
    url: 'https://www.averdi.no/kunnskapsbank/bedrifter',
    siteName: 'Averdi - Tolken av Nord-Norge',
    locale: 'nb_NO',
    type: 'website',
  },
};

// Lokal CategoryCard for stabilitet
function LocalCategoryCard({ title, description, href, icon: Icon, theme }: any) {
    const themeColor = theme === 'blue' ? 'text-blue-600 bg-blue-50 group-hover:bg-blue-600' : 'text-[#E86C1F] bg-orange-50 group-hover:bg-[#E86C1F]';
    const hoverText = theme === 'blue' ? 'group-hover:text-blue-600' : 'group-hover:text-[#E86C1F]';

    return (
        <Link href={href} aria-label={`${title} — Les mer`} className={`group flex flex-col p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all h-full hover:border-${theme === 'blue' ? 'blue-600' : '[#E86C1F]'}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${themeColor} group-hover:text-white transition-colors`}>
                <Icon className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className={`text-xl font-bold text-slate-900 mb-2 ${hoverText} transition-colors`}>{title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed flex-grow">{description}</p>
        </Link>
    );
}

export default function BedriftHub() {

  // FAQ Data med SEO-fokus på skatt og soner (JSX for visning)
  const bedriftFaq = [
    {
      question: 'Hvilke kommuner har 0% arbeidsgiveravgift (Sone 5)?',
      answer: <>Nullsatsen gjelder i hele <strong>Finnmark fylke</strong>, samt følgende kommuner i Nord-Troms: Karlsøy, Kvænangen, Kåfjord, Lyngen, Nordreisa, Skjervøy og Storfjord. Dette er definert som <em>Tiltakssonen</em>.</>
    },
    {
      question: 'Gjelder nullsatsen for transportbedrifter?',
      answer: <>Nei, transportsektoren og finansforetak omfattes av EØS-reglene for <strong>bagatellstøtte (De Minimis)</strong>. Det betyr at dere har et tak på hvor mye avgiftslette dere kan motta over en 3-års periode (ca 300 000 Euro).</>
    },
    {
      question: 'Hva er Finnmarksfradraget for 2026?',
      answer: <>I forslaget til Statsbudsjettet 2026 økes Finnmarksfradraget til <strong>45 000 kroner</strong>. Dette er et fradrag i alminnelig inntekt som gis til alle som er bosatt i tiltakssonen.</>
    },
    {
      question: 'Kan jeg ha ansatte på hjemmekontor sørpå?',
      answer: <>Hvis en ansatt bor og jobber (hjemmekontor) utenfor tiltakssonen mer enn 50% av tiden, skal det betales arbeidsgiveravgift etter satsen der den ansatte bor (f.eks. 14,1% i Oslo). Det er <strong>arbeidsstedet</strong>, ikke bedriftens adresse, som styrer satsen.</>
    }
  ];

  // JSON-LD Schema for Google (String only)
  const jsonLdData = [
    { q: 'Hvilke kommuner har 0% arbeidsgiveravgift (Sone 5)?', a: 'Nullsatsen gjelder i hele Finnmark fylke, samt følgende kommuner i Nord-Troms: Karlsøy, Kvænangen, Kåfjord, Lyngen, Nordreisa, Skjervøy og Storfjord.' },
    { q: 'Gjelder nullsatsen for transportbedrifter?', a: 'Nei, transportsektoren og finansforetak omfattes av EØS-reglene for bagatellstøtte (De Minimis).' },
    { q: 'Hva er Finnmarksfradraget for 2026?', a: 'I forslaget til Statsbudsjettet 2026 økes Finnmarksfradraget til 45 000 kroner.' },
    { q: 'Kan jeg ha ansatte på hjemmekontor sørpå?', a: 'Hvis en ansatt bor og jobber (hjemmekontor) utenfor tiltakssonen mer enn 50% av tiden, skal det betales arbeidsgiveravgift etter satsen der den ansatte bor.' }
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
          { '@type': 'ListItem', 'position': 2, 'name': 'Bedrift & Handel', 'item': 'https://www.averdi.no/kunnskapsbank/bedrifter' }
        ]
      },
      {
        '@type': 'Service',
        'name': 'Regnskap for småbedrifter i Tiltakssonen',
        'serviceType': 'Regnskapsføring og skattrådgivning for små og mellomstore bedrifter',
        'provider': { '@type': 'Organization', 'name': 'Averdi AS' },
        'description': 'Vi er regnskapsfører for enkeltmannsforetak, gründere og SMB i Finnmark og Nord-Troms. Spesialisert på 0% arbeidsgiveravgift, Finnmarksfradrag og tiltakssonens skattefordeler.',
        'areaServed': ['Finnmark', 'Nord-Troms', 'Nord-Norge'],
        'audience': {
          '@type': 'Audience',
          'audienceType': 'Småbedrifter, enkeltmannsforetak og gründere i Nord-Norge'
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      <AverdiBackground />
      
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Breadcrumb */}
        <Link href="/kunnskapsbank" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Tilbake til oversikt
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3 block">
            Strategisk Økonomistyring
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-slate-900 leading-tight">
            Ditt konkurransefortrinn <span className="text-blue-600">i Nord</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
            I 2026 styrkes de personrettede virkemidlene i Nord-Troms og Finnmark kraftig. 
            Med <McpDataSpan id="aga-sats-sone5-2026" value="0" format="percentage" source="Statsbudsjettet 2026" className="font-bold text-slate-900 bg-blue-50 px-2 py-0.5 rounded"/> arbeidsgiveravgift 
            og økt nedskriving av studielån, har du muligheten til å være lønnsledende uten å øke totalkostnadene.
          </p>
        </div>

        {/* --- BUDSJETTANALYSE (BEDRIFT) --- */}
        <section className="my-16 bg-slate-900 text-white rounded-2xl overflow-hidden shadow-xl border border-slate-700">
          <div className="flex flex-col md:flex-row">
            <div className="p-8 md:p-12 md:w-2/5 bg-slate-800 relative">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <FileText className="w-32 h-32 text-white" aria-hidden="true" />
              </div>
              <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider rounded-full mb-4 border border-blue-500/30">
                Averdi Innsikt
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Statsbudsjettet 2026: Slik påvirkes din bunnlinje
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Vi har analysert de foreslåtte endringene i skattesatser og distriktspolitiske virkemidler. 
                Her er mulighetsrommet for din bedrift.
              </p>
              
              

              <div className="flex items-center gap-3 text-sm text-slate-400 mt-4">
                <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center font-bold">AV</div>
                <span>Analysert av Averdi-teamet</span>
              </div>
            </div>

            <div className="p-8 md:p-12 md:w-3/5 bg-slate-900">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="mt-1 bg-green-500/10 p-2 rounded-lg h-fit">
                    <TrendingUp className="w-5 h-5 text-green-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-1">Rekruttering blir billigere</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Med økt gjeldsslette (60k) og Finnmarksfradrag (45k), øker den ansattes kjøpekraft betraktelig. 
                      Dette betyr at du kan tilby en svært konkurransedyktig totalpakke uten å øke bruttolønnen tilsvarende.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 bg-blue-500/10 p-2 rounded-lg h-fit">
                    <ShieldCheck className="w-5 h-5 text-blue-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-1">Nullsatsen ligger fast</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Arbeidsgiveravgiften i Sone 5 forblir 0%. For en bedrift med 10 millioner i lønnskostnader, 
                      utgjør dette en direkte besparelse på 1,41 millioner sammenlignet med en konkurrent i Oslo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- STATUS-OPPDATERING & SATSER --- */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-20 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Del 1: Regnskapsmessig Kontroll */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 text-blue-900">
                <Briefcase className="w-6 h-6 text-blue-600" aria-hidden="true" />
                <h3 className="font-bold text-lg">Full kontroll på regelverket</h3>
              </div>
              <p className="text-blue-800 text-sm mb-4 leading-relaxed">
                Det finnes unntak og fallgruver, spesielt knyttet til "bagatellstøtte" for transportnæringen og regler for hjemmekontor. 
                Vi sikrer at din bedrift rapporterer riktig til Skatteetaten.
              </p>
              <div className="bg-white p-3 rounded-lg border border-blue-100 inline-block">
                <span className="text-xs text-slate-500 uppercase font-bold block mb-1">Vårt råd</span>
                <span className="font-bold text-slate-900">Ta en sone-sjekk på alle ansatte i januar.</span>
              </div>
            </div>

            {/* Del 2: Nøkkeltall 2026 */}
            <div className="flex-1 md:border-l md:border-blue-200 md:pl-8">
              <div className="flex items-center gap-3 mb-3 text-blue-900">
                <Coins className="w-6 h-6 text-blue-600" aria-hidden="true" />
                <h3 className="font-bold text-lg">Satser for 2026</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold block">AGA Sone 5</span>
                  <McpDataSpan 
                    id="aga-sone5-2026" 
                    value="0" 
                    format="percentage" 
                    className="font-bold text-xl text-slate-900" 
                  />
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold block">Studielån (Slette)</span>
                  <McpDataSpan 
                    id="studielan-sone5-2026" 
                    value="60 000" 
                    format="currency" 
                    className="font-bold text-xl text-green-600" 
                  />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3 italic">
                * Satser basert på forslag i Statsbudsjettet 2026.
              </p>
            </div>

          </div>
        </div>

        {/* --- DIGITALE VERKTØY (NY SEKSJON) --- */}
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Verktøykasse for ledere</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          
          

          {/* ARTIKKEL: REKRUTTERING */}
          <LocalCategoryCard 
            title="Rekrutteringspakken 2026"
            description="Slik bruker du de nye reglene for studielån og skatt som et våpen i kampen om talentene."
            href="/kunnskapsbank/bedrifter/rekruttering" 
            icon={Users}
            theme="blue"
          />

          {/* VERKTØY: VIPPS INTEGRASJON */}
          <LocalCategoryCard 
            title="Vipps Integrasjonsguide"
            description="Interaktiv oppsett av Vipps MobilePay med PowerOffice Go. Automatiser bokføring av oppgjør, gebyrer og MVA."
            href="/kunnskapsbank/bedrifter/vipps-integrasjon" 
            icon={Settings}
            theme="blue"
          />

          {/* ARTIKKEL: TRANSPORT/REGLER */}
          <LocalCategoryCard 
            title="Transport & Bagatellstøtte"
            description="Unntaksreglene du må kjenne til. Slik unngår du straffeskatt hvis du driver med godstransport."
            href="/kunnskapsbank/bedrifter/transport" 
            icon={Truck}
            theme="blue"
          />

          {/* ARTIKKEL: INNOVASJON NORGE */}
          <LocalCategoryCard 
            title="Arktiske Midler"
            description="Slik kombinerer du 0% AGA med investeringsstøtte fra Innovasjon Norge Arktis."
            href="/kunnskapsbank/bedrifter/innovasjon-norge" 
            icon={Building2}
            theme="blue"
          />

        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Spørsmål om Sone 5</h2>
          <FaqAccordion items={bedriftFaq} themeColor="#2563EB" />
        </div>

        {/* --- KILDER & AUTORITET --- */}
        <div className="border-t border-slate-200 pt-8 pb-4 mt-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-slate-500">
            <div className="flex items-start gap-3 max-w-2xl">
              <BookOpen className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-slate-700 mb-1">Offisielt Regelverk</p>
                <p>
                  Beregninger og satser er hentet fra <strong>Statsbudsjettet 2026</strong> (Prop. 1 S) og Skatteetatens gjeldende satser for arbeidsgiveravgift.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://www.skatteetaten.no/bedrift-og-organisasjon/arbeidsgiver/arbeidsgiveravgift/soner/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                Sonekart (Skatteetaten) <span className="sr-only"> (åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
              <a href="https://www.regjeringen.no/no/statsbudsjett/2026/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                Statsbudsjettet 2026 <span className="sr-only"> (åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}