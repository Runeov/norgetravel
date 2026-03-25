import Link from 'next/link';
import { BookOpen, Eye, ExternalLink } from 'lucide-react';
import { getAllKunnskapsbankSectionsSorted } from '@/lib/admin/kunnskapsbank';
import ToggleKunnskapsbankPublishButton from '@/components/admin/ToggleKunnskapsbankPublishButton';

export const dynamic = 'force-dynamic';

export default async function AdminKunnskapsbankPage() {
  const sections = await getAllKunnskapsbankSectionsSorted();
  const publishedCount = sections.filter((section) => section.isPublished).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kunnskapsbank</h1>
          <p className="text-slate-500 text-sm mt-1">
            Publiser og avpubliser hovedkategoriene i kunnskapsbanken.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                  Seksjon
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                  Path
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                  Oppdatert
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-900">
                  Handlinger
                </th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => (
                <tr
                  key={section.id}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{section.title}</p>
                        <p className="text-xs text-slate-500">{section.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm text-slate-600">{section.path}</code>
                  </td>
                  <td className="px-6 py-4">
                    {section.isPublished ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Publisert
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        Skjult
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">
                      {new Date(section.updatedAt).toLocaleDateString('nb-NO', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {section.isPublished && (
                        <Link
                          href={section.path}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                          title="Se side"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Se
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      )}
                      <ToggleKunnskapsbankPublishButton
                        sectionId={section.id}
                        sectionTitle={section.title}
                        isPublished={section.isPublished}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Totale seksjoner</p>
          <p className="text-2xl font-bold text-slate-900">{sections.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Publiserte</p>
          <p className="text-2xl font-bold text-green-600">{publishedCount}</p>
        </div>
      </div>
    </div>
  );
}
