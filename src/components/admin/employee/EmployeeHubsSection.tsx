'use client';

import { useState, useEffect } from 'react';
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
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    async function loadArticles() {
      try {
        const res = await fetch('/api/admin/articles');
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setArticles(json.data);
        }
      } catch (error) {
        console.error('Error loading articles for dropdown:', error);
      }
    }
    loadArticles();
  }, []);

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
              Velg artikkel / Skriv inn lenke
            </label>
            <select
              value={hub.link}
              onChange={(e) => {
                const selectedLink = e.target.value;
                const matchedArticle = articles.find(
                  (a) => `/travel-guides/${a.category}/${a.slug}` === selectedLink
                );
                onUpdate(index, 'link', selectedLink);
                if (matchedArticle) {
                  onUpdate(index, 'title', matchedArticle.title);
                }
              }}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E86C1F] focus:border-transparent text-sm"
            >
              <option value="">Velg en artikkel...</option>
              {articles.map((art) => {
                const url = `/travel-guides/${art.category}/${art.slug}`;
                return (
                  <option key={art.id} value={url}>
                    {art.title} ({art.category})
                  </option>
                );
              })}
              {hub.link && !articles.some((a) => `/travel-guides/${a.category}/${a.slug}` === hub.link) && (
                <option value={hub.link}>{hub.link} (Egendefinert)</option>
              )}
            </select>
          </div>
        </div>
      )}
    />
  );
}
