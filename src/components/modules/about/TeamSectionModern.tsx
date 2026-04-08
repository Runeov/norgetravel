'use client';

import { Employee } from '@/types/admin';
import EmployeeCard from './EmployeeCard';
import { Users } from 'lucide-react';

interface TeamSectionModernProps {
  employees: Employee[];
}

export default function TeamSectionModern({ employees }: TeamSectionModernProps) {
  if (!employees.length) return null;

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A365D]">
              The editorial team
            </h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            Five zone experts. Five basecamps across Norway. Each editor owns their territory because they live in it. Every guide, every route, every safety warning comes from direct local experience.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>

      </div>
    </section>
  );
}
