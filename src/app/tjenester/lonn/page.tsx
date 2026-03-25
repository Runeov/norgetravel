import { Metadata } from 'next';
import { FileCheck, Receipt, Heart, TrendingDown, MapPin, Zap, Users } from 'lucide-react';
import HeroImage from '@/assets/Hero_Aarsoppgjor.avif';
import { ServiceHero } from '@/components/modules/services/ServiceHero';
import { ServiceOverview } from '@/components/modules/services/ServiceOverview';
import { ServiceFeatureGrid, type ServiceFeature } from '@/components/modules/services/ServiceFeatureGrid';
import { ServiceProcess, type ProcessStep } from '@/components/modules/services/ServiceProcess';
import { ServiceWhyAverdi, type WhyPoint } from '@/components/modules/services/ServiceWhyAverdi';
import { FaqAccordion, type FaqItem } from '@/components/ui/FaqAccordion';
import { ServiceCTA } from '@/components/modules/services/ServiceCTA';

export const metadata: Metadata = {
  title: 'Lønn & HR | Averdi - Lønnstjenester i Nord-Norge',
  description: 'Vi kjører lønn, sender A-melding innen fristen, og håndterer skatt og arbeidsgiveravgift for bedrifter i Nord-Norge.',
  keywords: 'lønn, lønnskjøring, a-melding, arbeidsgiveravgift, tiltakssonen, nordnorge, finnmark',
};

export default function LonnPage() {
  
  // Features data
  const features: ServiceFeature[] = [
    {
      title: 'A-melding og lønnsrapportering',
      description: 'Vi bruker riktige satser og sender A-melding innen fristen.',
      icon: <FileCheck className="w-6 h-6" aria-hidden="true" />
    },
    {
      title: 'Reiseregninger og utlegg',
      description: 'Vi beregner reiseregninger, diett og utlegg etter gjeldende satser. Du sender kvitteringene, vi ordner resten.',
      icon: <Receipt className="w-6 h-6" aria-hidden="true" />
    },
    {
      title: 'Sykepenger og refusjoner',
      description: 'Vi kan bistå med søknadshjelp til nav for både sykepenger og foreldrepenger.',
      icon: <Heart className="w-6 h-6" aria-hidden="true" />
    },
    {
      title: 'Redusert arbeidsgiveravgift',
      description: 'I Finnmark og Nord-Troms kan arbeidsgiveravgiften være 0 %. Vi beregner riktig sats for hver ansatt.',
      icon: <TrendingDown className="w-6 h-6" aria-hidden="true" />
    }
  ];

  // Process steps
  const processSteps: ProcessStep[] = [
    {
      number: '1',
      title: 'Oppsett',
      description: 'Vi setter opp lønnssystemet og registrerer ansatte med riktig stillingsprosent, skattekort, og arbeidsforhold.'
    },
    {
      number: '2',
      title: 'Månedlig kjøring',
      description: 'Du sender timedata innen avtalt dato. Vi kjører lønn og sender lønnslipper som avtalt.'
    },
    {
      number: '3',
      title: 'Rapportering',
      description: 'Vi sender A-melding og betaler forskuddstrekk og arbeidsgiveravgift etter avtale.'
    }
  ];

  // Why Averdi points
  const whyPoints: WhyPoint[] = [
    {
      title: 'Kjenner særreglene',
      description: 'Vi jobber med selskaper i tiltakssonen og vet hvordan 0 % arbeidsgiveravgift slår ut i praksis.',
      icon: <MapPin className="w-7 h-7" aria-hidden="true" />
    },
    {
      title: 'Automatisert lønnskjøring',
      description: 'Du registrerer timer digitalt. Systemet beregner lønn. Vi kontrollerer før utbetaling.',
      icon: <Zap className="w-7 h-7" aria-hidden="true" />
    },
    {
      title: 'Personlig oppfølging',
      description: 'Du får en fast kontakt hos oss for oppfølging.',
      icon: <Users className="w-7 h-7" aria-hidden="true" />
    }
  ];

  // FAQ items
  const faqItems: FaqItem[] = [
    {
      question: 'Hva koster lønnstjenester?',
      answer: 'Du betaler fast pris per ansatt per måned. Prisen avhenger av antall ansatte og om dere har variabel lønn.'
    },
    {
      question: 'Hvor raskt kan dere starte?',
      answer: 'Vi kan normalt starte fra neste lønnskjøring. Vi trenger normalt 3–5 arbeidsdager til oppsett og dataoverføring fra eventuell tidligere leverandør.'
    },
    {
      question: 'Håndterer dere sykepenger?',
      answer: 'Ja, vi beregner sykepenger korrekt og søker refusjon fra NAV på vegne av bedriften. Vi følger opp alle refusjonskrav.'
    },
    {
      question: 'Hva med feriepenger?',
      answer: 'Vi beregner og avsetter feriepenger løpende, og utbetaler dem i henhold til ferieloven. Du får full oversikt over avsetninger.'
    },
    {
      question: 'Kan dere hjelpe med ansettelseskontrakter?',
      answer: 'Vi kan gi råd om lønnsvilkår og standardkontrakter, men anbefaler juridisk hjelp for komplekse avtaler.'
    },
    {
      question: 'Hva er fordelen med 0% arbeidsgiveravgift?',
      answer: 'En ansatt med 600 000 kr i lønn gir 84 600 kr i arbeidsgiveravgift ved 14,1 %. I tiltakssonen kan satsen være 0 %. Det er en direkte besparelse på lønnskostnaden.'
    }
  ];

  return (
    <main className="flex-1">
      
      {/* Hero Section */}
      <ServiceHero
        title="Lønn & HR"
        subtitle="Korrekt lønn til rett tid. Hver gang."
        description="Vi håndterer alt det praktiske rundt lønn, fra A-melding og reiseregninger til sykepenger og arbeidsgiveravgift. Dine ansatte får riktig lønn til riktig tid, og du får ro i sjela."
        stats={{ value: '100%', label: 'presisjon' }}
        ctaText="Få et tilbud"
        ctaLink="#contact"
        heroImage={HeroImage}
        heroImageAlt="Lønn & HR – Averdi"
      />

      {/* Overview Section */}
      <ServiceOverview
        title="Hva vi gjør"
        description="Vi tilbyr komplett lønnstjeneste tilpasset nordnorske bedrifter. Vi bruker ordningene i tiltakssonen riktig, inkludert 0 % arbeidsgiveravgift der det gjelder."
        benefits={[
          'Vi kjører lønn fast hver måned og sender lønnslipper digitalt.',
          'Vi sender A-melding innen fristen.',
          'Vi beregner arbeidsgiveravgift etter riktig sone.'
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
        title="Vil du slippe å tenke på A-melding og frister hver måned?"
        description="Book et møte. Du får en konkret plan for hvordan vi setter opp lønn hos deg. Hvis Skatteetaten eller NAV har spørsmål, følger vi opp saken sammen med deg."
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
            'serviceType': 'Lønnstjenester',
            'provider': {
              '@type': 'Organization',
              'name': 'Averdi AS',
              'url': 'https://averdi.no'
            },
            'areaServed': 'Nord-Norge',
            'description': 'Komplett lønnstjeneste for nordnorske bedrifter med ekspertise på tiltakssonen og redusert arbeidsgiveravgift.'
          })
        }}
      />
    </main>
  );
}
