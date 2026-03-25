'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, Link as LinkIcon, Calendar, Award } from 'lucide-react';
import FormHeader from '../shared/FormHeader';
import EmployeeBasicInfoSection from './EmployeeBasicInfoSection';
import EmployeeHubsSection from './EmployeeHubsSection';
import EmployeeTimelineSection from './EmployeeTimelineSection';
import { useEmployeeForm } from './useEmployeeForm';
import type { Employee } from '@/lib/schemas/employee.schema';

interface EmployeeFormProps {
  employee?: Employee;
  isNew?: boolean;
}

type SectionId = 'basic' | 'hubs' | 'timeline' | 'achievements';

const SECTION_TABS: { id: SectionId; label: string; icon: React.ReactNode }[] = [
  { id: 'basic', label: 'Grunnleggende', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'hubs', label: 'Relaterte sider', icon: <LinkIcon className="w-4 h-4" /> },
  { id: 'timeline', label: 'Tidslinje', icon: <Calendar className="w-4 h-4" /> },
  { id: 'achievements', label: 'Prestasjoner', icon: <Award className="w-4 h-4" /> },
];

export default function EmployeeForm({ employee, isNew = false }: EmployeeFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState<SectionId>('basic');

  const {
    formData,
    relatedHubs,
    timeline,
    handleChange,
    addRelatedHub,
    updateRelatedHub,
    removeRelatedHub,
    addTimelineMilestone,
    updateTimelineMilestone,
    removeTimelineMilestone,
    moveTimelineMilestone,
    getPayload,
  } = useEmployeeForm(employee);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const payload = getPayload();
      const url = isNew
        ? '/api/admin/employees'
        : `/api/admin/employees/${employee?.id}`;

      const response = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/employees');
        router.refresh();
      } else {
        setError(data.error || 'Kunne ikke lagre');
      }
    } catch {
      setError('En feil oppstod');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <FormHeader
        title={isNew ? 'Ny ansatt' : `Rediger: ${employee?.name}`}
        subtitle={isNew ? 'Legg til en ny ansatt' : 'Oppdater informasjon om den ansatte'}
        isSubmitting={isSubmitting}
        backUrl="/admin/employees"
      />

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Section Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {SECTION_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSection(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeSection === tab.id
                ? 'bg-[#E86C1F] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Sections */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        {activeSection === 'basic' && (
          <EmployeeBasicInfoSection
            formData={formData}
            onChange={handleChange}
          />
        )}

        {activeSection === 'hubs' && (
          <EmployeeHubsSection
            relatedHubs={relatedHubs}
            onAdd={addRelatedHub}
            onUpdate={updateRelatedHub}
            onRemove={removeRelatedHub}
          />
        )}

        {activeSection === 'timeline' && (
          <EmployeeTimelineSection
            timeline={timeline}
            onAdd={addTimelineMilestone}
            onUpdate={updateTimelineMilestone}
            onRemove={removeTimelineMilestone}
            onMove={moveTimelineMilestone}
          />
        )}

        {activeSection === 'achievements' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Prestasjoner og utmerkelser
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Sertifiseringer, priser og andre prestasjoner
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Prestasjoner (kommaseparert)
              </label>
              <textarea
                value={formData.achievements}
                onChange={(e) => handleChange('achievements', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E86C1F] focus:border-transparent transition-all resize-none"
                placeholder="Årets regnskapsfører 2023, Sertifisert PowerOffice-konsulent, 100+ fornøyde kunder"
              />
              <p className="text-xs text-slate-500 mt-1">
                Skriv inn prestasjoner separert med komma
              </p>
            </div>

            {/* Preview */}
            {formData.achievements && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-slate-700 mb-3">
                  Forhåndsvisning:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {formData.achievements.split(',').map(
                    (achievement, index) =>
                      achievement.trim() && (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E86C1F]/10 text-[#E86C1F] rounded-full text-sm font-medium"
                        >
                          <Award className="w-3.5 h-3.5" />
                          {achievement.trim()}
                        </span>
                      )
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
