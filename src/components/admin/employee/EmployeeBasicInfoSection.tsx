'use client';

import { Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import FormField, { TextInput, TextArea, SelectInput, Checkbox } from '../shared/FormField';
import type { EmployeeFormData } from './useEmployeeForm';

interface EmployeeBasicInfoSectionProps {
  formData: EmployeeFormData;
  onChange: (name: keyof EmployeeFormData, value: string | boolean) => void;
}

const OFFICE_OPTIONS = [
  { value: 'karasjok', label: 'Karasjok' },
  { value: 'tana', label: 'Tana' },
  { value: 'hammerfest', label: 'Hammerfest' },
];

export default function EmployeeBasicInfoSection({
  formData,
  onChange,
}: EmployeeBasicInfoSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Name */}
      <FormField label="Navn" required>
        <TextInput
          value={formData.name}
          onChange={(v) => onChange('name', v)}
          placeholder="Ola Nordmann"
          required
        />
      </FormField>

      {/* Role */}
      <FormField label="Rolle" required>
        <TextInput
          value={formData.role}
          onChange={(v) => onChange('role', v)}
          placeholder="Regnskapsfører"
          required
        />
      </FormField>

      {/* Email */}
      <FormField label="E-post" required>
        <TextInput
          value={formData.email}
          onChange={(v) => onChange('email', v)}
          placeholder="name@norgetravel.com"
          type="email"
          required
        />
      </FormField>

      {/* Phone */}
      <FormField label="Telefon" required>
        <TextInput
          value={formData.phone}
          onChange={(v) => onChange('phone', v)}
          placeholder="900 00 000"
          type="tel"
          required
        />
      </FormField>

      {/* Office */}
      <FormField label="Kontor">
        <SelectInput
          value={formData.office}
          onChange={(v) => onChange('office', v)}
          options={OFFICE_OPTIONS}
        />
      </FormField>

      {/* Experience */}
      <FormField label="Erfaring">
        <TextInput
          value={formData.experience}
          onChange={(v) => onChange('experience', v)}
          placeholder="10+ år"
        />
      </FormField>

      {/* Image URL */}
      <FormField
        label="Bilde URL"
        hint="Relativ sti til bildet i public-mappen"
        className="md:col-span-2"
      >
        <div className="relative">
          <TextInput
            value={formData.image}
            onChange={(v) => onChange('image', v)}
            placeholder="/images/employees/ola.jpg"
          />
          <ImageIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        </div>
      </FormField>

      {/* Description */}
      <FormField label="Kort beskrivelse" required className="md:col-span-2">
        <TextArea
          value={formData.description}
          onChange={(v) => onChange('description', v)}
          placeholder="En kort beskrivelse som vises på kortet..."
          rows={2}
          required
        />
      </FormField>

      {/* Long Description */}
      <FormField
        label="Lang beskrivelse"
        hint="Støtter **markdown** for fet tekst"
        className="md:col-span-2"
      >
        <TextArea
          value={formData.longDescription}
          onChange={(v) => onChange('longDescription', v)}
          placeholder="En mer detaljert beskrivelse som vises når man klikker 'Les mer'..."
          rows={5}
        />
      </FormField>

      {/* Specialties */}
      <FormField label="Spesialområder" className="md:col-span-2">
        <TextInput
          value={formData.specialties}
          onChange={(v) => onChange('specialties', v)}
          placeholder="Regnskap, Lønn, Rådgivning (kommaseparert)"
        />
      </FormField>

      {/* Education */}
      <FormField label="Utdanning">
        <TextInput
          value={formData.education}
          onChange={(v) => onChange('education', v)}
          placeholder="Statsautorisert regnskapsfører (kommaseparert)"
        />
      </FormField>

      {/* Languages */}
      <FormField label="Språk">
        <TextInput
          value={formData.languages}
          onChange={(v) => onChange('languages', v)}
          placeholder="Norsk, Nordsamisk (kommaseparert)"
        />
      </FormField>

      {/* Client Types */}
      <FormField label="Klienttyper">
        <TextInput
          value={formData.clientTypes}
          onChange={(v) => onChange('clientTypes', v)}
          placeholder="Småbedrifter, Foreninger (kommaseparert)"
        />
      </FormField>

      {/* Working Hours */}
      <FormField label="Arbeidstid">
        <TextInput
          value={formData.workingHours}
          onChange={(v) => onChange('workingHours', v)}
          placeholder="Man-Fre: 08:00-16:00"
        />
      </FormField>

      {/* Active Status */}
      <div className="md:col-span-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => onChange('isActive', e.target.checked)}
            className="w-5 h-5 rounded border-slate-300 text-[#E86C1F] focus:ring-[#E86C1F]"
          />
          <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
            {formData.isActive ? (
              <>
                <Eye className="w-4 h-4 text-green-600" />
                Synlig på nettsiden
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4 text-slate-400" />
                Skjult fra nettsiden
              </>
            )}
          </span>
        </label>
      </div>
    </div>
  );
}
