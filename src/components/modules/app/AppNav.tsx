'use client';

import { usePathname } from 'next/navigation';
import { Bookmark, BookOpen, CalendarDays, Compass, Home, Plus, Route, type LucideIcon } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { useTrip } from '@/context/TripContext';
import { cn } from '@/lib/utils';
import { fmt } from '@/i18n/format';
import type { AppClientCopy } from '@/i18n/app-copy';
import { useAppCopy } from './AppCopy';
import { NorgeMark } from './NorgeMark';
import { ThemePicker } from './ThemePicker';

interface NavItem {
  href: string;
  /** Label key in the nav copy. */
  label: 'feed' | 'explore' | 'plan' | 'saved' | 'guides' | 'calendar';
  icon: LucideIcon;
  /** Active when the path (without the locale) starts with this. */
  match?: string;
}

const FEED: NavItem = { href: '/app/', label: 'feed', icon: Home };
const EXPLORE: NavItem = { href: '/app/explore/', label: 'explore', icon: Compass, match: '/app/explore' };
const PLAN: NavItem = { href: '/app/plan/', label: 'plan', icon: Route, match: '/app/plan' };
const SAVED: NavItem = { href: '/app/saved/', label: 'saved', icon: Bookmark, match: '/app/saved' };
const CALENDAR: NavItem = { href: '/app/calendar/', label: 'calendar', icon: CalendarDays, match: '/app/calendar' };
const GUIDES: NavItem = { href: '/app/guides/', label: 'guides', icon: BookOpen, match: '/app/guides' };

const SIDEBAR_ITEMS = [FEED, EXPLORE, PLAN, SAVED, GUIDES, CALENDAR];

/** Path without the locale prefix: "/en/app/explore/" → "/app/explore/". */
function useAppPath(): string {
  const pathname = usePathname() ?? '/';
  return pathname.replace(/^\/(en|zh|ja)(?=\/|$)/, '') || '/';
}

function isActive(item: NavItem, path: string): boolean {
  if (item.match) return path.startsWith(item.match);
  if (item === FEED) {
    // The feed and the detail pages opened from it.
    return path === '/app/' || path === '/app' || /^\/app\/(events|tours|stays|eat)\//.test(path);
  }
  return path.startsWith(item.href);
}

function SavedCount({ nav }: { nav: AppClientCopy['nav'] }) {
  const { itemCount } = useTrip();
  if (itemCount === 0) return null;
  return (
    <span className="ml-auto rounded-full bg-app-gold px-2 py-0.5 text-xs font-semibold text-app-on-gold">
      <span aria-hidden="true">{itemCount}</span>
      <span className="sr-only">{fmt(nav.savedCount, { n: itemCount })}</span>
    </span>
  );
}

/** Desktop sidebar, like EVE's: brand, primary nav, the trip planner button and the theme picker. */
export function AppSidebar() {
  const path = useAppPath();
  const { nav } = useAppCopy();
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-app-line/10 bg-app-bg/95 backdrop-blur lg:flex">
      <Link
        href="/app/"
        className="flex items-center gap-2.5 px-5 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-app-accent"
      >
        <NorgeMark height={30} />
        <span className="font-display text-lg font-bold tracking-wide text-app-ink">{nav.brand}</span>
        <span className="sr-only">{nav.home}</span>
      </Link>
      <div className="mx-0 border-t border-app-line/10" />

      <nav aria-label={nav.label} className="flex-1 space-y-1 px-2.5 py-4">
        {SIDEBAR_ITEMS.map((item) => {
          const active = isActive(item, path);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex min-h-[46px] items-center gap-3 rounded-2xl px-4 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent',
                active ? 'bg-app-panel/90 text-app-accent' : 'text-app-ink/85 hover:bg-app-panel/60 hover:text-app-ink'
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {nav[item.label]}
              {item === SAVED && <SavedCount nav={nav} />}
            </Link>
          );
        })}
      </nav>

      <div className="px-3.5 pb-4">
        <Link
          href="/app/plan/"
          className="app-gold-fill flex min-h-[44px] items-center justify-center gap-2 rounded-xl text-[15px] font-semibold shadow-md transition-[filter] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          {nav.planTrip}
        </Link>
      </div>
      <div className="border-t border-app-line/10 px-3.5 py-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-app-ink/60">{nav.theme}</p>
        <ThemePicker />
        <Link
          href="/"
          className="mt-3 inline-flex min-h-[44px] items-center text-xs font-medium text-app-ink/60 underline-offset-4 hover:text-app-ink hover:underline"
        >
          NorgeTravel.com
        </Link>
      </div>
    </aside>
  );
}

const TAB_ITEMS = [FEED, EXPLORE, SAVED, GUIDES];

/** Phone tab bar with the planner as the raised centre button, where EVE has "Create". */
export function AppTabBar() {
  const path = useAppPath();
  const { nav } = useAppCopy();
  const [left, right] = [TAB_ITEMS.slice(0, 2), TAB_ITEMS.slice(2)];
  const tab = (item: NavItem) => {
    const active = isActive(item, path);
    const Icon = item.icon;
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-app-accent',
          active ? 'text-app-accent' : 'text-app-ink/75'
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
        {nav[item.label]}
        <span className={cn('h-0.5 w-5 rounded-full', active ? 'bg-app-accent' : 'bg-transparent')} aria-hidden="true" />
      </Link>
    );
  };
  return (
    <nav
      aria-label={nav.label}
      className="fixed inset-x-0 bottom-0 z-30 flex items-stretch border-t border-app-line/10 bg-app-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      {left.map(tab)}
      <Link
        href="/app/plan/"
        aria-current={isActive(PLAN, path) ? 'page' : undefined}
        className="flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 text-xs font-medium text-app-ink/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-app-accent"
      >
        <span
          className={cn(
            '-mt-5 flex h-11 w-11 items-center justify-center rounded-full border-2 border-app-gold',
            isActive(PLAN, path) ? 'app-gold-fill' : 'bg-app-bg text-app-accent'
          )}
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
        </span>
        {nav.plan}
      </Link>
      {right.map(tab)}
    </nav>
  );
}
