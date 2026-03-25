'use client';

import { useState } from 'react';
import { Loader2, Share2, Copy, Check, Sparkles } from 'lucide-react';
import type { SocialMediaPostSet } from '@/lib/ai/social-media-generator';

interface SocialMediaPostsPanelProps {
  articleId: string;
  articleStatus: 'draft' | 'published';
}

export default function SocialMediaPostsPanel({
  articleId,
  articleStatus,
}: SocialMediaPostsPanelProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [posts, setPosts] = useState<SocialMediaPostSet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/articles/${articleId}/social-media`, {
        method: 'POST',
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Kunne ikke generere innlegg');
      }

      setPosts(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'En feil oppstod');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async (platform: 'linkedin' | 'facebook', content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedPlatform(platform);
      setTimeout(() => setCopiedPlatform(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (articleStatus !== 'published') {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Share2 className="w-5 h-5 text-slate-400" />
          <h3 className="text-lg font-semibold text-slate-900">
            Sosiale medier-innlegg
          </h3>
        </div>
        <p className="text-sm text-slate-500">
          Publiser artikkelen først for å generere sosiale medier-innlegg.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Share2 className="w-5 h-5 text-[#E86C1F]" />
          <h3 className="text-lg font-semibold text-slate-900">
            Sosiale medier-innlegg
          </h3>
        </div>
        
        {!posts && (
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E86C1F] to-[#F4B223] text-white rounded-full font-medium text-sm hover:shadow-lg hover:shadow-[#E86C1F]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Genererer...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generer innlegg
              </>
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {!posts && !error && (
        <div className="text-center py-8">
          <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500">
            Klikk "Generer innlegg" for å lage LinkedIn og Facebook-innlegg basert på artikkelen.
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Innleggene følger Averdi's voice architecture (TANGEN-modus)
          </p>
        </div>
      )}

      {posts && (
        <div className="space-y-6">
          {/* LinkedIn Post */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-[#0A66C2] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-white font-semibold text-sm">LinkedIn</span>
              </div>
              <button
                onClick={() => handleCopy('linkedin', posts.linkedin.content)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-md text-xs font-medium transition-colors"
              >
                {copiedPlatform === 'linkedin' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Kopiert!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Kopier
                  </>
                )}
              </button>
            </div>
            <div className="p-4 bg-slate-50">
              <div className="whitespace-pre-wrap text-sm text-slate-700 mb-3">
                {posts.linkedin.content}
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {posts.linkedin.hashtags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-[#0A66C2] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-xs text-slate-400">
                {posts.linkedin.characterCount} tegn
              </div>
            </div>
          </div>

          {/* Facebook Post */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-[#1877F2] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-white font-semibold text-sm">Facebook</span>
              </div>
              <button
                onClick={() => handleCopy('facebook', posts.facebook.content)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-md text-xs font-medium transition-colors"
              >
                {copiedPlatform === 'facebook' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Kopiert!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Kopier
                  </>
                )}
              </button>
            </div>
            <div className="p-4 bg-slate-50">
              <div className="whitespace-pre-wrap text-sm text-slate-700 mb-3">
                {posts.facebook.content}
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {posts.facebook.hashtags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-[#1877F2] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-xs text-slate-400">
                {posts.facebook.characterCount} tegn
              </div>
            </div>
          </div>

          {/* Regenerate button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-[#E86C1F] font-medium transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              Generer på nytt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
