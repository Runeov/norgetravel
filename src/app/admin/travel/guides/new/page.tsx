'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  GUIDE_TYPE_LABELS,
  type GuideType,
} from '@/lib/schemas/travel.guides.schema';
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
  guideType: GuideType;
  languages: string;
  groupSize: string;
  certifications: string;
  yearsExperience: string;
  contactEmail: string;
  contactPhone: string;
  bookingUrl: string;
  operatingMonths: string;
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
  guideType: 'hiking',
  languages: '',
  groupSize: '',
  certifications: '',
  yearsExperience: '',
  contactEmail: '',
  contactPhone: '',
  bookingUrl: '',
  operatingMonths: '',
};

export default function NewGuidePage() {
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
      const languagesArray = form.languages
        ? form.languages.split(',').map((s) => s.trim()).filter(Boolean)
        : [];
      const certificationsArray = form.certifications
        ? form.certifications.split(',').map((s) => s.trim()).filter(Boolean)
        : [];
      const operatingMonthsArray = form.operatingMonths
        ? form.operatingMonths.split(',').map((s) => s.trim()).filter(Boolean)
        : [];

      const payload = {
        name: form.name,
        description: form.description,
        destination: form.destination,
        location: form.location,
        priceRange: form.priceRange,
        website: form.website || null,
        imageUrl: form.imageUrl || null,
        imageAlt: form.imageAlt || null,
        status: form.status,
        isFeatured: form.isFeatured,
        guideType: form.guideType,
        languages: languagesArray,
        groupSize: form.groupSize || undefined,
        certifications: certificationsArray,
        yearsExperience: form.yearsExperience ? Number(form.yearsExperience) : undefined,
        contactEmail: form.contactEmail || null,
        contactPhone: form.contactPhone || null,
        bookingUrl: form.bookingUrl || null,
        operatingMonths: operatingMonthsArray,
      };

      const res = await fetch('/api/admin/travel/guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!json.success) {
        setError(json.error || 'Failed to create guide item');
        return;
      }

      router.push('/admin/travel/guides');
    } catch (err) {
      console.error('Error creating guide item:', err);
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
          href="/admin/travel/guides"
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add Guide</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Create a new guide listing for the travel map.
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
              placeholder="e.g. Arctic Adventure Guides"
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
              placeholder="Describe this guide service..."
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
                placeholder="e.g. Tromsø, Northern Norway"
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

        {/* Guide Details */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
            Guide Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="guideType" className={labelClass}>Guide Type *</label>
              <select
                id="guideType"
                name="guideType"
                value={form.guideType}
                onChange={handleChange}
                className={inputClass}
              >
                {Object.entries(GUIDE_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="languages" className={labelClass}>Languages</label>
              <input
                id="languages"
                name="languages"
                type="text"
                value={form.languages}
                onChange={handleChange}
                placeholder="e.g. English, Norwegian, German"
                className={inputClass}
              />
              <p className="text-xs text-slate-400 mt-1">Comma-separated list</p>
            </div>
            <div>
              <label htmlFor="yearsExperience" className={labelClass}>Years of Experience</label>
              <input
                id="yearsExperience"
                name="yearsExperience"
                type="number"
                min="0"
                value={form.yearsExperience}
                onChange={handleChange}
                placeholder="e.g. 10"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="certifications" className={labelClass}>Certifications</label>
            <input
              id="certifications"
              name="certifications"
              type="text"
              value={form.certifications}
              onChange={handleChange}
              placeholder="e.g. IFMGA Mountain Guide, Wilderness First Responder"
              className={inputClass}
            />
            <p className="text-xs text-slate-400 mt-1">Comma-separated list</p>
          </div>

          <div>
            <label htmlFor="operatingMonths" className={labelClass}>Operating Months</label>
            <input
              id="operatingMonths"
              name="operatingMonths"
              type="text"
              value={form.operatingMonths}
              onChange={handleChange}
              placeholder="e.g. January, February, March, October, November, December"
              className={inputClass}
            />
            <p className="text-xs text-slate-400 mt-1">Comma-separated list of months</p>
          </div>
        </section>

        {/* Contact & Booking */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
            Contact &amp; Booking
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contactEmail" className={labelClass}>Contact Email</label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={form.contactEmail}
                onChange={handleChange}
                placeholder="guide@example.com"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contactPhone" className={labelClass}>Contact Phone</label>
              <input
                id="contactPhone"
                name="contactPhone"
                type="text"
                value={form.contactPhone}
                onChange={handleChange}
                placeholder="+47 123 45 678"
                className={inputClass}
              />
            </div>
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
            href="/admin/travel/guides"
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
                Create Guide
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}