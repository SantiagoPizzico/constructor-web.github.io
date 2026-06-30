import { describe, expect, it } from 'vitest'
import { buildSpec, specToBuildPrompt, specToJson, specToMarkdown } from './export'
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

describe('serializadores', () => {
  it('markdown incluye título, paleta con accent y secciones', () => {
    const md = specToMarkdown(buildSpec(sampleInput()))
    expect(md).toContain('# Diseño — Gimnasio / Fitness')
    expect(md).toContain('| Acento | `#10b981` |')
    expect(md).toContain('**Portada (Hero)**')
    expect(md).toContain('(diseño: Dividido)')
    expect(md).toContain('- [ ] Titular')
  })

  it('build-prompt incluye tokens, stack, secciones con variante y checklist de contenido', () => {
    const p = specToBuildPrompt(buildSpec(sampleInput()))
    expect(p).toContain('--accent: #10b981')
    expect(p).toContain('--brand: #2563eb')
    expect(p).toContain('React + Vite')
    expect(p).toContain('Portada (Hero) — diseño "Dividido"')
    expect(p).toContain('· Titular')
  })

  it('JSON es parseable y conserva la estructura', () => {
    const json = specToJson(buildSpec(sampleInput()))
    const parsed = JSON.parse(json)
    expect(parsed.components).toHaveLength(2)
    expect(parsed.theme.colors.accent).toBe('#10b981')
    expect(parsed.business.id).toBe('gimnasio')
  })
})
