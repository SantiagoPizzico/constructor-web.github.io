import { Icon } from '../ui/Icon'
import { useStore } from '../../store'

const base = 'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors'

export default function DeviceToggle() {
  const device = useStore((s) => s.device)
  const setDevice = useStore((s) => s.setDevice)
  return (
    <div className="inline-flex rounded-lg border border-ui-line overflow-hidden">
      <button
        onClick={() => setDevice('desktop')}
        className={device === 'desktop' ? `${base} bg-ui-text text-ui-surface` : `${base} hover:bg-ui-surface2`}
        aria-pressed={device === 'desktop'}
      >
        <Icon name="monitor" size={15} /> Escritorio
      </button>
      <button
        onClick={() => setDevice('mobile')}
        className={device === 'mobile' ? `${base} border-l border-ui-line bg-ui-text text-ui-surface` : `${base} border-l border-ui-line hover:bg-ui-surface2`}
        aria-pressed={device === 'mobile'}
      >
        <Icon name="mobile" size={15} /> Móvil
      </button>
    </div>
  )
}
