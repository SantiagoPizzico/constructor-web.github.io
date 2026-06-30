import { useEffect } from 'react'
import { Icon } from '../ui/Icon'
import { registry } from '../../registry'
import { useStore } from '../../store'
import { themeVars } from '../../theme'
import { getStyle } from '../../data/styles'
import { ensureStyleFonts } from '../../lib/fonts'
import GadgetBoundary from './GadgetBoundary'

export default function Preview() {
  const order = useStore((s) => s.order)
  const business = useStore((s) => s.business)
  const variantById = useStore((s) => s.variantById)
  const styleId = useStore((s) => s.styleId)
  const device = useStore((s) => s.device)
  const fullscreen = useStore((s) => s.fullscreen)
  const style = getStyle(styleId)
  const tokens = style.tokens
  const mobile = device === 'mobile'
  const width = mobile ? 390 : fullscreen ? 1200 : 980

  useEffect(() => {
    ensureStyleFonts(style)
  }, [style])

  return (
    <div
      style={{ width, maxWidth: '100%' }}
      className="bg-white rounded-xl border border-black/10 shadow-lg overflow-hidden transition-all duration-300"
    >
      <div className="flex items-center gap-2 px-3 py-2 bg-[#ececef] border-b border-black/10">
        <span className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        </span>
        {!mobile && (
          <span className="flex-1 flex justify-center">
            <span className="inline-flex items-center gap-1.5 bg-white rounded-md px-3 py-1 text-xs text-black/45 border border-black/5">
              <Icon name="lock" size={11} /> minegocio.com
            </span>
          </span>
        )}
      </div>

      <div style={themeVars(tokens)} className="preview-site bg-bg text-fg font-body">
        {order.length === 0 ? (
          <div className="p-16 text-center">
            <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-surface2 text-muted">
              <Icon name="services" size={22} />
            </span>
            <p className="font-medium text-fg">Tu sitio aparece acá</p>
            <p className="mt-1 text-sm text-muted">Activá componentes del catálogo de la izquierda.</p>
          </div>
        ) : (
          order.map((id) => {
            const def = registry[id]
            if (!def) return null
            const Comp = def.Component
            return (
              <div key={id} className="gadget-enter">
                <GadgetBoundary name={def.meta.name}>
                  <Comp
                    business={business}
                    content={def.defaultContent(business)}
                    variant={variantById[id] ?? def.meta.variants?.[0]?.id}
                  />
                </GadgetBoundary>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
