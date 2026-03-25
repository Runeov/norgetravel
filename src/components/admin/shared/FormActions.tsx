'use client';

import { Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface FormActionsProps {
  isSubmitting?: boolean;
  cancelUrl?: string;
  onCancel?: () => void;
  submitLabel?: string;
  submittingLabel?: string;
  cancelLabel?: string;
}

export default function FormActions({
  isSubmitting = false,
  cancelUrl,
  onCancel,
  submitLabel = 'Lagre',
  submittingLabel = 'Lagrer...',
  cancelLabel = 'Avbryt',
}: FormActionsProps) {
  return (
    <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-200">
      {cancelUrl ? (
        <Link
          href={cancelUrl}
          className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
        >
          {cancelLabel}
        </Link>
      ) : onCancel ? (
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
        >
          {cancelLabel}
        </button>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#E86C1F] to-[#F4B223] rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#E86C1F]/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {submittingLabel}
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            {submitLabel}
          </>
        )}
      </button>
    </div>
  );
}
