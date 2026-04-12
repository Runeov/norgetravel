import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowLeft, Clock, Globe, Award, Users } from 'lucide-react';
import { getEmployee, getSortedEmployees } from '@/lib/admin/employees';
import { NorgeBackground } from '@/components/modules/NorgeBackground';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const employees = await getSortedEmployees();
  return employees.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const employee = await getEmployee(id);
  if (!employee) return { title: 'Not Found' };

  return {
    title: `${employee.name} — ${employee.role} | NorgeTravel`,
    description: employee.description,
    openGraph: {
      title: `${employee.name} — ${employee.role}`,
      description: employee.description,
      type: 'profile',
      ...(employee.image && { images: [{ url: employee.image }] }),
    },
  };
}

const ZONE_META: Record<string, { zone: string; color: string }> = {
  Bergen:     { zone: 'Fjord Norway', color: '#0E7490' },
  'Tromsø':   { zone: 'The Arctic', color: '#6D28D9' },
  Lom:        { zone: 'The High Peaks', color: '#78716C' },
  Trondheim:  { zone: 'Urban Hubs', color: '#334155' },
  'Svolvær':  { zone: 'The Working Coast', color: '#B45309' },
};

export default async function EmployeeProfilePage({ params }: Props) {
  const { id } = await params;
  const employee = await getEmployee(id);
  if (!employee) notFound();

  const meta = ZONE_META[employee.office] || { zone: employee.office, color: '#1A365D' };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': employee.name,
    'jobTitle': employee.role,
    'worksFor': { '@type': 'Organization', 'name': 'NorgeTravel.com' },
    'workLocation': { '@type': 'Place', 'name': employee.office },
    ...(employee.image && { 'image': employee.image }),
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1A365D] text-white -mt-20 pt-20">
        <NorgeBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link
            href="/om-oss"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8 min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to the team
          </Link>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Photo */}
            {employee.image && (
              <div className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-lg overflow-hidden flex-shrink-0 bg-slate-700">
                <Image
                  src={employee.image}
                  alt={`${employee.name}, ${employee.role} at NorgeTravel`}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="256px"
                />
              </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-bold uppercase tracking-wide mb-4 border-l-2"
                style={{ borderColor: meta.color, backgroundColor: `${meta.color}20`, color: 'white' }}
              >
                <MapPin className="w-3 h-3" aria-hidden="true" />
                {meta.zone} — {employee.office}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">{employee.name}</h1>
              <p className="text-xl text-white/70 mb-6">{employee.role}</p>
              <p className="text-white/80 leading-relaxed max-w-2xl">{employee.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main bio */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#1A365D] mb-6">About {employee.name.split(' ')[0]}</h2>
              <div className="prose prose-slate max-w-none">
                {employee.longDescription.split('\n\n').map((p, i) => (
                  <p key={i} className="text-slate-600 leading-relaxed mb-4">{p}</p>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Specialties */}
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                <h3 className="text-sm font-bold text-[#1A365D] uppercase tracking-wide mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-1.5">
                  {employee.specialties.map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-sm text-xs font-medium bg-white border border-slate-200 text-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Credentials */}
              {employee.education.length > 0 && (
                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                  <h3 className="text-sm font-bold text-[#1A365D] uppercase tracking-wide mb-3">
                    <Award className="w-4 h-4 inline mr-1.5" aria-hidden="true" />
                    Credentials
                  </h3>
                  <ul className="space-y-2">
                    {employee.education.map((e, i) => (
                      <li key={i} className="text-sm text-slate-600">{e}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quick facts */}
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  <span>{employee.experience} experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Globe className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  <span>{employee.languages.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  <span>{employee.clientTypes.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
