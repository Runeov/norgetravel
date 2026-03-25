'use client';

import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FormHeaderProps {
  title: string;
  subtitle?: string;
  isSubmitting?: boolean;
  onSave?: () => void;
  backUrl?: string;
  saveLabel?: string;
  savingLabel?: string;
}

export default function FormHeader({
  title,
  subtitle,
  isSubmitting = false,
  onSave,
  backUrl,
  saveLabel = 'Lagre',
  savingLabel = 'Lagrer...',
}: FormHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleBack}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {subtitle && (
            <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
          )}
        </div>
      </div>

      {onSave && (
        <button
          type="submit"
          disabled={isSubmitting}
          onClick={onSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#E86C1F] to-[#F4B223] rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#E86C1F]/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {savingLabel}
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {saveLabel}
            </>
          )}
        </button>
      )}
    </div>
  );
}
