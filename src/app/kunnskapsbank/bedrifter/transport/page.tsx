import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Truck, 
  AlertTriangle, 
  Calculator, 
  FileText, 
  CheckCircle2,
  XCircle,
  ExternalLink,
  HelpCircle,
  Euro,
  Clock,
  Building2,
  Scale
} from 'lucide-react';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { McpDataSpan } from '@/components/ui/McpDataSpan';

export const metadata: Metadata = {
  title: 'Transport & Bagatellstøtte | De Minimis-reglene forklart',
  description: 'Unntaksreglene for arbeidsgiveravgift i transportsektoren. Slik unngår du straffeskatt og rapporterer riktig til Skatteetaten.',
};

// Lokal CtaBlock
function LocalCtaBlock({ title, description, primaryButtonText, primaryButtonLink }: {
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
}) {
  return (
    <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden my-12 shadow-2xl">
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-3xl mx-auto">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{title}</h3>
          <p className="text-slate-300 text-lg mb-0 leading-relaxed">{description}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          {primaryButtonLink && (
            <Link href={primaryButtonLink} className="inline-flex items-center justify-center px-8 py-3 bg-[#E86C1F] text-white font-bold rounded-full hover:bg-[#d65f18] transition-all shadow-lg">
              {primaryButtonText || 'Les mer'}
            </Link>
          )}
        </div>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E86C1F]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
    </div>
  );
}

