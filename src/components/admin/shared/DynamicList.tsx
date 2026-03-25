'use client';

import { ReactNode } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface DynamicListProps<T> {
  items: T[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  renderItem: (item: T, index: number, update: (field: keyof T, value: T[keyof T]) => void) => ReactNode;
  title: string;
  description?: string;
  addLabel?: string;
  emptyIcon?: ReactNode;
  emptyMessage?: string;
}

export default function DynamicList<T>({
  items,
  onAdd,
  onRemove,
  renderItem,
  title,
  description,
  addLabel = 'Legg til',
  emptyIcon,
  emptyMessage = 'Ingen elementer lagt til',
}: DynamicListProps<T>) {
  const handleUpdate = (index: number) => (field: keyof T, value: T[keyof T]) => {
    // This is handled by the parent through renderItem
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {description && (
            <p className="text-sm text-slate-500 mt-1">{description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#E86C1F] bg-[#E86C1F]/10 rounded-xl hover:bg-[#E86C1F]/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {addLabel}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
          {emptyIcon && (
            <div className="flex justify-center mb-4">
              {emptyIcon}
            </div>
          )}
          <p className="text-slate-500">{emptyMessage}</p>
          <button
            type="button"
            onClick={onAdd}
            className="mt-4 text-sm text-[#E86C1F] hover:underline"
          >
            {addLabel}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200"
            >
              <div className="flex-1">
                {renderItem(item, index, handleUpdate(index))}
              </div>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
