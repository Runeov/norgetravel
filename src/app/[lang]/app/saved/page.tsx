import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { brandTitle } from '@/lib/i18n-seo';
import { appCopy } from '@/i18n/app-copy';
import { SavedList } from '@/components/modules/app/SavedList';

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  const copy = appCopy(lang);
  return { title: brandTitle(copy.meta.saved, lang), description: copy.meta.savedDescription };
}

export default async function SavedPage({ params }: { params: Params }) {
  const copy = appCopy((await params).lang);
  return (
    <div className="mx-auto max-w-[600px] px-4 pt-8 lg:pt-10">
      <h1 className="font-display text-[28px] font-bold text-app-ink">{copy.nav.saved}</h1>
      <p className="mt-1 text-[15px] text-app-ink/75">{copy.savedPage.intro}</p>
      <div className="mt-6">
        <SavedList />
      </div>
      <div className="mt-6">
        <Link
          href="/app/plan/"
          className="app-gold-fill inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg"
        >
          {copy.savedPage.openPlanner}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
