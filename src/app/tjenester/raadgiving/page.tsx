import { Metadata } from 'next';
import { TrendingUp, DollarSign, Target, Gift, MapPin, Zap, Users } from 'lucide-react';
import HeroImage from '@/assets/hero_raadgivning.avif';
import { ServiceHero } from '@/components/modules/services/ServiceHero';
import { ServiceOverview } from '@/components/modules/services/ServiceOverview';
import { ServiceFeatureGrid, type ServiceFeature } from '@/components/modules/services/ServiceFeatureGrid';
import { ServiceProcess, type ProcessStep } from '@/components/modules/services/ServiceProcess';
import { ServiceWhyAverdi, type WhyPoint } from '@/components/modules/services/ServiceWhyAverdi';
import { FaqAccordion, type FaqItem } from '@/components/ui/FaqAccordion';
import { ServiceCTA } from '@/components/modules/services/ServiceCTA';

export const metadata: Metadata = {
  title: 'Rådgivning | Averdi - Strategisk rådgivning i Nord-Norge',
  description: 'Få kontroll på budsjett, likviditet, og investeringer. Vi hjelper deg å ta riktige valg før du binder kapital.',
  keywords: 'rådgivning, budsjett, likviditetsstyring, sametinget, tiltakssonen, nordnorge',
};

export default function RaadgivingPage() {
  
  // Features data
  const features: ServiceFeature[] = [
    {
      title: 'Budsjett og prognoser',
      description: 'Vi lager budsjett per måned og oppdaterer prognosen når forutsetningene endrer seg.',
      icon: <TrendingUp className="w-6 h-6" aria-hidden="true" />
    },
    {
      title: 'Likviditetsstyring og kontantstrøm',
      description: 'Vi viser når kontoen går i minus hvis ingenting endres. Så foreslår vi tiltak.',
      icon: <DollarSign className="w-6 h-6" aria-hidden="true" />
    },
  ];

  // Process steps
  const processSteps: ProcessStep[] = [
    {
      number: '1',
      title: 'Kartlegging',
      description: 'Vi går gjennom regnskap, gjeld, og faste kostnader. Vi definerer målet ditt i kroner og dato.'
    },
    {
      number: '2',
      title: 'Analyse',
      description: 'Vi lager budsjett og likviditetsprognose. Du ser beste og verste scenario.'
    },
    {
      number: '3',
      title: 'Handlingsplan',
      description: 'Vi lager en plan med konkrete tiltak og datoer. Vi følger opp månedlig eller kvartalsvis.'
    }
  ];

  // Why Averdi points
  const whyPoints: WhyPoint[] = [
    {
      title: 'Lokal forankring i Finnmark',
      description: 'Vi jobber med bedrifter i Finnmark og Nord-Troms. Vi vet hvordan tiltakssonen påvirker kostnader og investeringer.',
      icon: <MapPin className="w-7 h-7" aria-hidden="true" />
    },
    {
      title: 'Kjenner tiltakssonen',
      description: 'Vi vurderer arbeidsgiveravgift, Finnmarksfradrag, og støtteordninger før du tar beslutninger.',
      icon: <Zap className="w-7 h-7" aria-hidden="true" />
    },
    {
      title: 'Langsiktig perspektiv',
      description: 'Du snakker med samme rådgiver gjennom hele prosessen. Vi følger opp og justerer planen når tallene endrer seg.',
      icon: <Users className="w-7 h-7" aria-hidden="true" />
    }
  ];

  // FAQ items
  const faqItems: FaqItem[] = [
    {
      question: 'Hva er forskjellen på rådgivning og regnskap?',
      answer: 'Regnskap handler om å registrere det som har skjedd. Rådgivning handler om å planlegge fremtiden og ta strategiske beslutninger. Vi tilbyr begge deler.'
    },
    {
      question: 'Kan dere hjelpe med Sametinget-søknader?',
      answer: 'Ja. Vi hjelper deg å dokumentere budsjett, finansiering, og måloppnåelse i søknaden. Vi har jobbet med Sametinget-søknader i over 35 år.'
    },
    {
      question: 'Hva koster rådgivning?',
      answer: 'Du kan velge timepris eller fast månedlig avtale. Fastpris passer hvis vi følger deg opp jevnlig gjennom året.'
    },
    {
      question: 'Hva er tiltakssonen?',
      answer: 'Tiltakssonen er Finnmark og deler av Nord-Troms, hvor bedrifter får særskilte skattefordeler som 0% arbeidsgiveravgift og Finnmarksfradrag.'
    }
  ];

  return (
    <main className="flex-1">
      
      {/* Hero Section */}
      <ServiceHero
        title="Rådgivning"
        subtitle="Ta beslutninger basert på tall. Ikke magefølelse."
        description="Vi hjelper deg å lage budsjett, styre likviditeten, og vurdere investeringer før du bestemmer deg. Du ser konsekvensene i tall før du signerer."
        stats={{ value: '35+', label: 'års erfaring' }}
        ctaText="Få et tilbud"
        ctaLink="#contact"
        heroImage={HeroImage}
        heroImageAlt="Rådgivning – Averdi"
      />

      {/* Overview Section */}
      <ServiceOverview
        title="Hva vi gjør"
        description="Du får konkrete analyser og en plan du kan bruke i styremøte eller bankmøte."
        benefits={[
          'Vi lager budsjett med konkrete månedstall.',
          'Vi vurderer lønnsomhet før investering, salg, eller generasjonsskifte.',
          'Vi viser deg beste og verste scenario, så du kan ta beslutninger med åpne øyne.'
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
        title="Vil du vite om planen din faktisk tåler neste 12 måneder?"
        description="Book et møte. Du får en konkret gjennomgang av tallene dine og hva som må justeres."
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
            'serviceType': 'Strategisk rådgivning',
            'provider': {
              '@type': 'Organization',
              'name': 'Averdi AS',
              'url': 'https://averdi.no'
            },
            'areaServed': 'Nord-Norge',
            'description': 'Strategisk rådgivning for nordnorske bedrifter med ekspertise på tiltakssonen og langsiktig vekst.'
          })
        }}
      />
    </main>
  );
}
