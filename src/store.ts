import { create } from 'zustand'
import type { BusinessType, Device } from './types'
import { DEFAULT_STYLE_ID } from './data/styles'
import { presets } from './data/presets'

export const UI_DARK_KEY = 'constructor-ui-dark'

/** Lee la preferencia guardada; si no hay, respeta el tema del sistema operativo. */
function initialUiDark(): boolean {
  try {
    const saved = localStorage.getItem(UI_DARK_KEY)
    if (saved === '1') return true
    if (saved === '0') return false
  } catch {
    // localStorage no disponible (modo privado, SSR): seguir al SO
  }
  try {
    return typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches
  } catch {
    return false
  }
}

interface BuilderState {
  business: BusinessType
  styleId: string
  order: string[]
  variantById: Record<string, string>
  device: Device
  fullscreen: boolean
  uiDark: boolean
  setBusiness: (b: BusinessType) => void
  setStyle: (id: string) => void
  toggleGadget: (id: string) => void
  setOrder: (order: string[]) => void
  setVariant: (id: string, variant: string) => void
  setDevice: (d: Device) => void
  setFullscreen: (v: boolean) => void
  setUiDark: (v: boolean) => void
}

export const useStore = create<BuilderState>((set, get) => ({
  business: 'gimnasio',
  styleId: DEFAULT_STYLE_ID,
  order: [...presets.gimnasio],
  variantById: {},
  device: 'desktop',
  fullscreen: false,
  uiDark: initialUiDark(),

  setBusiness: (b) => {
    if (!presets[b]) return
    set({ business: b, order: [...presets[b]] })
  },
  setStyle: (id) => set({ styleId: id }),

  toggleGadget: (id) => {
    const { order } = get()
    set({
      order: order.includes(id)
        ? order.filter((x) => x !== id)
        : [...order, id],
    })
  },

  setOrder: (order) => set({ order }),
  setVariant: (id, variant) => set((state) => ({ variantById: { ...state.variantById, [id]: variant } })),
  setDevice: (d) => set({ device: d }),
  setFullscreen: (v) => set({ fullscreen: v }),
  setUiDark: (v) => {
    try {
      localStorage.setItem(UI_DARK_KEY, v ? '1' : '0')
    } catch {
      // localStorage no disponible: ignorar
    }
    set({ uiDark: v })
  },
}))
