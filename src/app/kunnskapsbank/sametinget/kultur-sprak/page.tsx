import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Music, BookOpen, CalendarClock, Mic2, AlertCircle, Languages, Check, ShieldCheck, Sparkles, Building } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Kulturstøtte 2026: Slik finansierer du musikk, bøker og språk | Sametinget',
  description: 'Fristene er absolutte. Vi guider deg gjennom søknadsprosessen for kulturmidler, fra språkplan til budsjett. Sikre din kulturelle kapital.',
};

// Lokal CtaBlock for stabilitet
function LocalCtaBlock({ title, description, primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink }: any) {
    return (
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center md:text-left relative overflow-hidden my-12 shadow-2xl">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                    <p className="text-slate-300 text-lg mb-0">{description}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full md:w-auto">
                    {primaryButtonLink && (
                        <Link href={primaryButtonLink} className="inline-flex items-center justify-center px-6 py-3 bg-[#E86C1F] text-white font-bold rounded-full hover:bg-[#d65f18] transition-all shadow-lg">
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
        </div>
    );
}

export default function KulturSprakPage() {
  const janAtle = getExpert('jan-atle');

  // Display Data (JSX) for visuell presentasjon
  const faqDisplayData = [
    { 
        question: "Når er søknadsfristen for kulturmidler?", 
        answer: <>Hovedfristen for prosjektstøtte (musikk, litteratur, kunst) er <strong>1. oktober</strong> for påfølgende år. Det finnes også noen ordninger med løpende frist, men potten tømmes raskt. Ikke vent.</> 
    },
    { 
        question: "Hva menes med språkplan i søknaden?", 
        answer: <>Dette er din "inngangsbillett". Alle som søker kulturmidler må beskrive hvordan samisk språk skal <strong>synes og høres</strong> i prosjektet. Dette gjelder alt fra plakater og markedsføring til selve gjennomføringen.</> 
    },
    { 
        question: "Kan jeg få støtte til å gi ut musikk?", 
        answer: <>Ja, det gis støtte til musikkutgivelser som bygger <strong>Kulturell trygghet</strong>. Det stilles krav til at utgivelsen har samisk tekst eller sterk samisk kulturell tilknytning (f.eks. joik).</> 
    }
  ];

  // JSON Data (String) for SEO
  const faqJsonData = [
    { 
        question: "Når er søknadsfristen for kulturmidler?", 
        answer: "Hovedfristen for prosjektstøtte (musikk, litteratur, kunst) er 1. oktober for påfølgende år. Det finnes også noen ordninger med løpende frist." 
    },
    { 
        question: "Hva menes med språkplan i søknaden?", 
        answer: "Alle som søker kulturmidler må beskrive hvordan samisk språk skal synes og høres i prosjektet. Dette gjelder alt fra plakater og markedsføring til selve gjennomføringen." 
    },
    { 
        question: "Kan jeg få støtte til å gi ut musikk?", 
        answer: "Ja, det gis støtte til musikkutgivelser. Det stilles krav til at utgivelsen har samisk tekst eller sterk samisk kulturell tilknytning (f.eks. joik)." 
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: faqJsonData.map(item => ({
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
          { '@type': 'ListItem', position: 3, name: 'Kultur & Språk', item: 'https://www.averdi.no/kunnskapsbank/sametinget/kultur-sprak' },
        ],
      },
    ],
  };

  const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Søknadshjelp Kulturmidler",
      "provider": {
          "@type": "Organization",
          "name": "Averdi"
      },
      "description": "Vi sikrer at din søknad om kulturmidler oppfyller alle formelle krav før fristen går ut."
  };

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      <AverdiBackground />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        <article className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <Link href="/kunnskapsbank/sametinget" className="inline-flex items-center text-slate-500 hover:text-[#E86C1F] mb-8 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til Sametinget-hub
            </Link>

            {/* Hero */}
            <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#E86C1F] text-sm font-bold mb-4 uppercase tracking-wider">
                Kultur & Språk
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">
                Gjør kultur til levebrød: <span className="text-[#E86C1F]">Kulturmidler</span> & Språkløft
            </h1>
            <p className="text-xl text-slate-700 leading-relaxed">
                Kulturproduksjon i Sápmi er ikke bare kunst; det er samfunnsbygging. 
                Vi hjelper deg å navigere i tilskuddene som gjør det mulig å leve av musikk, litteratur og språkformidling.
            </p>
            </div>

            {/* --- NYTT I 2026: SPRÅKSENTER ETABLERING --- */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 mb-12 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl text-emerald-600 shadow-sm">
                  <Building className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Nytt i 2026</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">Etablering av nye språksentre</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">
                    Sametinget har satt av <strong className="text-emerald-700">3,7 millioner kroner</strong> til etablering av nye samiske språksentre i 2026.
                    Dette er en unik mulighet for kommuner og organisasjoner som ønsker å styrke samisk språk lokalt.
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="px-2 py-1 bg-white rounded-full text-emerald-700 font-medium border border-emerald-200">Kommuner</span>
                    <span className="px-2 py-1 bg-white rounded-full text-emerald-700 font-medium border border-emerald-200">Organisasjoner</span>
                    <span className="px-2 py-1 bg-white rounded-full text-emerald-700 font-medium border border-emerald-200">Samiske miljøer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FRIST-ALARM: Kritisk informasjon først */}
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-12 shadow-lg">
            <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-full text-red-600 shadow-sm mt-1">
                <CalendarClock className="w-6 h-6" />
                </div>
                <div className="w-full">
                <h3 className="font-bold text-red-900 text-lg">Nulltoleranse på Frister 2026</h3>
                <p className="text-red-800 text-sm mb-4">
                    For kulturtilskudd stenger søknadsportalen automatisk ved midnatt. Ingen unntak. Ingen "ettersending".
                </p>
                
                

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                    <span className="block text-xs text-slate-500 uppercase font-bold tracking-wider">Vårfrist</span>
                    <McpDataSpan 
                        id="sameting-frist-kultur-var" 
                        value="01.03.2026" 
                        className="font-bold text-2xl text-slate-900" 
                        source="Sametinget Fristkalender"
                    />
                    <span className="text-sm text-slate-600 block mt-1 font-medium">Institusjoner & faste tiltak</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                    <span className="block text-xs text-slate-500 uppercase font-bold tracking-wider">Høstfrist (Hoved)</span>
                    <McpDataSpan 
                        id="sameting-frist-kultur-host" 
                        value="01.10.2026" 
                        className="font-bold text-2xl text-slate-900" 
                        source="Sametinget Fristkalender"
                    />
                    <span className="text-sm text-slate-600 block mt-1 font-medium">Prosjektstøtte (Bøker, Musikk)</span>
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* Expert Insight */}
            {janAtle && (
            <ExpertInsight 
                title="Jan-Atles Advarsel: Formalia feller flest" 
                quote="Det hjelper ikke at musikken din er i verdensklasse hvis du mangler forlagsavtale ved midnatt. Sametinget sjekker formalia først. Er ikke papirene i orden, blir søknaden avvist uten at de hører på en eneste tone."
                expert={janAtle}
            >
                <p className="text-slate-900">
                Vi fungerer som din <strong>kvalitetskontroll</strong>. Vi sjekker at budsjettet balanserer, at språkplanen holder mål, og at alle vedlegg er lastet opp. 
                Slik sikrer vi at søknaden din faktisk blir realitetsbehandlet.
                </p>
            </ExpertInsight>
            )}

            {/* Kategori-Grid */}
            <div className="grid md:grid-cols-2 gap-6 my-16">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#E86C1F] hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 text-[#E86C1F] group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">Litteratur</h3>
                <p className="text-sm text-slate-600 mb-4">
                Støtte til utgivelse av skjønnlitteratur, faglitteratur og barnebøker på samisk. <strong>Krav:</strong> Forlagsavtale må foreligge.
                </p>
                <div className="inline-flex items-center text-sm font-bold text-slate-900 bg-slate-50 px-3 py-1 rounded-full">
                Maks støtte: <McpDataSpan id="sameting-litteratur-maks" value="240 000" format="currency" source="Sametinget" className="ml-1" />
                </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#E86C1F] hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-purple-600 group-hover:scale-110 transition-transform">
                <Music className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">Musikkutgivelser</h3>
                <p className="text-sm text-slate-600 mb-4">
                Midler til innspilling, miksing og utgivelse av samisk musikk og joik. Både tradisjonell og moderne. Også artiststipend.
                </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#E86C1F] hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                <Mic2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">Språktiltak</h3>
                <p className="text-sm text-slate-600 mb-4">
                Kurs, språkleirer og arenaer der samisk språk høres og brukes. Høy prioritet for prosjekter som bygger <strong>Birgejupmi</strong>.
                </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#E86C1F] hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 text-green-600 group-hover:scale-110 transition-transform">
                <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">Institusjonsutvikling</h3>
                <p className="text-sm text-slate-600 mb-4">
                Drift av kulturhus, teatre og festivaler. Krever langsiktig planlegging.
                </p>
                <div className="inline-flex items-center text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Kun frist 1. mars
                </div>
            </div>
            </div>

            {/* Main Content Section */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-slate-100 mb-16">
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                Regnskapet er ditt bevis
            </h2>
            
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Et vanlig avslagspunkt er budsjettet. Sametinget fullfinansierer sjelden prosjekter. 
                Du må vise til egenfinansiering eller annen støtte for å bevise gjennomføringsevne.
            </p>
            <p className="text-slate-700 mb-12 leading-relaxed">
                <strong>Underskuddsgaranti:</strong> For festivaler gis støtten ofte som en underskuddsgaranti. 
                Det betyr at du kun får utbetalt penger hvis det attesterte regnskapet viser et faktisk underskudd. 
                Går du i pluss, får du ingenting. Dette krever presis budsjettering.
            </p>
            
            {/* NY DESIGN PÅ SPRÅKPLAN-SEKSJONEN */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                <Languages className="w-32 h-32 text-blue-600" />
                </div>
                
                <div className="relative z-10">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                    <Languages className="w-5 h-5" />
                    </div>
                    Språkplanen: Nøkkelen til bankhvelvet
                </h3>
                
                <p className="text-slate-700 mb-6 max-w-xl">
                    Uansett hva du søker om, vil saksbehandleren lete etter svaret på ett spørsmål: 
                    <em>"Hvordan synliggjør dette prosjektet samisk språk?"</em>
                </p>

                <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-200 rounded-full p-0.5">
                        <Check className="w-3 h-3 text-blue-700" />
                    </div>
                    <span className="text-slate-700 text-sm font-medium">Skal plakaten være tospråklig? (Krav: Samisk først/øverst)</span>
                    </li>
                    <li className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-200 rounded-full p-0.5">
                        <Check className="w-3 h-3 text-blue-700" />
                    </div>
                    <span className="text-slate-700 text-sm font-medium">Skal arrangementet foregå på samisk?</span>
                    </li>
                    <li className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-200 rounded-full p-0.5">
                        <Check className="w-3 h-3 text-blue-700" />
                    </div>
                    <span className="text-slate-700 text-sm font-medium">Hvordan sikrer du at samisk brukes i markedsføringen?</span>
                    </li>
                </ul>

                <p className="text-blue-900 text-sm italic font-medium bg-blue-100/50 p-4 rounded-xl border border-blue-200/50 inline-block">
                    En svak språkplan kan velte et ellers godt prosjekt. Vi hjelper deg å formulere dette strategisk i søknaden.
                </p>
                </div>
            </div>
            </div>

            {/* CTA Component */}
            <LocalCtaBlock
            title="Skal dere søke i år?"
            description="Vi kan ta rollen som prosjektøkonom i søknaden. Da vet Sametinget at budsjett, regnskap og rapportering blir håndtert profesjonelt."
            primaryButtonText="Kontakt oss om søknadshjelp"
            primaryButtonLink="/kontakt"
            secondaryButtonText="Se Institusjonsstøtte"
            secondaryButtonLink="/kunnskapsbank/sametinget/institusjon"
            />

            {/* FAQ Section */}
            <div className="mt-16 mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <ShieldCheck className='w-6 h-6 text-slate-600'/> Ofte stilte spørsmål
                </h2>
                <FaqAccordion items={faqDisplayData} themeColor="#E86C1F" />
            </div>

        </article>
      </div>
    </main>
  );
}