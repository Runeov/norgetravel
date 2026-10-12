import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { brandTitle } from '@/lib/i18n-seo';
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
  if (!plan) return { title: brandTitle('Shared trip plan | NorgeTravel', lang), robots: { index: false, follow: false } };
  return {
    title: brandTitle(`${plan.title} | NorgeTravel`, lang),
    description: `A Norway trip plan shared from the Norge Travel planner: ${plan.facts.zones.map((zone) => zone.name).join(', ')}.`,
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
