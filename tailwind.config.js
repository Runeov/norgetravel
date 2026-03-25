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
        'averdi-orange': '#1B3A5C',
        'averdi-yellow': '#00CC6A',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
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
