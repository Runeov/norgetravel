import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { TRAVEL_CATEGORIES } from '@/lib/schemas/travel.shared';

export default function AdminTravelPage() {
  return (
    <div className="space-y-6">
      {/* Category cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TRAVEL_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/admin/travel/${cat.slug}`}
            className="group bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:border-[#1B3A5C]/20 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{cat.emoji}</span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#1B3A5C] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">{cat.label}</h3>
            <p className="text-sm text-slate-500">{cat.description}</p>
          </Link>
        ))}
      </div>

      {/* Empty state info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
        <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Travel Map Admin
        </h3>
        <p className="text-slate-500 max-w-md mx-auto">
          Select a category above to manage listings. Each category has its own set of items
          that appear on the public travel pages.
        </p>
      </div>
    </div>
  );
}
