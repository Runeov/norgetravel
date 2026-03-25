import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { VippsSetupWizard } from '@/components/modules/kunnskapsbank/vipps-wizard'
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Vipps MobilePay Integrasjon | Oppsettguide for PowerOffice',
  description: 'Komplett guide for å integrere Vipps MobilePay med PowerOffice Go og 24SevenOffice. Automatiser oppgjør, fakturaer og bokføring. For idrettslag og bedrifter.',
};

export default function VippsIntegrasjonsPage() {
  
  const faqData = [
    {
      question: 'Hvor lang tid tar det å sette opp integrasjonen?',
      answer: 'Med denne guiden tar det ca 10 minutter å konfigurere. Selve aktiveringen hos integrasjonspartner tar 3-7 virkedager inkludert testing.'
    },
    {
      question: 'Trenger jeg teknisk kompetanse?',
      answer: 'Nei, veiviseren guider deg gjennom alt. Du trenger kun BankID, Vipps Portal-tilgang og API-nøkler fra PowerOffice. Vi hjelper deg med resten.'
    },
    {
      question: 'Hva koster integrasjonen?',
      answer: 'Vipps tar transaksjonsgebyr (1,75-2,99%). Integrasjonspartnere som iizy tar ofte 150-500 kr/måned for å drifte dataoverføringen.'
    },
    {
      question: 'Fungerer dette for idrettslag?',
      answer: 'Ja! Løsningen er spesielt egnet for idrettslag med kiosksalg, cuper og kontingenter. Den håndterer MVA-unntak og interimskonto automatisk.'
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
          { '@type': 'ListItem', position: 2, name: 'Bedrift & Handel', item: 'https://www.averdi.no/kunnskapsbank/bedrifter' },
          { '@type': 'ListItem', position: 3, name: 'Vipps Integrasjon', item: 'https://www.averdi.no/kunnskapsbank/bedrifter/vipps-integrasjon' },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <AverdiBackground />

      <article className="relative z-10 container mx-auto px-4 py-12 max-w-7xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Breadcrumb */}
        <Link href="/kunnskapsbank/bedrifter" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til Bedrift & Handel
        </Link>

        {/* Hero */}
        <div className="mb-12 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#E86C1F] text-sm font-medium mb-4">
            Digitalisering & Automatisering
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Integrer Vipps med <span className="text-blue-600">PowerOffice Go</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Slutt med manuell avstemming av Vipps-oppgjør. Denne veiviseren setter opp automatisk 
            bokføring av transaksjoner, gebyrer og MVA direkte fra Vipps til regnskapet ditt.
          </p>
        </div>

        {/* Info Boxes */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-5xl">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 text-green-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900">Spar 80% tid</h3>
            <p className="text-sm text-slate-600">
              Ingen manuell avstemming. Alle Vipps-transaksjoner bokføres automatisk med riktig konto og MVA-kode.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900">NS 4102-standard</h3>
            <p className="text-sm text-slate-600">
              Følger anbefalte kontoer for idrettslag og foreninger. Interimskonto 1580 sikrer korrekt avstemming.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 text-[#E86C1F]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900">Revisorvennlig</h3>
            <p className="text-sm text-slate-600">
              Komplett sporbarhet. Hver transaksjon kobles til Vipps oppgjørsrapport med unik ID.
            </p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-12 max-w-5xl">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-blue-900 mb-2 text-lg">Viktig om Vipps MobilePay-fusjonen</h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                Etter fusjonen i 2022 er det viktig at du bruker den <strong>nye portalen</strong> (portal.vippsmobilepay.com) 
                og det nye <strong>ePayment API</strong> (ikke det gamle eCom API). Denne veiviseren er oppdatert for 2025/2026.
              </p>
            </div>
          </div>
        </div>

        {/* The Wizard */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white mb-2">Interaktiv Oppsettguide</h2>
              <p className="text-orange-50">Følg trinnene nedenfor for å konfigurere din integrasjon</p>
            </div>
            
            <VippsSetupWizard />
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 mb-16 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Hva skjer etter at du har fullført guiden?</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Du laster ned to filer</h3>
                <p className="text-slate-300 text-sm">
                  En JSON-konfigurasjonsfil (med API-nøkler) og en menneskelig lesbar implementeringsguide (TXT).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Kontakt Averdi eller din integrasjonspartner</h3>
                <p className="text-slate-300 text-sm">
                  Send implementeringsguiden på e-post, og JSON-filen via sikker kanal. Vi setter opp det tekniske.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">OAuth-autorisasjon (3-5 dager)</h3>
                <p className="text-slate-300 text-sm">
                  Du godkjenner tilgangen i Vipps Portal og PowerOffice Go. Vi guider deg gjennom dette på telefon.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-sm flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Testing (1-2 dager)</h3>
                <p className="text-slate-300 text-sm">
                  Vi kjører en testtransaksjon (f.eks. 10 kr) og verifiserer at den bokføres riktig i PowerOffice.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center font-bold text-sm flex-shrink-0">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Go-live!</h3>
                <p className="text-slate-300 text-sm">
                  Integrasjonen kjører automatisk. Vi følger opp den første måneden for å sikre at alt stemmer.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details for Accountants */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-16 max-w-5xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">For regnskapsførere: Slik fungerer dataflyt</h2>
          
          <div className="space-y-6 text-slate-600">
            <div>
              <h3 className="font-bold text-slate-900 mb-2">1. Salgstransaksjon i Vipps</h3>
              <p className="text-sm">
                Kunde betaler med Vipps (f.eks. 100 kr for vaffel i idrettskiosk). 
                Transaksjonen registreres i Vipps med unik ID og timestamp.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-2">2. Oppgjørsrapport (T+2/T+3)</h3>
              <p className="text-sm">
                Vipps genererer daglig oppgjørsrapport. Hvis salget var lørdag, kommer rapporten mandag. 
                Rapporten inneholder: bruttosalg, gebyr, nettoutbetaling, per transaksjon.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-2">3. Middleware henter data</h3>
              <p className="text-sm">
                Integrasjonspartner (iizy/SRH) henter rapporten via <strong>Report API</strong> hver morgen kl 06:00. 
                Data struktureres om til PowerOffice sitt bilagsformat.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-2">4. Bokføring i PowerOffice Go</h3>
              <p className="text-sm mb-2">Et bilag genereres automatisk med følgende posteringer:</p>
              <div className="bg-slate-50 p-4 rounded-lg font-mono text-xs space-y-1">
                <div>Debet 1580 (Vipps Mellomregning): 100,00 kr</div>
                <div>Kredit 3100 (Salgsinntekt): 100,00 kr</div>
                <div className="text-slate-400">// Gebyr bokføres separat når oppgjøret kommer</div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-2">5. Bankutbetaling (T+3/T+5)</h3>
              <p className="text-sm mb-2">Når Vipps betaler ut til bankkonto (f.eks. 98,25 kr etter 1,75 kr gebyr):</p>
              <div className="bg-slate-50 p-4 rounded-lg font-mono text-xs space-y-1">
                <div>Debet 1920 (Bankinnskudd): 98,25 kr</div>
                <div>Debet 7770 (Bankgebyrer): 1,75 kr</div>
                <div>Kredit 1580 (Vipps Mellomregning): 100,00 kr</div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-2">6. Avstemming</h3>
              <p className="text-sm">
                Når alt er bokført skal konto <strong>1580 ha saldo null</strong>. 
                Dette er beviset på at alle Vipps-transaksjoner er avstemt mot banken.
              </p>
            </div>
          </div>
        </div>

        {/* Warning Box */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl mb-16 max-w-5xl">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-yellow-900 mb-2 text-lg">Vanlig feil: Kjøpe før søknad sendes</h3>
              <p className="text-yellow-800 text-sm leading-relaxed">
                Mange starter integrasjonen ved å kjøpe utstyr eller bestille tjenester <em>før</em> de har fått tilgang godkjent. 
                Sørg for at du har BankID, signaturrett og API-tilganger <strong>før</strong> du bestiller fra integrasjonspartner.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Ofte stilte spørsmål</h2>
          <FaqAccordion items={faqData} themeColor="#2563EB" />
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-center text-white max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Trenger du hjelp med oppsettet?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Vi kan ta hele jobben for deg. Fra kartlegging av behov, til oppsett og opplæring av kasserer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/kontakt" 
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
            >
              Bestill konsultasjon
            </Link>
            <a 
              href="mailto:post@averdi.no" 
              className="px-8 py-4 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-400 transition-colors inline-flex items-center justify-center"
            >
              Send oss konfigurasjonsfilen
            </a>
          </div>
        </div>

      </article>
    </main>
  );
}