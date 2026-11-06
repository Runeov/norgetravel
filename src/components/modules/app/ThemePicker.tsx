'use client';

import { useEffect, useState } from 'react';
import { Moon, Mountain, Sun, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppCopy } from './AppCopy';
import { APP_ROOT_ID, APP_THEME_KEY, isAppTheme, type AppTheme } from './theme';

const OPTIONS: { value: AppTheme; icon: LucideIcon }[] = [
  { value: 'fjord', icon: Mountain },
  { value: 'light', icon: Sun },
  { value: 'dark', icon: Moon },
];

export function ThemePicker({ className }: { className?: string }) {
  const copy = useAppCopy();
  const [theme, setTheme] = useState<AppTheme>('fjord');

  useEffect(() => {
    const current = document.getElementById(APP_ROOT_ID)?.getAttribute('data-app-theme');
    if (isAppTheme(current)) setTheme(current);
  }, []);

  function choose(next: AppTheme) {
    setTheme(next);
    document.getElementById(APP_ROOT_ID)?.setAttribute('data-app-theme', next);
    try {
      localStorage.setItem(APP_THEME_KEY, next);
    } catch {
      // Private windows may block storage; the theme still applies for this visit.
    }
  }

  return (
    <div role="group" aria-label={copy.nav.theme} className={cn('flex gap-2', className)}>
      {OPTIONS.map(({ value, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => choose(value)}
          aria-pressed={theme === value}
          aria-label={copy.theme[value]}
          title={copy.theme[value]}
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent',
            theme === value
              ? 'border-app-gold bg-app-panel text-app-accent'
              : 'border-app-line/15 bg-app-panel/50 text-app-ink/75 hover:text-app-ink'
          )}
        >
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
