'use client';

import { useState } from 'react';
import { Facebook, Linkedin, Mail, MessageCircle, Link2, Check } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  label?: string;
  className?: string;
}

const SITE = 'https://norgetravel.com';

export function ShareButtons({ url, title, label = 'Share this page', className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = url.startsWith('http') ? url : `${SITE}${url.startsWith('/') ? url : `/${url}`}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

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

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</span>
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
