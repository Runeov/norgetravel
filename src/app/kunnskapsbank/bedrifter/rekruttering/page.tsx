import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Users, 
  TrendingUp, 
  Wallet, 
  FileCheck, 
  BookOpen, 
  ExternalLink,
  Target,
  BarChart3
} from 'lucide-react';
import { NordNorgeKalkulator } from '@/components/tools/NordNorgeKalkulator';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Rekruttering i Nord 2026 | Slik bruker du fordelene',
  description: 'Statsbudsjettet 2026 gir deg et kraftig rekrutteringsvåpen. Se hvordan 60.000 i gjeldsslette kan tilsvare 100.000 i lønnsøkning.',
};

// Lokal CtaBlock - Mørk/Vertikal (Stabil)
function LocalCtaBlock({ title, description, primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink }: any) {
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
                    {secondaryButtonLink && (
                        <Link href={secondaryButtonLink} className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm">
                            {secondaryButtonText || 'Tilbake'}
                        </Link>
                    )}
                </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        </div>
    );
}

export default function RekrutteringPage() {
  const ingvald = getExpert('ingvald-laiti');

  // FAQ Data for Rekruttering (JSX for visning)
  const faqData = [
    {
      question: 'Hvem får slettet 60 000 kr i studielån?',
      answer: <>Forslaget for 2026 gjelder alle personer som bor og arbeider i <strong>Tiltakssonen</strong> (Finnmark og Nord-Troms) i minst 12 måneder. Det er ingen krav til yrke, men gjelden må være knyttet til fullført utdanning.</>
    },
    {
      question: 'Hva er forskjellen på "Tiltakssonen" og "Distriktskommuner"?',
      answer: <>I Tiltakssonen slettes inntil <strong>60 000 kr</strong> per år. I andre distriktskommuner (sone 5 og 6 utenfor nord) er satsen 25 000 kr. Tiltakssonen har altså mer enn dobbel effekt.</>
    },
    {
      question: 'Må bedriften betale for gjeldslettingen?',
      answer: <>Nei, dette er en statlig ordning via Lånekassen. Bedriften betaler ingenting, men kan bruke verdien av ordningen i sin <strong>markedsføring</strong> mot jobbsøkere.</>
    },
    {
      question: 'Gjelder 0% arbeidsgiveravgift for alle ansatte?',
      answer: <>Ja, så lenge den ansatte utfører hoveddelen av arbeidet i Tiltakssonen. For ansatte med mye hjemmekontor sørpå eller pendlere, gjelder egne regler.</>
    }
  ];

  // JSON-LD Schema (String only)
  const jsonLdData = [
    { q: 'Hvem får slettet 60 000 kr i studielån?', a: 'Gjelder alle i Tiltakssonen i minst 12 måneder.' },
    { q: 'Hva er forskjellen på "Tiltakssonen" og "Distriktskommuner"?', a: 'Tiltakssonen: 60 000 kr. Andre distrikter: 25 000 kr.' },
    { q: 'Må bedriften betale for gjeldslettingen?', a: 'Nei, statlig ordning.' },
    { q: 'Gjelder 0% arbeidsgiveravgift for alle ansatte?', a: 'Ja, hvis arbeidet utføres i sonen.' }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: jsonLdData.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Kunnskapsbank', item: 'https://www.averdi.no/kunnskapsbank' },
          { '@type': 'ListItem', position: 2, name: 'Bedrift & Handel', item: 'https://www.averdi.no/kunnskapsbank/bedrifter' },
          { '@type': 'ListItem', position: 3, name: 'Rekrutteringspakken 2026', item: 'https://www.averdi.no/kunnskapsbank/bedrifter/rekruttering' },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      <AverdiBackground />
      
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        
        {/* Breadcrumb */}
        <Link href="/kunnskapsbank/bedrifter" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Tilbake til Bedrift-hub
        </Link>

        {/* Hero */}
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-bold mb-4 uppercase tracking-wider">
            Strategisk HR & Lønn
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-slate-900 leading-tight">
            Slik vinner du kampen om <span className="text-blue-600">hodene i 2026</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
            I 2026 endres spillereglene. Med en dobling av gjeldsslette til <McpDataSpan id="studielan-sats-hero" value="60 000" format="currency" className="font-bold text-slate-900 bg-blue-50 px-1 rounded"/> har bedrifter i nord fått et rekrutteringsvåpen som matcher Oslo-lønn – hvis du vet hvordan du bruker det.
          </p>
        </div>

        {/* --- KALKULATOR VERKTØY --- */}
        <div className="my-16">
          <NordNorgeKalkulator />
        </div>

        {/* Expert Insight: Alida (HR) */}
        {ingvald && (
          <ExpertInsight
            title="Selg kjøpekraft, ikke bruttolønn"
            quote="Når jeg hjelper bedrifter med lønnspakker, ser vi at 650 000 kr i Alta gir samme kjøpekraft som 850 000 kr i Oslo. Kandidaten vet ikke dette – til du viser dem regnestykket. Det er et rekrutteringsargument i verdensklasse."
            expert={ingvald}
          >
            <p>
              Mange søkere ser seg blinde på bruttolønn. Din jobb i intervjuet er å vise "Total Compensation"-pakken. 
              Med gratis barnehage, el-avgiftsfritak og gjeldsslette, sitter familien igjen med mye mer <strong>Handlingsrom</strong> til ferie og sparing, selv med lavere nominell lønn.
            </p>
          </ExpertInsight>
        )}

        {/* Main Content */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 my-16">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Den nye "Nord-Norge pakken" for 2026
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Regjeringens forslag til Statsbudsjett 2026 inneholder historiske økninger i de personrettede virkemidlene. 
            Dette er ikke "distriktsstøtte", men en direkte <strong>investering</strong> i din bedrifts evne til å tiltrekke kompetanse.
          </p>

          

          <div className="grid md:grid-cols-2 gap-8 mb-12 mt-8">
            
            {/* Studielån */}
            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg shadow-sm text-green-600">
                  <TrendingUp className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Gjeldsslette</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm">
                Satsen økes til <McpDataSpan id="studielan-sats-boks" value="60 000" format="currency" className="font-bold"/> per år. 
                For en ansatt med studielån er dette penger rett i lomma (netto).
              </p>
              <div className="bg-white p-3 rounded border border-green-200 text-xs text-slate-600">
                <strong>Verdi før skatt:</strong> Tilsvarer en lønnsøkning på ca. 
                <span className="text-green-700 font-bold ml-1">109 000 kr</span>.
              </div>
            </div>

            {/* Skatt */}
            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg shadow-sm text-purple-600">
                  <Wallet className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Lavere Skatt</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm">
                Finnmarksfradraget økes til <McpDataSpan id="finnmarksfradrag-sats-boks" value="45 000" format="currency" className="font-bold"/>. 
                I tillegg er skattesatsen på alminnelig inntekt 18,5% (mot 22% sørpå).
              </p>
              <div className="bg-white p-3 rounded border border-purple-200 text-xs text-slate-600">
                <strong>Effekt:</strong> Gir ca 20 000 kr mer utbetalt per år for et par.
              </div>
            </div>

          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-4">Slik bruker du dette i stillingsannonsen</h3>
          <ul className="space-y-4 text-slate-600 mb-8">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" aria-hidden="true" />
              <span>
                <strong>Ikke skriv:</strong> "Vi følger tariff."<br/>
                <strong>Skriv heller:</strong> "Hos oss får du en kjøpekraft som tilsvarer 800.000 i Oslo."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" aria-hidden="true" />
              <span>
                <strong>Synliggjør boligmarkedet:</strong> "Selg leiligheten i Oslo, kjøp enebolig her, og bli gjeldfri på 5 år med statlig nedskriving."
              </span>
            </li>
          </ul>

        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Vanlige spørsmål fra kandidater</h2>
          <FaqAccordion items={faqData} themeColor="#2563EB" />
        </div>

        {/* CTA */}
        <LocalCtaBlock 
          title="Trenger du hjelp med lønnskjøring?"
          description="Vi kan sette opp lønnssystemet ditt slik at det automatisk håndterer de ulike sonene og rapporterer riktig til myndighetene."
          primaryButtonText="Snakk med Alida"
          primaryButtonLink="/kontakt"
          secondaryButtonText="Tilbake til Bedriftsoversikt"
          secondaryButtonLink="/kunnskapsbank/bedrifter"
        />

        {/* Kilder */}
        <div className="border-t border-slate-200 pt-8 pb-4 mt-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-slate-500">
            <div className="flex items-start gap-3 max-w-2xl">
              <BookOpen className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-slate-700 mb-1">Kilder</p>
                <p>
                  Basert på forslag til <strong>Statsbudsjettet 2026</strong> og satser fra Lånekassen for Tiltakssonen.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://lanekassen.no/nb-NO/gjeld-og-betaling/finnmark-eller-nord-troms/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                Lånekassen (Nedskriving) <span className="sr-only"> (åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
              <a href="https://www.skatteetaten.no/satser/finnmarksfradraget/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                Skatteetaten <span className="sr-only"> (åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

      </article>
    </main>
  );
}