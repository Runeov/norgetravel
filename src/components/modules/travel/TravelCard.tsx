'use client';

import Image from 'next/image';
import { MapPin, ExternalLink, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DESTINATION_LABELS,
  DESTINATION_COLORS,
  DESTINATION_EMOJIS,
  PRICE_RANGE_LABELS,
  PRICE_RANGE_COLORS,
  type TravelItemBase,
} from '@/lib/schemas/travel.shared';
import { AddToTripButton } from '@/components/ui/AddToTripButton';
import type { TripItemCategory } from '@/types/trip';

export interface RatingData {
  googleRating?: number | null;
  googleReviewCount?: number | null;
  bookingRating?: number | null;
  bookingReviewCount?: number | null;
  tripAdvisorRating?: number | null;
  tripAdvisorReviewCount?: number | null;
}

interface TravelCardProps {
  item: TravelItemBase;
  category?: TripItemCategory;
  ratings?: RatingData;
}

function RatingBadge({ source, rating, reviewCount }: { source: string; rating: number; reviewCount?: number | null }) {
  const colors: Record<string, string> = {
    Google: 'bg-white border border-slate-200 text-slate-800',
    'Booking.com': 'bg-[#003580] text-white',
    TripAdvisor: 'bg-[#00AF87] text-white',
  };
  const isBooking = source === 'Booking.com';
  const displayRating = isBooking ? rating.toFixed(1) : rating.toFixed(1);
  const maxLabel = isBooking ? '/10' : '/5';

  return (
    <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs font-medium', colors[source] || 'bg-slate-100 text-slate-700')}>
      <Star className="w-3 h-3 fill-current" aria-hidden="true" />
      {displayRating}{maxLabel}
      {reviewCount != null && reviewCount > 0 && (
        <span className="opacity-75">({reviewCount.toLocaleString()})</span>
      )}
      <span className="opacity-75 text-[10px]">{source}</span>
    </span>
  );
}

export function TravelCard({ item, category, ratings }: TravelCardProps) {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      {/* Image or gradient placeholder */}
      {item.imageUrl ? (
        <div className="relative h-48 overflow-hidden bg-slate-200">
          <Image
            src={item.imageUrl}
            alt={item.imageAlt || item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      ) : (
        <div className="h-3 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A]" />
      )}

      <div className="p-6">
        {/* Badges row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className={cn(
              'inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-medium',
              DESTINATION_COLORS[item.destination]
            )}
          >
            <span>{DESTINATION_EMOJIS[item.destination]}</span>
            {DESTINATION_LABELS[item.destination]}
          </span>
          <span
            className={cn(
              'inline-flex px-2.5 py-1 rounded-sm text-xs font-medium',
              PRICE_RANGE_COLORS[item.priceRange]
            )}
          >
            {PRICE_RANGE_LABELS[item.priceRange]}
          </span>
          {item.isFeatured && (
            <span className="inline-flex px-2.5 py-1 rounded-sm text-xs font-medium bg-[#00CC6A]/10 text-[#00CC6A]">
              Featured
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-[#1B3A5C] transition-colors">
          {item.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
          <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{item.location}</span>
        </div>

        {/* Ratings */}
        {ratings && (ratings.googleRating || ratings.bookingRating || ratings.tripAdvisorRating) && (
          <div className="flex items-center gap-1.5 flex-wrap mb-3">
            {ratings.googleRating != null && ratings.googleRating > 0 && (
              <RatingBadge source="Google" rating={ratings.googleRating} reviewCount={ratings.googleReviewCount} />
            )}
            {ratings.bookingRating != null && ratings.bookingRating > 0 && (
              <RatingBadge source="Booking.com" rating={ratings.bookingRating} reviewCount={ratings.bookingReviewCount} />
            )}
            {ratings.tripAdvisorRating != null && ratings.tripAdvisorRating > 0 && (
              <RatingBadge source="TripAdvisor" rating={ratings.tripAdvisorRating} reviewCount={ratings.tripAdvisorReviewCount} />
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {item.description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {category && (
            <AddToTripButton
              item={{
                id: item.id,
                name: item.name,
                category,
                imageUrl: item.imageUrl,
                location: item.location,
                priceRange: item.priceRange,
                destination: item.destination,
                addedAt: '',
              }}
            />
          )}
          {item.website && (
            <a
              href={item.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1B3A5C] hover:text-[#00CC6A] transition-colors min-h-[44px]"
            >
              Visit website
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
