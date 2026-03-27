import { NextRequest, NextResponse } from 'next/server';
import { getArticle } from '@/lib/admin/articles';
import { generateSocialMediaPosts, validatePost } from '@/lib/ai/social-media-generator';

export function generateStaticParams() { return []; }

/**
 * POST /api/admin/articles/[id]/social-media
 *
 * Generate social media posts for a published article
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get the article
    const article = await getArticle(id);
    
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Artikkel ikke funnet' },
        { status: 404 }
      );
    }
    
    // Check if article is published
    if (article.status !== 'published') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Kan kun generere innlegg for publiserte artikler' 
        },
        { status: 400 }
      );
    }
    
    // Generate social media posts
    const posts = await generateSocialMediaPosts(article);
    
    // Validate generated posts
    const linkedinValidation = validatePost(posts.linkedin);
    const facebookValidation = validatePost(posts.facebook);
    
    if (!linkedinValidation.valid || !facebookValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Genererte innlegg validerte ikke',
          details: {
            linkedin: linkedinValidation.errors,
            facebook: facebookValidation.errors,
          },
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: posts,
    });
    
  } catch (error) {
    console.error('Error generating social media posts:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Kunne ikke generere sosiale medier-innlegg',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
