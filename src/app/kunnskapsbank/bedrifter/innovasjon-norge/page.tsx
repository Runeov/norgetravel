import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowLeft, 
  MapPin, 
  Rocket, 
  Lightbulb, 
  Globe, 
  Users, 
  Building2, 
  ExternalLink,
  CheckCircle2,
  Phone,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Innovasjon Norge Arktis | Finansiering & Rådgivning i Nord',
  description: 'Innovasjon Norge Arktis hjelper bedrifter i Troms og Finnmark med finansiering, rådgivning og internasjonalisering. Kontorer i Tromsø, Alta og Vadsø.',
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

// Kontorkort-komponent
function OfficeCard({ city, address, phone }: { city: string; address?: string; phone?: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <MapPin className="w-5 h-5 text-blue-600" aria-hidden="true" />
        </div>
        <h3 className="font-bold text-slate-900 text-lg">{city}</h3>
      </div>
      {address && <p className="text-slate-600 text-sm mb-2">{address}</p>}
      {phone && (
        <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
          <Phone className="w-4 h-4" aria-hidden="true" />
          {phone}
        </a>
      )}
    </div>
  );
}

// Tjenestekort-komponent
function ServiceCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-blue-200">
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-blue-600" aria-hidden="true" />
      </div>
      <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function InnovasjonNorgePage() {
  // FAQ Data
  const faqItems = [
    {
      question: 'Hvem kan få støtte fra Innovasjon Norge Arktis?',
      answer: <>Innovasjon Norge Arktis hjelper bedrifter som skal <strong>etablere</strong> eller <strong>drive virksomhet</strong> i Troms og Finnmark. De tilbyr finansiering, rådgivning og tjenester som gjør det mulig å bygge en bedre bedrift eller satse internasjonalt.</>
    },
    {
      question: 'Hvor har Innovasjon Norge Arktis kontorer?',
      answer: <>Innovasjon Norge Arktis har kontorer i <strong>Tromsø</strong>, <strong>Alta</strong> og <strong>Vadsø</strong>. Du kan ta kontakt med det kontoret som er nærmest deg for veiledning og rådgivning.</>
    },
    {
      question: 'Hva slags finansiering tilbyr Innovasjon Norge?',
      answer: <>Innovasjon Norge tilbyr ulike typer finansiering, inkludert <strong>tilskudd</strong>, <strong>lån</strong> og <strong>garantier</strong>. Hvilken type finansiering som passer best avhenger av prosjektets art, risiko og utviklingsfase.</>
    },
    {
      question: 'Kan Innovasjon Norge hjelpe med eksport og internasjonalisering?',
      answer: <>Ja, Innovasjon Norge har et omfattende nettverk av kontorer i utlandet og kan hjelpe norske bedrifter med å <strong>etablere seg i nye markeder</strong>, finne samarbeidspartnere og navigere i internasjonale regelverk.</>
    }
  ];

  // JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Hvem kan få støtte fra Innovasjon Norge Arktis?', acceptedAnswer: { '@type': 'Answer', text: 'Innovasjon Norge Arktis hjelper bedrifter som skal etablere eller drive virksomhet i Troms og Finnmark. De tilbyr finansiering, rådgivning og tjenester som gjør det mulig å bygge en bedre bedrift eller satse internasjonalt.' } },
          { '@type': 'Question', name: 'Hvor har Innovasjon Norge Arktis kontorer?', acceptedAnswer: { '@type': 'Answer', text: 'Innovasjon Norge Arktis har kontorer i Tromsø, Alta og Vadsø. Du kan ta kontakt med det kontoret som er nærmest deg for veiledning og rådgivning.' } },
          { '@type': 'Question', name: 'Hva slags finansiering tilbyr Innovasjon Norge?', acceptedAnswer: { '@type': 'Answer', text: 'Innovasjon Norge tilbyr ulike typer finansiering, inkludert tilskudd, lån og garantier. Hvilken type finansiering som passer best avhenger av prosjektets art, risiko og utviklingsfase.' } },
          { '@type': 'Question', name: 'Kan Innovasjon Norge hjelpe med eksport og internasjonalisering?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, Innovasjon Norge har et omfattende nettverk av kontorer i utlandet og kan hjelpe norske bedrifter med å etablere seg i nye markeder, finne samarbeidspartnere og navigere i internasjonale regelverk.' } },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Kunnskapsbank', item: 'https://www.averdi.no/kunnskapsbank' },
          { '@type': 'ListItem', position: 2, name: 'Bedrift & Handel', item: 'https://www.averdi.no/kunnskapsbank/bedrifter' },
          { '@type': 'ListItem', position: 3, name: 'Arktiske Midler', item: 'https://www.averdi.no/kunnskapsbank/bedrifter/innovasjon-norge' },
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-4 uppercase tracking-wider">
            Offentlig Virkemiddel
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 leading-tight">
            Innovasjon Norge <span className="text-blue-600">Arktis</span>
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed">
            Vi som bor og arbeider på toppen av Norgeskartet har muligheter andre må se svært langt etter. 
            Innovasjon Norge Arktis hjelper deg som skal etablere eller drive virksomhet i <strong>Troms og Finnmark</strong> med 
            finansiering, rådgivning og tjenester som gjør det mulig å bygge en bedre bedrift eller satse internasjonalt.
          </p>
        </div>

        {/* Kontorer-seksjon */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Building2 className="w-6 h-6 text-blue-600" aria-hidden="true" />
            Kontorer i regionen
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <OfficeCard city="Tromsø" />
            <OfficeCard city="Alta" />
            <OfficeCard city="Vadsø" />
          </div>
          <p className="text-sm text-slate-500 mt-4 italic">
            Kontakt nærmeste kontor for veiledning om finansiering og rådgivning.
          </p>
        </section>

        {/* Tjenester-seksjon */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Hva kan Innovasjon Norge hjelpe deg med?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ServiceCard 
              icon={Rocket}
              title="Finansiering"
              description="Tilskudd, lån og garantier for bedrifter som vil vokse, innovere eller etablere seg. Finansieringen tilpasses prosjektets risiko og utviklingsfase."
            />
            <ServiceCard 
              icon={Lightbulb}
              title="Rådgivning"
              description="Ekspertveiledning innen forretningsutvikling, strategi og innovasjon. Få hjelp til å utvikle ideen din til en levedyktig forretningsmodell."
            />
            <ServiceCard 
              icon={Globe}
              title="Internasjonalisering"
              description="Hjelp til å etablere deg i nye markeder. Innovasjon Norge har kontorer over hele verden og kan åpne dører for norske bedrifter."
            />
            <ServiceCard 
              icon={Users}
              title="Nettverk & Kompetanse"
              description="Tilgang til kurs, webinarer og arrangementer. Bygg nettverk med andre gründere og etablerte bedrifter i regionen."
            />
          </div>
        </section>

        {/* Kurs og kompetanse */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-16">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-blue-600" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Kurs og kompetanse</h2>
              <p className="text-slate-600">
                Innovasjon Norge tilbyr digitale kurs gjennom sitt kompetansesenter. 
                Webinarer og arrangementer finner du i deres arrangementsoversikt.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://www.innovasjonnorge.no/kompetanse" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              Kompetansesenteret <span className="sr-only"> (åpnes i ny fane)</span><ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
            <a 
              href="https://www.innovasjonnorge.no/arrangementer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              Arrangementer <span className="sr-only"> (åpnes i ny fane)</span><ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* Regionale ordninger */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-blue-600" aria-hidden="true" />
            Regionale ordninger
          </h2>
          <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-6 rounded-2xl border border-blue-100">
            <h3 className="font-bold text-slate-900 text-lg mb-3">Program for kreative næringer</h3>
            <p className="text-slate-700 mb-4 leading-relaxed">
              Innovasjon Norge har på oppdrag fra Troms fylkeskommune et prosjekt knyttet til 
              næringsutvikling innen kreative næringer i fylket. Dette programmet støtter bedrifter 
              innen design, kunst, kultur og kreativ teknologi.
            </p>
            <a 
              href="https://www.innovasjonnorge.no/kontor/arktis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
            >
              Les mer om regionale ordninger <span className="sr-only"> (åpnes i ny fane)</span><ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* Kombinasjon med Tiltakssonen */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-10 mb-16">
          <h2 className="text-2xl font-bold mb-4">Kombiner med Tiltakssonen</h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Bedrifter i Troms og Finnmark kan kombinere støtte fra Innovasjon Norge med fordelene i Tiltakssonen. 
            Med <strong className="text-white">0% arbeidsgiveravgift</strong> og tilgang til investeringsstøtte, 
            har du et unikt utgangspunkt for vekst.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-slate-300">0% arbeidsgiveravgift i hele Finnmark og Nord-Troms</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-slate-300">Studielånsslette på opptil 60 000 kr per år</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-slate-300">Finnmarksfradrag på 45 000 kr</span>
            </li>
          </ul>
          <Link 
            href="/kunnskapsbank/bedrifter/tiltakssonen" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#E86C1F] text-white font-bold rounded-full hover:bg-[#d65f18] transition-all"
          >
            Se Innsatssonekalkulatoren
          </Link>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Ofte stilte spørsmål</h2>
          <FaqAccordion items={faqItems} themeColor="#2563EB" />
        </section>

        {/* Teknisk support */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl mb-12">
          <h3 className="font-bold text-yellow-800 mb-2">Tekniske problemer med søknad?</h3>
          <p className="text-yellow-800 text-sm">
            Har du tekniske problemer med en søknad, ring Innovasjon Norge på{' '}
            <a href="tel:22002500" className="font-bold hover:underline">22 00 25 00</a>{' '}
            mellom kl. 09.00 og 15.00.
          </p>
        </div>

        {/* CTA */}
        <LocalCtaBlock
          title="Trenger du hjelp med søknaden?"
          description="Vi i Averdi har lang erfaring med å hjelpe bedrifter i nord med å navigere virkemiddelapparatet. La oss hjelpe deg med å finne riktig finansiering."
          primaryButtonText="Kontakt oss"
          primaryButtonLink="/kontakt?subject=Innovasjon%20Norge"
        />

        {/* Kilder */}
        <div className="border-t border-slate-200 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-slate-500">
            <p>
              Informasjon hentet fra{' '}
              <a
                href="https://www.innovasjonnorge.no/kontor/arktis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Innovasjon Norge Arktis<span className="sr-only"> (åpnes i ny fane)</span>
              </a>
            </p>
            <a 
              href="https://www.innovasjonnorge.no" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              innovasjonnorge.no <span className="sr-only"> (åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </div>

      </article>
    </main>
  );
}
