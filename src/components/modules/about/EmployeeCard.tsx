'use client';

import { Employee } from '@/types/admin';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ZONE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Bergen:     { bg: 'bg-[#0E7490]/10', text: 'text-[#0E7490]', border: 'border-[#0E7490]' },
  'Tromsø':   { bg: 'bg-[#6D28D9]/10', text: 'text-[#6D28D9]', border: 'border-[#6D28D9]' },
  Lom:        { bg: 'bg-[#78716C]/10', text: 'text-[#78716C]', border: 'border-[#78716C]' },
  Trondheim:  { bg: 'bg-[#334155]/10', text: 'text-[#334155]', border: 'border-[#334155]' },
  'Svolvær':  { bg: 'bg-[#B45309]/10', text: 'text-[#B45309]', border: 'border-[#B45309]' },
};

interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const zone = ZONE_COLORS[employee.office] || { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300' };

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300">
      {/* Profile image */}
      <div className="relative h-64 overflow-hidden bg-slate-200">
        {employee.image ? (
          <Image
            src={employee.image}
            alt={`${employee.name}, ${employee.role} at NorgeTravel`}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1A365D] to-[#00D084] flex items-center justify-center text-white text-4xl font-bold">
            {employee.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Zone badge */}
        <span className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-bold uppercase tracking-wide bg-black/60 text-white border-l-2 ${zone.border}`}>
          <MapPin className="w-3 h-3" aria-hidden="true" />
          {employee.office}
        </span>

        {/* Name overlay on image */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-0.5">
            {employee.name}
          </h3>
          <p className="text-sm font-medium text-white/80">
            {employee.role}
          </p>
        </div>
      </div>

      <div className="p-5">
        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
          {employee.description}
        </p>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {employee.specialties.slice(0, 3).map((specialty, idx) => (
            <span
              key={idx}
              className={`px-2 py-0.5 rounded-sm text-xs font-medium ${zone.bg} ${zone.text}`}
            >
              {specialty}
            </span>
          ))}
          {employee.specialties.length > 3 && (
            <span className="px-2 py-0.5 rounded-sm text-xs font-medium bg-slate-100 text-slate-500">
              +{employee.specialties.length - 3}
            </span>
          )}
        </div>

        {/* Experience + Profile link */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{employee.experience}</span> experience
          </span>
          <Link
            href={`/om-oss/${employee.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#1A365D] bg-[#1A365D]/10 rounded-md transition-all duration-200 hover:bg-[#1A365D] hover:text-white min-h-[44px]"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}
