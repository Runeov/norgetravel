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
  description: 'NorgeTravel is an independent editorial platform connecting international travellers with the best sustainable operators in Norway — Northern Lights tours, fjord cruises, and remote wilderness stays.',
  openGraph: {
    title: 'About NorgeTravel.com',
    description: 'The honest guide to Arctic Norway. Expert local knowledge, realistic logistics, and zero brochure-speak.',
    type: 'website',
  },
};

export default async function OmOssPage() {
  const employees = await getSortedEmployees();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': 'About NorgeTravel.com',
    'description': 'Independent editorial platform for authentic Norwegian travel experiences.',
    'url': 'https://norgetravel.com/om-oss',
    'mainEntity': {
      '@type': 'TravelAgency',
      'name': 'NorgeTravel.com',
      'url': 'https://norgetravel.com',
      'areaServed': ['Norway', 'Svalbard'],
      'slogan': 'The Real Norway, Unfiltered',
    }
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AboutHero />
      <CompanyStory />

      {/* Mid-CTA */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Planning a trip to Norway?
          </h2>
          <p className="text-slate-600 mb-8">
            We map the best operators so you don&apos;t have to. Northern Lights, fjord cruises, trekking, and remote cabins — all vetted, all honest.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-full hover:shadow-lg hover:shadow-[#1B3A5C]/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            Start Planning
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <CompanyValues />
      <TeamSectionModern employees={employees} />
      <ContactPanel />
    </main>
  );
}
