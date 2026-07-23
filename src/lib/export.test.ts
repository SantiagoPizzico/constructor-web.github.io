import { describe, expect, it } from 'vitest'
import { buildSpec, specToWhatsapp } from './export'
import type { SpecInput } from './export'
import { registry } from '../registry'
import { getStyle } from '../data/styles'

function sampleInput(): SpecInput {
  return {
    business: 'gimnasio',
    style: getStyle('moderno'),
    device: 'desktop',
    components: [
      { def: registry['hero'], variant: 'dividido' },
      { def: registry['pricing'], variant: null },
    ],
    now: new Date('2026-06-21T00:00:00Z'),
  }
}

describe('buildSpec', () => {
  it('arma el spec con negocio, kind, tema y componentes', () => {
    const spec = buildSpec(sampleInput())
    expect(spec.business.label).toBe('Gimnasio / Fitness')
    expect(spec.kind).toBe('una web')
    expect(spec.theme.colors.accent).toBe('#10b981')
    expect(spec.theme.fonts.heading).toBe('Poppins')
    expect(spec.components).toHaveLength(2)
    expect(spec.components[0].name).toBe('Portada (Hero)')
    expect(spec.components[0].variant).toEqual({ id: 'dividido', name: 'Dividido' })
    expect(spec.components[0].contentNeeds.length).toBeGreaterThan(0)
    expect(spec.generatedAt).toBe('2026-06-21')
  })
})

describe('specToWhatsapp', () => {
  it('arma un mensaje de venta con negocio, identidad, secciones y cierre', () => {
    const msg = specToWhatsapp(buildSpec(sampleInput()))
    expect(msg).toContain('*Negocio:* Gimnasio / Fitness')
    expect(msg).toContain('*Estilo:* Moderno · Poppins/Inter')
    expect(msg).toContain('*Paleta:* primario #2563eb, acento #10b981')
    expect(msg).toContain('*Secciones (2):*')
    expect(msg).toContain('• Portada (Hero) (Dividido)')
    expect(msg).toContain('presupuesto y tiempos de entrega')
  })
})
