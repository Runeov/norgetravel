import Link from 'next/link';
import { Plus, Edit, Eye, FileText } from 'lucide-react';
import { getAllArticlesSorted } from '@/lib/admin/articles';
import DeleteArticleButton from '@/components/admin/DeleteArticleButton';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/types/admin';

export default async function ArticlesPage() {
  const articles = await getAllArticlesSorted();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Artikler</h1>
          <p className="text-slate-500 text-sm mt-1">
            Administrer artikler og innsikt
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#E86C1F] to-[#F4B223] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#E86C1F]/30 transition-all"
        >
          <Plus className="w-5 h-5" />
          Ny artikkel
        </Link>
      </div>

      {/* Articles list */}
      {articles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Ingen artikler ennå
          </h3>
          <p className="text-slate-500 mb-6">
            Opprett din første artikkel for å komme i gang.
          </p>
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#E86C1F] to-[#F4B223] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#E86C1F]/30 transition-all"
          >
            <Plus className="w-5 h-5" />
            Opprett artikkel
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                    Tittel
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                    Kategori
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                    Forfatter
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
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900 truncate max-w-xs">
                            {article.title}
                          </p>
                          <p className="text-sm text-slate-500 truncate max-w-xs">
                            /{article.category}/{article.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${CATEGORY_COLORS[article.category]}`}>
                        {CATEGORY_LABELS[article.category]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {article.status === 'published' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Publisert
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                          Utkast
                        </span>
                      )}
                      {article.isFeatured && (
                        <span className="ml-2 inline-flex px-2 py-0.5 rounded text-xs font-medium bg-[#E86C1F]/10 text-[#E86C1F]">
                          Fremhevet
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">
                        {article.authorName || article.authorId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500">
                        {new Date(article.updatedAt).toLocaleDateString('nb-NO', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {article.status === 'published' && (
                          <Link
                            href={`/kunnskapsbank/${article.category}/${article.slug}`}
                            target="_blank"
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Se artikkel"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/articles/${article.id}`}
                          className="p-2 text-slate-400 hover:text-[#E86C1F] hover:bg-[#E86C1F]/10 rounded-lg transition-colors"
                          title="Rediger"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteArticleButton
                          articleId={article.id}
                          articleTitle={article.title}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Totalt</p>
          <p className="text-2xl font-bold text-slate-900">{articles.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Publisert</p>
          <p className="text-2xl font-bold text-green-600">
            {articles.filter(a => a.status === 'published').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Utkast</p>
          <p className="text-2xl font-bold text-slate-400">
            {articles.filter(a => a.status === 'draft').length}
          </p>
        </div>
      </div>
    </div>
  );
}
