import { NextRequest, NextResponse } from 'next/server';
import { getAllArticlesSorted, createArticle } from '@/lib/admin/articles';
import { getAdminReadOnlyResponse } from '@/lib/admin/write-access';
import type { ArticleFormData } from '@/types/admin';

// GET /api/admin/articles - List all articles
export async function GET() {
  try {
    const articles = await getAllArticlesSorted();
    return NextResponse.json({ success: true, data: articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { success: false, error: 'Kunne ikke hente artikler' },
      { status: 500 }
    );
  }
}

// POST /api/admin/articles - Create new article
export async function POST(request: NextRequest) {
  try {
    const readOnlyResponse = getAdminReadOnlyResponse();
    if (readOnlyResponse) {
      return readOnlyResponse;
    }

    const body: ArticleFormData = await request.json();
    
    // Validate required fields
    if (!body.title || !body.excerpt || !body.content || !body.slug) {
      return NextResponse.json(
        { success: false, error: 'Tittel, utdrag, innhold og slug er påkrevd' },
        { status: 400 }
      );
    }
    
    const article = await createArticle({
      title: body.title,
      slug: body.slug,
      subtitle: body.subtitle || undefined,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      tags: body.tags,
      readTime: body.readTime || 5,
      authorId: body.authorId || 'admin',
      authorName: body.authorName || undefined,
      featuredImage: body.featuredImage || null,
      featuredImageAlt: body.featuredImageAlt || null,
      metaTitle: body.metaTitle || undefined,
      metaDescription: body.metaDescription || undefined,
      status: body.status,
      isFeatured: body.isFeatured || false,
    });
    
    return NextResponse.json({ success: true, data: article }, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { success: false, error: 'Kunne ikke opprette artikkel' },
      { status: 500 }
    );
  }
}
