'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import type { KunnskapsbankSectionId } from '@/lib/schemas/kunnskapsbank.schema';

interface ToggleKunnskapsbankPublishButtonProps {
  sectionId: KunnskapsbankSectionId;
  sectionTitle: string;
  isPublished: boolean;
}

export default function ToggleKunnskapsbankPublishButton({
  sectionId,
  sectionTitle,
  isPublished,
}: ToggleKunnskapsbankPublishButtonProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async () => {
    setIsUpdating(true);

    try {
      const response = await fetch('/api/admin/kunnskapsbank', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: sectionId,
          isPublished: !isPublished,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || 'Kunne ikke oppdatere publisering');
        return;
      }

      router.refresh();
    } catch (error) {
      console.error('Toggle publish error:', error);
      alert('Kunne ikke oppdatere publisering');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isUpdating}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 ${
        isPublished
          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          : 'bg-green-100 text-green-700 hover:bg-green-200'
      }`}
      title={`${isPublished ? 'Avpubliser' : 'Publiser'} "${sectionTitle}"`}
    >
      {isUpdating ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : isPublished ? (
        <EyeOff className="w-3.5 h-3.5" />
      ) : (
        <Eye className="w-3.5 h-3.5" />
      )}
      {isPublished ? 'Avpubliser' : 'Publiser'}
    </button>
  );
}
