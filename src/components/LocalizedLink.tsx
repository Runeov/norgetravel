'use client';

import NextLink from 'next/link';
import { useParams } from 'next/navigation';
import type { ComponentProps } from 'react';
import { localizeHref } from '@/lib/i18n-href';
import { useLinkRewrite } from '@/components/LinkRewrite';

/**
 * Drop-in replacement for next/link that keeps the visitor's language on
 * site-internal links, so "/destinations" renders as "/zh/destinations" on
 * the Chinese site instead of going through the locale redirect. Inside a
 * LinkRewriteProvider the path is rewritten first.
 */
export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const params = useParams<{ lang?: string }>();
  const rewrite = useLinkRewrite();
  const target = rewrite && typeof href === 'string' ? rewrite(href) : href;
  return <NextLink href={localizeHref(target, params?.lang)} {...props} />;
}
