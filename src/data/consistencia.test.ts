import { describe, it, expect } from 'vitest'
import { gadgets, registry } from '../registry'
import { presets } from './presets'
import { BUSINESSES } from './business'

// Los presets referencian gadgets por id suelto (string), así que un id mal
// escrito no rompe el build: la sección simplemente desaparece del preset sin
// avisar. Estas pruebas atrapan ese tipo de desajuste.
describe('consistencia de datos', () => {
  it('todos los ids de los presets existen en el registro', () => {
    const faltantes: string[] = []
    for (const [rubro, ids] of Object.entries(presets)) {
      for (const id of ids) if (!registry[id]) faltantes.push(`${rubro} -> ${id}`)
    }
    expect(faltantes).toEqual([])
  })

  it('no hay ids de gadget duplicados en el registro', () => {
    const ids = gadgets.map((g) => g.meta.id)
    expect(ids.length).toBe(new Set(ids).size)
  })

  it('cada rubro del selector tiene un preset', () => {
    const sinPreset = BUSINESSES.filter((b) => !presets[b.id]).map((b) => b.id)
    expect(sinPreset).toEqual([])
  })

  it('cada gadget produce contenido por defecto para todos los rubros', () => {
    const rotos: string[] = []
    for (const g of gadgets) {
      for (const b of BUSINESSES) {
        try {
          if (g.defaultContent(b.id) == null) rotos.push(`${g.meta.id}/${b.id}: devolvio null`)
        } catch (e) {
          rotos.push(`${g.meta.id}/${b.id}: ${(e as Error).message}`)
        }
      }
    }
    expect(rotos).toEqual([])
  })

  it('las variantes declaradas tienen ids únicos', () => {
    const rotos = gadgets
      .filter((g) => {
        const ids = g.meta.variants?.map((v) => v.id)
        return ids ? ids.length !== new Set(ids).size : false
      })
      .map((g) => g.meta.id)
    expect(rotos).toEqual([])
  })
})
