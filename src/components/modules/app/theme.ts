// App theme names and the pre-paint script. Kept out of the client component
// so the server layout can inline the script as a plain string.

export const APP_THEMES = ['fjord', 'light', 'dark'] as const;
export type AppTheme = (typeof APP_THEMES)[number];

export const APP_THEME_KEY = 'nt-app-theme';
export const APP_ROOT_ID = 'nt-app';

/**
 * Runs before first paint (inlined by the app layout) so a saved theme does
 * not flash the default. Storage can be unavailable; the default then stays.
 */
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem('${APP_THEME_KEY}');if(t==='light'||t==='dark'||t==='fjord')document.getElementById('${APP_ROOT_ID}').setAttribute('data-app-theme',t)}catch(e){}`;

export const isAppTheme = (value: string | null | undefined): value is AppTheme =>
  !!value && (APP_THEMES as readonly string[]).includes(value);

