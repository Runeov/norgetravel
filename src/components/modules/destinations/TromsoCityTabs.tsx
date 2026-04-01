'use client';

import { useState } from 'react';
import { Mountain, Calendar, Building, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TravelCard } from '@/components/modules/travel/TravelCard';
import { EventGrid } from '@/components/modules/travel/EventGrid';
import type { TravelItemBase } from '@/lib/schemas/travel.shared';
import type { Event } from '@/lib/schemas/travel.events.schema';
import type { CityExperience } from '@/types/city-guide';
import type { TripItemCategory } from '@/types/trip';

interface TromsoCityTabsProps {
  activities: TravelItemBase[];
  events: Event[];
  accommodation: TravelItemBase[];
  tours: TravelItemBase[];
  fallbackActivities: CityExperience[];
}

const TABS = [
  { id: 'activities', label: 'Activities', icon: Mountain },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'accommodation', label: 'Accommodation', icon: Building },
  { id: 'tours', label: 'Tours & Trips', icon: Compass },
] as const;

type TabId = (typeof TABS)[number]['id'];

const EMPTY_STATES: Record<Exclude<TabId, 'activities'>, { heading: string; description: string }> =
  {
    events: {
      heading: 'Event listings coming soon',
      description:
        "We're gathering the best festivals, cultural events, and seasonal happenings in Tromsø — Northern Lights festivals, the Midnight Sun Marathon, and winter events.",
    },
    accommodation: {
      heading: 'Accommodation listings coming soon',
      description:
        "We're curating verified hotels, apartments, and cabins in Tromsø — from harbour-front hotels to self-catering options near the aurora belt.",
    },
    tours: {
      heading: 'Tour listings coming soon',
      description:
        "We're compiling licensed tour operators in Tromsø — aurora chases, whale safaris, dog sled tours, and Senja day trips.",
    },
  };

export function TromsoCityTabs({
  activities,
  events,
  accommodation,
  tours,
  fallbackActivities,
}: TromsoCityTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('activities');

  const dataMap: Record<Exclude<TabId, 'events'>, TravelItemBase[]> = {
    activities,
    accommodation,
    tours,
  };

  const currentItems = activeTab === 'events' ? [] : dataMap[activeTab];
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
              onClick={() => setActiveTab(tab.id)}
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
      {activeTab === 'events' ? (
        events.length > 0 ? (
          <EventGrid events={events} destination="northern-norway" />
        ) : (
          <div className="text-center py-16">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {EMPTY_STATES.events.heading}
            </h3>
            <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
              {EMPTY_STATES.events.description}
            </p>
          </div>
        )
      ) : currentItems.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item) => {
            const categoryMap: Record<string, TripItemCategory> = {
              activities: 'experiences',
              accommodation: 'accommodation',
              tours: 'tours',
            };
            return (
              <TravelCard key={item.id} item={item} category={categoryMap[activeTab]} />
            );
          })}
        </div>
      ) : activeTab === 'activities' ? (
        <div className="grid sm:grid-cols-2 gap-6">
          {fallbackActivities.map((e) => (
            <div
              key={e.title}
              className="bg-white rounded-lg p-6 shadow-sm border border-slate-200/50"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-xl text-slate-900">{e.title}</h3>
                <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-sm whitespace-nowrap ml-3">
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
          <activeTabDef.icon className="w-12 h-12 text-slate-300 mx-auto mb-4" aria-hidden="true" />
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
