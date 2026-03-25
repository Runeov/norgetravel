'use client';

import { Calendar, GripVertical, Briefcase, GraduationCap, Award, Star, Trash2, Plus } from 'lucide-react';
import type { TimelineMilestone } from '@/lib/schemas/employee.schema';

interface EmployeeTimelineSectionProps {
  timeline: TimelineMilestone[];
  onAdd: () => void;
  onUpdate: (index: number, field: keyof TimelineMilestone, value: string | boolean) => void;
  onRemove: (index: number) => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
}

const ICON_OPTIONS: { value: TimelineMilestone['icon']; label: string; icon: React.ReactNode }[] = [
  { value: 'briefcase', label: 'Koffert', icon: <Briefcase className="w-4 h-4" /> },
  { value: 'graduation', label: 'Utdanning', icon: <GraduationCap className="w-4 h-4" /> },
  { value: 'award', label: 'Pris', icon: <Award className="w-4 h-4" /> },
  { value: 'star', label: 'Stjerne', icon: <Star className="w-4 h-4" /> },
];

export default function EmployeeTimelineSection({
  timeline,
  onAdd,
  onUpdate,
  onRemove,
  onMove,
}: EmployeeTimelineSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Karrieretidslinje</h3>
          <p className="text-sm text-slate-500 mt-1">
            Viktige milepæler i den ansattes karriere
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#E86C1F] bg-[#E86C1F]/10 rounded-xl hover:bg-[#E86C1F]/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Legg til milepæl
        </button>
      </div>

      {timeline.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Ingen milepæler lagt til</p>
          <button
            type="button"
            onClick={onAdd}
            className="mt-4 text-sm text-[#E86C1F] hover:underline"
          >
            Legg til første milepæl
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {timeline.map((milestone, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 transition-colors ${
                milestone.highlight
                  ? 'bg-[#E86C1F]/5 border-[#E86C1F]/30'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => onMove(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <GripVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Year */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      År
                    </label>
                    <input
                      type="text"
                      value={milestone.year}
                      onChange={(e) => onUpdate(index, 'year', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E86C1F] focus:border-transparent text-sm"
                      placeholder="2024"
                    />
                  </div>

                  {/* Title */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Tittel
                    </label>
                    <input
                      type="text"
                      value={milestone.title}
                      onChange={(e) => onUpdate(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E86C1F] focus:border-transparent text-sm"
                      placeholder="Statsautorisert regnskapsfører"
                    />
                  </div>

                  {/* Icon */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Ikon
                    </label>
                    <select
                      value={milestone.icon}
                      onChange={(e) => onUpdate(index, 'icon', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E86C1F] focus:border-transparent text-sm"
                    >
                      {ICON_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-3">
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Beskrivelse
                    </label>
                    <input
                      type="text"
                      value={milestone.description}
                      onChange={(e) => onUpdate(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E86C1F] focus:border-transparent text-sm"
                      placeholder="Oppnådde statsautorisasjon og utvidet tjenestetilbudet"
                    />
                  </div>

                  {/* Highlight */}
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={milestone.highlight || false}
                        onChange={(e) => onUpdate(index, 'highlight', e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-[#E86C1F] focus:ring-[#E86C1F]"
                      />
                      <span className="text-xs font-medium text-slate-600">
                        Fremhev
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
