'use client';

import type { Employee } from '@/lib/schemas/employee.schema';
import { Mail, Phone, MapPin, Award, Languages } from 'lucide-react';
import { useState } from 'react';

interface TeamSectionProps {
  employees: Employee[];
}

export default function TeamSection({ employees }: TeamSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Møt teamet
          </h2>
          <p className="text-lg text-slate-600">
            Erfarne regnskapsførere og rådgivere med dyp lokal forankring og spisskompetanse på nordnorsk næringsliv.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {employees.map((employee) => (
            <div 
              key={employee.id}
              className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Card Header */}
              <div className="p-6 bg-gradient-to-br from-[#E86C1F]/5 to-[#F4B223]/5">
                {/* Avatar Placeholder */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E86C1F] to-[#F4B223] flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </div>

                {/* Name & Role */}
                <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
                  {employee.name}
                </h3>
                <p className="text-sm text-[#E86C1F] font-medium text-center mb-4">
                  {employee.role}
                </p>

                {/* Short Description */}
                <p className="text-sm text-slate-600 text-center leading-relaxed">
                  {employee.description}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                
                {/* Contact Info */}
                <div className="space-y-2">
                  <a 
                    href={`mailto:${employee.email}`}
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#E86C1F] transition-colors group"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <span className="truncate group-hover:underline">{employee.email}</span>
                  </a>
                  
                  <a 
                    href={`tel:+47${employee.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#E86C1F] transition-colors group"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <span className="group-hover:underline">+47 {employee.phone}</span>
                  </a>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <span className="capitalize">{employee.office}</span>
                  </div>
                </div>

                {/* Specialties */}
                {employee.specialties && employee.specialties.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-2">
                      <Award className="w-4 h-4 text-[#E86C1F]" aria-hidden="true" />
                      Spesialområder
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {employee.specialties.slice(0, 3).map((specialty, idx) => (
                        <span 
                          key={idx}
                          className="text-xs px-2 py-1 rounded-full bg-[#E86C1F]/10 text-[#E86C1F] font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {employee.languages && employee.languages.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-2">
                      <Languages className="w-4 h-4 text-[#E86C1F]" aria-hidden="true" />
                      Språk
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {employee.languages.map((lang, idx) => (
                        <span 
                          key={idx}
                          className="text-xs px-2 py-1 rounded-full bg-slate-200 text-slate-700"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expand Button */}
                <button
                  onClick={() => toggleExpand(employee.id)}
                  className="w-full mt-4 px-4 py-2 text-sm font-medium text-[#E86C1F] border border-[#E86C1F]/20 rounded-full hover:bg-[#E86C1F]/5 transition-colors"
                >
                  {expandedId === employee.id ? 'Vis mindre' : 'Les mer'}
                </button>

                {/* Expanded Content */}
                {expandedId === employee.id && (
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    
                    {/* Long Description */}
                    <div className="prose prose-sm max-w-none">
                      <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                        {employee.longDescription}
                      </p>
                    </div>

                    {/* Experience */}
                    {employee.experience && (
                      <div>
                        <div className="text-xs font-semibold text-slate-700 mb-1">Erfaring</div>
                        <div className="text-sm text-slate-600">{employee.experience}</div>
                      </div>
                    )}

                    {/* Education */}
                    {employee.education && employee.education.length > 0 && (
                      <div>
                        <div className="text-xs font-semibold text-slate-700 mb-1">Utdanning</div>
                        <ul className="text-sm text-slate-600 space-y-1">
                          {employee.education.map((edu, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#E86C1F] mt-1">•</span>
                              <span>{edu}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Client Types */}
                    {employee.clientTypes && employee.clientTypes.length > 0 && (
                      <div>
                        <div className="text-xs font-semibold text-slate-700 mb-2">Klienttyper</div>
                        <div className="flex flex-wrap gap-2">
                          {employee.clientTypes.map((type, idx) => (
                            <span 
                              key={idx}
                              className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
