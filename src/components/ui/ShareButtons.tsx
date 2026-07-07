'use client';

import { useState, useEffect } from 'react';
import { Facebook, Linkedin, Mail, MessageCircle, Link2, Check, Share2 } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  label?: string;
  className?: string;
}

const SITE = 'https://norgetravel.com';

export function ShareButtons({ url, title, label = 'Share this page', className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [hasNativeShare, setHasNativeShare] = useState(false);

  const fullUrl = url.startsWith('http') ? url : `${SITE}${url.startsWith('/') ? url : `/${url}`}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      setHasNativeShare(true);
    }
  }, []);

  const targets = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
    },
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: XIcon,
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: MessageCircle,
    },
    {
      name: 'LINE',
      href: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
      icon: LineIcon,
    },
    {
      name: 'Email',
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: Mail,
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked — no-op
    }
  }

  async function handleNativeShare() {
    try {
      await navigator.share({
        title,
        text: title,
        url: fullUrl,
      });
    } catch {
      // User cancelled or share failed — no-op
    }
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {label && <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</span>}
      <div className="flex items-center gap-2">
        {targets.map(({ name, href, icon: Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${name}`}
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-slate-200 bg-white text-slate-600 hover:border-[#1A365D] hover:text-[#1A365D] hover:bg-slate-50 transition-colors"
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
          </a>
        ))}
        
        <button
          type="button"
          onClick={copy}
          aria-label="Copy link"
          className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-slate-200 bg-white text-slate-600 hover:border-[#1A365D] hover:text-[#1A365D] hover:bg-slate-50 transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-[#00D084]" aria-hidden="true" />
          ) : (
            <Link2 className="w-4 h-4" aria-hidden="true" />
          )}
        </button>

        {hasNativeShare && (
          <button
            type="button"
            onClick={handleNativeShare}
            aria-label="Share via system panel"
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-slate-200 bg-white text-slate-600 hover:border-[#1A365D] hover:text-[#1A365D] hover:bg-slate-50 transition-colors"
          >
            <Share2 className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LineIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738s-12 4.369-12 9.738c0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.302.079.778.038 1.087l-.164 1.037c-.05.316-.242 1.235 1.04 0 1.282-1.235 6.945-8.243 7.465-10.785.498-2.435.528-4.496.528-6.199zm-15.342.923h-2.1v-4.148c0-.285-.233-.518-.518-.518h-.518c-.285 0-.518.233-.518.518v5.184c0 .285.233.518.518.518h3.636c.285 0 .518-.233.518-.518v-.518c0-.285-.233-.518-.518-.518zm3.265-4.666c-.285 0-.518.233-.518.518v5.184c0 .285.233.518.518.518h.518c.285 0 .518-.233.518-.518v-5.184c0-.285-.233-.518-.518-.518zm5.787 0h-.518c-.285 0-.518.233-.518.518v3.018l-2.47-3.284a.519.519 0 0 0-.414-.208h-.615a.518.518 0 0 0-.518.518v5.184c0 .285.233.518.518.518h.518c.285 0 .518-.233.518-.518v-3.018l2.47 3.284a.519.519 0 0 0-.518-.518zm4.492 0h-3.636c-.285 0-.518.233-.518.518v5.184c0 .285.233.518.518.518h3.636c.285 0 .518-.233.518-.518v-.518c0-.285-.233-.518-.518-.518h-3.118v-.982h2.518c.285 0 .518-.233.518-.518v-.518c0-.285-.233-.518-.518-.518h-2.518v-.982h3.118c.285 0 .518-.233.518-.518v-.518c0-.285-.233-.518-.518-.518z" />
    </svg>
  );
}
