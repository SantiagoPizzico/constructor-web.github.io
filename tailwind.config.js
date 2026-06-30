/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        surface2: 'var(--surface-2)',
        fg: 'var(--text)',
        muted: 'var(--muted)',
        line: 'var(--border)',
        brand: 'var(--brand)',
        accent: 'var(--accent)',
        ui: {
          bg: 'var(--ui-bg)',
          surface: 'var(--ui-surface)',
          surface2: 'var(--ui-surface-2)',
          text: 'var(--ui-text)',
          muted: 'var(--ui-muted)',
          line: 'var(--ui-border)',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      borderRadius: {
        theme: 'var(--radius)',
      },
    },
  },
  plugins: [],
}
