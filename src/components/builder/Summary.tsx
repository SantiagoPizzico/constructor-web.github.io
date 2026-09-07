import { registry } from '../../registry'
import { useStore } from '../../store'
import { businessLabel } from '../../data/business'
import { getStyle } from '../../data/styles'
import { kindLabel, projectKind } from '../../lib/kind'
import { buildSpec, specToWhatsapp } from '../../lib/export'
import { Icon } from '../ui/Icon'

// Tu WhatsApp: adonde llega el diseño del cliente para seguir la charla en persona.
// Formato wa.me = código de país + número, solo dígitos (sin +, sin espacios).
const WHATSAPP_PHONE = '542923504415'

export default function Summary({ className = '' }: { className?: string }) {
  const order = useStore((s) => s.order)
  const business = useStore((s) => s.business)
  const styleId = useStore((s) => s.styleId)
  const variantById = useStore((s) => s.variantById)
  const device = useStore((s) => s.device)
  const style = getStyle(styleId)

  const active = order.map((id) => registry[id]).filter(Boolean)
  const kind = kindLabel[projectKind(active)]

  const spec = buildSpec({
    business,
    style,
    device,
    components: active.map((def) => ({ def, variant: variantById[def.meta.id] ?? def.meta.variants?.[0]?.id ?? null })),
  })

  const waText = specToWhatsapp(spec)
  const waLink = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waText)}`

  return (
    <aside className={`lg:border-l border-ui-line bg-ui-surface overflow-auto thin-scroll p-5 flex flex-col ${className}`}>
      <h2 className="font-semibold mb-1">Resumen</h2>
      <p className="text-sm text-ui-muted mb-4">
        Estás armando <span className="font-medium text-ui-text">{kind}</span> para {businessLabel(business)}.
      </p>

      <div className="flex items-center gap-2 mb-4 rounded-lg border border-ui-line px-3 py-2">
        <span className="flex">
          <span className="w-4 h-4 rounded-full inline-block" style={{ background: style.tokens.brand }} />
          <span className="w-4 h-4 -ml-1.5 rounded-full inline-block border border-ui-surface" style={{ background: style.tokens.accent }} />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-medium">{style.name}</div>
          <div className="text-[11px] text-ui-muted">{style.fits}</div>
        </div>
      </div>

      <div className="text-xs font-semibold uppercase tracking-wide text-ui-muted mb-2">{active.length} componentes</div>
      <ol className="text-sm space-y-1 mb-6">
        {active.map((d, i) => (
          <li key={d.meta.id} className="flex gap-2 items-center">
            <span className="text-ui-muted">{i + 1}.</span>
            <span className="flex-1">{d.meta.name}</span>
            {d.meta.isPanel && <span className="text-[10px] text-ui-muted bg-ui-surface2 rounded px-1.5 py-0.5">panel</span>}
          </li>
        ))}
        {active.length === 0 && <li className="text-ui-muted">Sin componentes todavía.</li>}
      </ol>

      <div className="mt-auto">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ui-muted mb-1">
          <Icon name="doc" size={13} /> Tu diseño
        </div>
        <p className="text-[11px] text-ui-muted mb-3">
          Envialo por WhatsApp y lo terminamos juntos, a tu medida.
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-medium px-4 py-3 rounded-lg shadow-sm transition hover:brightness-95 active:scale-[0.99]"
        >
          <Icon name="phone" size={16} /> Enviar mi diseño por WhatsApp
        </a>
      </div>
    </aside>
  )
}
