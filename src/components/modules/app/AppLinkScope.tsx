'use client';

import type { ReactNode } from 'react';
import { LinkRewriteProvider } from '@/components/LinkRewrite';
import { appHref } from '@/lib/app/model';

/** Wraps the app so shared components' site links open app screens. */
export function AppLinkScope({ children }: { children: ReactNode }) {
  return <LinkRewriteProvider rewrite={appHref}>{children}</LinkRewriteProvider>;
}
