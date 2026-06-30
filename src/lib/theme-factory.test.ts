import { describe, expect, it } from 'vitest'
import { createTheme } from './theme-factory'
import { contrastRatio } from './contrast'
import { familyName, fontQuery } from './fonts'
import { STYLES } from '../data/styles'

const BRANDS = ['#2563eb', '#ff4d2e', '#19e3c8', '#111111', '#c9a35a', '#8b7bff']

describe('createTheme — accesibilidad de los temas derivados', () => {
  for (const mode of ['light', 'dark'] as const) {
    for (const brand of BRANDS) {
      it(`${mode} / ${brand}: text y muted superan WCAG AA sobre surface`, () => {
        const t = createTheme({ mode, brand })
        expect(contrastRatio(t.text, t.surface)).toBeGreaterThanOrEqual(4.5)
        expect(contrastRatio(t.muted, t.surface)).toBeGreaterThanOrEqual(4.5)
      })
    }
  }

  it('brandInk es el tinte (claro u oscuro) con más contraste sobre el brand', () => {
    for (const brand of BRANDS) {
      const t = createTheme({ brand })
      const best =
        contrastRatio(brand, '#ffffff') >= contrastRatio(brand, '#0b0b0b') ? '#ffffff' : '#0b0b0b'
      expect(t.brandInk).toBe(best)
    }
  })

  it('deriva un accent válido y respeta el override', () => {
    const derived = createTheme({ brand: '#2563eb' })
    expect(derived.accent).toMatch(/^#[0-9a-f]{6}$/i)
    expect(derived.accent.toLowerCase()).not.toBe('#2563eb')
    expect(createTheme({ brand: '#2563eb', accent: '#ff0066' }).accent).toBe('#ff0066')
  })

  it('overrides pisan cualquier token derivado', () => {
    const t = createTheme({ brand: '#2563eb', overrides: { surface: '#fafafa', radius: 0 } })
    expect(t.surface).toBe('#fafafa')
    expect(t.radius).toBe(0)
  })

  it('acepta nombre suelto o stack completo de font', () => {
    expect(createTheme({ brand: '#000', heading: 'Sora' }).fontHeading).toBe("'Sora', sans-serif")
    expect(createTheme({ brand: '#000', heading: "'Playfair Display', serif" }).fontHeading).toBe(
      "'Playfair Display', serif",
    )
  })
})

describe('carga de fuentes — sin acoplamiento oculto', () => {
  it('toda font usada en STYLES resuelve a una URL cargable', () => {
    for (const s of STYLES) {
      for (const stack of [s.tokens.fontHeading, s.tokens.fontBody]) {
        expect(fontQuery(familyName(stack))).not.toBeNull()
      }
    }
  })

  it('una font no registrada igual carga (con pesos por defecto)', () => {
    expect(fontQuery('Sora')).toBe('family=Sora:wght@400;500;600;700')
  })

  it('sanea el nombre para la URL (no inyecta caracteres raros)', () => {
    expect(fontQuery('Evil"/><script>')).toBe('family=Evilscript:wght@400;500;600;700')
  })
})
