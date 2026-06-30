import { useEffect } from 'react'
import { Icon } from './components/ui/Icon'
import Toolbar from './components/builder/Toolbar'
import Catalog from './components/builder/Catalog'
import Preview from './components/builder/Preview'
import Summary from './components/builder/Summary'
import DeviceToggle from './components/builder/DeviceToggle'
import { UI_DARK_KEY, useStore } from './store'

function FullscreenOverlay() {
  const setFullscreen = useStore((s) => s.setFullscreen)
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ui-bg">
      <div className="flex items-center justify-between px-4 py-2 bg-ui-surface border-b border-ui-line">
        <span className="text-sm font-medium">Vista previa a pantalla completa</span>
        <div className="flex items-center gap-2">
          <DeviceToggle />
          <button onClick={() => setFullscreen(false)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border border-ui-line hover:bg-ui-surface2 transition-colors">
            <Icon name="x" size={15} /> Salir
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto thin-scroll p-6 flex justify-center items-start">
        <Preview />
      </div>
    </div>
  )
}

export default function App() {
  const fullscreen = useStore((s) => s.fullscreen)
  const uiDark = useStore((s) => s.uiDark)
  const setUiDark = useStore((s) => s.setUiDark)

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

  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center justify-between px-5 py-3 bg-ui-surface border-b border-ui-line">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-ui-text text-ui-surface flex items-center justify-center">
            <Icon name="services" size={15} />
          </span>
          <span className="font-semibold tracking-tight">Constructor Web</span>
          <span className="text-xs text-ui-muted ml-1 hidden sm:inline">· armá tu web o panel</span>
        </div>
        <div className="flex items-center gap-2">
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
      <div className="flex-1 grid min-h-0" style={{ gridTemplateColumns: '300px minmax(0,1fr) 300px' }}>
        <Catalog />
        <main className="overflow-auto thin-scroll p-6 flex justify-center items-start bg-ui-bg">
          <Preview />
        </main>
        <Summary />
      </div>
      {fullscreen && <FullscreenOverlay />}
    </div>
  )
}
