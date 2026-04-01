'use client';

import {
  MapPin,
  Calendar,
  Mountain,
  Building,
  UtensilsCrossed,
  Compass,
  Ship,
  Users,
} from 'lucide-react';
import type { TripItem, TripItemCategory } from '@/types/trip';
import { TripItemCard } from './TripItemCard';

const CATEGORY_CONFIG: Record<
  TripItemCategory,
  { label: string; icon: typeof MapPin }
> = {
  cities: { label: 'Cities', icon: MapPin },
  events: { label: 'Events', icon: Calendar },
  experiences: { label: 'Experiences', icon: Mountain },
  accommodation: { label: 'Accommodation', icon: Building },
  restaurants: { label: 'Restaurants', icon: UtensilsCrossed },
  tours: { label: 'Tours', icon: Compass },
  transport: { label: 'Transport', icon: Ship },
  guides: { label: 'Guides', icon: Users },
};

interface TripCategorySectionProps {
  category: TripItemCategory;
  items: TripItem[];
}

export function TripCategorySection({ category, items }: TripCategorySectionProps) {
  const config = CATEGORY_CONFIG[category];
  const Icon = config.icon;

  if (items.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-[#1B3A5C]" aria-hidden="true" />
        <h3 className="text-lg font-bold text-slate-800">
          {config.label}
          <span className="ml-2 text-sm font-normal text-slate-400">({items.length})</span>
        </h3>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => (
          <TripItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
