'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Hotjar } from '@/components/analytics/Hotjar';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';

type ConsentValue = 'all' | 'necessary' | null;

export function CookieBanner() {
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
          aria-label="Informasjonskapsler"
          className="fixed bottom-0 left-0 right-0 z-50 bg-slate-800 text-slate-100 shadow-lg"
        >
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="flex-1 text-sm leading-relaxed text-slate-300">
              Vi bruker informasjonskapsler (cookies) for å analysere trafikk og forbedre nettsiden.
              Les mer i vår{' '}
              <Link href="/personvern" className="underline hover:text-[#E86C1F] transition-colors">
                personvernerklæring
              </Link>
              .
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={reject}
                className="px-4 py-2 text-sm rounded border border-slate-500 text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Kun nødvendige
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 text-sm rounded bg-[#E86C1F] text-white font-medium hover:bg-[#E86C1F]/90 transition-colors"
              >
                Godta alle
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
