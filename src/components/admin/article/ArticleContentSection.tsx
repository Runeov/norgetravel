'use client';

import FormField, { TextInput, TextArea } from '../shared/FormField';
import RichTextEditor from '../RichTextEditor';
import type { ArticleFormData } from '@/types/admin';

interface ArticleContentSectionProps {
  formData: ArticleFormData;
  onChange: (field: keyof ArticleFormData, value: string | number | boolean | string[] | undefined) => void;
  isEditing: boolean;
}

export default function ArticleContentSection({
  formData,
  onChange,
  isEditing,
}: ArticleContentSectionProps) {
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/æ/g, 'ae')
      .replace(/ø/g, 'o')
      .replace(/å/g, 'a')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTitleChange = (title: string) => {
    onChange('title', title);
    if (!isEditing) {
      onChange('slug', generateSlug(title));
    }
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Title */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <FormField label="Tittel" required>
          <TextInput
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="Skriv inn tittel..."
            required
            className="text-lg"
          />
        </FormField>
      </div>

      {/* Subtitle */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <FormField label="Undertittel">
          <TextInput
            value={formData.subtitle}
            onChange={(v) => onChange('subtitle', v)}
            placeholder="Valgfri undertittel..."
          />
        </FormField>
      </div>

      {/* Excerpt */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <FormField
          label="Utdrag"
          required
          hint="Vises i artikkeloversikten og søkeresultater"
        >
          <TextArea
            value={formData.excerpt}
            onChange={(v) => onChange('excerpt', v)}
            placeholder="Kort beskrivelse av artikkelen..."
            rows={3}
            required
          />
        </FormField>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Innhold <span className="text-red-500">*</span>
        </label>
        <RichTextEditor
          content={formData.content}
          onChange={(content) => onChange('content', content)}
          placeholder="Skriv artikkelen her..."
        />
      </div>
    </div>
  );
}
