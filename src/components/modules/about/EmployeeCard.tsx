'use client';

import { Employee } from '@/types/admin';
import { MapPin, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#E86C1F]/20">
      {/* Header with Avatar and Basic Info */}
      <div className="flex items-start gap-4 mb-4">
        {/* Profile Image */}
        <div className="relative flex-shrink-0">
          {employee.image ? (
            <img 
              src={employee.image} 
              alt={employee.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E86C1F] to-[#F4B223] flex items-center justify-center text-white text-lg font-bold shadow-md transition-transform duration-300 group-hover:scale-105">
              {employee.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          {/* Online indicator */}
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        {/* Name and Role */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-900 truncate group-hover:text-[#E86C1F] transition-colors">
            {employee.name}
          </h3>
          <p className="text-sm font-medium text-[#E86C1F] truncate">
            {employee.role.split('/')[0].trim()}
          </p>
          <p className="flex items-center gap-1 text-xs text-slate-500 mt-1">
            <MapPin className="w-3 h-3" aria-hidden="true" />
            <span className="capitalize">{employee.office}</span>
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
        {employee.description}
      </p>

      {/* Specialties (show first 3) */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {employee.specialties.slice(0, 3).map((specialty, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600"
          >
            {specialty}
          </span>
        ))}
        {employee.specialties.length > 3 && (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
            +{employee.specialties.length - 3}
          </span>
        )}
      </div>

      {/* Experience Badge */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">
          <span className="font-semibold text-slate-700">{employee.experience}</span> erfaring
        </span>
        
        {/* View Profile Link */}
        <Link
          href={`/om-oss/${employee.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#E86C1F] bg-[#E86C1F]/10 rounded-full transition-all duration-300 hover:bg-[#E86C1F] hover:text-white group/btn"
        >
          Se profil
          <span className="sr-only"> (åpnes i ny fane)</span>
          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
