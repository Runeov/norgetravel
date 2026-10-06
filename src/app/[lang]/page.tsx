import Hero from '@/components/modules/home/Hero';
import EditorialPromise from '@/components/modules/home/EditorialPromise';
import ZoneExperts from '@/components/modules/home/ZoneExperts';
import SustainableTravel from '@/components/modules/home/SustainableTravel';
import DestinationsTeaser from '@/components/modules/home/DestinationsTeaser';
import ContactPanel from '@/components/modules/home/ContactPanel';
import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/site-url';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSeason, SEASON_HOME_META } from '@/lib/season';
import { asLocale, brandTitle, localeAlternates } from '@/lib/i18n-seo';
import { HOME_COPY } from '@/i18n/home-copy';

// Re-render daily so the seasonal hero and metadata switch on the boundary dates
export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const meta = SEASON_HOME_META[getSiteSeason()][asLocale(lang)];
  return { title: brandTitle(meta.title, lang), description: meta.description, alternates: localeAlternates('', lang) };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLocale((await params).lang);
  const copy = HOME_COPY[lang];
  const dict = await getDictionary(lang);
  const siteUrl = getSiteUrl();
  const season = getSiteSeason();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    'name': 'NorgeTravel.com',
    'alternateName': ['Norge Travel', '挪威旅行', 'ノルウェー旅行'],
    'image': `${siteUrl}/norgeTravel.jpg`,
    'description': 'Sustainable Arctic adventure guides for Norge. Five zone experts covering Northern Lights tours, zero-emission fjord cruises, luxury trekking, and remote cabin stays.',
    'slogan': 'The Real Norge, Unfiltered',
    'url': siteUrl,
    'email': 'hello@norgetravel.com',
    'areaServed': [
      { '@type': 'Country', 'name': 'Norge' },
      { '@type': 'City', 'name': 'Tromsø' },
      { '@type': 'City', 'name': 'Lofoten' },
      { '@type': 'Place', 'name': 'Svalbard' },
      { '@type': 'Place', 'name': 'Geirangerfjord' },
      { '@type': 'Place', 'name': 'Nærøyfjord' },
    ],
    'knowsAbout': [
      'Northern Lights tours Tromsø 2026',
      'Solar Cycle 25 aurora viewing',
      'Zero-emission fjord cruises Norge',
      'Hurtigruten Northern Lights Guarantee',
      'Havila Voyages electric cruising',
      'Lofoten trekking Norrøna',
      'Svalbard Arctic expeditions',
      'Norwegian remote cabin stays hytter',
      'Sustainable travel Norge 2026',
      'Fjellvettreglene mountain safety',
      'Allemannsretten right to roam',
    ],
    'hasCredential': ['NHO Reiseliv', 'Miljøfyrtårn (Eco-Lighthouse)'],
    'sameAs': [
      'https://norgetravel.com',
    ],
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero dict={dict.home} copy={copy.hero} season={season} />
      <EditorialPromise copy={copy.editorial} />
      <ZoneExperts copy={copy.experts} />
      <SustainableTravel copy={copy.sustainable} />
      <DestinationsTeaser copy={copy.destinations} season={season} />
      <ContactPanel copy={copy.contact} />
    </main>
  );
}
