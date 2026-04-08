import Hero from '@/components/modules/home/Hero';
import EditorialPromise from '@/components/modules/home/EditorialPromise';
import ZoneExperts from '@/components/modules/home/ZoneExperts';
import SustainableTravel from '@/components/modules/home/SustainableTravel';
import DestinationsTeaser from '@/components/modules/home/DestinationsTeaser';
import ContactPanel from '@/components/modules/home/ContactPanel';
import { getSiteUrl } from '@/lib/site-url';

export default function HomePage() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    'name': 'NorgeTravel.com',
    'image': `${siteUrl}/norgeTravel.png`,
    'description': 'Sustainable Arctic adventure guides for Norway. Five zone experts covering Northern Lights tours, zero-emission fjord cruises, luxury trekking, and remote cabin stays.',
    'slogan': 'The Real Norway, Unfiltered',
    'url': siteUrl,
    'email': 'hello@norgetravel.com',
    'areaServed': [
      { '@type': 'Country', 'name': 'Norway' },
      { '@type': 'City', 'name': 'Tromsø' },
      { '@type': 'City', 'name': 'Lofoten' },
      { '@type': 'Place', 'name': 'Svalbard' },
      { '@type': 'Place', 'name': 'Geirangerfjord' },
      { '@type': 'Place', 'name': 'Nærøyfjord' },
    ],
    'knowsAbout': [
      'Northern Lights tours Tromsø 2026',
      'Solar Cycle 25 aurora viewing',
      'Zero-emission fjord cruises Norway',
      'Hurtigruten Northern Lights Guarantee',
      'Havila Voyages electric cruising',
      'Lofoten trekking Norrøna',
      'Svalbard Arctic expeditions',
      'Norwegian remote cabin stays hytter',
      'Sustainable travel Norway 2026',
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

      <Hero />
      <EditorialPromise />
      <ZoneExperts />
      <SustainableTravel />
      <DestinationsTeaser />
      <ContactPanel />
    </main>
  );
}
