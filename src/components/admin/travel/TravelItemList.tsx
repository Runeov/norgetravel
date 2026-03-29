'use client';

import Link from 'next/link';
import { Edit, Eye, Trash2, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DESTINATION_LABELS,
  DESTINATION_COLORS,
  PRICE_RANGE_LABELS,
  PRICE_RANGE_COLORS,
  type TravelItemBase,
} from '@/lib/schemas/travel.shared';

interface TravelItemListProps {
  items: TravelItemBase[];
  categorySlug: string;
  onDelete: (id: string, name: string) => void;
}

export function TravelItemList({ items, categorySlug, onDelete }: TravelItemListProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          No items yet
        </h3>
        <p className="text-slate-500 mb-6">
          Create your first item to get started.
        </p>
        <Link
          href={`/admin/travel/${categorySlug}/new`}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white font-medium rounded-full hover:shadow-lg hover:shadow-[#1B3A5C]/30 transition-all"
        >
          Create Item
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                Name
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                Destination
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                Price Range
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                Status
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                Updated
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-slate-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
              >
                {/* Name + Location */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900 truncate max-w-xs">
                        {item.name}
                      </p>
                      <p className="text-sm text-slate-500 truncate max-w-xs">
                        {item.location}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Destination badge */}
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      'inline-flex px-2.5 py-1 rounded-full text-xs font-medium',
                      DESTINATION_COLORS[item.destination]
                    )}
                  >
                    {DESTINATION_LABELS[item.destination]}
                  </span>
                </td>

                {/* Price Range badge */}
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      'inline-flex px-2.5 py-1 rounded-full text-xs font-medium',
                      PRICE_RANGE_COLORS[item.priceRange]
                    )}
                  >
                    {PRICE_RANGE_LABELS[item.priceRange]}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  {item.status === 'published' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      Draft
                    </span>
                  )}
                  {item.isFeatured && (
                    <span className="ml-2 inline-flex px-2 py-0.5 rounded text-xs font-medium bg-[#1B3A5C]/10 text-[#1B3A5C]">
                      Featured
                    </span>
                  )}
                </td>

                {/* Updated date */}
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-500">
                    {new Date(item.updatedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    {item.status === 'published' && (
                      <Link
                        href={`/travel/${categorySlug}`}
                        target="_blank"
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View on site"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    )}
                    <Link
                      href={`/admin/travel/${categorySlug}/${item.id}`}
                      className="p-2 text-slate-400 hover:text-[#1B3A5C] hover:bg-[#1B3A5C]/10 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => onDelete(item.id, item.name)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
