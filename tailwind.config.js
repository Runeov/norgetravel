/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // NorgeTravel brand palette
        'nt-navy':   '#1B3A5C',   // Deep navy (mountains) — primary CTA, active states
        'nt-green':  '#00CC6A',   // Aurora green — gradient endpoint, highlights
        'nt-blue':   '#5CBFEE',   // Water / fjord blue — secondary accents
        // Legacy aliases (keep during migration)
        'norgetravel-orange': '#1B3A5C',
        'norgetravel-yellow': '#00CC6A',
        // /app section. Values are theme variables set in
        // src/components/modules/app/app-theme.css, so one class works in
        // every app theme.
        // Planner components shared by /plan and /app. Values are variables
        // in src/index.css (site) and app-theme.css (app themes).
        plan: {
          accent: 'rgb(var(--plan-accent) / <alpha-value>)',
          solid: 'rgb(var(--plan-solid) / <alpha-value>)',
          'solid-hover': 'rgb(var(--plan-solid-hover) / <alpha-value>)',
          'on-solid': 'rgb(var(--plan-on-solid) / <alpha-value>)',
          highlight: 'rgb(var(--plan-highlight) / <alpha-value>)',
          'grad-from': 'rgb(var(--plan-grad-from) / <alpha-value>)',
          'grad-to': 'rgb(var(--plan-grad-to) / <alpha-value>)',
          danger: 'rgb(var(--plan-danger) / <alpha-value>)',
          heading: 'rgb(var(--plan-heading) / <alpha-value>)',
          strong: 'rgb(var(--plan-strong) / <alpha-value>)',
          body: 'rgb(var(--plan-body) / <alpha-value>)',
          muted: 'rgb(var(--plan-muted) / <alpha-value>)',
          subtle: 'rgb(var(--plan-subtle) / <alpha-value>)',
          faint: 'rgb(var(--plan-faint) / <alpha-value>)',
          card: 'rgb(var(--plan-card) / <alpha-value>)',
          surface: 'rgb(var(--plan-surface) / <alpha-value>)',
          chip: 'rgb(var(--plan-chip) / <alpha-value>)',
          skeleton: 'rgb(var(--plan-skeleton) / <alpha-value>)',
          line: 'rgb(var(--plan-line) / <alpha-value>)',
          'line-strong': 'rgb(var(--plan-line-strong) / <alpha-value>)',
          added: 'rgb(var(--plan-added) / <alpha-value>)',
          'on-added': 'rgb(var(--plan-on-added) / <alpha-value>)',
          'added-hover': 'rgb(var(--plan-added-hover) / <alpha-value>)',
        },
        app: {
          bg: 'rgb(var(--app-bg) / <alpha-value>)',
          panel: 'rgb(var(--app-panel) / <alpha-value>)',
          raised: 'rgb(var(--app-raised) / <alpha-value>)',
          ink: 'rgb(var(--app-ink) / <alpha-value>)',
          line: 'rgb(var(--app-line) / <alpha-value>)',
          accent: 'rgb(var(--app-accent) / <alpha-value>)',
          gold: 'rgb(var(--app-gold) / <alpha-value>)',
          'gold-deep': 'rgb(var(--app-gold-deep) / <alpha-value>)',
          'on-gold': 'rgb(var(--app-on-gold) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        app: ['var(--font-figtree)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-brygada)', 'Georgia', 'serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
