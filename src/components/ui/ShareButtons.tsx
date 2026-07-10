'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Facebook, Linkedin, Mail, MessageCircle, Link2, Check, Share2 } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  label?: string;
  className?: string;
}

const SITE = 'https://norgetravel.com';

export function ShareButtons({ url, title, label = 'Share this page', className = '' }: ShareButtonsProps) {
  const pathname = usePathname();
  const isChinese = pathname?.startsWith('/zh');

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

  type ShareTarget = {
    name: string;
    href: string;
    onClick?: (e: React.MouseEvent) => void;
    icon: any;
  };

  const westernTargets: ShareTarget[] = [
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

  const chineseTargets: ShareTarget[] = [
    {
      name: 'Weibo',
      href: `http://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedTitle}`,
      icon: WeiboIcon,
    },
    {
      name: 'WeChat',
      href: '#',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        copy();
      },
      icon: WeChatIcon,
    },
    {
      name: 'Xiaohongshu',
      href: '#',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        copy();
      },
      icon: XiaohongshuIcon,
    },
    {
      name: 'Email',
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: Mail,
    },
  ];

  const targets = isChinese ? chineseTargets : westernTargets;

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
        {targets.map((target) => (
          <a
            key={target.name}
            href={target.href}
            onClick={target.onClick}
            target={target.href === '#' ? undefined : "_blank"}
            rel={target.href === '#' ? undefined : "noopener noreferrer"}
            aria-label={`Share on ${target.name}`}
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-slate-200 bg-white text-slate-600 hover:border-[#1A365D] hover:text-[#1A365D] hover:bg-slate-50 transition-colors"
          >
            <target.icon className="w-4 h-4" aria-hidden="true" />
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

function WeiboIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M10.15 16.31c-2.31.25-4.4-.95-4.66-2.67-.25-1.72 1.4-3.32 3.71-3.56 2.3-.24 4.4.95 4.65 2.67.26 1.71-1.39 3.32-3.7 3.56zm1.3-4.22c-.65-.11-1.37.19-1.63.68-.26.49-.07 1.07.5 1.25.59.18 1.34-.05 1.6-.54.27-.5.1-1.07-.47-1.39zm-2.07 2.1c-.13-.01-.26.04-.29.12-.03.09.05.17.18.18.12.02.24-.04.28-.13.03-.09-.05-.16-.17-.17zm11.75-5.96c-.4-.4-1.01-.6-1.74-.53-.45.04-.84.21-1.11.45-.63-.99-1.57-1.66-2.67-1.92-1.31-.3-2.69-.1-3.78.43-1.61-1.2-3.53-1.7-5.46-1.42C2.7 6.13.1 9.47.1 13.08c0 3.73 3.99 6.64 9.43 6.64 5.92 0 10.22-3.21 10.22-6.57 0-1.2-.55-2.28-1.46-3.11.66-.23 1.14-.65 1.36-1.16.38-.85.08-1.99-.52-2.65zm-1.1 2.37c-.12.28-.43.51-.83.65l-1.03.35.43.99c.35.8.18 1.54-.42 1.83-1.1.53-2.82-.4-4.82-1.9-2.05-1.53-3.05-2.93-2.39-3.79.46-.58 1.53-.51 2.76.08l1.04.5.31-1.1c.19-.71.6-1.1 1.06-1.04.66.08 1.13.88.94 1.84l-.23 1.16 1.05-.28c.63-.17 1.12-.13 1.38.12.25.24.28.69.05 1.15z" />
    </svg>
  );
}

function WeChatIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.5 13.8c3.6 0 6.5-2.4 6.5-5.3 0-2.9-2.9-5.3-6.5-5.3-3.6 0-6.5 2.4-6.5 5.3 0 2.9 2.9 5.3 6.5 5.3zm-2.2-6.6c.4 0 .8.3.8.7 0 .4-.3.7-.8.7-.4 0-.8-.3-.8-.7 0-.4.4-.7.8-.7zm4.3 0c.4 0 .8.3.8.7 0 .4-.4.7-.8.7-.4 0-.8-.3-.8-.7 0-.4.4-.7.8-.7zm-11.1 7.6c-4.1 0-7.5-2.8-7.5-6.3 0-3.5 3.4-6.3 7.5-6.3 4.1 0 7.5 2.8 7.5 6.3 0 3.5-3.4 6.3-7.5 6.3zm-2.5-7.9c.5 0 1 .4 1 .9 0 .5-.4.9-1 .9-.5 0-1-.4-1-.9 0-.5.5-.9 1-.9zm5 0c.5 0 1 .4 1 .9 0 .5-.4.9-1 .9-.5 0-1-.4-1-.9 0-.5.5-.9 1-.9zm4.2 9c0-.4.3-.8.8-.8.4 0 .8.4.8.8v2.7l3-1.6c.6.3 1.3.5 2 .5.4 0 .7-.1 1.1-.2-.6 2.3-3 4.1-5.8 4.1-3.3 0-5.9-2.3-5.9-5.1 0-.6.1-1.2.4-1.8l-1.3 1.8v-3.6c.2.2.4.4.7.6 1.1.9 2.5 1.5 4 1.5.1 0 .1 0 .2 0z" />
    </svg>
  );
}

function XiaohongshuIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16v16H4z" />
      <path d="M8 8l8 8" />
      <path d="M16 8l-8 8" />
    </svg>
  );
}
