import type { CSSProperties } from 'react'
import type { StyleTokens } from './types'

export function themeVars(t: StyleTokens): CSSProperties {
  const vars: Record<string, string> = {
    '--bg': t.bg,
    '--surface': t.surface,
    '--surface-2': t.surface2,
    '--text': t.text,
    '--muted': t.muted,
    '--border': t.border,
    '--brand': t.brand,
    '--brand-ink': t.brandInk,
    '--accent': t.accent,
    '--font-heading': t.fontHeading,
    '--font-body': t.fontBody,
    '--radius': `${t.radius}px`,
  }
  return vars as CSSProperties
}
