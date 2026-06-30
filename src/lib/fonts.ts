import type { StylePreset } from '../types'

// Pesos curados por familia conocida (Google Fonts css2). Las familias que NO
// estén acá igual cargan, con el set de pesos por defecto (ver DEFAULT_WEIGHTS).
const FONT_WEIGHTS: Record<string, string> = {
  Poppins: '500;600;700',
  Inter: '400;500;600',
  Jost: '400;500;600',
  'Shippori Mincho': '500;600;700',
  'Noto Sans JP': '400;500;700',
  'Space Grotesk': '400;500;700',
  Orbitron: '500;700',
  Fraunces: '400;500;600',
  'Nunito Sans': '400;600;700',
  'Playfair Display': '500;600;700',
  Lato: '400;700',
  Anton: '', // sin eje de peso
}

const DEFAULT_WEIGHTS = '400;500;600;700'

const loaded = new Set<string>()

/** Extrae el nombre de familia de un stack CSS ("'Sora', serif" → "Sora"). */
export function familyName(stack: string): string {
  const quoted = stack.match(/'([^']+)'/)
  return (quoted ? quoted[1] : stack.split(',')[0]).trim()
}

/** Construye el query css2 de Google Fonts para una familia (saneado para la URL). */
export function fontQuery(name: string): string | null {
  const clean = name.replace(/[^a-zA-Z0-9 ]/g, '').trim()
  if (!clean) return null
  const family = clean.replace(/ /g, '+')
  const weights = FONT_WEIGHTS[clean] ?? DEFAULT_WEIGHTS
  return weights ? `family=${family}:wght@${weights}` : `family=${family}`
}

// Inyecta (una sola vez por familia) el <link> de Google Fonts del estilo dado.
export function ensureStyleFonts(style: StylePreset): void {
  if (typeof document === 'undefined') return
  for (const stack of [style.tokens.fontHeading, style.tokens.fontBody]) {
    const name = familyName(stack)
    if (loaded.has(name)) continue
    const query = fontQuery(name)
    if (!query) continue
    loaded.add(name)
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?${query}&display=swap`
    document.head.appendChild(link)
  }
}
