import { Metadata } from 'next';
import { getSortedEmployees } from '@/lib/admin/employees';
import AboutHero from '@/components/modules/about/AboutHero';
import CompanyStory from '@/components/modules/about/CompanyStory';
import TeamSectionModern from '@/components/modules/about/TeamSectionModern';
import CompanyValues from '@/components/modules/about/CompanyValues';
import ContactPanel from '@/components/modules/home/ContactPanel';

export const metadata: Metadata = {
  title: 'Om oss | Averdi AS - Regnskapsfører i Finnmark og Nord-Troms',
  description: 'Statsautoriserte regnskapsførere med over 35 års erfaring i Finnmark. Vi er regnskapsfører for små og mellomstore bedrifter i Finnmark og Nord-Troms, med skybasert regnskap og personlig oppfølging.',
  openGraph: {
    title: 'Om oss | Averdi AS',
    description: 'Statsautoriserte regnskapsførere med over 35 års erfaring i Finnmark og Nord-Troms.',
    type: 'website',
  },
};

export default async function OmOssPage() {
  const employees = await getSortedEmployees();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': 'Om Averdi AS',
    'description': 'Statsautorisert regnskapsførerselskap etablert i 1989, spesialisert på nordnorsk næringsliv og samiske organisasjoner.',
    'url': 'https://averdi.no/om-oss',
    'mainEntity': {
      '@type': 'AccountingService',
      'name': 'Averdi AS',
      'foundingDate': '1989',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Juhána Rásttoš geaidnu 2',
        'addressLocality': 'Karasjok',
        'postalCode': '9730',
        'addressCountry': 'NO'
      },
      'telephone': '+47 78 46 61 16',
      'areaServed': ['Finnmark', 'Troms', 'Nord-Norge']
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
            Vil du vite om vi passer for deg?
          </h2>
          <p className="text-slate-600 mb-8">
            Book et møte. Du får en konkret vurdering av hvordan vi kan forbedre regnskapet ditt.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#E86C1F] to-[#F4B223] rounded-full hover:shadow-lg hover:shadow-[#E86C1F]/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            Bestill møte
          </a>
        </div>
      </section>

      <CompanyValues />
      <TeamSectionModern employees={employees} />
      <ContactPanel />
    </main>
  );
}
