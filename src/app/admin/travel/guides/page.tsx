'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Plus, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TravelItemList } from '@/components/admin/travel/TravelItemList';
import { DestinationFilter } from '@/components/admin/travel/DestinationFilter';
import type { TravelItemBase, Destination } from '@/lib/schemas/travel.shared';

export default function AdminGuidesPage() {
  const [items, setItems] = useState<TravelItemBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState<Destination | 'all-items'>('all-items');

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (destination !== 'all-items') {
        params.set('destination', destination);
      }
      const url = `/api/admin/travel/guides${params.toString() ? `?${params}` : ''}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        setItems(json.data);
      }
    } catch (error) {
      console.error('Failed to fetch guide items:', error);
    } finally {
      setLoading(false);
    }
  }, [destination]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/travel/guides?id=${id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.success) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(json.error || 'Failed to delete item');
      }
    } catch (error) {
      console.error('Failed to delete guide item:', error);
      alert('Failed to delete item');
    }
  };

  const publishedCount = items.filter((i) => i.status === 'published').length;
  const draftCount = items.filter((i) => i.status === 'draft').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#1B3A5C]" />
            Guides
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage local guides — hiking, fishing, northern lights, wildlife, and more.
          </p>
        </div>
        <Link
          href="/admin/travel/guides/new"
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 font-medium rounded-full text-white',
            'bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A]',
            'hover:shadow-lg hover:shadow-[#1B3A5C]/30 transition-all duration-300'
          )}
        >
          <Plus className="w-5 h-5" />
          Add Guide
        </Link>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <DestinationFilter value={destination} onChange={setDestination} />
        <span className="text-sm text-slate-400">
          {items.length} item{items.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* List */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-200 rounded w-1/3 mx-auto" />
            <div className="h-4 bg-slate-100 rounded w-1/2 mx-auto" />
          </div>
        </div>
      ) : (
        <TravelItemList
          items={items}
          categorySlug="guides"
          onDelete={handleDelete}
        />
      )}

      {/* Stats */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Total</p>
            <p className="text-2xl font-bold text-slate-900">{items.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Published</p>
            <p className="text-2xl font-bold text-green-600">{publishedCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Draft</p>
            <p className="text-2xl font-bold text-slate-400">{draftCount}</p>
          </div>
        </div>
      )}
    </div>
  );
}
