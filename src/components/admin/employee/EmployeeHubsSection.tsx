'use client';

import { Link as LinkIcon } from 'lucide-react';
import DynamicList from '../shared/DynamicList';
import type { RelatedHub } from '@/lib/schemas/employee.schema';

interface EmployeeHubsSectionProps {
  relatedHubs: RelatedHub[];
  onAdd: () => void;
  onUpdate: (index: number, field: keyof RelatedHub, value: string) => void;
  onRemove: (index: number) => void;
}

export default function EmployeeHubsSection({
  relatedHubs,
  onAdd,
  onUpdate,
  onRemove,
}: EmployeeHubsSectionProps) {
  return (
    <DynamicList
      items={relatedHubs}
      onAdd={onAdd}
      onRemove={onRemove}
      title="Relaterte sider"
      description="Lenker til relevante kunnskapsbank-sider som vises på ansattprofilen"
      addLabel="Legg til"
      emptyIcon={<LinkIcon className="w-12 h-12 text-slate-300" />}
      emptyMessage="Ingen relaterte sider lagt til"
      renderItem={(hub, index) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Tittel
            </label>
            <input
              type="text"
              value={hub.title}
              onChange={(e) => onUpdate(index, 'title', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E86C1F] focus:border-transparent text-sm"
              placeholder="Lag og Foreninger"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Lenke
            </label>
            <input
              type="text"
              value={hub.link}
              onChange={(e) => onUpdate(index, 'link', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E86C1F] focus:border-transparent text-sm"
              placeholder="/kunnskapsbank/organisasjoner"
            />
          </div>
        </div>
      )}
    />
  );
}
