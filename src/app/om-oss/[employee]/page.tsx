import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEmployee } from '@/lib/admin/employees';
import EmployeeProfileCard from '@/components/modules/about/EmployeeProfileCard';
import { ArrowLeft, Users } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ employee: string }>;
}

// Keep employee pages dynamic so admin updates are reflected without rebuild.
export const dynamic = 'force-dynamic';

// Generate metadata for each employee page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { employee: employeeId } = await params;
  const employee = await getEmployee(employeeId);

  if (!employee) {
    return {
      title: 'Ansatt ikke funnet | Averdi AS',
    };
  }

  return {
    title: `${employee.name} - ${employee.role} | Averdi AS`,
    description: employee.description,
    openGraph: {
      title: `${employee.name} - ${employee.role}`,
      description: employee.description,
      type: 'profile',
    },
  };
}

export default async function EmployeeProfilePage({ params }: PageProps) {
  const { employee: employeeId } = await params;
  const employee = await getEmployee(employeeId);

  if (!employee) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': employee.name,
    'jobTitle': employee.role,
    'email': employee.email,
    'telephone': `+47 ${employee.phone}`,
    'worksFor': {
      '@type': 'Organization',
      'name': 'Averdi AS',
      'url': 'https://averdi.no'
    },
    'workLocation': {
      '@type': 'Place',
      'name': employee.office
    },
    'knowsLanguage': employee.languages,
    'description': employee.description
  };

  return (
    <main className="flex-1 bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header with back navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/om-oss"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#E86C1F] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Tilbake til teamet
            </Link>
            <Link
              href="/om-oss"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#E86C1F] transition-colors"
            >
              <Users className="w-4 h-4" aria-hidden="true" />
              Se alle ansatte
            </Link>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-[700px] mx-auto">
          <EmployeeProfileCard employee={employee} />
        </div>

        {/* Related Hubs Section */}
        {employee.relatedHubs && employee.relatedHubs.length > 0 && (
          <div className="max-w-[700px] mx-auto mt-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Relaterte kunnskapsartikler
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {employee.relatedHubs.map((hub, idx) => (
                  <Link
                    key={idx}
                    href={hub.link}
                    className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-[#E86C1F]/10 border border-slate-100 hover:border-[#E86C1F]/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#E86C1F]/10 flex items-center justify-center group-hover:bg-[#E86C1F] transition-colors">
                      <svg
                        className="w-5 h-5 text-[#E86C1F] group-hover:text-white transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-[#E86C1F] transition-colors">
                      {hub.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact CTA */}
        <div className="max-w-[700px] mx-auto mt-8">
          <div className="bg-gradient-to-r from-[#E86C1F] to-[#F4B223] rounded-2xl p-8 text-center text-white">
            <h3 className="text-xl font-bold mb-2">
              Trenger du hjelp med {employee.specialties[0]?.toLowerCase() || 'regnskap'}?
            </h3>
            <p className="text-white/90 mb-6">
              {employee.name.split(' ')[0]} og teamet er klare til å hjelpe deg.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`mailto:${employee.email}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-[#E86C1F] bg-white rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Send e-post
              </a>
              <a
                href={`tel:+47${employee.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-white/20 border-2 border-white rounded-full transition-all duration-300 hover:bg-white hover:text-[#E86C1F] hover:-translate-y-0.5"
              >
                Ring {employee.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
