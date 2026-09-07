import { useEffect, useState } from 'react'
import { Icon } from './components/ui/Icon'
import type { IconName } from './components/ui/Icon'
import Toolbar from './components/builder/Toolbar'
import Catalog from './components/builder/Catalog'
import Preview from './components/builder/Preview'
import Summary from './components/builder/Summary'
import DeviceToggle from './components/builder/DeviceToggle'
import { UI_DARK_KEY, useStore } from './store'

// En pantallas angostas las tres columnas no entran, así que se muestra una sola
// y estas pestañas eligen cuál. A partir de `lg` las tres conviven y las pestañas
// desaparecen (la visibilidad la resuelve CSS, no JS: al ensanchar no queda
// ningún panel escondido aunque el estado siga marcando otra pestaña).
type Pane = 'catalog' | 'preview' | 'summary'

const PANES: { id: Pane; label: string; icon: IconName }[] = [
  { id: 'catalog', label: 'Secciones', icon: 'services' },
  { id: 'preview', label: 'Vista', icon: 'monitor' },
  { id: 'summary', label: 'Resumen', icon: 'doc' },
]

// Botones con aria-pressed (mismo patrón que DeviceToggle) en vez de role="tab":
// unas tabs de verdad exigen role="tabpanel", y ponérselo al <main> y a los <aside>
// borraría esos landmarks, que valen más que la semántica de pestañas.
function PaneTabs({ pane, onPane }: { pane: Pane; onPane: (p: Pane) => void }) {
  return (
    <div className="flex lg:hidden bg-ui-surface border-b border-ui-line">
      {PANES.map((p) => {
        const active = pane === p.id
        return (
          <button
            key={p.id}
            aria-pressed={active}
            onClick={() => onPane(p.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 px-2 py-2.5 text-sm transition-colors ${
              active ? 'border-ui-text font-medium text-ui-text' : 'border-transparent text-ui-muted hover:text-ui-text'
            }`}
          >
            <Icon name={p.icon} size={15} />
            {p.label}
          </button>
        )
      })}
    </div>
  )
}

function FullscreenOverlay() {
  const setFullscreen = useStore((s) => s.setFullscreen)
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ui-bg">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 sm:px-4 bg-ui-surface border-b border-ui-line">
        <span className="text-sm font-medium">Vista previa a pantalla completa</span>
        <div className="flex items-center gap-2">
          <DeviceToggle />
          <button onClick={() => setFullscreen(false)} className="inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-lg text-sm border border-ui-line hover:bg-ui-surface2 transition-colors">
            <Icon name="x" size={15} /> Salir
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto thin-scroll p-3 sm:p-6 flex justify-center items-start">
        <Preview />
      </div>
    </div>
  )
}

export default function App() {
  const fullscreen = useStore((s) => s.fullscreen)
  const uiDark = useStore((s) => s.uiDark)
  const setUiDark = useStore((s) => s.setUiDark)
  const [pane, setPane] = useState<Pane>('preview')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', uiDark)
  }, [uiDark])

  // Seguir el tema del SO en vivo, salvo que el usuario haya elegido manualmente.
  // Actualiza el estado sin persistir (no usa setUiDark) para no marcar "elección".
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      let chosen = false
      try {
        chosen = localStorage.getItem(UI_DARK_KEY) !== null
      } catch {
        // localStorage no disponible: tratar como "sin elección"
      }
      if (!chosen) useStore.setState({ uiDark: e.matches })
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Oculta el panel salvo que sea la pestaña activa; desde `lg` siempre se ve.
  // Las clases van literales: Tailwind escanea el código y no genera las que se
  // arman concatenando strings.
  const hideUnless = (id: Pane, shown: 'block' | 'flex') =>
    pane === id ? '' : shown === 'block' ? 'hidden lg:block' : 'hidden lg:flex'

  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center justify-between gap-2 px-3 sm:px-5 py-3 bg-ui-surface border-b border-ui-line">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="w-7 h-7 shrink-0 rounded-lg bg-ui-text text-ui-surface flex items-center justify-center">
            <Icon name="services" size={15} />
          </span>
          <span className="font-semibold tracking-tight truncate">Constructor Web</span>
          <span className="text-xs text-ui-muted ml-1 hidden sm:inline">· armá tu web o panel</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => setUiDark(!uiDark)}
            aria-label={uiDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            title={uiDark ? 'Tema claro' : 'Tema oscuro'}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-ui-line text-ui-muted hover:bg-ui-surface2 hover:text-ui-text transition-colors"
          >
            <Icon name={uiDark ? 'sun' : 'moon'} size={16} />
          </button>
          <span className="text-[11px] text-ui-muted border border-ui-line rounded-full px-2 py-0.5">MVP</span>
        </div>
      </header>
      <Toolbar />
      <PaneTabs pane={pane} onPane={setPane} />
      <div className="flex-1 grid min-h-0 grid-cols-1 grid-rows-1 lg:grid-cols-[300px_minmax(0,1fr)_300px]">
        <Catalog className={hideUnless('catalog', 'block')} />
        <main className={`overflow-auto thin-scroll p-3 sm:p-6 flex justify-center items-start bg-ui-bg ${hideUnless('preview', 'flex')}`}>
          <Preview />
        </main>
        <Summary className={hideUnless('summary', 'flex')} />
      </div>
      {fullscreen && <FullscreenOverlay />}
    </div>
  )
}
