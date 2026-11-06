'use client';

import { createContext, useContext, type ReactNode } from 'react';

type Rewrite = (href: string) => string;

const LinkRewriteContext = createContext<Rewrite | null>(null);

/**
 * Lets a section of the site send shared components' links somewhere else.
 * The /app section uses it so the planner, saved items and article bodies
 * open app screens instead of the site pages they link to. Outside a
 * provider, links are left alone.
 */
export function LinkRewriteProvider({ rewrite, children }: { rewrite: Rewrite; children: ReactNode }) {
  return <LinkRewriteContext.Provider value={rewrite}>{children}</LinkRewriteContext.Provider>;
}

export const useLinkRewrite = (): Rewrite | null => useContext(LinkRewriteContext);
