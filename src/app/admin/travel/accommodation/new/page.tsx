'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ACCOMMODATION_TYPE_LABELS,
  type AccommodationType,
} from '@/lib/schemas/travel.accommodation.schema';
import {
  DESTINATION_LABELS,
  PRICE_RANGE_LABELS,
  type Destination,
  type PriceRange,
} from '@/lib/schemas/travel.shared';

interface FormData {
  name: string;
  description: string;
  destination: Destination;
  location: string;
  priceRange: PriceRange;
  website: string;
  imageUrl: string;
  imageAlt: string;
  status: 'draft' | 'published';
  isFeatured: boolean;
  accommodationType: AccommodationType;
  starRating: string;
  amenities: string;
  capacity: string;
  checkIn: string;
  checkOut: string;
  bookingUrl: string;
  isEcoFriendly: boolean;
  nearestTown: string;
}

const initialFormData: FormData = {
  name: '',
  description: '',
  destination: 'northern-norway',
  location: '',
  priceRange: 'mid-range',
  website: '',
  imageUrl: '',
  imageAlt: '',
  status: 'draft',
  isFeatured: false,
  accommodationType: 'hotel',
  starRating: '',
  amenities: '',
  capacity: '',
  checkIn: '15:00',
  checkOut: '11:00',
  bookingUrl: '',
  isEcoFriendly: false,
  nearestTown: '',
};

export default function NewAccommodationPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initialFormData);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const amenitiesArray = form.amenities
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean);

      const starRatingNum = form.starRating ? parseInt(form.starRating, 10) : null;

      const payload = {
        ...form,
        website: form.website || null,
        imageUrl: form.imageUrl || null,
        imageAlt: form.imageAlt || null,
        bookingUrl: form.bookingUrl || null,
        starRating: starRatingNum && starRatingNum >= 1 && starRatingNum <= 5 ? starRatingNum : null,
        amenities: amenitiesArray,
        capacity: form.capacity || undefined,
        checkIn: form.checkIn || undefined,
        checkOut: form.checkOut || undefined,
        nearestTown: form.nearestTown || undefined,
      };

      const res = await fetch('/api/admin/travel/accommodation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!json.success) {
        setError(json.error || 'Failed to create accommodation item');
        return;
      }

      router.push('/admin/travel/accommodation');
    } catch (err) {
      console.error('Error creating accommodation item:', err);
      setError('An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = cn(
    'w-full px-4 py-2.5 rounded-md border border-slate-200 bg-white text-slate-900',
    'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B3A5C] focus:border-transparent',
    'transition-all duration-300 text-sm'
  );

  const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/travel/accommodation"
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add Accommodation</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Create a new accommodation listing for the travel map.
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
            Basic Information
          </h2>

          <div>
            <label htmlFor="name" className={labelClass}>Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Svolvær Rorbu Hotel"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>Description *</label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="Describe this accommodation..."
              className={cn(inputClass, 'resize-none')}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="destination" className={labelClass}>Destination *</label>
              <select
                id="destination"
                name="destination"
                value={form.destination}
                onChange={handleChange}
                className={inputClass}
              >
                {Object.entries(DESTINATION_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="location" className={labelClass}>Location *</label>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Svolvær, Lofoten"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="priceRange" className={labelClass}>Price Range *</label>
              <select
                id="priceRange"
                name="priceRange"
                value={form.priceRange}
                onChange={handleChange}
                className={inputClass}
              >
                {Object.entries(PRICE_RANGE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="website" className={labelClass}>Website URL</label>
              <input
                id="website"
                name="website"
                type="url"
                value={form.website}
                onChange={handleChange}
                placeholder="https://..."
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Accommodation Details */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
            Accommodation Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="accommodationType" className={labelClass}>Accommodation Type *</label>
              <select
                id="accommodationType"
                name="accommodationType"
                value={form.accommodationType}
                onChange={handleChange}
                className={inputClass}
              >
                {Object.entries(ACCOMMODATION_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="starRating" className={labelClass}>Star Rating</label>
              <select
                id="starRating"
                name="starRating"
                value={form.starRating}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">No rating</option>
                <option value="1">⭐ 1 Star</option>
                <option value="2">⭐⭐ 2 Stars</option>
                <option value="3">⭐⭐⭐ 3 Stars</option>
                <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="capacity" className={labelClass}>Capacity</label>
              <input
                id="capacity"
                name="capacity"
                type="text"
                value={form.capacity}
                onChange={handleChange}
                placeholder="e.g. 2-6 guests"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="nearestTown" className={labelClass}>Nearest Town</label>
              <input
                id="nearestTown"
                name="nearestTown"
                type="text"
                value={form.nearestTown}
                onChange={handleChange}
                placeholder="e.g. Tromsø"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="checkIn" className={labelClass}>Check-in Time</label>
              <input
                id="checkIn"
                name="checkIn"
                type="text"
                value={form.checkIn}
                onChange={handleChange}
                placeholder="e.g. 15:00"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="checkOut" className={labelClass}>Check-out Time</label>
              <input
                id="checkOut"
                name="checkOut"
                type="text"
                value={form.checkOut}
                onChange={handleChange}
                placeholder="e.g. 11:00"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="amenities" className={labelClass}>Amenities</label>
            <input
              id="amenities"
              name="amenities"
              type="text"
              value={form.amenities}
              onChange={handleChange}
              placeholder="e.g. WiFi, Parking, Sauna, Kitchen, Hot Tub"
              className={inputClass}
            />
            <p className="text-xs text-slate-400 mt-1">Separate amenities with commas</p>
          </div>

          <div>
            <label htmlFor="bookingUrl" className={labelClass}>Booking URL</label>
            <input
              id="bookingUrl"
              name="bookingUrl"
              type="url"
              value={form.bookingUrl}
              onChange={handleChange}
              placeholder="https://..."
              className={inputClass}
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="isEcoFriendly"
              name="isEcoFriendly"
              type="checkbox"
              checked={form.isEcoFriendly}
              onChange={handleChange}
              className="w-4 h-4 rounded border-slate-300 text-[#00CC6A] focus:ring-[#00CC6A] transition-colors"
            />
            <label htmlFor="isEcoFriendly" className="text-sm font-medium text-slate-700">
              🌿 Eco-friendly accommodation
            </label>
          </div>
        </section>

        {/* Image */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
            Image
          </h2>

          <div>
            <label htmlFor="imageUrl" className={labelClass}>Image URL</label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="imageAlt" className={labelClass}>Image Alt Text</label>
            <input
              id="imageAlt"
              name="imageAlt"
              type="text"
              value={form.imageAlt}
              onChange={handleChange}
              placeholder="Describe the image for accessibility"
              className={inputClass}
            />
          </div>
        </section>

        {/* Publishing */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
            Publishing
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className={labelClass}>Status</label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="isFeatured"
              name="isFeatured"
              type="checkbox"
              checked={form.isFeatured}
              onChange={handleChange}
              className="w-4 h-4 rounded border-slate-300 text-[#1B3A5C] focus:ring-[#1B3A5C] transition-colors"
            />
            <label htmlFor="isFeatured" className="text-sm font-medium text-slate-700">
              ⭐ Featured item (shown prominently)
            </label>
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href="/admin/travel/accommodation"
            className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className={cn(
              'inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white rounded-full',
              'bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A]',
              'hover:shadow-lg hover:shadow-[#1B3A5C]/30 transition-all duration-300',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Create Accommodation
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
