import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, MapPin } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { asLocale, brandTitle } from '@/lib/i18n-seo';
import { appCopy } from '@/i18n/app-copy';
import { fmt } from '@/i18n/format';
import { getListingDetail, type ListingDetail } from '@/lib/app/feed';
import { DEFAULT_FEED, TAB_OF_KIND, feedHref, isListingKind } from '@/lib/app/model';
import { MiniCard, PhotoChip } from '@/components/modules/app/cards';
import { ExpandableText } from '@/components/modules/app/ExpandableText';
import { Poster } from '@/components/modules/app/Poster';
import { SaveButton } from '@/components/modules/app/SaveButton';
import { ShareButton } from '@/components/modules/app/ShareButton';
import { Avatar } from '@/components/modules/app/ui';
import { categoryHue } from '@/components/modules/app/category-style';

type Params = Promise<{ lang: string; kind: string; id: string }>;

// Listings change through the admin pages; pages refresh hourly like /travel.
export const revalidate = 3600;

async function load(params: Params): Promise<ListingDetail | null> {
  const { lang, kind, id } = await params;
  if (!isListingKind(kind)) return null;
  return getListingDetail(kind, decodeURIComponent(id), asLocale(lang));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  const detail = await load(params);
  if (!detail) return {};
  const { listing } = detail;
  return {
    title: brandTitle(fmt(appCopy(lang).meta.listing, { name: listing.name, place: listing.townName ?? listing.regionLabel }), lang),
    description: listing.blurb,
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-app-line/15 py-5">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-app-ink/70">{title}</h2>
      {children}
    </section>
  );
}

