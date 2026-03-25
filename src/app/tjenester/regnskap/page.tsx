import { Metadata } from 'next';
import { FileText, Receipt, CreditCard, MapPin, Zap, Users } from 'lucide-react';
import { ServiceHero } from '@/components/modules/services/ServiceHero';
import heroImage from '@/assets/Hero_Tjenester.avif';
import { ServiceOverview } from '@/components/modules/services/ServiceOverview';
import { ServiceFeatureGrid, type ServiceFeature } from '@/components/modules/services/ServiceFeatureGrid';
import { ServiceProcess, type ProcessStep } from '@/components/modules/services/ServiceProcess';
import { ServiceWhyAverdi, type WhyPoint } from '@/components/modules/services/ServiceWhyAverdi';
import { FaqAccordion, type FaqItem } from '@/components/ui/FaqAccordion';
import { ServiceCTA } from '@/components/modules/services/ServiceCTA';

export const metadata: Metadata = {
  title: 'Regnskap | Averdi - Regnskapstjenester i Nord-Norge',
  description: 'Moderne regnskap for nordnorske bedrifter. 35+ års erfaring. Kontakt oss for tilbud.',
  keywords: 'regnskap, bokføring, nordnorge, finnmark, regnskapstjenester, regnskapsfører',
};

export default function RegnskapPage() {
  
  // Features data
  const features: ServiceFeature[] = [
    {
      title: 'MVA',
      description: 'Vi beregner og sender MVA-meldingen innen fristen.',
      icon: <Receipt className="w-6 h-6" />
    },
    {
      title: 'Perioderapportering',
      description: 'Du får perioderapport med resultat og balanse til avtalt tid. Vi forklarer tallene slik at du forstår hva de betyr.',
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: 'Remittering',
      description: 'Vi legger betalinger klare i banken. Du godkjenner, så sendes de til forfall.',
      icon: <CreditCard className="w-6 h-6" />
    },
    {
      title: 'Prosjektregnskap',
      description: 'Vi fører kostnader og inntekter per prosjekt. Du ser lønnsomhet på hvert oppdrag.',
      icon: <Receipt className="w-6 h-6" />
    },
    {
      title: 'Skybasert regnskap',
      description: 'Vi jobber i PowerOffice GO eller Finago Office (24SevenOffice). Du har tilgang til regnskapet ditt hele tiden.',
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: 'Timeføring',
      description: 'Med PowerOffice Time registrerer du timer som oppfyller BFF-kravene. Du og dine ansatte har egen innlogging.',
      icon: <Users className="w-6 h-6" />
    },
    {
      title: 'Fast kontaktperson',
      description: 'Du kan ringe eller sende e-post direkte til din regnskapsfører. Vi svarer raskt.',
      icon: <Users className="w-6 h-6" />
    }
  ];

  // Process steps
  const processSteps: ProcessStep[] = [
    {
      number: '1',
      title: 'Oppstart',
      description: 'Kartlegging av behov, oppsett av systemer og opplæring i verktøy.'
    },
    {
      number: '2',
      title: 'Løpende drift',
      description: 'Du sender bilag, vi bokfører og rapporterer. Du får perioderapport til avtalt tid.'
    },
    {
      number: '3',
      title: 'Årsavslutning',
      description: 'Årsoppgjør, skattemelding og planlegging for neste år.'
    }
  ];

  // Why Averdi points
  const whyPoints: WhyPoint[] = [
    {
      title: 'Nordnorsk ekspertise',
      description: 'Vi jobber med bedrifter i Finnmark og Nord-Troms. Vi vet hvordan tiltakssonen påvirker din bedrift.',
      icon: <MapPin className="w-7 h-7" />
    },
    {
      title: 'Moderne teknologi',
      description: 'Moderne løsninger med automatisering og løpende rapportering.',
      icon: <Zap className="w-7 h-7" />
    },
    {
      title: 'Personlig service',
      description: 'Fast kontaktperson, rask respons og inkludert rådgivning.',
      icon: <Users className="w-7 h-7" />
    }
  ];

  // FAQ items
  const faqItems: FaqItem[] = [
    {
      question: 'Hva koster regnskapstjenester?',
      answer: 'Du får fastpris når vi vet hvor mange bilag du har per måned og om du har ansatte. Vi gir deg et konkret tilbud etter en kort prat.'
    },
    {
      question: 'Hvor ofte må jeg sende bilag?',
      answer: 'Så ofte du vil! Vi anbefaler ukentlig eller månedlig for best oversikt. Med våre skybaserte løsninger kan du sende bilag på e-post eller via app når det passer deg.'
    },
    {
      question: 'Kan jeg bytte fra min nåværende regnskapsfører?',
      answer: 'Vi sier opp avtalen for deg, henter regnskapsdata, og setter opp nytt system. Du slipper å følge opp selv.'
    },
    {
      question: 'Får jeg tilgang til tallene mine?',
      answer: 'Ja, du har full tilgang til løpende rapporter via nettleser eller app. Du kan når som helst se status på økonomi, faktura og bilag.'
    },
    {
      question: 'Hva skjer hvis jeg glemmer en frist?',
      answer: 'Vi varsler deg i god tid og sørger for at alt leveres riktig. Vi holder oversikt over alle frister for MVA, skatt og årsoppgjør.'
    }
  ];

  return (
    <main className="flex-1">
      
      {/* Hero Section */}
      <ServiceHero
        title="Regnskap"
        subtitle="Se tallene dine når du vil. Vi holder dem oppdatert."
        description="Du sender bilagene. Vi bokfører og passer fristene. Du bruker tiden på kundene dine. Vi kjenner tiltakssonen i Finnmark og Nord-Troms. Vi vet hva det betyr for arbeidsgiveravgift og skatt."
        stats={{ value: '35+', label: 'års erfaring' }}
        ctaText="Få et tilbud"
        ctaLink="#contact"
        heroImage={heroImage}
        heroImageAlt="Averdi regnskapstjenester i Nord-Norge"
      />

      {/* Overview Section */}
      <ServiceOverview
        title="Hva vi gjør"
        description="Du får bokføring, MVA, rapporter, og årsoppgjør på ett sted."
        benefits={[
          'Se resultat og likviditet hver måned.',
          'Send bilag på e-post eller i app. Vi fører dem fortløpende.',
          'Vi varsler deg før MVA og skattemelding.',
          'Vi kjører lønn og sender A-melding innen fristen.',
          'Digitale reiseregninger rett i systemet.',
          'Du har én fast kontaktperson.'
        ]}
      />

      {/* Features Grid */}
      <ServiceFeatureGrid
        title="Våre tjenester"
        features={features}
      />

      {/* Process Section */}
      <ServiceProcess
        title="Slik jobber vi"
        steps={processSteps}
      />

      {/* Why Averdi Section */}
      <ServiceWhyAverdi
        points={whyPoints}
      />

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Ofte stilte spørsmål
            </h2>
          </div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* CTA Section */}
      <ServiceCTA
        title="Vil du ha full kontroll på tallene dine innen neste måned?"
        description="Book et møte. Du får en konkret vurdering av hva du betaler i dag og hva vi kan gjøre bedre."
        primaryCTA={{
          text: 'Kontakt oss',
          link: '/#contact'
        }}
        secondaryCTA={{
          text: 'Se våre andre tjenester',
          link: '/#services'
        }}
      />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            'serviceType': 'Regnskapstjenester',
            'provider': {
              '@type': 'Organization',
              'name': 'Averdi AS',
              'url': 'https://averdi.no'
            },
            'areaServed': 'Nord-Norge',
            'description': 'Komplett regnskapstjeneste for nordnorske bedrifter med løpende oppfølging og personlig service.'
          })
        }}
      />
    </main>
  );
}