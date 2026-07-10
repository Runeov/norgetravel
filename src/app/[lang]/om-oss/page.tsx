import { Metadata } from 'next';
import { getSortedEmployees } from '@/lib/admin/employees';
import AboutHero from '@/components/modules/about/AboutHero';
import CompanyStory from '@/components/modules/about/CompanyStory';
import TeamSectionModern from '@/components/modules/about/TeamSectionModern';
import CompanyValues from '@/components/modules/about/CompanyValues';
import ContactPanel from '@/components/modules/home/ContactPanel';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About NorgeTravel | The Honest Guide to Arctic Norway',
  description: 'NorgeTravel is an independent editorial platform connecting international travellers with the best sustainable operators in Norway. Five zone experts, five basecamps, zero brochure-speak.',
  openGraph: {
    title: 'About NorgeTravel.com',
    description: 'The honest guide to Arctic Norway. Five zone experts with decades of local experience. Honest logistics, real safety data, and zero brochure-speak.',
    type: 'website',
  },
};

export default async function OmOssPage() {
  const employees = await getSortedEmployees();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': 'About NorgeTravel.com',
    'description': 'Independent editorial platform for authentic Norwegian travel experiences. Five zone experts covering Fjord Norway, the Arctic, the High Peaks, Urban Hubs, and the Working Coast.',
    'url': 'https://norgetravel.com/om-oss',
    'mainEntity': {
      '@type': 'TravelAgency',
      'name': 'NorgeTravel.com',
      'url': 'https://norgetravel.com',
      'areaServed': ['Norway', 'Svalbard'],
      'slogan': 'The Real Norway, Unfiltered',
      'employee': employees.map((e) => ({
        '@type': 'Person',
        'name': e.name,
        'jobTitle': e.role,
        'workLocation': {
          '@type': 'Place',
          'name': e.office,
          'address': { '@type': 'PostalAddress', 'addressCountry': 'NO' },
        },
      })),
    },
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AboutHero />
      <CompanyStory />
      <TeamSectionModern employees={employees} />

      {/* Mid-CTA */}
      <section className="py-14 bg-white">
        <div className="max-w-2xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Planning a trip to Norway?
          </h2>
          <p className="text-slate-600 mb-8">
            We map the best operators so you don&apos;t have to. Northern Lights, fjord cruises, trekking, and remote cabins. All vetted, all honest.
          </p>
          <a
            href="/travel"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 min-h-[44px]"
          >
            Start planning
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <CompanyValues />
      <ContactPanel />
    </main>
  );
}