export default async function ListingPage({ params }: { params: Params }) {
  const { lang } = await params;
  const detail = await load(params);
  if (!detail) notFound();
  const copy = appCopy(lang);
  const d = copy.detail;
  const { listing } = detail;
  const back = feedHref({ ...DEFAULT_FEED, tab: TAB_OF_KIND[listing.kind] });
  const hue = categoryHue(listing.category);

  return (
    <div className="mx-auto max-w-[1180px] px-4 pt-4 lg:px-8 lg:pt-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
        {/* Picture column */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-app-line/15 bg-app-panel sm:aspect-[5/4] lg:aspect-[4/5]">
            <Poster listing={listing} sizes="(min-width: 1024px) 560px, 100vw" priority iconSize="h-40 w-40" />
            <Link
              href={back}
              aria-label={d.back}
              className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </Link>
            {listing.status && (
              <div className="absolute right-4 top-4">
                <PhotoChip live={listing.status.live}>{listing.status.label}</PhotoChip>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between border-b border-app-line/15 px-1 py-1">
            <p className="px-2 text-sm text-app-ink/70">
              {listing.categoryLabel} · {listing.regionLabel}
            </p>
            <div className="flex">
              <SaveButton target={listing} />
              <ShareButton href={listing.href} title={listing.name} />
            </div>
          </div>
        </div>

        {/* Facts column */}
        <div className="min-w-0">
          <h1 className="text-[30px] font-bold leading-tight tracking-tight text-app-ink sm:text-[34px]">{listing.name}</h1>

          <dl className="mt-4 grid grid-cols-3 overflow-hidden rounded-2xl border border-app-line/10 bg-app-panel/85">
            {detail.facts.map((fact, i) => (
              <div key={fact.label} className={`min-w-0 p-3 sm:p-4 ${i > 0 ? 'border-l border-app-line/10' : ''}`}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-app-ink/65">{fact.label}</dt>
                <dd lang={fact.lang} className="mt-1.5 break-words text-[15px] font-semibold leading-snug text-app-ink">
                  {fact.value}
                </dd>
                {fact.sub && <dd className="mt-1 break-words text-xs text-app-ink/70">{fact.sub}</dd>}
              </div>
            ))}
          </dl>

          <div className="py-5">
            <ExpandableText text={detail.description} lang="en" />
          </div>

          <section className="flex items-center justify-between gap-4 border-t border-app-line/15 py-4">
            <div>
              <p className="text-[15px] font-semibold text-app-ink">{d.saveTitle}</p>
              <p className="text-sm text-app-ink/70">{d.saveBody[listing.kind]}</p>
            </div>
            <SaveButton target={listing} variant="pill" className="shrink-0" />
          </section>

          {detail.details.length > 0 && (
            <Section title={d.sections.goodToKnow}>
              <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {detail.details.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs text-app-ink/65">{item.label}</dt>
                    <dd lang={item.lang} className="text-[15px] text-app-ink">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Section>
          )}

          {detail.list && (
            <Section title={detail.list.title}>
              <ul lang="en" className="flex flex-wrap gap-2">
                {detail.list.items.map((item) => (
                  <li key={item} className="rounded-full border border-app-line/20 px-3 py-1.5 text-sm text-app-ink/90">
                    {item}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section title={d.sections.gettingThere}>
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-app-gold/50 text-app-accent" aria-hidden="true">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-app-ink">{detail.facts[1]?.value}</p>
                <p className="text-sm text-app-ink/75">{listing.place}</p>
                {listing.townName && <p className="text-sm text-app-ink/60">{fmt(d.nearestTown, { town: listing.townName })}</p>}
              </div>
            </div>
          </Section>

          {detail.links.length > 0 && (
            <Section title={listing.kind === 'events' ? d.sections.tickets : d.sections.links}>
              <ul className="space-y-2">
                {detail.links.map((l) => (
                  <li key={l.url}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel={l.rel}
                      className="flex min-h-[52px] items-center justify-between gap-3 rounded-2xl border border-app-line/15 bg-app-panel/70 px-4 text-[15px] text-app-ink hover:border-app-line/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
                    >
                      {l.label}
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-app-line/25 px-3 py-1 text-xs font-semibold">
                        {listing.priceLabel ?? d.open}
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="sr-only">{copy.common.newTab}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section title={d.sections.tags}>
            <ul className="flex flex-wrap gap-2">
              {detail.tags.map((tag, i) => (
                <li
                  key={tag}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium ${
                    i === 0 ? 'border-app-gold/50 text-app-accent' : 'border-app-line/20 text-app-ink/90'
                  }`}
                >
                  {i > 0 && (
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: `hsl(${(hue + i * 47) % 360} 70% 60%)` }}
                      aria-hidden="true"
                    />
                  )}
                  {tag}
                </li>
              ))}
            </ul>
          </Section>

          {detail.provider && (
            <Section title={detail.provider.heading}>
              <div className="flex items-center gap-3">
                <Avatar name={detail.provider.name} size="h-12 w-12 text-sm" />
                <div>
                  <p className="text-[15px] font-semibold text-app-ink">{detail.provider.name}</p>
                  <p className="text-xs text-app-ink/70">{detail.provider.role}</p>
                </div>
              </div>
            </Section>
          )}

          <Section title={d.sections.inShort}>
            <p className="text-[15px] leading-relaxed text-app-ink/90">{detail.inShort}</p>
          </Section>

          {detail.faq.length > 0 && (
            <Section title={d.sections.faq}>
              <div className="space-y-4">
                {detail.faq.map((f) => (
                  <div key={f.q}>
                    <h3 className="text-base font-semibold text-app-ink">{f.q}</h3>
                    <p className="mt-1 text-[15px] text-app-ink/85">{f.a}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {detail.related.length > 0 && (
            <Section title={d.sections.similar}>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {detail.related.map((l) => (
                  <li key={`${l.kind}-${l.id}`}>
                    <MiniCard listing={l} />
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section title={d.sections.more}>
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {detail.more.map((m) => (
                <li key={m.href}>
                  <Link href={m.href} className="inline-flex min-h-[44px] items-center text-[15px] text-app-ink underline underline-offset-4 hover:text-app-accent">
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}
