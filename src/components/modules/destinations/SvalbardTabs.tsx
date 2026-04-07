'use client';

import { useState, useCallback } from 'react';
import { Mountain, Calendar, Building, Compass, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TravelCard } from '@/components/modules/travel/TravelCard';
import { extractRatings } from '@/lib/ratings';
import type { TravelItemBase } from '@/lib/schemas/travel.shared';

interface StaticExperience {
  title: string;
  price: string;
  duration: string;
  body: string;
}

interface SvalbardTabsProps {
  activities: TravelItemBase[];
  events: TravelItemBase[];
  accommodation: TravelItemBase[];
  tours: TravelItemBase[];
  fallbackActivities: StaticExperience[];
}

const TABS = [
  { id: 'activities', label: 'Activities', icon: Mountain },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'accommodation', label: 'Accommodation', icon: Building },
  { id: 'tours', label: 'Tours & Trips', icon: Compass },
] as const;

type TabId = (typeof TABS)[number]['id'];

const EMPTY_STATES: Record<Exclude<TabId, 'activities'>, { heading: string; description: string }> = {
  events: {
    heading: 'Event listings coming soon',
    description: 'We\'re gathering the best festivals, cultural events, and seasonal happenings across Svalbard.',
  },
  accommodation: {
    heading: 'Accommodation listings coming soon',
    description: 'We\'re curating verified hotels, cabins, and guesthouses in Longyearbyen and beyond.',
  },
  tours: {
    heading: 'Tour listings coming soon',
    description: 'We\'re compiling licensed tour operators and guided expeditions across Svalbard.',
  },
};

export function SvalbardTabs({
  activities,
  events,
  accommodation,
  tours,
  fallbackActivities,
}: SvalbardTabsProps) {
  const INITIAL_COUNT = 6;
  const [activeTab, setActiveTab] = useState<TabId>('activities');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab);
    setVisibleCount(INITIAL_COUNT);
  }, []);

  const dataMap: Record<TabId, TravelItemBase[]> = {
    activities,
    events,
    accommodation,
    tours,
  };

  const currentItems = dataMap[activeTab];
  const displayItems = currentItems.slice(0, visibleCount);
  const remaining = currentItems.length - visibleCount;
  const activeTabDef = TABS.find((t) => t.id === activeTab)!;

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-1 px-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap min-h-[44px]',
                isActive
                  ? 'bg-[#1B3A5C] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#1B3A5C]/30 hover:text-[#1B3A5C]'
              )}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {currentItems.length > 0 ? (
        <div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayItems.map((item) => (
              <TravelCard key={item.id} item={item} ratings={extractRatings(item)} />
            ))}
          </div>
          {remaining > 0 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisibleCount((c) => c + INITIAL_COUNT)}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#1B3A5C] bg-white border border-slate-200 rounded-xl hover:border-[#1B3A5C]/30 hover:bg-slate-50 transition-all duration-300 min-h-[44px]"
              >
                View {Math.min(remaining, INITIAL_COUNT)} more
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      ) : activeTab === 'activities' ? (
        <div className="grid sm:grid-cols-2 gap-6">
          {fallbackActivities.map((e) => (
            <div key={e.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-xl text-slate-900">{e.title}</h3>
                <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full whitespace-nowrap">
                  {e.duration}
                </span>
              </div>
              <p className="text-[#1B3A5C] font-bold text-sm mb-3">{e.price}</p>
              <p className="text-slate-600 text-sm leading-relaxed">{e.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <activeTabDef.icon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            {EMPTY_STATES[activeTab as Exclude<TabId, 'activities'>].heading}
          </h3>
          <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
            {EMPTY_STATES[activeTab as Exclude<TabId, 'activities'>].description}
          </p>
        </div>
      )}
    </div>
  );
}
