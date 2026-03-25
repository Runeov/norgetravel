import { Metadata } from 'next';
import { getSortedEmployees } from '@/lib/admin/employees';
import EmployeeProfileCard from '@/components/modules/about/EmployeeProfileCard';

export const metadata: Metadata = {
  title: 'Team Demo | Averdi AS',
  description: 'Demo av moderne medarbeiderprofiler',
};

export default async function TeamDemoPage() {
  const employees = await getSortedEmployees();
  const employee = employees[0];

  if (!employee) {
    return (
      <main className="flex-1 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 py-16">
          <p>Ingen ansatte funnet.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 py-16">

        {/* Demo Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Moderne Medarbeiderprofil
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Ny design for å vise frem teamet vårt med stil og funksjonalitet.
          </p>
        </div>

        {/* Single Profile Card Demo */}
        <div className="max-w-[650px] mx-auto mb-16">
          <EmployeeProfileCard employee={employee} />
        </div>

        {/* All Employees Grid */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Hele teamet
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {employees.map((emp) => (
              <EmployeeProfileCard key={emp.id} employee={emp} />
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
