import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Trophy, Receipt, HeartHandshake, Smartphone, BookOpen, Coins, Scale, ShoppingCart } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { getExpert } from '@/data/experts';
// ✅ KORRIGERT IMPORT (Fjernet 'home' fra stien):
import { CategoryCard } from '@/components/modules/kunnskapsbank/CategoryGrid'; 
import { AverdiBackground } from '@/components/modules/AverdiBackground';

export const metadata: Metadata = {
  title: 'Regnskap for lag og foreninger i Finnmark 2026 | Momskompensasjon & Årsregnskap',
  description: 'Regnskapshjelp for idrettslag, velforeninger og samiske organisasjoner i Finnmark og Nord-Troms. Momskompensasjon, Vipps-regnskap, styreansvar og støtteordninger.',
  alternates: {
    canonical: '/kunnskapsbank/organisasjoner',
  },
  openGraph: {
    title: 'Regnskap for lag og foreninger i Finnmark | Averdi',
    description: 'Vi forenkler hverdagen for kasserere i idrettslag og foreninger i Nord-Norge. Momskompensasjon, årsregnskap, Vipps og støtteordninger.',
    url: 'https://www.averdi.no/kunnskapsbank/organisasjoner',
    siteName: 'Averdi - Tolken av Nord-Norge',
    locale: 'nb_NO',
    type: 'website',
  },
};

export default function OrganisasjonHub() {
  const alida = getExpert('alida');

  // JSON-LD: FAQPage + BreadcrumbList + Service
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Hvordan søker idrettslag om momskompensasjon?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Idrettslag kan søke om vare- og tjenestemoms via samordnet søknad gjennom idrettskretsen. Fristen er normalt 15. august. Forenklet modell gir 8% av godkjente kostnader opp til 7 millioner kroner.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Trenger idrettslaget revisor for årsregnskapet?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Idrettslag med omsetning under 5 millioner kroner trenger ikke revisor, men må ha en kontrollkomité. Over 5 millioner kroner kreves registrert eller statsautorisert revisor.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Hvilke støtteordninger finnes for lag i Finnmark?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Lag i Finnmark og Nord-Troms kan søke spillemidler, Frifond, inkluderingstilskudd fra NIF, Sametinget kulturstøtte, og regionale tilskudd fra fylkeskommunen. Vi hjelper med oversikt over frister og søknadsprosesser.'
            }
          }
        ]
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Kunnskapsbank', 'item': 'https://www.averdi.no/kunnskapsbank' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Lag & Forening', 'item': 'https://www.averdi.no/kunnskapsbank/organisasjoner' }
        ]
      },
      {
        '@type': 'Service',
        'name': 'Regnskap for lag og foreninger',
        'serviceType': 'Regnskapsføring og rådgivning for frivillige organisasjoner',
        'provider': { '@type': 'Organization', 'name': 'Averdi AS' },
        'description': 'Vi forenkler hverdagen for kasserere i idrettslag, velforeninger og samiske organisasjoner i Finnmark og Nord-Troms. Hjelp med momskompensasjon, årsregnskap, Vipps-oppsett og støtteordninger.',
        'areaServed': ['Finnmark', 'Nord-Troms', 'Nord-Norge']
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <AverdiBackground />
      
      {/* JSON-LD for Google & LLMs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        
        <Link href="/kunnskapsbank" className="inline-flex items-center text-slate-500 hover:text-green-600 mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Tilbake til oversikt
        </Link>

        <div className="mb-12">
          <span className="text-green-600 font-bold tracking-wider uppercase text-sm mb-3 block">Frivillighet & Idrett</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Regnskap for lag og foreninger i Finnmark</h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
            Vi tar oss av regnskapet slik at dere kan bruke tiden på aktivitet. Spesialisert på idrettslag, velforeninger og samiske organisasjoner i Finnmark og Nord-Troms.
          </p>
        </div>

        {alida && (
          <ExpertInsight 
            title="Ikke gå glipp av momskompensasjonen" 
            quote="Dette er 'gratis penger' mange glemmer. For 2024 fikk våre kunder refundert betydelige summer rett i klubbkassa."
            expert={alida}
          >
            <p>Vi sørger for at regnskapet er satt opp riktig fra start, slik at søknaden om momskompensasjon blir en enkel rutine, ikke en hodepine.</p>
          </ExpertInsight>
        )}

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          <CategoryCard
            title="Idrettslag & regnskap"
            description="Kasserer-guiden: Få kontroll på kiosk, bilagsflyt og momskompensasjon for idrettslaget."
            href="/kunnskapsbank/organisasjoner/idrettslag"
            icon={Trophy}
            theme="green"
          />
          <CategoryCard
            title="Vipps-guide 2026"
            description="Steg-for-steg: Slik registrerer og bruker dere Vipps riktig – kiosk, kontingent og billettsalg."
            href="/kunnskapsbank/organisasjoner/vipps"
            icon={Smartphone}
            theme="green"
          />
          <CategoryCard
            title="Momskompensasjon 2026"
            description="Forenklet vs. dokumentert modell, beregningseksempler og frister. Ikke gå glipp av pengene dine."
            href="/kunnskapsbank/organisasjoner/moms"
            icon={Receipt}
            theme="green"
          />
          <CategoryCard
            title="Årsregnskap 2026"
            description="NIF-maler, kontrollkomité vs. revisor og steg-for-steg guide til godkjent årsregnskap."
            href="/kunnskapsbank/organisasjoner/arsregnskap"
            icon={BookOpen}
            theme="green"
          />
          <CategoryCard
            title="Støtteordninger 2026"
            description="Spillemidler, Frifond, Sametinget og regionale gullordninger – komplett fristoversikt for nord."
            href="/kunnskapsbank/organisasjoner/stotteordninger"
            icon={Coins}
            theme="green"
          />
          <CategoryCard
            title="Styreansvar & Årsmøte"
            description="Protokoll, personlig ansvar og obligatoriske saker. Guide for nye styremedlemmer i nord."
            href="/kunnskapsbank/organisasjoner/styreansvar"
            icon={Scale}
            theme="green"
          />
          <CategoryCard
            title="Arrangement & Kiosk"
            description="Bokfør kiosksalg, billettsalg og cup riktig. Vipps + kontant + kort og MVA-regler for frivillige."
            href="/kunnskapsbank/organisasjoner/arrangementer"
            icon={ShoppingCart}
            theme="green"
          />
          {/* TODO: Create /kunnskapsbank/organisasjoner/samisk page */}
          <div className="flex flex-col p-6 bg-slate-100 border border-slate-200 rounded-2xl opacity-60 h-full">
            <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center mb-4 text-slate-400">
              <HeartHandshake className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-slate-500 mb-2">Samiske Foreninger</h3>
            <p className="text-sm text-slate-400 leading-relaxed flex-grow">Spesielle støtteordninger for språksentre og kulturhus.</p>
            <span className="text-xs text-slate-400 mt-4 italic">Kommer snart</span>
          </div>
        </div>
      </div>
    </main>
  );
}
