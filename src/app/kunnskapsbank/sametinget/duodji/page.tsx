import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertTriangle, FileText, Scissors, Hammer, ShoppingBag, ShieldCheck } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Duodji-støtte: Få betalt for kulturarv | Inntil 400 000 kr i tilskudd',
  description: 'Duodji-momsen er din konkurransekraft. Vi forklarer driftstilskudd, verkstedstøtte og hvordan du profesjonaliserer håndverket.',
};

// Lokal komponentdefinisjon for CtaBlock
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

export default function DuodjiPage() {
  const janAtle = getExpert('jan-atle');

  // MERK: Her bruker vi JSX (HTML) direkte i svarene for å få fet skrift
  const faqDisplayData = [
    { 
        question: "Må jeg betale moms på duodji?", 
        answer: <>Nei, dette er din store fordel! Omsetning av egenprodusert duodji er fritatt for merverdiavgift (<strong>0% utgående moms</strong>), men du har likevel full fradragsrett for inngående moms på utstyr. Dette bedrer din likviditet betraktelig.</>
    },
    { 
        question: "Hvordan kommer jeg inn i Duodjiregisteret?", 
        answer: <>Duodjiregisteret er din inngangsbillett til momsfritak. For driftstilskudd må du i tillegg være godkjent i <strong>Sámi Duodji-merke</strong> ordningen. Kravet er enten fagbrev i duodji, relevant utdanning, eller at du kan dokumentere <strong>realkompetanse</strong> gjennom produkter og utstillinger. Vi kan hjelpe deg å strukturere denne dokumentasjonen.</>
    },
    { 
        question: "Hvor mye må jeg selge for?", 
        answer: <>For å kvalifisere til driftstilskudd er det et omsetningskrav på minimum <McpDataSpan id='duodji-min-omsetning' value='50 000' format='currency' /> kroner fra egenproduksjon. Du må også være registrert og godkjent i <strong>Sámi Duodji-merke</strong> ordningen. Dette må være dokumenterbart salg, ikke hobbyinntekt.</>
    }
  ];

  // Data for Google/SEO (uten HTML-tagger)
  const faqJsonData = [
    { 
        question: "Må jeg betale moms på duodji?", 
        answer: "Nei, dette er din store fordel! Omsetning av egenprodusert duodji er fritatt for merverdiavgift (0% utgående moms), men du har likevel full fradragsrett for inngående moms på utstyr. Dette bedrer din likviditet betraktelig." 
    },
    { 
        question: "Hvordan kommer jeg inn i Duodjiregisteret?", 
        answer: "Duodjiregisteret er din inngangsbillett til momsfritak. For driftstilskudd må du i tillegg være godkjent i Sámi Duodji-merke ordningen. Kravet er enten fagbrev i duodji, relevant utdanning, eller at du kan dokumentere realkompetanse gjennom produkter og utstillinger. Vi kan hjelpe deg å strukturere denne dokumentasjonen." 
    },
    { 
        question: "Hvor mye må jeg selge for?", 
        answer: "For å kvalifisere til driftstilskudd er det et omsetningskrav på minimum 50 000 kroner fra egenproduksjon. Du må også være registrert og godkjent i Sámi Duodji-merke ordningen. Dette må være dokumenterbart salg, ikke hobbyinntekt." 
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
          { '@type': 'ListItem', position: 3, name: 'Duodji', item: 'https://www.averdi.no/kunnskapsbank/sametinget/duodji' },
        ],
      },
    ],
  };

  const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Regnskap for Duodjiutøvere",
      "provider": {
          "@type": "Organization",
          "name": "Averdi"
      },
      "description": "Vi spesialiserer oss på mva-reglene for duodji og hjelper deg med søknader til Sametinget."
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
                Kulturkapital
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">
                Lønnsomt Håndverk: <span className="text-[#E86C1F]">Duodji</span> som Næring
            </h1>
            <p className="text-xl text-slate-700 leading-relaxed">
                Duodji er mer enn tradisjon; det er en <strong>Tilleggsnæring</strong> med unike rammebetingelser. 
                Vi viser deg hvordan du bruker mva-fritaket og tilskuddsordningene som en <strong>Investeringsmotor</strong> for din bedrift.
            </p>
            </div>

            {/* --- EYECATCHER: ØKONOMISKE FORDELER --- */}
            <div className="bg-orange-50 border-l-4 border-[#E86C1F] p-6 rounded-r-xl mb-16 shadow-lg">
            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Del 1: Driftstilskudd */}
                <div className="flex-1">
                <div className="flex items-center gap-3 mb-3 text-orange-900">
                    <Scissors className="w-6 h-6 text-[#E86C1F]" />
                    <h3 className="font-bold text-lg">Driftstilskudd</h3>
                </div>
                <div className="bg-white p-4 rounded-lg border border-orange-100 flex items-center justify-between shadow-sm">
                    <div>
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Status</span>
                    <div className="flex items-baseline gap-1">
                        <span className="font-bold text-xl text-slate-900">Krever Register</span>
                    </div>
                    </div>
                    <div className="text-right">
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Formål</span>
                    <div className="font-bold text-lg text-green-600">Dekke drift</div>
                    </div>
                </div>
                <p className="text-xs text-slate-600 mt-2 font-medium">
                    * Forutsetter opptak i Duodjiregisteret og salg over <McpDataSpan id="duodji-krav-tekst" value="50 000" format="currency"/> kr.
                </p>
                </div>

                {/* Del 2: Investeringer */}
                <div className="flex-1 md:border-l md:border-orange-200 md:pl-8">
                <div className="flex items-center gap-3 mb-3 text-orange-900">
                    <Hammer className="w-6 h-6 text-[#E86C1F]" />
                    <h3 className="font-bold text-lg">Verksted & Utstyr</h3>
                </div>
                <div className="bg-white p-4 rounded-lg border border-orange-100 flex items-center justify-between shadow-sm">
                    <div>
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Maks Støtte</span>
                    <div className="flex items-baseline gap-1">
                        <McpDataSpan 
                        id="sameting-duodji-maks-sats" 
                        value="400 000" 
                        format="currency" 
                        source="Sametinget Duodji"
                        className="font-bold text-2xl text-slate-900" 
                        />
                        <span className="text-sm text-slate-500 font-medium">kr</span>
                    </div>
                    </div>
                    <div className="text-right">
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Dekning</span>
                    <div className="font-bold text-lg text-green-600">Inntil <McpDataSpan id="duodji-dekning" value="40" format="percentage"/></div>
                    </div>
                </div>
                </div>

            </div>
            </div>

            {/* Nøkkelinformasjon Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
                <CheckCircle2 className="text-green-600 w-5 h-5" /> Hvem kan søke?
                </h3>
                <ul className="space-y-3 text-slate-600 text-sm">
                <li>• Enkeltpersonforetak (ENK) eller AS.</li>
                <li>• Du må ha <strong>fagbrev</strong> eller dokumentert realkompetanse.</li>
                <li>• Hovedinntekten bør komme fra egenproduksjon.</li>
                </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
                <ShieldCheck className="text-[#E86C1F] w-5 h-5" /> Sámi Duodji-merket
                </h3>
                <ul className="space-y-3 text-slate-600 text-sm">
                <li>• <strong>Påkrevd</strong> for driftstilskudd fra 2025.</li>
                <li>• Garanterer at produktet er ekte samisk duodji.</li>
                <li>• Krever formell søknad og godkjenning.</li>
                <li>• Gir deg status som profesjonell utøver.</li>
                </ul>
            </div>
            </div>

      {/* Expert Insight - Fokus på MOMS */}
            {janAtle && (
            <ExpertInsight 
                title="Jan-Atles Tips: Moms-fordelen er din margin" 
                quote="Duodji-utøvere har en unik skattefordel: 0% utgående moms, men fullt fradrag på inngående. I praksis betyr det at staten subsidierer verktøyet ditt med 25%, mens du beholder hele salgssummen selv."
                expert={janAtle}
            >
                <p className="text-slate-200">
                Dette er ikke et smutthull, det er en rettighet. Men det krever et <strong>skillet</strong> regnskap. 
                Hvis du selger både egenprodusert kniv (0%) og innkjøpt kaffe (25%), må kassen din håndtere dette korrekt. 
                Feil her kan bli dyrt.
                </p>
            </ExpertInsight>
            )}

            {/* Main Content Sections */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-slate-100 my-16">
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                Profesjonalisering: Fra Hobby til Levebrød
            </h2>
            
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                Sametinget ønsker å løfte duodji fra binæring til hovednæring. Det betyr at du må tenke <strong>Konkurransekraft</strong> og marked. Her er virkemidlene:
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
                <div className="p-5 bg-orange-50 rounded-xl border border-orange-100">
                <div className="flex items-center gap-3 mb-3">
                    <ShoppingBag className="w-6 h-6 text-[#E86C1F]" />
                    <h3 className="font-bold text-slate-900 text-lg">Markedstiltak</h3>
                </div>
                <p className="text-sm text-slate-600 mb-3">
                    Støtte til markedsføring, messer, emballasjedesign og nettbutikk. 
                    Avgjørende for å nå kunder utenfor Sápmi som har høy betalingsvilje.
                </p>
                </div>

                <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                    <Hammer className="w-6 h-6 text-blue-600" />
                    <h3 className="font-bold text-slate-900 text-lg">Verksted</h3>
                </div>
                <p className="text-sm text-slate-600 mb-3">
                    Investering i maskiner (symaskin, laserkutter) og ombygging av lokaler. 
                    Effektiv produksjon er nøkkelen til lønnsomhet.
                </p>
                </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                Dokumentasjon av Kompetanse
            </h3>
            
            <p className="text-slate-700 mb-4">
                I motsetning til "Variert næringsliv", stilles det faglige krav for duodji-støtte. Du må bevise din <strong>Kulturelle trygghet</strong>.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 mb-8 ml-2">
                <li><strong>Fagbrev</strong> i duodji (Gullstandarden).</li>
                <li>Eller: Dokumentert utdanning fra høyskole/universitet.</li>
                <li>Eller: "Realkompetanse" vurdert av opptakskomité (portefølje, utstillinger).</li>
            </ul>

            <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
                <h3 className="font-bold text-yellow-800 flex items-center gap-2 mb-2 text-lg">
                <FileText className="w-5 h-5" /> Varetelling er penger
                </h3>
                <p className="text-sm text-yellow-800 leading-relaxed">
                Varelageret ditt (ferdige produkter og råvarer som skinn/horn) har en skattemessig verdi. 
                Ved årsskiftet <strong>må</strong> dette telles. Mange glemmer at varelageret påvirker resultatet direkte. 
                Vi hjelper deg å sette opp gode rutiner for <strong>Birgejupmi</strong> i regnskapet.
                </p>
            </div>
            </div>

            {/* CTA Component */}
            <LocalCtaBlock
            title="Vil du leve av hendene dine?"
            description="Vi hjelper deg med søknad om opptak i Duodjiregisteret og setter opp et regnskapssystem som håndterer momsfritaket automatisk."
            primaryButtonText="Få hjelp med regnskapet"
            primaryButtonLink="/kontakt"
            secondaryButtonText="Se annen næringsstøtte"
            secondaryButtonLink="/kunnskapsbank/sametinget/naering"
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