import ArticleForm from '@/components/admin/article/ArticleForm';
import { getArticle } from '@/lib/admin/articles';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <ArticleForm article={article} />
    </div>
  );
}
