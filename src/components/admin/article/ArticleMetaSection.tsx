'use client';

import { useState } from 'react';
import FormField, { TextInput, TextArea, SelectInput } from '../shared/FormField';
import type { ArticleFormData, ArticleCategory, ArticleStatus, Article } from '@/types/admin';

interface ArticleMetaSectionProps {
  formData: ArticleFormData;
  onChange: (field: keyof ArticleFormData, value: string | number | boolean | string[] | undefined) => void;
  article?: Article;
}

const CATEGORIES: { value: ArticleCategory; label: string }[] = [
  { value: 'bedrift', label: 'Bedrift' },
  { value: 'sametinget', label: 'Sametinget' },
  { value: 'organisasjoner', label: 'Organisasjoner' },
  { value: 'analyse', label: 'Analyse' },
  { value: 'regelverk', label: 'Regelverk' },
];

const STATUS_OPTIONS: { value: ArticleStatus; label: string }[] = [
  { value: 'draft', label: 'Utkast' },
  { value: 'published', label: 'Publisert' },
];

export default function ArticleMetaSection({
  formData,
  onChange,
  article,
}: ArticleMetaSectionProps) {
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      onChange('tags', [...formData.tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange('tags', formData.tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-6">
      {/* Publish settings */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Publisering</h3>

        <div className="space-y-4">
          <FormField label="Status">
            <SelectInput
              value={formData.status}
              onChange={(v) => onChange('status', v)}
              options={STATUS_OPTIONS}
            />
          </FormField>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => onChange('isFeatured', e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 text-[#E86C1F] focus:ring-[#E86C1F]"
            />
            <span className="text-sm font-medium text-slate-700">
              Fremhevet artikkel
            </span>
          </label>

          {article && (
            <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-100">
              <p>Opprettet: {new Date(article.createdAt).toLocaleDateString('nb-NO')}</p>
              <p>Oppdatert: {new Date(article.updatedAt).toLocaleDateString('nb-NO')}</p>
              {article.publishedAt && (
                <p>Publisert: {new Date(article.publishedAt).toLocaleDateString('nb-NO')}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Kategori</h3>
        <SelectInput
          value={formData.category}
          onChange={(v) => onChange('category', v)}
          options={CATEGORIES}
        />
      </div>

      {/* Slug */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">URL-slug</h3>
        <TextInput
          value={formData.slug}
          onChange={(v) => onChange('slug', v)}
          placeholder="url-slug"
          required
          className="text-sm font-mono"
        />
        <p className="text-xs text-slate-400 mt-2">
          /kunnskapsbank/{formData.category}/{formData.slug || 'url-slug'}
        </p>
      </div>

      {/* Read time */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Lesetid</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max="60"
            value={formData.readTime}
            onChange={(e) => onChange('readTime', parseInt(e.target.value) || 5)}
            className="w-20 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#E86C1F] focus:border-transparent transition-all text-center"
          />
          <span className="text-slate-500">minutter</span>
        </div>
      </div>

      {/* Featured image */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Fremhevet bilde</h3>
        <TextInput
          value={formData.featuredImage || ''}
          onChange={(v) => onChange('featuredImage', v || undefined)}
          placeholder="https://..."
          type="url"
          className="text-sm"
        />

        {formData.featuredImage && (
          <>
            <div className="mt-4">
              <img
                src={formData.featuredImage}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <input
              type="text"
              value={formData.featuredImageAlt || ''}
              onChange={(e) => onChange('featuredImageAlt', e.target.value || undefined)}
              className="w-full mt-2 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E86C1F] focus:border-transparent transition-all text-sm"
              placeholder="Alt-tekst for bildet..."
            />
          </>
        )}
      </div>

      {/* Author */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Forfatter</h3>
        <TextInput
          value={formData.authorName}
          onChange={(v) => onChange('authorName', v)}
          placeholder="Navn på forfatter"
        />
      </div>

      {/* Tags */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Tagger</h3>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
            className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E86C1F] focus:border-transparent transition-all text-sm"
            placeholder="Legg til tag..."
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
          >
            Legg til
          </button>
        </div>

        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-[#E86C1F]/10 text-[#E86C1F] rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-[#E86C1F]/70"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* SEO */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">SEO</h3>

        <div className="space-y-4">
          <FormField label="Meta-tittel">
            <TextInput
              value={formData.metaTitle || ''}
              onChange={(v) => onChange('metaTitle', v)}
              placeholder="Valgfri SEO-tittel"
              className="text-sm"
            />
          </FormField>
          <FormField label="Meta-beskrivelse">
            <TextArea
              value={formData.metaDescription || ''}
              onChange={(v) => onChange('metaDescription', v)}
              placeholder="Valgfri SEO-beskrivelse"
              rows={2}
              className="text-sm"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}
