import { defineConfig } from 'vitest/config'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Content-Security-Policy inyectada SOLO en el build de producción.
// (En dev no se aplica: el HMR de Vite usa scripts inline/eval que una CSP estricta rompería.)
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  "frame-src https://www.openstreetmap.org",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join('; ')

function cspPlugin(): Plugin {
  return {
    name: 'inject-csp',
    apply: 'build',
    transformIndexHtml() {
      return [
        {
          tag: 'meta',
          attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP },
          injectTo: 'head-prepend',
        },
      ]
    },
  }
}

export default defineConfig({
  // Rutas relativas: el sitio funciona igual en la raíz o en un subpath
  // (p. ej. GitHub Pages en /constructor-web/) sin tocar nada.
  base: './',
  plugins: [react(), cspPlugin()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['recharts', '@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    // Vitest solo corre los unit tests de src/. Los E2E (e2e/*.spec.ts) son de Playwright.
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
