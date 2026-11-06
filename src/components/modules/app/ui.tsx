import type { ReactNode } from 'react';
import { Search } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { cn } from '@/lib/utils';

/*
 * Small building blocks shared by the app screens. Filters are links, so every
 * filtered view has a URL and works before JavaScript loads. Pills are 38 px
 * tall like EVE's and extend their tap area to 44 px with a pseudo-element.
 */

const TAP = "relative after:absolute after:-inset-y-[3px] after:inset-x-0 after:content-['']";
const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg';

export function Pill({
  href,
  active = false,
  count,
  children,
  className,
}: {
  href: string;
  active?: boolean;
  /** Shown after the label. A zero count renders the pill disabled. */
  count?: number;
  children: ReactNode;
  className?: string;
}) {
  const base = cn(
    TAP,
    'inline-flex min-h-[38px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 text-sm font-medium transition-colors',
    className
  );
  if (count === 0 && !active) {
    return (
      <span aria-disabled="true" className={cn(base, 'cursor-not-allowed border-app-line/10 text-app-ink/35')}>
        {children}
        <span className="text-xs">0</span>
      </span>
    );
  }
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? 'true' : undefined}
      className={cn(
        base,
        FOCUS,
        active
          ? 'app-gold-fill border-transparent'
          : 'border-app-line/20 bg-app-panel/40 text-app-ink/90 hover:border-app-line/45 hover:text-app-ink'
      )}
    >
      {children}
      {count !== undefined && <span className={cn('text-xs', active ? 'opacity-75' : 'text-app-ink/55')}>{count}</span>}
    </Link>
  );
}

/** Full-width row in the category list, as in EVE's sidebar. */
export function CategoryRow({
  href,
  active,
  count,
  icon,
  children,
}: {
  href: string;
  active: boolean;
  count?: number;
  icon: ReactNode;
  children: ReactNode;
}) {
  const base = cn(TAP, 'flex min-h-[38px] w-full items-center gap-2.5 rounded-full border px-3.5 text-[13.5px] font-medium transition-colors');
  if (count === 0 && !active) {
    return (
      <span aria-disabled="true" className={cn(base, 'cursor-not-allowed border-app-line/10 text-app-ink/35')}>
        {icon}
        <span className="flex-1 truncate">{children}</span>
        <span className="text-xs">0</span>
      </span>
    );
  }
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? 'true' : undefined}
      className={cn(
        base,
        FOCUS,
        active
          ? 'app-gold-fill border-transparent'
          : 'border-app-line/15 text-app-ink/90 hover:border-app-line/40 hover:bg-app-panel/50 hover:text-app-ink'
      )}
    >
      {icon}
      <span className="flex-1 truncate">{children}</span>
      {count !== undefined && <span className={cn('text-xs', active ? 'opacity-75' : 'text-app-ink/55')}>{count}</span>}
    </Link>
  );
}

/** EVE's Events / Tours / Places switch. */
export function SegmentedTabs({
  items,
  label,
  className,
}: {
  items: { href: string; label: string; active: boolean }[];
  label: string;
  className?: string;
}) {
  return (
    <nav
      aria-label={label}
      className={cn('flex rounded-2xl border border-app-line/15 bg-app-panel/90 p-1 shadow-lg backdrop-blur', className)}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          scroll={false}
          aria-current={item.active ? 'page' : undefined}
          className={cn(
            'flex min-h-[44px] flex-1 items-center justify-center rounded-xl px-4 text-[15px] font-medium transition-colors',
            FOCUS,
            item.active ? 'app-gold-fill shadow-sm' : 'text-app-ink/90 hover:text-app-ink'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

/** Round initials badge with a gold ring, standing in for EVE's organiser photos. */
export function Avatar({ name, size = 'h-10 w-10 text-sm' }: { name: string; size?: string }) {
  const initials = name
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full border-2 border-app-gold bg-app-raised font-display font-bold text-app-accent',
        size
      )}
    >
      {initials || '•'}
    </span>
  );
}

/** Rounded panel used for the right rail boxes and banners. */
export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-[20px] border border-app-line/15 bg-app-panel/85 shadow-lg backdrop-blur', className)}>
      {children}
    </div>
  );
}

/**
 * GET search form. `action` is the localized feed path; hidden fields carry
 * the tab so a search stays in Events, Tours or Places.
 */
export function SearchBox({
  id,
  action,
  query,
  placeholder,
  hidden = {},
  className,
}: {
  /** Unique on the page; the phone header and the desktop rail each render one. */
  id: string;
  action: string;
  query: string;
  placeholder: string;
  hidden?: Record<string, string>;
  className?: string;
}) {
  return (
    <form action={action} method="get" role="search" className={cn('relative', className)}>
      {Object.entries(hidden).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <label className="sr-only" htmlFor={id}>
        {placeholder}
      </label>
      <Search className="pointer-events-none absolute left-4 top-1/2 z-10 h-[18px] w-[18px] -translate-y-1/2 text-app-ink/70" aria-hidden="true" />
      <input
        id={id}
        type="search"
        name="q"
        defaultValue={query}
        placeholder={placeholder}
        maxLength={80}
        className="h-12 w-full rounded-full border border-app-line/20 bg-app-panel/85 pl-11 pr-4 text-[15px] text-app-ink shadow-lg backdrop-blur placeholder:text-app-ink/60 focus:border-app-gold focus:outline-none focus:ring-2 focus:ring-app-gold/40"
      />
    </form>
  );
}