// Infokort-komponent
function InfoCard({ icon: Icon, title, description, variant = 'default' }: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  variant?: 'default' | 'warning' | 'success';
}) {
  const variants = {
    default: 'bg-white border-slate-200',
    warning: 'bg-yellow-50 border-yellow-200',
    success: 'bg-green-50 border-green-200'
  };
  const iconVariants = {
    default: 'bg-blue-50 text-blue-600',
    warning: 'bg-yellow-100 text-yellow-700',
    success: 'bg-green-100 text-green-700'
  };
  
  return (
    <div className={`p-6 rounded-xl border shadow-sm ${variants[variant]}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconVariants[variant]}`}>
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>
      <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function TransportPage() {
  // FAQ Data
  const faqItems = [
    {
      question: 'Hva er bagatellstøtte (De Minimis)?',
      answer: <>Bagatellstøtte er offentlig støtte som er så liten at den anses å ikke påvirke konkurransen i EØS-markedet. For de fleste sektorer er taket <strong>300 000 Euro</strong> over en 3-års periode. For veitransport gjelder et lavere tak på <strong>100 000 Euro</strong>.</>
    },
    {
      question: 'Hvilke bedrifter omfattes av unntaksreglene?',
      answer: <>Unntaksreglene gjelder primært for <strong>godstransport på vei</strong>, <strong>finanssektoren</strong> og <strong>primærnæringer</strong> (jordbruk, fiske). Disse sektorene kan ikke benytte full AGA-fritak i Tiltakssonen uten å ta hensyn til De Minimis-taket.</>
    },
    {
      question: 'Hvordan beregnes 3-års perioden?',
      answer: <>3-års perioden er en rullerende periode. Det betyr at du til enhver tid må se på støtten du har mottatt de siste 3 årene (36 måneder). Når støtte fra mer enn 3 år siden "faller ut", får du ny kapasitet.</>
    },
    {
      question: 'Hva skjer hvis jeg overskrider taket?',
      answer: <>Hvis du overskrider De Minimis-taket, må du betale tilbake den overskytende støtten med renter. I praksis betyr dette at du må etterbetale arbeidsgiveravgift for perioden der du overskred taket. Dette kan bli en betydelig kostnad.</>
    },
    {
      question: 'Må jeg rapportere bagatellstøtte til Skatteetaten?',
      answer: <>Ja, du må føre oversikt over all bagatellstøtte bedriften mottar. Ved søknad om ny støtte må du oppgi tidligere mottatt støtte. Skatteetaten kan kreve dokumentasjon ved kontroll.</>
    }
  ];

  // JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Hva er bagatellstøtte (De Minimis)?', acceptedAnswer: { '@type': 'Answer', text: 'Bagatellstøtte er offentlig støtte som er så liten at den anses å ikke påvirke konkurransen i EØS-markedet. For de fleste sektorer er taket 300 000 Euro over en 3-års periode. For veitransport gjelder et lavere tak på 100 000 Euro.' } },
          { '@type': 'Question', name: 'Hvilke bedrifter omfattes av unntaksreglene?', acceptedAnswer: { '@type': 'Answer', text: 'Unntaksreglene gjelder primært for godstransport på vei, finanssektoren og primærnæringer (jordbruk, fiske). Disse sektorene kan ikke benytte full AGA-fritak i Tiltakssonen uten å ta hensyn til De Minimis-taket.' } },
          { '@type': 'Question', name: 'Hvordan beregnes 3-års perioden?', acceptedAnswer: { '@type': 'Answer', text: '3-års perioden er en rullerende periode. Det betyr at du til enhver tid må se på støtten du har mottatt de siste 3 årene (36 måneder). Når støtte fra mer enn 3 år siden faller ut, får du ny kapasitet.' } },
          { '@type': 'Question', name: 'Hva skjer hvis jeg overskrider taket?', acceptedAnswer: { '@type': 'Answer', text: 'Hvis du overskrider De Minimis-taket, må du betale tilbake den overskytende støtten med renter. I praksis betyr dette at du må etterbetale arbeidsgiveravgift for perioden der du overskred taket. Dette kan bli en betydelig kostnad.' } },
          { '@type': 'Question', name: 'Må jeg rapportere bagatellstøtte til Skatteetaten?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, du må føre oversikt over all bagatellstøtte bedriften mottar. Ved søknad om ny støtte må du oppgi tidligere mottatt støtte. Skatteetaten kan kreve dokumentasjon ved kontroll.' } },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Kunnskapsbank', item: 'https://www.averdi.no/kunnskapsbank' },
          { '@type': 'ListItem', position: 2, name: 'Bedrift & Handel', item: 'https://www.averdi.no/kunnskapsbank/bedrifter' },
          { '@type': 'ListItem', position: 3, name: 'Transport & Bagatellstøtte', item: 'https://www.averdi.no/kunnskapsbank/bedrifter/transport' },
        ],
      },
    ],
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
        <Link href="/kunnskapsbank/bedrifter" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Tilbake til Bedrift-hub
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-bold mb-4 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" aria-hidden="true" /> Viktig regelverk
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 leading-tight">
            Transport & <span className="text-blue-600">Bagatellstøtte</span>
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed">
            Driver du med godstransport i Tiltakssonen? Da gjelder ikke den vanlige 0%-satsen for arbeidsgiveravgift automatisk. 
            Her forklarer vi <strong>De Minimis-reglene</strong> og hvordan du unngår straffeskatt.
          </p>
        </div>

        {/* Advarselsboks */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-12">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" aria-hidden="true" />
            <div>
              <h2 className="font-bold text-red-800 text-lg mb-2">Viktig for transportbedrifter</h2>
              <p className="text-red-700 leading-relaxed">
                Transportsektoren og finansforetak omfattes av EØS-reglene for bagatellstøtte. 
                Det betyr at dere har et <strong>tak på hvor mye avgiftslette</strong> dere kan motta over en 3-års periode. 
                Overskrider du taket, risikerer du etterbetaling med renter.
              </p>
            </div>
          </div>
        </div>

        {/* Hva er De Minimis */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Scale className="w-6 h-6 text-blue-600" aria-hidden="true" />
            Hva er De Minimis-reglene?
          </h2>
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-slate-700 leading-relaxed mb-6">
              De Minimis (latin for "om det minste") er EØS-regler som setter tak på hvor mye offentlig støtte 
              en bedrift kan motta uten at det anses som konkurransevridende statsstøtte. 
              Fritaket for arbeidsgiveravgift i Tiltakssonen regnes som slik støtte.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Euro className="w-6 h-6 text-blue-600" aria-hidden="true" />
                  <h3 className="font-bold text-slate-900">Generelt tak</h3>
                </div>
                <p className="text-3xl font-extrabold text-blue-600 mb-2">300 000 €</p>
                <p className="text-slate-600 text-sm">Over en rullerende 3-års periode for de fleste sektorer</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Truck className="w-6 h-6 text-yellow-600" aria-hidden="true" />
                  <h3 className="font-bold text-slate-900">Veitransport</h3>
                </div>
                <p className="text-3xl font-extrabold text-yellow-600 mb-2">100 000 €</p>
                <p className="text-slate-600 text-sm">Lavere tak for godstransport på vei</p>
              </div>
            </div>
          </div>
        </section>

        {/* Hvem rammes */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Hvem rammes av unntaksreglene?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-slate-900">Omfattes av De Minimis</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-slate-700">
                  <Truck className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Godstransport på vei (lastebiler, varebiler)</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <Building2 className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Finanssektoren (banker, forsikring)</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <FileText className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Primærnæringer (jordbruk, fiske, akvakultur)</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-slate-900">Full 0% AGA</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Handel og detaljhandel</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Bygg og anlegg</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>IT og teknologi</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Reiseliv og turisme</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>De fleste andre næringer</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Beregningseksempel */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-16">
          <div className="bg-slate-900 p-6 text-white">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Calculator className="w-5 h-5 text-green-400" aria-hidden="true" />
              Eksempel: Transportbedrift i Alta
            </h3>
            <p className="text-slate-400 text-sm mt-1">Slik beregner du om du treffer De Minimis-taket</p>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h3 className="font-bold text-slate-900 mb-4">Scenario:</h3>
              <p className="text-slate-700 mb-4">
                En transportbedrift i Alta har 5 ansatte med en samlet lønnskostnad på <strong>3 000 000 kr</strong> per år.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                <span className="text-slate-700">Normal AGA-sats (Sone 1):</span>
                <span className="font-bold text-slate-900">14,1%</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                <span className="text-slate-700">Årlig AGA-besparelse:</span>
                <span className="font-bold text-green-600">423 000 kr</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <span className="text-slate-700">3-års besparelse:</span>
                <span className="font-bold text-yellow-700">1 269 000 kr</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                <span className="text-slate-700">De Minimis-tak (veitransport):</span>
                <span className="font-bold text-slate-900">~1 100 000 kr*</span>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-xl border border-red-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="font-bold text-red-800 mb-2">Resultat: Taket overskrides</h3>
                  <p className="text-red-700 text-sm leading-relaxed">
                    I dette eksempelet overskrider bedriften De Minimis-taket allerede i år 3. 
                    Bedriften må da betale differansen som arbeidsgiveravgift, pluss renter.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4 italic">
              * Omregnet fra 100 000 Euro med kurs ~11 NOK/EUR. Faktisk beløp avhenger av valutakurs.
            </p>
          </div>
        </section>

        {/* Slik unngår du problemer */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Slik unngår du straffeskatt</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard 
              icon={FileText}
              title="Før nøyaktig regnskap"
              description="Hold oversikt over all bagatellstøtte bedriften mottar, inkludert AGA-fritak, tilskudd og andre offentlige støtteordninger."
            />
            <InfoCard 
              icon={Clock}
              title="Overvåk 3-års perioden"
              description="Sjekk jevnlig hvor mye støtte du har mottatt de siste 36 månedene. Sett opp varsler når du nærmer deg taket."
            />
            <InfoCard 
              icon={Calculator}
              title="Beregn fremover"
              description="Planlegg lønnskostnader og vekst slik at du vet når du eventuelt vil treffe taket. Da kan du tilpasse strategien."
            />
            <InfoCard 
              icon={HelpCircle}
              title="Søk profesjonell hjelp"
              description="Reglene er kompliserte. En regnskapsfører med erfaring fra Tiltakssonen kan hjelpe deg å navigere trygt."
            />
          </div>
        </section>

        {/* Rapportering */}
        <section className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-16">
          <h3 className="font-bold text-blue-900 text-lg mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5" aria-hidden="true" />
            Rapportering til Skatteetaten
          </h3>
          <p className="text-blue-800 mb-4 leading-relaxed">
            Du må rapportere bagatellstøtte i A-meldingen. Skatteetaten krever at du:
          </p>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>Fører oversikt over all mottatt bagatellstøtte</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>Oppgir støttebeløp ved søknad om ny støtte</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>Kan dokumentere støtten ved kontroll</span>
            </li>
          </ul>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Ofte stilte spørsmål</h2>
          <FaqAccordion items={faqItems} themeColor="#2563EB" />
        </section>

        {/* Lenke til Skatteetaten */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-12">
          <h3 className="font-bold text-slate-900 mb-3">Offisielle ressurser</h3>
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://www.skatteetaten.no/bedrift-og-organisasjon/arbeidsgiver/arbeidsgiveravgift/soner/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              Sonekart (Skatteetaten) <span className="sr-only"> (åpnes i ny fane)</span><ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
            <a 
              href="https://www.skatteetaten.no/bedrift-og-organisasjon/arbeidsgiver/arbeidsgiveravgift/bagatellmessig-stotte/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              Om bagatellstøtte <span className="sr-only"> (åpnes i ny fane)</span><ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* CTA */}
        <LocalCtaBlock
          title="Usikker på om du rammes?"
          description="Vi i Averdi har lang erfaring med De Minimis-reglene og kan hjelpe deg å beregne om din bedrift treffer taket. Ta kontakt for en uforpliktende gjennomgang."
          primaryButtonText="Kontakt oss"
          primaryButtonLink="/kontakt?subject=Bagatellstøtte"
        />

        {/* Kilder */}
        <div className="border-t border-slate-200 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-slate-500">
            <p>
              Informasjon basert på gjeldende EØS-regelverk og Skatteetatens veiledning om bagatellstøtte.
            </p>
            <a 
              href="https://www.skatteetaten.no" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              skatteetaten.no <span className="sr-only"> (åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </div>

      </article>
    </main>
  );
}
