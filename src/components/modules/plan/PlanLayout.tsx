import Link from '@/components/LocalizedLink';
import { ArrowRight, Building2, Mountain, Ship, Snowflake, Sparkles, Waves } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { mapZones, type MapZone } from '@/data/norway-map-zones';
import { cn } from '@/lib/utils';

export const PLAN_ZONE_ICONS: Record<string, LucideIcon> = {
  'northern-norway': Sparkles,
  lofoten: Mountain,
  fjords: Waves,
  svalbard: Snowflake,
  cities: Building2,
  'boat-routes': Ship,
};

/** The map's zone colours are tuned for the dark planner; the cities zone is white there. */
export function zoneAccent(zone: MapZone): string {
  return zone.color.toUpperCase() === '#FFFFFF' ? '#334155' : zone.color;
}

/** Pills linking to each destination's planner page. */
export function PlanZoneLinks({ activeId, className }: { activeId?: string; className?: string }) {
  return (
    <nav aria-label="Destinations" className={cn('flex flex-wrap gap-2', className)}>
      {mapZones.map((zone) => {
        const Icon = PLAN_ZONE_ICONS[zone.id] ?? Sparkles;
        const active = zone.id === activeId;
        return (
          <Link
            key={zone.id}
            href={`/plan/${zone.id}`}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 px-4 text-sm font-semibold transition-colors',
              active
                ? 'border-[#1B3A5C] bg-[#1B3A5C] text-white'
                : 'border-slate-200 bg-white text-[#1B3A5C] hover:border-[#1B3A5C]'
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {zone.name}
          </Link>
        );
      })}
    </nav>
  );
}

export interface PlanSectionMeta {
  id: string;
  label: string;
  count: number;
}

/** Sticky jump bar for the sections of a zone page. Sections with nothing in them are left out. */
export function PlanSectionNav({ sections }: { sections: PlanSectionMeta[] }) {
  const visible = sections.filter((section) => section.count > 0);
  return (
    <nav
      aria-label="Sections on this page"
      className="sticky top-20 z-30 -mx-4 overflow-x-auto border-b border-slate-200 bg-slate-50/95 px-4 py-2 backdrop-blur-sm sm:mx-0 sm:px-0"
    >
      <ul className="flex gap-1 whitespace-nowrap">
        {visible.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#1B3A5C]/10 hover:text-[#1B3A5C]"
            >
              {section.label}
              <span className="rounded-full bg-slate-200 px-1.5 text-xs font-semibold text-slate-600">{section.count}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface PlanSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  count: number;
  shown: number;
  seeAllHref?: string;
  seeAllLabel?: string;
  children: React.ReactNode;
}

/** One section of the stream: heading, intro, a "see all" link when the page shows a subset, and the cards. */
export function PlanSection({ id, eyebrow, title, intro, count, shown, seeAllHref, seeAllLabel, children }: PlanSectionProps) {
  if (count === 0) return null;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-36 border-t border-slate-200 py-10 first:border-t-0 md:py-14">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{eyebrow}</p>
          <h2 id={`${id}-title`} className="text-2xl font-bold text-[#1B3A5C] md:text-3xl">
            {title}
          </h2>
          <p className="mt-1 text-base leading-relaxed text-slate-600">{intro}</p>
        </div>
        {seeAllHref && count > shown && (
          <Link
            href={seeAllHref}
            className="inline-flex min-h-[44px] shrink-0 items-center gap-1 text-sm font-semibold text-[#1B3A5C] transition-colors hover:text-[#00CC6A]"
          >
            {seeAllLabel ?? `See all ${count}`}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
