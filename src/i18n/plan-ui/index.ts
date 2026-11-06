import type { Locale } from '@/lib/i18n-seo';
import { PLAN_UI_EN } from './en';
import { PLAN_UI_JA } from './ja';
import { PLAN_UI_ZH } from './zh';
import type { PlanUiCopy } from './types';

export type { PlanUiCopy } from './types';

/** Planner interface text per language. Client code imports ./en directly so the site bundle stays English. */
export const PLAN_UI: Record<Locale, PlanUiCopy> = { en: PLAN_UI_EN, zh: PLAN_UI_ZH, ja: PLAN_UI_JA };
