import { describe, expect, it } from 'vitest'
import { contrastRatio } from './contrast'
import { STYLES } from '../data/styles'

// WCAG AA: 4.5 para texto normal. Validamos los pares de texto reales de cada estilo.
const AA = 4.5

describe('contraste WCAG AA de los estilos', () => {
  for (const s of STYLES) {
    const t = s.tokens
    it(`${s.name}: texto / superficie`, () => {
      expect(Number(contrastRatio(t.text, t.surface).toFixed(2))).toBeGreaterThanOrEqual(AA)
    })
    it(`${s.name}: texto / fondo`, () => {
      expect(Number(contrastRatio(t.text, t.bg).toFixed(2))).toBeGreaterThanOrEqual(AA)
    })
    it(`${s.name}: muted / superficie`, () => {
      expect(Number(contrastRatio(t.muted, t.surface).toFixed(2))).toBeGreaterThanOrEqual(AA)
    })
    it(`${s.name}: brandInk / brand (botones)`, () => {
      expect(Number(contrastRatio(t.brandInk, t.brand).toFixed(2))).toBeGreaterThanOrEqual(AA)
    })
  }
})
