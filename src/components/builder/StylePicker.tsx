import { useEffect, useRef, useState } from 'react'
import { Icon } from '../ui/Icon'
import { STYLES } from '../../data/styles'
import type { StylePreset } from '../../types'
import { ensureStyleFonts, familyName } from '../../lib/fonts'
import { useStore } from '../../store'

const SWATCH_BORDER = '1px solid rgba(125,125,125,0.25)'

// Paleta de 5 roles que se muestra en cada card (como la referencia de diseño).
function palette(s: StylePreset): { label: string; color: string }[] {
  return [
    { label: 'Fondo', color: s.tokens.bg },
    { label: 'Superficie', color: s.tokens.surface },
    { label: 'Texto', color: s.tokens.text },
    { label: 'Primario', color: s.tokens.brand },
    { label: 'Acento', color: s.tokens.accent },
  ]
}

function ThemeCard({ s, active, onSelect }: { s: StylePreset; active: boolean; onSelect: () => void }) {
  return (
    <button
      role="option"
      aria-selected={active}
      onClick={onSelect}
      className={
        active
          ? 'text-left rounded-lg border-2 border-ui-text p-2.5'
          : 'text-left rounded-lg border border-ui-line p-2.5 hover:border-ui-text transition-colors'
      }
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-ui-text truncate">{s.name}</span>
        {active && <Icon name="check" size={14} className="text-ui-text shrink-0" />}
      </div>
      <div className="mt-0.5 mb-2 flex items-center gap-1.5 text-[11px] text-ui-muted truncate">
        <span style={{ fontFamily: s.tokens.fontHeading }}>{familyName(s.tokens.fontHeading)}</span>
        <span className="opacity-50">·</span>
        <span style={{ fontFamily: s.tokens.fontBody }}>{familyName(s.tokens.fontBody)}</span>
      </div>
      <div className="flex gap-1">
        {palette(s).map((p) => (
          <span
            key={p.label}
            className="h-5 flex-1 rounded"
            style={{ background: p.color, border: SWATCH_BORDER }}
            title={`${p.label} ${p.color}`}
          />
        ))}
      </div>
    </button>
  )
}

export default function StylePicker() {
  const styleId = useStore((s) => s.styleId)
  const setStyle = useStore((s) => s.setStyle)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = STYLES.find((s) => s.id === styleId) ?? STYLES[0]

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  function toggle() {
    if (!open) STYLES.forEach(ensureStyleFonts)
    setOpen((o) => !o)
  }

  return (
    <div className="relative flex items-center gap-2" ref={ref}>
      <span className="text-ui-muted text-sm">Estilo</span>
      <button
        onClick={toggle}
        className="inline-flex items-center gap-2 border border-ui-line rounded-lg px-2.5 py-1.5 bg-ui-surface text-sm hover:bg-ui-surface2 transition-colors"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="flex">
          <span className="w-4 h-4 rounded-full border border-ui-line" style={{ background: current.tokens.brand }} />
          <span className="w-4 h-4 -ml-1.5 rounded-full border border-ui-line" style={{ background: current.tokens.accent }} />
        </span>
        {current.name}
        <Icon name="chevron" size={14} className="text-ui-muted" />
      </button>

      {open && (
        <div
          className="absolute z-30 top-full left-0 mt-2 w-[440px] max-w-[88vw] max-h-[70vh] overflow-auto thin-scroll bg-ui-surface border border-ui-line rounded-xl shadow-xl p-2"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}
          role="listbox"
        >
          {STYLES.map((s) => (
            <ThemeCard
              key={s.id}
              s={s}
              active={s.id === styleId}
              onSelect={() => {
                setStyle(s.id)
                setOpen(false)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
