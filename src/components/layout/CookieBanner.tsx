'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from '@/components/LocalizedLink';
import { Hotjar } from '@/components/analytics/Hotjar';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { asLocale } from '@/lib/i18n-seo';

type ConsentValue = 'all' | 'necessary' | null;

const COPY = {
  en: {
    label: 'Cookies',
    text: 'We use cookies to measure traffic and improve the site. Read more in our ',
    policy: 'privacy policy',
    after: '.',
    necessary: 'Necessary only',
    acceptAll: 'Accept all',
  },
  zh: {
    label: 'Cookie 设置',
    text: '我们使用 Cookie 统计访问量并改进网站。详情请见我们的',
    policy: '隐私政策',
    after: '。',
    necessary: '仅限必要',
    acceptAll: '全部接受',
  },
  ja: {
    label: 'Cookie の設定',
    text: '当サイトでは、アクセスの計測とサイト改善のために Cookie を使用しています。詳しくは',
    policy: 'プライバシーポリシー',
    after: 'をご覧ください。',
    necessary: '必要なもののみ',
    acceptAll: 'すべて許可',
  },
} as const;

export function CookieBanner() {
  const params = useParams<{ lang?: string }>();
  const copy = COPY[asLocale(params?.lang)];
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('cookie-consent') as ConsentValue;
    if (stored === 'all' || stored === 'necessary') {
      setConsent(stored);
    } else {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'all');
    setConsent('all');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('cookie-consent', 'necessary');
    setConsent('necessary');
    setVisible(false);
  };

  // Avoid SSR mismatch — render nothing until hydrated
  if (!mounted) return null;

  return (
    <>
      {consent === 'all' && (
        <>
          <Hotjar hjid={process.env.NEXT_PUBLIC_HOTJAR_ID || ''} />
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
        </>
      )}

      {visible && (
        <div
          role="dialog"
          aria-label={copy.label}
          className="fixed bottom-0 left-0 right-0 z-50 bg-slate-800 text-slate-100 shadow-lg"
        >
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="flex-1 text-sm leading-relaxed text-slate-300">
              {copy.text}
              <Link href="/personvern" className="underline hover:text-[#E86C1F] transition-colors">
                {copy.policy}
              </Link>
              {copy.after}
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={reject}
                className="px-4 py-2 text-sm rounded border border-slate-500 text-slate-300 hover:bg-slate-700 transition-colors"
              >
                {copy.necessary}
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 text-sm rounded bg-[#E86C1F] text-white font-medium hover:bg-[#E86C1F]/90 transition-colors"
              >
                {copy.acceptAll}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
