'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  EXPERIENCE_TYPE_LABELS,
  DIFFICULTY_LABELS,
  type ExperienceType,
  type Difficulty,
} from '@/lib/schemas/travel.experiences.schema';
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
  experienceType: ExperienceType;
  operator: string;
  duration: string;
  difficulty: Difficulty;
  minAge: string;
  groupSize: string;
  includes: string;
  bookingUrl: string;
  seasonalAvailability: string;
  meetingPoint: string;
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
  experienceType: 'northern-lights',
  operator: '',
  duration: '',
  difficulty: 'moderate',
  minAge: '',
  groupSize: '',
  includes: '',
  bookingUrl: '',
  seasonalAvailability: '',
  meetingPoint: '',
};

export default function NewExperiencePage() {
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
      const includesArray = form.includes
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...form,
        website: form.website || null,
        imageUrl: form.imageUrl || null,
        imageAlt: form.imageAlt || null,
        bookingUrl: form.bookingUrl || null,
        duration: form.duration || undefined,
        minAge: form.minAge ? Number(form.minAge) : undefined,
        groupSize: form.groupSize || undefined,
        includes: includesArray,
        seasonalAvailability: form.seasonalAvailability || undefined,
        meetingPoint: form.meetingPoint || undefined,
      };

      const res = await fetch('/api/admin/travel/experiences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!json.success) {
        setError(json.error || 'Failed to create experience item');
        return;
      }

      router.push('/admin/travel/experiences');
    } catch (err) {
      console.error('Error creating experience item:', err);
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
          href="/admin/travel/experiences"
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add Experience</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Create a new experience listing for the travel map.
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
              placeholder="e.g. Northern Lights Safari Troms&oslash;"
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
              placeholder="Describe this experience..."
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
                placeholder="e.g. Troms&oslash;, Northern Norway"
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

        {/* Experience Details */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
            Experience Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="experienceType" className={labelClass}>Experience Type *</label>
              <select
                id="experienceType"
                name="experienceType"
                value={form.experienceType}
                onChange={handleChange}
                className={inputClass}
              >
                {Object.entries(EXPERIENCE_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="operator" className={labelClass}>Operator *</label>
              <input
                id="operator"
                name="operator"
                type="text"
                required
                value={form.operator}
                onChange={handleChange}
                placeholder="e.g. Arctic Adventures, Tromsø Safari"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="difficulty" className={labelClass}>Difficulty *</label>
              <select
                id="difficulty"
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
                className={inputClass}
              >
                {Object.entries(DIFFICULTY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="duration" className={labelClass}>Duration</label>
              <input
                id="duration"
                name="duration"
                type="text"
                value={form.duration}
                onChange={handleChange}
                placeholder="e.g. 3-4 hours"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="minAge" className={labelClass}>Minimum Age</label>
              <input
                id="minAge"
                name="minAge"
                type="number"
                min="0"
                value={form.minAge}
                onChange={handleChange}
                placeholder="e.g. 12"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="groupSize" className={labelClass}>Group Size</label>
              <input
                id="groupSize"
                name="groupSize"
                type="text"
                value={form.groupSize}
                onChange={handleChange}
                placeholder="e.g. 2-12 people"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="includes" className={labelClass}>Includes (comma-separated)</label>
            <input
              id="includes"
              name="includes"
              type="text"
              value={form.includes}
              onChange={handleChange}
              placeholder="e.g. Transport, Hot drinks, Warm clothing, Guide"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div>
              <label htmlFor="seasonalAvailability" className={labelClass}>Seasonal Availability</label>
              <input
                id="seasonalAvailability"
                name="seasonalAvailability"
                type="text"
                value={form.seasonalAvailability}
                onChange={handleChange}
                placeholder="e.g. September-March, Year-round"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="meetingPoint" className={labelClass}>Meeting Point</label>
            <input
              id="meetingPoint"
              name="meetingPoint"
              type="text"
              value={form.meetingPoint}
              onChange={handleChange}
              placeholder="e.g. Tromsø city center, hotel pickup available"
              className={inputClass}
            />
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
            href="/admin/travel/experiences"
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
                Create Experience
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}