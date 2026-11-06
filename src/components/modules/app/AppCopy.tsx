'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { AppClientCopy } from '@/i18n/app-copy';

const CopyContext = createContext<AppClientCopy | null>(null);

/** Puts the page language's app text in reach of the app's client components. */
export function AppCopyProvider({ copy, children }: { copy: AppClientCopy; children: ReactNode }) {
  return <CopyContext.Provider value={copy}>{children}</CopyContext.Provider>;
}

export function useAppCopy(): AppClientCopy {
  const copy = useContext(CopyContext);
  if (!copy) throw new Error('useAppCopy is used outside the app layout');
  return copy;
}
