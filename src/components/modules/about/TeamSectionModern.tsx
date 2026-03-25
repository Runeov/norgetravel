'use client';

import { Employee } from '@/types/admin';
import EmployeeCard from './EmployeeCard';

interface TeamSectionModernProps {
  employees: Employee[];
}

export default function TeamSectionModern({ employees }: TeamSectionModernProps) {
  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Møt teamet
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Erfarne regnskapsførere med dyp lokal forankring og spisskompetanse på nordnorsk næringsliv.
          </p>
        </div>

        {/* Team Grid - 3 columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>

      </div>
    </section>
  );
}
