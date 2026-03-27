import { NextRequest, NextResponse } from 'next/server';
import { getArticle, updateArticle, deleteArticle } from '@/lib/admin/articles';
import { getAdminReadOnlyResponse } from '@/lib/admin/write-access';
import type { ArticleFormData } from '@/types/admin';

export const dynamic = 'force-static';
export function generateStaticParams() { return []; }

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/admin/articles/[id] - Get single article
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const article = await getArticle(id);
    
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Artikkel ikke funnet' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { success: false, error: 'Kunne ikke hente artikkel' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/articles/[id] - Update article
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const readOnlyResponse = getAdminReadOnlyResponse();
    if (readOnlyResponse) {
      return readOnlyResponse;
    }

    const { id } = await params;
    const body: ArticleFormData = await request.json();
    
    // Validate required fields
    if (!body.title || !body.excerpt || !body.content || !body.slug) {
      return NextResponse.json(
        { success: false, error: 'Tittel, utdrag, innhold og slug er påkrevd' },
        { status: 400 }
      );
    }
    
    const article = await updateArticle(id, {
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
    
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Artikkel ikke funnet' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { success: false, error: 'Kunne ikke oppdatere artikkel' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/articles/[id] - Delete article
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const readOnlyResponse = getAdminReadOnlyResponse();
    if (readOnlyResponse) {
      return readOnlyResponse;
    }

    const { id } = await params;
    const success = await deleteArticle(id);
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Artikkel ikke funnet' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { success: false, error: 'Kunne ikke slette artikkel' },
      { status: 500 }
    );
  }
}
