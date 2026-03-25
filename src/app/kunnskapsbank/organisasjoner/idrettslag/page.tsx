import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Smartphone, Receipt, Download, Zap, CreditCard, ExternalLink } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Regnskap for Idrettslag & Vipps-integrasjon | Averdi',
  description: 'Få kontroll på kiosk og medlemskontingent. Last ned vår guide for Vipps til PowerOffice, og lær hvordan dere maksimerer momskompensasjonen.',
};

export default function IdrettslagPage() {
  const alida = getExpert('alida');

  const faqData = [
    {
      question: 'Hva koster det å bruke Averdi som regnskapsfører for idrettslaget?',
      answer: 'Vi tilbyr fastprisavtaler tilpasset lagets størrelse og aktivitetsnivå. Kostnaden tjener seg ofte inn gjennom korrekt momskompensasjon alene. Ta kontakt for et uforpliktende tilbud.',
    },
    {
      question: 'Kan vi integrere Vipps direkte med regnskapssystemet?',
      answer: 'Ja! Vi har utviklet en metode for å integrere Vipps mot PowerOffice, Fiken og Uni Micro. Salg bokføres automatisk på riktig konto og gebyrer splittes ut – ingen manuell punching av tall.',
    },
    {
      question: 'Hva er momskompensasjon, og kan idrettslaget vårt søke?',
      answer: 'Momskompensasjon er en ordning der frivillige lag og foreninger får refundert moms betalt på varer og tjenester i driften. De aller fleste NIF-tilknyttede idrettslag kvalifiserer. Fristen er 1. september (eller ca. 15. august via NIF/KlubbAdmin).',
    },
    {
      question: 'Trenger vi revisor?',
      answer: 'Nei, de fleste idrettslag med under 7 millioner kr i driftskostnader (to år på rad) trenger ikke revisor. En kontrollkomité valgt på årsmøtet holder. Grensen ble hevet i 2026 – se vår guide om årsregnskap for detaljer.',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: faqData.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Kunnskapsbank', item: 'https://www.averdi.no/kunnskapsbank' },
          { '@type': 'ListItem', position: 2, name: 'Lag & Forening', item: 'https://www.averdi.no/kunnskapsbank/organisasjoner' },
          { '@type': 'ListItem', position: 3, name: 'Idrettslag & Regnskap', item: 'https://www.averdi.no/kunnskapsbank/organisasjoner/idrettslag' },
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

        <Link href="/kunnskapsbank/organisasjoner" className="inline-flex items-center text-slate-500 hover:text-green-600 mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tilbake til Forenings-hub
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            For Kasserere & Styreledere
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Fra dugnadskaos til <span className="text-green-600">full kontroll</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Mange kasserere sliter seg ut på manuelle bilag fra kiosk og loddsalg. 
            Vi digitaliserer idrettslaget slik at dere kan bruke tiden på sporten, ikke på permer.
          </p>
        </div>

        {/* The "Hook": Vipps Integration Demo/Teaser */}
        <div className="bg-slate-900 text-white rounded-2xl p-1 overflow-hidden shadow-2xl mb-16 border border-slate-700">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 md:p-10 relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap className="w-32 h-32 text-yellow-400" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#ff5b24] text-white text-xs font-bold px-2 py-1 rounded">VIPPS</span>
                <ArrowLeft className="w-4 h-4 text-slate-400 rotate-180" />
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">POWEROFFICE</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Lei av å punche Vipps-rapporter manuelt?
              </h2>
              <p className="text-slate-300 mb-8 max-w-xl">
                Vi har utviklet en egen metode for å integrere Vipps-salg direkte mot regnskapet. 
                Salgene bokføres automatisk på riktig konto, og gebyrene splittes ut.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/kontakt?subject=Bestilling+Vipps+Integrasjon"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-all"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Sett det opp for oss
                </Link>
                <button className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all backdrop-blur-sm border border-white/10 group">
                  <Download className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform" />
                  Last ned teknisk guide (PDF)
                </button>
              </div>
              <div className="mt-5 pt-5 border-t border-white/10">
                <Link
                  href="/kunnskapsbank/organisasjoner/vipps"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  Hvordan registrere seg på Vipps
                </Link>
              </div>
              <p className="text-xs text-slate-500 mt-4 italic">
                * Guiden krever teknisk innsikt i API og webhooks. Vi anbefaler bistand til oppsett.
                <br />
                Kommer snart: Guide for <strong>iZettle</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Expert Insight: Alida */}
        {alida && (
          <ExpertInsight 
            title="Momskompensasjon er 'gratis penger'" 
            quote="For 2024 fikk våre kunder refundert over 2 millioner kroner. Det er penger som går rett tilbake til klubbkassa – men kun hvis regnskapet er satt opp riktig fra start."
            expert={alida}
          >
            <p>
              Mange små foreninger går glipp av momskompensasjon fordi de tror det er komplisert. 
              Sannheten er at det er en av de enkleste måtene å styrke klubbøkonomien på. 
              Fristen er normalt <McpDataSpan id="moms-frist-organisasjon" value="1. september" source="Lottstift" className="font-semibold" />, 
              men grunnlaget legges gjennom hele året.
            </p>
          </ExpertInsight>
        )}

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8 my-16">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 text-green-600">
              <Receipt className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Bilagsflyt & Kiosk</h3>
            <p className="text-slate-600 mb-4">
              Slutt med bæreposer fulle av kvitteringer. Med PowerOffice Mobile tar laglederen bilde av kvitteringen på stevnet, og den havner rett i regnskapet.
            </p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-center gap-2"><CheckIcon /> Ingen tapte kvitteringer</li>
              <li className="flex items-center gap-2"><CheckIcon /> Raskere utleggsrefusjon</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">iZettle & Kortbetaling</h3>
            <p className="text-slate-600 mb-4">
              Vi holder på å ferdigstille en guide for automatisk bokføring av iZettle-salg. 
              Perfekt for loppemarked og større arrangementer.
            </p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-center gap-2"><CheckIcon /> Automatisk dagsopgjør</li>
              <li className="flex items-center gap-2"><CheckIcon /> Mindre kassediff</li>
            </ul>
          </div>
        </div>

        {/* Simple Text Section */}
        <div className="prose prose-lg prose-slate max-w-none">
          <h2>Hva koster en regnskapsfører for et idrettslag?</h2>
          <p>
            Mange tror det er for dyrt, men kostnaden spares ofte inn gjennom:
          </p>
          <ol>
            <li><strong>Korrekt momskompensasjon:</strong> Vi sikrer at dere får tilbake hver krone dere har krav på.</li>
            <li><strong>Sparte gebyrer:</strong> Vi rydder i bankavtaler og betalingsløsninger.</li>
            <li><strong>Færre styreverv-nei:</strong> Det er lettere å rekruttere styremedlemmer når økonomien er satt bort til proffer.</li>
          </ol>
          <p>
            Vi tilbyr fastprisavtaler for små lag og foreninger, slik at dere har forutsigbarhet.
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Ofte stilte spørsmål</h2>
          <FaqAccordion items={faqData} themeColor="#16a34a" />
        </div>

        {/* Kilder */}
        <div className="border-t border-slate-200 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-slate-500">
            <div className="max-w-2xl">
              <p className="font-semibold text-slate-700 mb-1">Kilder</p>
              <p>Basert på NIFs Lovnorm og Klubbguide for idrettslag samt Lotteri- og stiftelsestilsynets retningslinjer for momskompensasjon (2026).</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a href="https://www.idrettsforbundet.no/klubbguiden" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                idrettsforbundet.no <span className="sr-only">(åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
              <a href="https://lottstift.no/momskompensasjon" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                lottstift.no <span className="sr-only">(åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

      </article>
    </main>
  );
}

function CheckIcon() {
  return <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">✓</div>;
}