'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { localizeHref } from '@/lib/i18n-href';

/** useRouter() whose push/replace keep the visitor's language on site-internal paths. */
export function useLocalizedRouter() {
  const router = useRouter();
  const params = useParams<{ lang?: string }>();
  const lang = params?.lang;
  return useMemo(
    () => ({
      ...router,
      push: (href: string, options?: Parameters<typeof router.push>[1]) =>
        router.push(localizeHref(href, lang), options),
      replace: (href: string, options?: Parameters<typeof router.replace>[1]) =>
        router.replace(localizeHref(href, lang), options),
    }),
    [router, lang]
  );
}
