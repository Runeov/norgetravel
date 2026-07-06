import { getAllKunnskapsbankSectionsSorted } from '@/lib/admin/travel-guides-sections';
import { getArticles } from '@/lib/admin/articles';
import AdminTravelGuidesDashboard from '@/components/admin/travel-guides/AdminTravelGuidesDashboard';

export const dynamic = 'force-static';

export default async function AdminKunnskapsbankPage() {
  const sections = await getAllKunnskapsbankSectionsSorted();
  const articles = await getArticles();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Travel Guides Management</h1>
          <p className="text-slate-500 text-sm mt-1">
            Monitor and manage your guide content pipeline, social media outreach, and traffic analytics.
          </p>
        </div>
      </div>

      <AdminTravelGuidesDashboard sections={sections} articles={articles} />
    </div>
  );
}
