import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Smartphone,
  Banknote,
  CreditCard,
  ExternalLink,
} from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Regnskap ved arrangementer, kiosk & billett 2026 | Guide for idrettslag i nord | Averdi Finnmark',
  description:
    'Kiosk-salg, billettsalg og cup: slik bokfører dere alt riktig fra første krone. Vipps + kontant + kort, MVA-regler for frivillige og eksempler fra lag i nord.',
};

export default function ArrangementerPage() {
  const alida = getExpert('alida');

  const faqData = [
    {
      question: 'Trenger vi å bokføre kiosksalg selv om beløpene er små?',
      answer:
        'Ja. Alle inntekter og utgifter i laget skal inn i regnskapet – uansett beløp. Manglende bokføring av kiosk- og kontantinntekter er en av de vanligste grunnene til at momskompensasjonssøknader avvises eller gir lavere utbetaling.',
    },
    {
      question: 'Er kiosksalg og billettsalg momspliktig for idrettslag?',
      answer:
        'Som hovedregel nei – kiosk og billettsalg basert på frivillig innsats er momsfritt. Unntaket er hvis dere selger varer over 50 000 kr i omsetning per år på samme arrangementstype. Da kan momsplikt slå inn. Ta kontakt med oss hvis dere nærmer dere denne grensen.',
    },
    {
      question: 'Hva gjør vi hvis vi har blandet kontant og Vipps i kassa?',
      answer:
        'Tell opp kontantene og sammenlign med Vipps-rapporten fra appen. Bokfør de to separat: kontant som én post og Vipps som en annen. Er det differanse, noter beløpet og årsak. Sett alltid inn kontanter på lagets konto innen uken er omme.',
    },
    {
      question: 'Kan vi bruke Vipps til billettsalg på arrangement?',
      answer:
        'Ja, og det er den enkleste løsningen. Lag en Vipps-betalingslenke for billettprisen og del den på Facebook, Spond eller i innbydelsen. Alle transaksjoner logges automatisk i Vipps-appen, noe som gjør bokføringen svært enkel etterpå.',
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
          { '@type': 'ListItem', position: 3, name: 'Arrangementer & Kiosk', item: 'https://www.averdi.no/kunnskapsbank/organisasjoner/arrangementer' },
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

        <Link
          href="/kunnskapsbank/organisasjoner"
          className="inline-flex items-center text-slate-500 hover:text-green-600 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Tilbake til Forenings-hub
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            For Kasserere & Kasseansvarlige
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Regnskap ved arrangementer, kiosk & billett –{' '}
            <span className="text-green-600">Sånn unngår dere rot i kassa!</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Kiosk under cup, billettsalg på hjemmekamp eller pølse og vaffel på vinterleir –
            arrangementer er gull for idrettslag i Finnmark og Nord-Troms. Men uten riktig
            regnskap blir det fort rot: hvor ble det av de 8&nbsp;450 kronene fra kiosken i helga?
          </p>
          <p className="text-xl text-slate-600 leading-relaxed mt-3">
            Her er den komplette guiden for 2026: hvordan dere bokfører alt riktig, holder
            oversikt og slipper stress før årsregnskapet.
          </p>
        </div>

        {/* Seksjon 1 – Hva teller */}
        <section className="mb-12" aria-labelledby="hva-heading">
          <h2
            id="hva-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              1
            </span>
            Hva teller som «arrangement» i regnskapet?
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <p className="text-slate-600 mb-5">
              Alt som gir inntekter eller utgifter utenom vanlig trening:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Kiosk-salg', detalj: 'Pølse, brus, vaffel, kaffe' },
                { label: 'Billettsalg', detalj: 'Kamp, turnering, fest' },
                { label: 'Cup/leir', detalj: 'Med påmelding og deltakeravgift' },
                { label: 'Sponsorboder/lotteri', detalj: 'Inntekter fra stands og trekning' },
              ].map(({ label, detalj }) => (
                <div key={label} className="flex items-start gap-3 bg-slate-50 rounded-xl p-4">
                  <CheckCircle2
                    className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{label}</p>
                    <p className="text-slate-500 text-sm">{detalj}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <strong>Husk:</strong> Alt skal inn i regnskapet – selv om det er små beløp.
              Mangler en post, kan det koste dere penger på momskompensasjonssøknaden.
            </div>
          </div>
        </section>

        {/* Seksjon 2 – Kiosk-bokføring */}
        <section className="mb-12" aria-labelledby="kiosk-heading">
          <h2
            id="kiosk-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              2
            </span>
            Slik bokfører dere kiosk-salg (enkelt og riktig)
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <p className="text-slate-700 font-semibold mb-4">Daglig rutine:</p>
            <ol className="space-y-4 mb-8">
              {[
                'Start med null i kassa – tell opp kontanter før åpning.',
                'Bruk Vipps-nummer + kontant + kortterminal.',
                'Avslutt kassa hver dag/kveld: tell kontanter + sjekk Vipps-transaksjoner.',
                'Bokfør i regnskapet samme kveld eller neste dag.',
              ].map((steg, i) => (
                <li key={i} className="flex gap-4">
                  <span className="w-7 h-7 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-slate-700">{steg}</p>
                </li>
              ))}
            </ol>

            <p className="text-slate-700 font-semibold mb-3">Kontoer å bruke (standard for lag):</p>
            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm">
                <p className="font-semibold text-green-800 mb-1">Inntekter → 3000-serien</p>
                <p className="text-green-700">F.eks. konto 3050 Kioskinntekter</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm">
                <p className="font-semibold text-slate-800 mb-1">Utgifter → 4000-serien</p>
                <p className="text-slate-600">F.eks. konto 4010 Innkjøp kioskvarer</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
              <strong>Proff-tips:</strong> Lag en enkel Excel-mal som dere fyller ut på mobilen.
              Ha én person som er «kasseansvarlig» på hvert arrangement – det gjør bokføringen
              mye enklere.
            </div>
          </div>
        </section>

        {/* Seksjon 3 – Billettsalg */}
        <section className="mb-12" aria-labelledby="billett-heading">
          <h2
            id="billett-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              3
            </span>
            Billettsalg – digitalt er best
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-3">
            {[
              { tekst: 'Bruk Vipps billettsalg eller Spond-billett – alt er digitalt og sporbart.' },
              { tekst: 'Alternativ: fysiske billetter + Vipps-betaling ved inngang.' },
              { tekst: 'Bokfør som «Billettinntekter» på konto 3020.' },
              { tekst: 'Husk å føre antall solgte billetter – nyttig for årsberetningen.' },
            ].map(({ tekst }) => (
              <div key={tekst} className="flex items-start gap-3">
                <CheckCircle2
                  className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-slate-700">{tekst}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Expert Insight */}
        {alida && (
          <ExpertInsight
            title="Avslutt kassa samme kveld – alltid"
            quote="Den vanligste feilen er å legge det til neste dag. Neste dag er det ny cup, nye folk, og pengene fra i går er plutselig umulig å spore. En fast rutine på 10 minutter sparer dere for timer med graving i ettertid."
            expert={alida}
          >
            <p>
              Vi setter opp enkle kassemaler tilpasset lagets arrangement – enten det er en
              vintercup i Karasjok eller en bortekamp i Tromsø. Kobler vi Vipps direkte til
              regnskapssystemet, er kiosken ferdig bokført før dere pakker ned teltet.
            </p>
          </ExpertInsight>
        )}

        {/* Seksjon 4 – Vipps + kontant + kort */}
        <section className="mb-12 mt-12" aria-labelledby="betaling-heading">
          <h2
            id="betaling-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              4
            </span>
            Vipps + kontant + kort – kombinasjonen som funker
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                ikon: Smartphone,
                tittel: 'Vipps',
                tekst: 'Koble direkte til regnskapet. Alle transaksjoner er automatisk logget – ingen manuell telling.',
                farge: 'bg-green-50 border-green-200 text-green-700',
                ikonFarge: 'text-green-600 bg-green-100',
              },
              {
                ikon: Banknote,
                tittel: 'Kontant',
                tekst: 'Tell og sett inn på lagets konto samme uke. Aldri bland med private penger.',
                farge: 'bg-slate-50 border-slate-200 text-slate-700',
                ikonFarge: 'text-slate-600 bg-slate-100',
              },
              {
                ikon: CreditCard,
                tittel: 'Kortterminal',
                tekst: 'Terminalen gir dagsrapport. Bokfør totalbeløpet – enkelt og presist.',
                farge: 'bg-blue-50 border-blue-200 text-blue-700',
                ikonFarge: 'text-blue-600 bg-blue-100',
              },
            ].map(({ ikon: Ikon, tittel, tekst, farge, ikonFarge }) => (
              <div
                key={tittel}
                className={`rounded-2xl border-2 p-6 ${farge.split(' ').slice(0, 2).join(' ')} bg-white`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${ikonFarge}`}
                >
                  <Ikon className="w-5 h-5" aria-hidden="true" />
                </div>
                <p className="font-bold text-slate-900 mb-2">{tittel}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{tekst}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
            <strong>Regional bonus for nord:</strong> I kulda på Finnmarksvidda eller Nord-Troms
            er Vipps redningen – folk vil ikke fumle med kontanter i minus 15 grader!
          </div>
        </section>

        {/* Seksjon 5 – MVA */}
        <section className="mb-12" aria-labelledby="mva-heading">
          <h2
            id="mva-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              5
            </span>
            MVA-regler for frivillige – dere slipper ofte moms
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-4">
            {[
              {
                tittel: 'Kiosk-salg av mat og drikke',
                tekst: 'Ingen moms hvis det er frivillig innsats og ikke næringsvirksomhet – vanlig for idrettslag.',
                ok: true,
              },
              {
                tittel: 'Billettsalg',
                tekst: 'Også momsfritt for frivillige lag som hovedregel.',
                ok: true,
              },
              {
                tittel: 'Unntak: høy omsetning',
                tekst: 'Hvis dere selger varer over 50 000 kr i omsetning per år på samme arrangementstype, kan momsplikt slå inn. Sjekk med oss.',
                ok: false,
              },
            ].map(({ tittel, tekst, ok }) => (
              <div key={tittel} className="flex items-start gap-3">
                {ok ? (
                  <CheckCircle2
                    className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                ) : (
                  <AlertTriangle
                    className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                )}
                <div>
                  <p className="font-semibold text-slate-800">{tittel}</p>
                  <p className="text-slate-600 text-sm mt-0.5">{tekst}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seksjon 6 – Praktiske tips */}
        <section className="mb-12" aria-labelledby="tips-heading">
          <h2
            id="tips-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              6
            </span>
            Praktiske tips for lag i nord
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                tittel: 'Arrangementsmappe',
                tekst: 'Lag én mappe per cup/leir i regnskapet. Da finner du tallene igjen om et år.',
              },
              {
                tittel: 'Spond eller MinIdrett',
                tekst: 'Bruk digitale plattformer for påmelding og betaling – alt er loggført fra start.',
              },
              {
                tittel: 'Kvittering til alle',
                tekst: 'Ha med kvitteringsskriver eller send Vipps-kvittering. Bilag kreves i regnskapet.',
              },
              {
                tittel: 'Avstem kassa hver kveld',
                tekst: 'Aldri la kasseavstemming ligge til neste uke – da er minnene borte og tallene usikre.',
              },
            ].map(({ tittel, tekst }) => (
              <div key={tittel} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-start gap-3">
                  <Receipt className="w-5 h-5 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-slate-900">{tittel}</p>
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">{tekst}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seksjon 7 – Eksempler */}
        <section className="mb-16" aria-labelledby="eksempler-heading">
          <h2
            id="eksempler-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              7
            </span>
            Eksempler for lag i nord
          </h2>

          <div className="space-y-4">
            {[
              {
                tittel: 'Kiosk på vintercup i Alta',
                detaljer: [
                  'Inntekter: 12 450 kr (Vipps 8 200 kr + kontant 4 250 kr)',
                  'Utgifter: Innkjøp pølser/brus 3 800 kr',
                ],
                resultat: 'Bokført som kioskinntekt 12 450 kr og varekostnad 3 800 kr. Overskudd 8 650 kr rett inn i klubbkassa.',
                farge: 'border-green-200',
              },
              {
                tittel: 'Billettsalg hjemmekamp – Tromsø',
                detaljer: [
                  '350 billetter à 100 kr = 35 000 kr (alt via Vipps)',
                ],
                resultat: 'Bokført på én post: «Billettinntekter kamp 15.03». Klar til årsregnskap på 2 minutter.',
                farge: 'border-blue-200',
              },
              {
                tittel: 'Leir med kiosk – Karasjok',
                detaljer: [
                  'Samisk lag: Vipps + kontant = 18 000 kr inn',
                ],
                resultat: 'Bokført med notat «Leir 2026 – kiosk». Perfekt for Sameting-rapportering.',
                farge: 'border-amber-200',
              },
            ].map(({ tittel, detaljer, resultat, farge }) => (
              <div
                key={tittel}
                className={`bg-white rounded-2xl border-2 ${farge} shadow-sm p-6`}
              >
                <p className="font-bold text-slate-900 mb-3">{tittel}</p>
                <ul className="space-y-1 mb-3">
                  {detaljer.map((d) => (
                    <li key={d} className="text-slate-600 text-sm flex items-start gap-2">
                      <span className="text-slate-400 shrink-0">→</span> {d}
                    </li>
                  ))}
                </ul>
                <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-2 text-sm text-green-800">
                  {resultat}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vanlige feil */}
        <section className="mb-16" aria-labelledby="feil-heading">
          <h2
            id="feil-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              8
            </span>
            Vanlige feil vi ser hos lag i nord – og hvordan unngå dem
          </h2>

          <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-8 space-y-4">
            {[
              {
                feil: 'Blandet privatpenger i kassa («jeg lånte 500 kr»)',
                fix: 'Aldri. Ikke engang midlertidig. Bruk lagets egen betaling eller legg ut og lever kvittering til kasserer.',
              },
              {
                feil: 'Glemt å telle kassa ved slutt',
                fix: 'Sett alarm på mobilen: «Tell kassa 21:00». Uten avsluttelling har dere ingenting å bokføre mot.',
              },
              {
                feil: 'Vipps-transaksjoner ikke bokført samme dag',
                fix: 'Åpne Vipps-appen og eksporter dagens rapport før dere forlater arrangementet.',
              },
              {
                feil: 'Ikke skilt kioskinntekt fra billettinntekt',
                fix: 'Bruk separate kontoer (3050 kiosk, 3020 billett) – da er momskompensasjonssøknaden mye enklere.',
              },
              {
                feil: 'Glemmer å føre innkjøp av kioskvarer',
                fix: 'Ta bilde av kvitteringen med en gang dere kjøper inn. Legg den i arrangement-mappen.',
              },
            ].map(({ feil, fix }) => (
              <div key={feil} className="flex items-start gap-3">
                <AlertTriangle
                  className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-slate-800">{feil}</p>
                  <p className="text-slate-600 text-sm mt-0.5">{fix}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
            <strong>Klar til neste arrangement?</strong> Lag en enkel sjekkliste og del den med
            kasserer og dugnadsgjengen – da blir det både gøy og riktig.
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 md:p-10 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Vil dere ha hjelp med kiosk-regnskap, Vipps-oppsett og alt annet?
          </h2>
          <p className="text-green-100 mb-2 max-w-2xl mx-auto">
            Vi i Averdi tar over hele regnskapet ved arrangementer. Vi setter opp enkle maler,
            kobler Vipps og sørger for at alt er 100&nbsp;% korrekt – uten rot. Vi kjenner
            nordnorske cuper og leirer bedre enn noen andre.
          </p>
          <p className="text-green-200 text-sm mb-8 max-w-xl mx-auto">
            Første oppsett og gjennomgang er gratis for nye lag.
          </p>
          <Link
            href="/kontakt?subject=Arrangementregnskap+hjelp"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-green-700 font-bold rounded-full hover:bg-green-50 transition-colors"
          >
            Ta kontakt nå
            <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
          </Link>
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
              <p>Basert på Skatteetatens MVA-regler for frivillige organisasjoner, NIFs retningslinjer for arrangementsregnskap og Lotteri- og stiftelsestilsynets veileder for momskompensasjon.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a href="https://www.skatteetaten.no/bedrift-og-organisasjon/avgifter/mva/frivillige-organisasjoner" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                skatteetaten.no <span className="sr-only">(åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
              <a href="https://www.idrettsforbundet.no/klubbguiden" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                idrettsforbundet.no <span className="sr-only">(åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

      </article>
    </main>
  );
}
