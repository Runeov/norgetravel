import { Metadata } from 'next';
import { FileText, Calculator, TrendingUp, Award, MapPin, Zap, Users } from 'lucide-react';
import HeroImage from '@/assets/Hero_Aarsoppgjor.avif';
import { ServiceHero } from '@/components/modules/services/ServiceHero';
import { ServiceOverview } from '@/components/modules/services/ServiceOverview';
import { ServiceFeatureGrid, type ServiceFeature } from '@/components/modules/services/ServiceFeatureGrid';
import { ServiceProcess, type ProcessStep } from '@/components/modules/services/ServiceProcess';
import { ServiceWhyAverdi, type WhyPoint } from '@/components/modules/services/ServiceWhyAverdi';
import { FaqAccordion, type FaqItem } from '@/components/ui/FaqAccordion';
import { ServiceCTA } from '@/components/modules/services/ServiceCTA';

export const metadata: Metadata = {
  title: 'Årsoppgjør & Skatt | Averdi - Skattetjenester i Nord-Norge',
  description: 'Årsoppgjør og skattemelding levert innen 31. mai og 31. juli. Vi sikrer at du bruker alle fradrag, inkludert Finnmarksfradraget.',
  keywords: 'årsoppgjør, skattemelding, finnmarksfradrag, tiltakssonen, nordnorge, fradrag',
};

export default function AarsoppgjorPage() {
  
  // Features data
  const features: ServiceFeature[] = [
    {
      title: 'Årsregnskap og noter',
      description: 'Vi utarbeider årsregnskapet ditt etter regnskapsloven og skriver alle nødvendige noter.',
      icon: <FileText className="w-6 h-6" aria-hidden="true" />
    },
    {
      title: 'Skattemelding',
      description: 'Vi fyller ut og sender skattemeldingen for aksjeselskap og enkeltpersonforetak.',
      icon: <Calculator className="w-6 h-6" aria-hidden="true" />
    },
    {
      title: 'Alle fradrag du har krav på',
      description: 'Vi går gjennom fradragene du kan bruke, inkludert Finnmarksfradraget.',
      icon: <TrendingUp className="w-6 h-6" aria-hidden="true" />
    },
    {
      title: 'Særskilte ordninger for tiltakssonen',
      description: 'Vi vurderer arbeidsgiveravgift, Finnmarksfradrag, og andre ordninger i tiltakssonen.',
      icon: <Award className="w-6 h-6" aria-hidden="true" />
    }
  ];

  // Process steps
  const processSteps: ProcessStep[] = [
    {
      number: '1',
      title: 'Forberedelse',
      description: 'Vi avstemmer bank, MVA, og balanseposter før vi starter årsoppgjøret.'
    },
    {
      number: '2',
      title: 'Årsoppgjør',
      description: 'Vi utarbeider årsregnskap og noter. Du får det til gjennomgang før vi sender inn.'
    },
    {
      number: '3',
      title: 'Skattemelding',
      description: 'Vi bruker relevante fradrag og sender skattemeldingen innen 31. mai.'
    }
  ];

  // Why Averdi points
  const whyPoints: WhyPoint[] = [
    {
      title: 'Vi kjenner tiltakssonen i praksis',
      description: 'Vi jobber med selskaper i Finnmark og Nord-Troms og vet hvordan ordningene påvirker skatt og arbeidsgiveravgift.',
      icon: <MapPin className="w-7 h-7" aria-hidden="true" />
    },
    {
      title: 'Vi leverer innen fristen',
      description: 'Skattemelding innen 31. mai. Årsregnskap innen 31. juli.',
      icon: <Zap className="w-7 h-7" aria-hidden="true" />
    },
    {
      title: 'Du får en fast rådgiver',
      description: 'Du snakker med samme person gjennom hele prosessen.',
      icon: <Users className="w-7 h-7" aria-hidden="true" />
    }
  ];

  // FAQ items
  const faqItems: FaqItem[] = [
    {
      question: 'Når må årsoppgjøret leveres?',
      answer: 'Skattemeldingen har fast frist 31. mai. Årsregnskapet leveres til Regnskapsregisteret innen 31. juli. Vi sender deg en tidsplan tidlig på året og minner deg på hva vi trenger.'
    },
    {
      question: 'Hva er forskjellen på årsregnskap og skattemelding?',
      answer: 'Årsregnskapet viser hva bedriften din eide, tjente og skyldte gjennom året. Det går til Regnskapsregisteret. Skattemeldingen bruker de samme tallene til å beregne hva du skylder i skatt. Den går til Skatteetaten. Vi håndterer begge.'
    },
    {
      question: 'Kan dere hjelpe med skatteplanlegging?',
      answer: 'Ja, vi tilbyr skatteplanlegging gjennom året. Vi hjelper deg med å ta beslutninger som reduserer skatten din innenfor lovverket.'
    },
    {
      question: 'Hva med revisjonsplikt?',
      answer: 'Aksjeselskap slipper revisjon hvis de er under grensene for omsetning, balansesum, og ansatte. Vi vurderer tallene dine og sier om du må ha revisor.'
    },
    {
      question: 'Hva er Finnmarksfradraget?',
      answer: 'Finnmarksfradraget er et særfradrag for personer bosatt i Finnmark og Nord-Troms. For 2026 er forslaget 45 000 kr, som gir betydelig skattelette.'
    },
  ];

  return (
    <main className="flex-1">
      
      {/* Hero Section */}
      <ServiceHero
        title="Årsoppgjør & Skatt"
        subtitle="Årsregnskap og skattemelding levert innen fristen"
        description="Vi utarbeider årsregnskapet ditt og leverer skattemeldingen innen fristen. Driver du i Finnmark eller Nord-Troms, sørger vi for at du bruker ordningene i tiltakssonen riktig."
        stats={{ value: '0', label: 'forsinkelser' }}
        ctaText="Få et tilbud"
        ctaLink="#contact"
        heroImage={HeroImage}
        heroImageAlt="Årsoppgjør & Skatt – Averdi"
      />

      {/* Overview Section */}
      <ServiceOverview
        title="Hva vi gjør"
        description="Du får årsregnskap, noter, og skattemelding på ett sted. Vi kontrollerer regnskapet, avstemmer kontoer, utarbeider noter, og sender inn alt til riktige registre."
        benefits={[
          'Vi utarbeider årsregnskap etter regnskapsloven, med alle noter.',
          'Vi fyller ut og sender skattemeldingen innen 31. mai.',
          'Du bruker alle fradrag, inkludert Finnmarksfradraget.',
          'Vi vurderer om du omfattes av ordninger i tiltakssonen.'
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
        title="Vil du være ferdig med årsoppgjøret i god tid før fristen?"
        description="Book et møte. Du får en konkret plan for årsoppgjøret ditt. Hvis Skatteetaten stiller spørsmål, tar vi dialogen sammen med deg."
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
            'serviceType': 'Årsoppgjør og Skattetjenester',
            'provider': {
              '@type': 'Organization',
              'name': 'Averdi AS',
              'url': 'https://averdi.no'
            },
            'areaServed': 'Nord-Norge',
            'description': 'Komplett årsoppgjør og skattetjenester for nordnorske bedrifter med ekspertise på tiltakssonen og Finnmarksfradraget.'
          })
        }}
      />
    </main>
  );
}
