import type { GadgetDefinition, GadgetProps } from '../../types'
import { Icon } from '../ui/Icon'

interface WhatsappContent {
  phone: string
}

function WhatsappFloat({ content }: GadgetProps<WhatsappContent>) {
  // wa.me espera solo dígitos; normalizar además evita inyección en la URL.
  const phone = content.phone.replace(/\D/g, '')
  return (
    <div className="sticky bottom-4 z-20 flex justify-end px-4" style={{ height: 0, overflow: 'visible' }}>
      <a
        href={`https://wa.me/${phone}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Escribinos por WhatsApp"
        className="group -translate-y-14 flex items-center gap-2"
      >
        <span className="rounded-full border border-line bg-surface text-fg shadow px-3 py-1.5 text-sm whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
          ¿Hablamos?
        </span>
        <span className="wa-pulse flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition group-hover:brightness-95">
          <Icon name="phone" size={26} />
        </span>
      </a>
    </div>
  )
}

export const whatsappFloat: GadgetDefinition<WhatsappContent> = {
  meta: {
    id: 'whatsapp-float',
    category: 'conversion',
    name: 'WhatsApp flotante',
    description: 'Botón fijo de WhatsApp (canal directo, clave en LATAM).',
    fitsBusiness: 'all',
    tier: 'base',
  },
  Component: WhatsappFloat,
  defaultContent: () => ({ phone: '5491112345678' }),
}
