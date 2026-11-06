import Link from '@/components/LocalizedLink';
import { AlertTriangle, Backpack, Bookmark, CalendarDays, Lightbulb, Map as MapIcon, Route, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SharedPlan } from '@/lib/plan-store';
import { outboundRel } from '@/lib/outbound-rel';
import { asLocale } from '@/lib/i18n-seo';
import { fmt, plural } from '@/i18n/format';
import { PLAN_UI } from '@/i18n/plan-ui';
import type { TripItemCategory } from '@/types/trip';
import { Lines, PlanLinks } from './TripPlanPanel';
import { DayCard } from './DayPlanSection';
import { SharedPlanActions } from './SharedPlanActions';
import { PlanCopyProvider } from './PlanCopy';

function formatDate(value: string | undefined, locale: string): string | null {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

function Section({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-slate-200 py-8 print:break-inside-avoid">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#1B3A5C]">
        <Icon className="h-5 w-5 print:hidden" aria-hidden="true" />
        {title}
      </h2>
      {children}
    </section>
  );
}

/** A shared plan, read-only, printable, with the way to make it your own. In the language it was shared in. */
export function SharedPlanView({ plan, url }: { plan: SharedPlan; url: string }) {
  const { facts, basics } = plan;
  const copy = PLAN_UI[asLocale(plan.lang)];
  const text = copy.shared;
  const sections = copy.panel.sections;
  const day = (value: string | undefined) => formatDate(value, copy.dateLocale);
  const window = [
    basics.startDate && basics.endDate ? fmt(copy.basics.range, { start: day(basics.startDate) ?? '', end: day(basics.endDate) ?? '' }) : null,
    facts.window.nights ? plural(copy.panel.nights, facts.window.nights) : null,
    basics.travellers ? plural(copy.basics.travellerCount, basics.travellers) : null,
    facts.zones.map((zone) => zone.name).join(copy.listJoin) || null,
  ].filter(Boolean).join(' · ');

  const grouped = new Map<string, SharedPlan['items']>();
  for (const item of plan.items) {
    grouped.set(item.category, [...(grouped.get(item.category) ?? []), item]);
  }

  return (
    <PlanCopyProvider copy={copy}>
    <main className="min-h-screen bg-slate-50 print:bg-white">
      <section className="-mt-20 bg-gradient-to-br from-[#1B3A5C] to-[#12294a] pt-20 text-white print:mt-0 print:bg-white print:pt-0 print:text-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#00CC6A] print:text-slate-500">{text.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">{plan.title}</h1>
          {window && <p className="mt-2 text-lg text-white/80 print:text-slate-700">{window}</p>}
          <p className="mt-3 text-sm text-white/60 print:text-slate-500">
            {fmt(text.made, { date: day(plan.expiresAt.slice(0, 10)) ?? '' })}
          </p>
          <div className="mt-6">
            <SharedPlanActions plan={plan} url={url} />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {plan.dayPlan ? (
          <Section icon={CalendarDays} title={copy.days.title}>
            <p className="mb-5 text-base leading-relaxed text-slate-700">{plan.dayPlan.intro}</p>
            <ol className="space-y-4">
              {plan.dayPlan.days.map((day) => (
                <DayCard key={day.day} day={day} facts={facts} />
              ))}
            </ol>
            {plan.dayPlan.unverified.length > 0 && (
              <div className="mt-4 rounded-md border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{copy.days.unverified}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {plan.dayPlan.unverified.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
          </Section>
        ) : (
          <>
            {facts.light.length > 0 && (
              <Section icon={Lightbulb} title={sections.light}>
                <Lines lines={facts.light} />
              </Section>
            )}
            {facts.fit.length > 0 && (
              <Section icon={AlertTriangle} title={sections.fit}>
                <Lines lines={facts.fit} tone="warn" />
              </Section>
            )}
            {facts.route.legs.length > 0 && (
              <Section icon={Route} title={sections.route}>
                <ol className="space-y-3">
                  {facts.route.legs.map((leg, index) => (
                    <li key={leg.id} className="text-base leading-relaxed text-slate-700">
                      <span className="block text-sm font-semibold uppercase tracking-wide text-slate-500">
                        {fmt(copy.panel.leg, { n: index + 1, from: leg.from, to: leg.to })}
                      </span>
                      {leg.text}
                      <PlanLinks links={leg.links} />
                    </li>
                  ))}
                </ol>
              </Section>
            )}
            {facts.route.method.length > 0 && (
              <Section icon={MapIcon} title={sections.method}>
                <Lines lines={facts.route.method} />
              </Section>
            )}
            {facts.kit.length > 0 && (
              <Section icon={Backpack} title={sections.pack}>
                <Lines lines={facts.kit} />
              </Section>
            )}
          </>
        )}

        {plan.items.length > 0 && (
          <Section icon={Bookmark} title={text.savedTitle}>
            <div className="space-y-5">
              {[...grouped.entries()].map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {text.categories[category as TripItemCategory] ?? category}
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {items.map((item) => (
                      <li key={item.id} className="text-base text-slate-700">
                        {item.href ? (
                          item.href.startsWith('/') ? (
                            <Link href={item.href} className="font-semibold text-[#1B3A5C] hover:underline">{item.name}</Link>
                          ) : (
                            <a href={item.href} target="_blank" rel={outboundRel(item.href)} className="font-semibold text-[#1B3A5C] hover:underline">{item.name}</a>
                          )
                        ) : (
                          <span className="font-semibold">{item.name}</span>
                        )}
                        {item.location && <span className="text-slate-500"> · {item.location}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {facts.sources.length > 0 && (
          <Section icon={Star} title={sections.sources}>
            <PlanLinks links={facts.sources} />
          </Section>
        )}

        <div className="border-t border-slate-200 py-8 print:hidden">
          <Link href="/plan" className="text-sm font-semibold text-[#1B3A5C] hover:text-[#00CC6A]">
            {text.ownPlan}
          </Link>
        </div>
      </div>
    </main>
    </PlanCopyProvider>
  );
}
