'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, Loader2 } from 'lucide-react';
import Link from 'next/link';
import ArticleContentSection from './ArticleContentSection';
import ArticleMetaSection from './ArticleMetaSection';
import SocialMediaPostsPanel from './SocialMediaPostsPanel';
import type { Article, ArticleFormData, ArticleCategory, ArticleStatus } from '@/types/admin';

interface ArticleFormProps {
  article?: Article;
}

export default function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();
  const isEditing = !!article;

  const [formData, setFormData] = useState<ArticleFormData>({
    title: article?.title || '',
    slug: article?.slug || '',
    subtitle: article?.subtitle || '',
    excerpt: article?.excerpt || '',
    content: article?.content || '',
    category: article?.category || 'analyse',
    tags: article?.tags || [],
    readTime: article?.readTime || 5,
    authorId: article?.authorId || '',
    authorName: article?.authorName || '',
    featuredImage: article?.featuredImage || undefined,
    featuredImageAlt: article?.featuredImageAlt || undefined,
    metaTitle: article?.metaTitle || '',
    metaDescription: article?.metaDescription || '',
    status: article?.status || 'draft',
    isFeatured: article?.isFeatured || false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    field: keyof ArticleFormData,
    value: string | number | boolean | string[] | undefined
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = isEditing
        ? `/api/admin/articles/${article.id}`
        : '/api/admin/articles';

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Noe gikk galt');
      }

      router.push('/admin/articles');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Noe gikk galt');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/articles"
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {isEditing ? 'Rediger artikkel' : 'Ny artikkel'}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {isEditing ? 'Oppdater artikkelen' : 'Opprett en ny artikkel'}
            </p>
          </div>
        </div>

        {isEditing && article.status === 'published' && (
          <Link
            href={`/kunnskapsbank/${article.category}/${article.slug}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Se artikkel
          </Link>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <ArticleContentSection
            formData={formData}
            onChange={handleChange}
            isEditing={isEditing}
          />

          {/* Sidebar */}
          <ArticleMetaSection
            formData={formData}
            onChange={handleChange}
            article={article}
          />
        </div>

        {/* Social Media Posts Panel (only for editing published articles) */}
        {isEditing && article && (
          <SocialMediaPostsPanel
            articleId={article.id}
            articleStatus={article.status}
          />
        )}

        {/* Submit button */}
        <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
          <Link
            href="/admin/articles"
            className="px-6 py-3 text-slate-600 font-medium rounded-xl hover:bg-slate-100 transition-colors"
          >
            Avbryt
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#E86C1F] to-[#F4B223] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#E86C1F]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Lagrer...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {isEditing ? 'Oppdater artikkel' : 'Opprett artikkel'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
