import Hero from '@/components/modules/home/Hero';
import TrustStrip from '@/components/modules/home/TrustStrip';
import Services from '@/components/modules/home/Services';
import SalesPitch from '@/components/modules/home/SalesPitch';
import TravelGuideTeaser from '@/components/modules/home/KunnskapsbankTeaser';
import ContactPanel from '@/components/modules/home/ContactPanel';
import { getSiteUrl } from '@/lib/site-url';

export default function HomePage() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    'name': 'NorgeTravel.com',
    'image': `${siteUrl}/logo_norgetravel.png`,
    'description': 'Sustainable Arctic adventure guides for Norway — Northern Lights tours in Tromsø, zero-emission fjord cruises, luxury trekking in Lofoten and Svalbard, and remote cabin stays.',
    'slogan': 'Sustainable Arctic Adventures',
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
      'Arctic nomad digital nomad Norway',
      'Sustainable travel Norway 2026',
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Norway Travel Experiences',
      'itemListElement': [
        { '@type': 'Offer', 'itemOffered': { '@type': 'TouristTrip', 'name': 'Northern Lights Tours Tromsø' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'TouristTrip', 'name': 'Zero-Emission Fjord Cruises' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'TouristTrip', 'name': 'Arctic Trekking Lofoten & Svalbard' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'LodgingBusiness', 'name': 'Remote Cabin Stays (Hytter)' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'TouristTrip', 'name': 'Arctic Nomad Digital Nomad Packages' } },
      ],
    },
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
      <TrustStrip />
      <Services />
      <SalesPitch />
      <TravelGuideTeaser />
      <ContactPanel />
    </main>
  );
}
