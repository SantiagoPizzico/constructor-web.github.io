import { Icon } from '../ui/Icon'
import { BUSINESSES } from '../../data/business'
import { useStore } from '../../store'
import type { BusinessType } from '../../types'
import StylePicker from './StylePicker'
import DeviceToggle from './DeviceToggle'

export default function Toolbar() {
  const business = useStore((s) => s.business)
  const setBusiness = useStore((s) => s.setBusiness)
  const setFullscreen = useStore((s) => s.setFullscreen)

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-3 sm:px-5 py-2.5 sm:py-3 bg-ui-surface border-b border-ui-line">
      <label className="flex min-w-0 items-center gap-2 text-sm">
        <span className="text-ui-muted">Rubro</span>
        <select
          value={business}
          onChange={(e) => setBusiness(e.target.value as BusinessType)}
          className="min-w-0 border border-ui-line rounded-lg px-2 py-1.5 bg-ui-surface text-ui-text transition-colors hover:border-ui-text"
        >
          {BUSINESSES.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
        </select>
      </label>

      <StylePicker />

      {/* En mobile este grupo baja a su propia fila y se reparte el ancho;
          desde sm vuelve a alinearse a la derecha. */}
      <div className="flex w-full items-center justify-between gap-2 sm:ml-auto sm:w-auto sm:justify-start">
        <DeviceToggle />
        <button
          onClick={() => setFullscreen(true)}
          className="inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-lg text-sm border border-ui-line hover:bg-ui-surface2 transition-colors"
        >
          <Icon name="maximize" size={15} /> Pantalla completa
        </button>
      </div>
    </div>
  )
}
