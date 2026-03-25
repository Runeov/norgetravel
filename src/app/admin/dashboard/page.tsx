import Link from 'next/link';
import { Users, FileText, Plus, ArrowRight } from 'lucide-react';
import { getAllEmployeesSorted } from '@/lib/admin/employees';
import { getAllArticlesSorted } from '@/lib/admin/articles';

export default async function AdminDashboard() {
  const employees = await getAllEmployeesSorted();
  const articles = await getAllArticlesSorted();
  
  const publishedArticles = articles.filter(a => a.status === 'published');
  const draftArticles = articles.filter(a => a.status === 'draft');
  const activeEmployees = employees.filter(e => e.isActive);
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Velkommen til Averdi administrasjonspanel</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Employees */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-3xl font-bold text-slate-900">{activeEmployees.length}</span>
          </div>
          <h3 className="font-medium text-slate-700">Aktive ansatte</h3>
          <p className="text-sm text-slate-500">{employees.length} totalt</p>
        </div>
        
        {/* Published Articles */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-3xl font-bold text-slate-900">{publishedArticles.length}</span>
          </div>
          <h3 className="font-medium text-slate-700">Publiserte artikler</h3>
          <p className="text-sm text-slate-500">{articles.length} totalt</p>
        </div>
        
        {/* Draft Articles */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-3xl font-bold text-slate-900">{draftArticles.length}</span>
          </div>
          <h3 className="font-medium text-slate-700">Utkast</h3>
          <p className="text-sm text-slate-500">Venter på publisering</p>
        </div>
        
        {/* Quick Add */}
        <div className="bg-gradient-to-br from-[#E86C1F] to-[#F4B223] rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="font-medium">Legg til innhold</h3>
          <div className="flex gap-2 mt-3">
            <Link 
              href="/admin/employees/new"
              className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors"
            >
              Ny ansatt
            </Link>
            <Link 
              href="/admin/articles/new"
              className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors"
            >
              Ny artikkel
            </Link>
          </div>
        </div>
      </div>
      
      {/* Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Employees */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Ansatte</h2>
            <Link 
              href="/admin/employees"
              className="text-sm text-[#E86C1F] hover:underline flex items-center gap-1"
            >
              Se alle <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {employees.slice(0, 5).map((employee) => (
              <Link
                key={employee.id}
                href={`/admin/employees/${employee.id}`}
                className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E86C1F] to-[#F4B223] flex items-center justify-center text-white font-bold text-sm">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 truncate">{employee.name}</p>
                  <p className="text-sm text-slate-500 truncate">{employee.role}</p>
                </div>
                {!employee.isActive && (
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-500">
                    Inaktiv
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Recent Articles */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Artikler</h2>
            <Link 
              href="/admin/articles"
              className="text-sm text-[#E86C1F] hover:underline flex items-center gap-1"
            >
              Se alle <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {articles.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p>Ingen artikler ennå</p>
                <Link 
                  href="/admin/articles/new"
                  className="text-[#E86C1F] hover:underline text-sm mt-2 inline-block"
                >
                  Opprett din første artikkel
                </Link>
              </div>
            ) : (
              articles.slice(0, 5).map((article) => (
                <Link
                  key={article.id}
                  href={`/admin/articles/${article.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{article.title}</p>
                    <p className="text-sm text-slate-500 truncate">{article.excerpt}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    article.status === 'published' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {article.status === 'published' ? 'Publisert' : 'Utkast'}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
