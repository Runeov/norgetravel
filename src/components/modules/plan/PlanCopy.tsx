'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { PLAN_UI_EN } from '@/i18n/plan-ui/en';
import type { PlanUiCopy } from '@/i18n/plan-ui/types';

// English unless a page provides another language, so the site's planner
// pages render as they always have and ship only the English text.
const PlanCopyContext = createContext<PlanUiCopy>(PLAN_UI_EN);

/** Sets the language of the planner components inside it. */
export function PlanCopyProvider({ copy, children }: { copy: PlanUiCopy; children: ReactNode }) {
  return <PlanCopyContext.Provider value={copy}>{children}</PlanCopyContext.Provider>;
}

export const usePlanCopy = (): PlanUiCopy => useContext(PlanCopyContext);
