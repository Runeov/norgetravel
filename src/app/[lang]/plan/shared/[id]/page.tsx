import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { asLocale, brandTitle } from '@/lib/i18n-seo';
import { fmt } from '@/i18n/format';
import { PLAN_UI } from '@/i18n/plan-ui';
import { getSiteUrl } from '@/lib/site-url';
import { loadSharedPlan } from '@/lib/plan-store';
import { SharedPlanView } from '@/components/modules/plan/SharedPlanView';

interface Props {
  params: Promise<{ lang: string; id: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;
  const plan = await loadSharedPlan(id);
  if (!plan) return { title: brandTitle(PLAN_UI[asLocale(lang)].shared.title, lang), robots: { index: false, follow: false } };
  const copy = PLAN_UI[asLocale(plan.lang)];
  return {
    title: brandTitle(plan.title, lang),
    description: fmt(copy.shared.description, { zones: plan.facts.zones.map((zone) => zone.name).join(copy.listJoin) }),
    robots: { index: false, follow: false },
  };
}

export default async function SharedPlanPage({ params }: Props) {
  const { lang, id } = await params;
  const plan = await loadSharedPlan(id);
  if (!plan) notFound();
  const url = `${getSiteUrl()}/${lang}/plan/shared/${plan.id}/`;
  return <SharedPlanView plan={plan} url={url} />;
}
