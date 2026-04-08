'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TripItem } from '@/types/trip';
import { useTrip } from '@/context/TripContext';

interface TripItemCardProps {
  item: TripItem;
}

const CATEGORY_BADGE_COLORS: Record<string, string> = {
  cities: 'bg-blue-100 text-blue-700',
  events: 'bg-purple-100 text-purple-700',
  experiences: 'bg-emerald-100 text-emerald-700',
  accommodation: 'bg-amber-100 text-amber-700',
  restaurants: 'bg-red-100 text-red-700',
  tours: 'bg-teal-100 text-teal-700',
  transport: 'bg-sky-100 text-sky-700',
  guides: 'bg-indigo-100 text-indigo-700',
};

export function TripItemCard({ item }: TripItemCardProps) {
  const { removeItem } = useTrip();

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden flex items-start gap-3 p-3 group hover:shadow-sm transition-shadow">
      {/* Thumbnail */}
      {item.imageUrl ? (
        <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0 bg-slate-200">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
      ) : (
        <div className="w-16 h-16 rounded-md shrink-0 bg-gradient-to-br from-[#1B3A5C] to-[#00CC6A] flex items-center justify-center text-white text-lg font-bold">
          {item.name.charAt(0)}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-bold text-sm text-slate-800 truncate">{item.name}</h4>
          <button
            onClick={() => removeItem(item.id)}
            className="shrink-0 p-1 text-slate-400 hover:text-red-500 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center -m-2"
            aria-label={`Remove ${item.name} from trip`}
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
        {item.location && (
          <p className="text-xs text-slate-500 truncate">{item.location}</p>
        )}
        <span
          className={cn(
            'inline-flex mt-1 px-2 py-0.5 rounded-sm text-xs font-medium capitalize',
            CATEGORY_BADGE_COLORS[item.category] || 'bg-slate-100 text-slate-600'
          )}
        >
          {item.category}
        </span>
      </div>
    </div>
  );
}
