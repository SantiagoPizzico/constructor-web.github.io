import { beforeEach, describe, expect, it } from 'vitest'
import { useStore } from './store'
import { presets } from './data/presets'
import type { BusinessType } from './types'

beforeEach(() => {
  useStore.setState({
    business: 'gimnasio',
    styleId: 'moderno',
    order: [...presets.gimnasio],
    device: 'desktop',
    fullscreen: false,
  })
})

describe('store', () => {
  it('toggleGadget agrega y quita un componente', () => {
    const id = 'gallery'
    const had = useStore.getState().order.includes(id)
    useStore.getState().toggleGadget(id)
    expect(useStore.getState().order.includes(id)).toBe(!had)
    useStore.getState().toggleGadget(id)
    expect(useStore.getState().order.includes(id)).toBe(had)
  })

  it('setBusiness carga el preset del rubro', () => {
    useStore.getState().setBusiness('comercio')
    expect(useStore.getState().business).toBe('comercio')
    expect(useStore.getState().order).toEqual(presets.comercio)
  })

  it('setBusiness ignora un rubro inválido', () => {
    const before = useStore.getState().business
    useStore.getState().setBusiness('inexistente' as BusinessType)
    expect(useStore.getState().business).toBe(before)
  })

  it('setOrder reemplaza el orden', () => {
    useStore.getState().setOrder(['hero', 'footer'])
    expect(useStore.getState().order).toEqual(['hero', 'footer'])
  })

  it('setStyle / setDevice / setFullscreen actualizan el estado', () => {
    useStore.getState().setStyle('oscuro')
    useStore.getState().setDevice('mobile')
    useStore.getState().setFullscreen(true)
    const s = useStore.getState()
    expect(s.styleId).toBe('oscuro')
    expect(s.device).toBe('mobile')
    expect(s.fullscreen).toBe(true)
  })
})
