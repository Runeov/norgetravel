'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2, X, AlertTriangle } from 'lucide-react';

interface DeleteEmployeeButtonProps {
  id: string;
  name: string;
}

export default function DeleteEmployeeButton({ id, name }: DeleteEmployeeButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/admin/employees/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        router.refresh();
        setIsOpen(false);
      } else {
        alert('Kunne ikke slette ansatt');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('En feil oppstod');
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Slett"
      >
        <Trash2 className="w-4 h-4" />
      </button>
      
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => !isDeleting && setIsOpen(false)}
          />
          
          {/* Dialog */}
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <button
              onClick={() => setIsOpen(false)}
              disabled={isDeleting}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Slett ansatt</h3>
                <p className="text-sm text-slate-500">Denne handlingen kan ikke angres</p>
              </div>
            </div>
            
            <p className="text-slate-600 mb-6">
              Er du sikker på at du vil slette <strong>{name}</strong>? 
              Denne handlingen vil fjerne all informasjon om den ansatte permanent.
            </p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
              >
                Avbryt
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sletter...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Slett
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
