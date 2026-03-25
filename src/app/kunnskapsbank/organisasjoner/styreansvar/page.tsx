import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ClipboardList,
  Users,
  ExternalLink,
} from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Styreansvar, årsmøte og protokoll for lag 2026 | Guide for nye styremedlemmer | Averdi Finnmark',
  description:
    'Hva er styrets juridiske ansvar for økonomien? Hva må stå i protokollen? Komplett praktisk guide for nye styremedlemmer i idrettslag i Finnmark og Nord-Troms.',
};

export default function StyreansvarPage() {
  const hildeMarie = getExpert('Hilde-Marie');

  const faqData = [
    {
      question: 'Kan et styremedlem bli personlig ansvarlig for gjeld i laget?',
      answer:
        'Ja, i verste fall. Hvis styret handler uaktsomt – for eksempel ignorerer åpenbare regnskapsfeil, blander privat og lagpenger, eller unnlater å ha intern kontroll – kan hvert enkelt styremedlem bli holdt personlig ansvarlig. God dokumentasjon og en aktiv kontrollkomité er den beste forsikringen.',
    },
    {
      question: 'Hva skjer hvis protokollen mangler underskrifter eller avstemningsresultat?',
      answer:
        'En protokoll uten underskrifter fra møteleder og to protokollunderskrivere, eller uten tydelige avstemningsresultater, kan gjøre vedtakene ugyldige. Det betyr at regnskapet ikke er formelt godkjent, og at valg av styre kan bestrides. Rydd opp med en gang – be de manglende om å signere så snart som mulig.',
    },
    {
      question: 'Når må årsmøtet holdes?',
      answer:
        'Etter NIFs anbefaling bør ordinært årsmøte holdes senest innen utgangen av mars hvert år. Sjekk lagets egne vedtekter – de kan sette en strengere frist. Varsle medlemmene i god tid (minst 2 uker i forveien etter NIF-regler).',
    },
    {
      question: 'Hvem skriver under på protokollen?',
      answer:
        'Møtelederen og to protokollunderskrivere valgt på selve møtet. Det er viktig at underskriverne er valgt av de fremmøtte og at navnene fremgår av protokollen. Styreleder kan ikke være eneste underskriver alene.',
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
          { '@type': 'ListItem', position: 3, name: 'Styreansvar & Årsmøte', item: 'https://www.averdi.no/kunnskapsbank/organisasjoner/styreansvar' },
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
            For Nye Styremedlemmer
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Styreansvar, årsmøte og protokoll –{' '}
            <span className="text-green-600">Viktig for nye styremedlemmer!</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Mange nye styremedlemmer i idrettslag i Finnmark og Nord-Troms tenker: «Hva er mitt
            ansvar egentlig? Hva må stå i protokollen for at alt skal være i orden?» Styret har
            det overordnede ansvaret for økonomien – også hvis kassereren gjør en feil. Her er
            den praktiske guiden for 2026, så dere kan føle dere trygge.
          </p>
        </div>

        {/* Advarselsboks – personlig ansvar */}
        <div className="mb-14 bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0 text-amber-600">
            <ShieldAlert className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-bold text-amber-800 text-lg">Personlig ansvar – ta det på alvor</p>
            <p className="text-amber-700 mt-1 text-sm leading-relaxed">
              Hvis styret er uaktsomt kan hvert enkelt styremedlem i verste fall bli personlig
              ansvarlig for gjeld eller feil. God dokumentasjon er den beste forsikringen.
            </p>
          </div>
        </div>

        {/* Seksjon 1 – Styrets ansvar */}
        <section className="mb-12" aria-labelledby="ansvar-heading">
          <h2
            id="ansvar-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              1
            </span>
            Styrets ansvar for økonomien
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <p className="text-slate-600 mb-5">
              Styret – ikke bare kassereren – har det juridiske og praktiske ansvaret for:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'At regnskapet er riktig og fullstendig',
                'At budsjett vedtas og følges opp gjennom året',
                'At alle tilskudd og momskompensasjon søkes og rapporteres',
                'At penger ikke blandes med private kontoer',
                'At det finnes intern kontroll (f.eks. kontrollkomité)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2
                    className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <strong>Personlig ansvar:</strong> Hvis styret er uaktsomt kan dere i verste fall bli
              personlig ansvarlig for gjeld eller feil. Derfor er god dokumentasjon gull.
            </div>
          </div>
        </section>

        {/* Seksjon 2 – Årsmøtet */}
        <section className="mb-12" aria-labelledby="arsmote-heading">
          <h2
            id="arsmote-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              2
            </span>
            Årsmøtet – hva må skje
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="flex items-start gap-3 mb-6 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
              <Users className="w-5 h-5 shrink-0 mt-0.5 text-green-600" aria-hidden="true" />
              <p>
                Årsmøtet er lagets høyeste organ og må gjennomføres hvert år – senest innen
                utgangen av mars (anbefalt NIF-frist). Varsle medlemmene minst 2 uker i forveien.
              </p>
            </div>

            <p className="text-slate-600 mb-5 font-medium">
              Obligatoriske saker på agendaen:
            </p>
            <ul className="space-y-3">
              {[
                'Godkjenning av årsregnskap og årsberetning',
                'Vedtak av budsjett for neste år',
                'Valg av styre, kontrollkomité og revisor (hvis nødvendig)',
                'Eventuelle endringer i vedtekter',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <ClipboardList
                    className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Expert Insight */}
        {hildeMarie && (
          <ExpertInsight
            title="Styremedlemmer kan holdes personlig ansvarlig"
            quote="Mange nye styremedlemmer tror rollen er å 'hjelpe til'. Men et styremedlem som godkjenner en forpliktelse laget ikke kan innfri, kan stå personlig ansvarlig for det. Det er viktig kunnskap fra dag én."
            expert={hildeMarie}
          >
            <p>
              Vi hjelper dere med å forberede hele pakken: regnskap, årsberetning, budsjett, og
              en protokollmal tilpasset lagets størrelse. Møtet blir ryddig og trygt – og dere
              slipper å lure på om alt er gjort riktig etterpå.
            </p>
          </ExpertInsight>
        )}

        {/* Seksjon 3 – Protokoll */}
        <section className="mb-12 mt-12" aria-labelledby="protokoll-heading">
          <h2
            id="protokoll-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              3
            </span>
            Årsmøteprotokoll – hva må stå der
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <p className="text-slate-600 mb-5">
              Protokollen er det offisielle dokumentet som viser at alt er gjort riktig. Den må
              minst inneholde:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Dato, sted, tidspunkt og hvem som var til stede (oppmøteprotokoll)',
                'Agenda og hvilke saker som ble behandlet',
                'Resultat av alle avstemninger (antall for, imot og blanke)',
                'Vedtak om godkjenning av regnskap og budsjett',
                'Valgresultat – navn på ny styreleder, kasserer, kontrollkomité osv.',
                'Underskrifter fra møteleder og to protokollunderskrivere',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2
                    className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
              <strong>Tips:</strong> Bruk NIFs mal for årsmøteprotokoll – tilgjengelig på
              idrettsforbundet.no under Klubbguiden → Årsmøtemaler.
            </div>
          </div>
        </section>

        {/* Seksjon 4 – Praktiske eksempler */}
        <section className="mb-12" aria-labelledby="eksempler-heading">
          <h2
            id="eksempler-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              4
            </span>
            Praktiske eksempler for lag i nord
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Lite lag – Karasjok
              </p>
              <p className="text-slate-700 leading-relaxed text-sm">
                18 medlemmer på årsmøtet. Protokoll på 1 side – kort og greit. Alt godkjent på
                45 minutter. Kassereren presenterte regnskapet muntlig, kontrollkomitéen bekreftet.
                Ingen innsigelser.
              </p>
              <div className="mt-3 flex items-center gap-2 text-green-600 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                Gjennomført uten hjelp utenfra
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Mellomstort lag – Hammerfest
              </p>
              <p className="text-slate-700 leading-relaxed text-sm">
                Styret la frem regnskap + budsjett + forslag til ny kontrollkomité. Protokoll med
                bilag (regnskapet) sendt ut i forkant. Ingen spørsmål under møtet – alle var
                forberedt.
              </p>
              <div className="mt-3 flex items-center gap-2 text-green-600 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                Averdi forberedte dokumentasjonen
              </div>
            </div>
          </div>
        </section>

        {/* Seksjon 5 – Vanlige feil */}
        <section className="mb-16" aria-labelledby="feil-heading">
          <h2
            id="feil-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              5
            </span>
            Vanlige feil vi ser hos lag i nord – og hvordan unngå dem
          </h2>

          <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-8 space-y-4">
            {[
              {
                feil: 'Protokoll mangler underskrifter eller avstemningsresultat',
                fix: 'Ugyldig protokoll = ugyldig årsmøte. Velg alltid to protokollunderskrivere på møtet og sørg for at alle stemmetall er notert.',
              },
              {
                feil: 'Regnskap godkjennes uten at kontrollkomitéen har gått gjennom det',
                fix: 'Kontrollkomitéens beretning skal foreligge skriftlig og legges frem for møtet før avstemning.',
              },
              {
                feil: 'Budsjett vedtas ikke på årsmøtet',
                fix: 'Budsjett er obligatorisk sak. Styret driver uten mandat hvis budsjettet ikke er vedtatt av lagets høyeste organ.',
              },
              {
                feil: 'Styret blander privat- og lagregnskap',
                fix: 'Lagets konto skal kun brukes til lagets formål. Separat konto og klar fullmaktsmatrise er minimumskrav.',
              },
              {
                feil: 'Ingen fullmaktsmatrise – hvem har lov til å signere hva?',
                fix: 'Vedta skriftlig hvem som kan godkjenne utbetalinger, inngå kontrakter og signere på vegne av laget. To signaturer kreves over et visst beløp.',
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
            <strong>Klar til årsmøte?</strong> Start planleggingen allerede i januar – da blir
            mars-møtet en drøm.
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 md:p-10 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Vil dere ha hjelp med styreansvar, protokoll og hele årsmøte-forberedelsen?
          </h2>
          <p className="text-green-100 mb-2 max-w-2xl mx-auto">
            Vi i Averdi hjelper med regnskap, årsberetning, budsjett, protokoll og gjennomgang
            med kontrollkomitéen. Vi sørger for at alt er 100&nbsp;% korrekt og at dere nye
            styremedlemmer føler dere trygge.
          </p>
          <p className="text-green-200 text-sm mb-8 max-w-xl mx-auto">
            Første gjennomgang og maler er gratis for nye lag.
          </p>
          <Link
            href="/kontakt?subject=Styreansvar+og+årsmøte"
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
              <p>Basert på NIFs Lovnorm for idrettslag, Idrettsforbundets Klubbguide for styrearbeid og norsk foreningsrett om styreansvar og protokollkrav.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a href="https://www.idrettsforbundet.no/klubbguiden" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                idrettsforbundet.no <span className="sr-only">(åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
              <a href="https://lovdata.no/dokument/NL/lov/1998-06-26-41" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                Idrettsloven – lovdata.no <span className="sr-only">(åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

      </article>
    </main>
  );
}
