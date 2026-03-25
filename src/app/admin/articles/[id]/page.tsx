import { notFound } from 'next/navigation';
import { getArticle } from '@/lib/admin/articles';
import ArticleForm from '@/components/admin/article/ArticleForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = await getArticle(id);
  
  if (!article) {
    notFound();
  }
  
  return <ArticleForm article={article} />;
}
