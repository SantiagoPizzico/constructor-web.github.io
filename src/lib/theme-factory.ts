import type { StyleTokens } from '../types'
import { contrastRatio } from './contrast'

// ─────────────────────────────────────────────────────────────────────────
// Factory de temas: deriva un set completo y accesible de StyleTokens a
// partir de un input mínimo (color de marca + modo + fonts). Pensada para
// REUTILIZAR los componentes en proyectos nuevos sin escribir 11 tokens a mano.
//
//   createTheme({ mode: 'light', brand: '#ff6600', heading: 'Sora' })
//
// Todo lo derivado se puede pisar con `overrides` cuando quieras afinar.
// ─────────────────────────────────────────────────────────────────────────

export interface ThemeSpec {
  /** Claro u oscuro. Por defecto 'light'. */
  mode?: 'light' | 'dark'
  /** Color de marca (#rrggbb). Único color obligatorio. */
  brand: string
  /** Familia para títulos. Nombre suelto ('Sora') o stack completo ("'Sora', serif"). */
  heading?: string
  /** Familia para cuerpo. Idem heading. */
  body?: string
  /** Color de acento (secundario). Si se omite, se deriva del brand. */
  accent?: string
  /** Radio base en px. Por defecto 12. */
  radius?: number
  /** Tono (0-360) para teñir los neutros. Por defecto, el del brand. */
  neutralHue?: number
  /** Saturación de los neutros (0-100). Sutil por defecto (6). */
  neutralChroma?: number
  /** Pisa cualquier token derivado. */
  overrides?: Partial<StyleTokens>
}

// ── Helpers de color (sin dependencias) ──────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)]
}

function hexToHue(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  if (d === 0) return 0
  let h: number
  if (max === r) h = ((g - b) / d) % 6
  else if (max === g) h = (b - r) / d + 2
  else h = (r - g) / d + 4
  h *= 60
  return h < 0 ? h + 360 : h
}

function hexToHsl(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  const l = (max + min) / 2
  let h = 0
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
  return [h, s * 100, l * 100]
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

/** HSL → #rrggbb. h: 0-360, s/l: 0-100. (Algoritmo estándar MDN.) */
function hslToHex(h: number, s: number, l: number): string {
  const sN = s / 100
  const lN = l / 100
  const a = sN * Math.min(lN, 1 - lN)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = lN - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function rgbaFromHex(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex)
  return `rgba(${r},${g},${b},${alpha})`
}

/** Acepta nombre suelto ('Sora') o stack completo ("'Sora', serif"). */
function fontStack(input: string | undefined, fallback: string): string {
  if (!input) return fallback
  return input.includes(',') ? input : `'${input}', sans-serif`
}

// ── Rampas de luminosidad por modo ───────────────────────────────────────
// L (0-100) de cada neutro. Calibradas para que text/muted superen WCAG AA
// (≥4.5) sobre surface en ambos modos.

const RAMP = {
  light: { bg: 97, surface: 100, surface2: 94, text: 13, muted: 41 },
  dark: { bg: 8, surface: 12, surface2: 17.5, text: 93, muted: 64 },
} as const

const INK_LIGHT = '#ffffff'
const INK_DARK = '#0b0b0b'

/**
 * Deriva un StyleTokens completo y accesible desde un spec mínimo.
 * - Neutros (bg/surface/surface2/text/muted) teñidos sutilmente con el tono del brand.
 * - `brandInk` = el color (claro u oscuro) con MÁS contraste sobre el brand.
 * - `border` derivado del text (claro) o blanco translúcido (oscuro).
 */
export function createTheme(spec: ThemeSpec): StyleTokens {
  const mode = spec.mode ?? 'light'
  const hue = spec.neutralHue ?? hexToHue(spec.brand)
  const chroma = spec.neutralChroma ?? 6
  const L = RAMP[mode]

  const text = hslToHex(hue, Math.min(chroma * 1.6, 18), L.text)
  const brandInk =
    contrastRatio(spec.brand, INK_LIGHT) >= contrastRatio(spec.brand, INK_DARK) ? INK_LIGHT : INK_DARK

  // Acento por defecto: tono casi complementario del brand, vivo y de luminosidad media.
  const [bh, bs, bl] = hexToHsl(spec.brand)
  const accent = spec.accent ?? hslToHex((bh + 150) % 360, clamp(bs, 48, 88), clamp(bl, 46, 62))

  const derived: StyleTokens = {
    bg: hslToHex(hue, chroma, L.bg),
    surface: hslToHex(hue, mode === 'light' ? chroma * 0.4 : chroma, L.surface),
    surface2: hslToHex(hue, chroma, L.surface2),
    text,
    muted: hslToHex(hue, Math.min(chroma, 10), L.muted),
    border: mode === 'light' ? rgbaFromHex(text, 0.1) : 'rgba(255,255,255,0.12)',
    brand: spec.brand,
    brandInk,
    accent,
    fontHeading: fontStack(spec.heading, "'Inter', sans-serif"),
    fontBody: fontStack(spec.body, "'Inter', sans-serif"),
    radius: spec.radius ?? 12,
  }

  return { ...derived, ...spec.overrides }
}
