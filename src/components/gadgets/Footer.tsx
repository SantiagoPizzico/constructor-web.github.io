import type { GadgetDefinition, GadgetProps } from '../../types'
import { brandName } from '../../data/business'
import { Icon } from '../ui/Icon'
import type { IconName } from '../ui/Icon'

interface FooterContent {
  brand: string
  tagline: string
  links: string[]
  year: number
}

const SOCIALS: IconName[] = ['instagram', 'phone', 'contact']

function Footer({ content }: GadgetProps<FooterContent>) {
  return (
    <footer className="px-6 py-10 bg-surface2 text-muted border-t border-line">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-7">
        <div>
          <div className="font-heading font-semibold text-fg">Sumate a las novedades</div>
          <p className="text-sm text-muted">Ofertas y novedades, sin spam.</p>
        </div>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="tu@email.com"
            className="field rounded-theme border border-line bg-surface px-4 py-2.5 text-sm text-fg placeholder:text-muted"
          />
          <button
            className="rounded-theme bg-brand text-[var(--brand-ink)] px-4 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{ boxShadow: '0 8px 18px color-mix(in srgb, var(--brand) 26%, transparent)' }}
          >
            Suscribirme
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-[var(--brand-ink)] text-xs font-bold font-heading">
              {content.brand.slice(0, 1)}
            </span>
            <span className="font-heading font-semibold text-fg">{content.brand}</span>
          </div>
          <p className="text-sm text-muted">{content.tagline}</p>
          <div className="flex gap-2 mt-3">
            {SOCIALS.map((ic) => (
              <span
                key={ic}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:bg-brand hover:text-[var(--brand-ink)] hover:border-transparent cursor-pointer"
              >
                <Icon name={ic} size={15} />
              </span>
            ))}
          </div>
        </div>
        <div className="text-sm">
          <div className="text-muted mb-2 font-medium">Enlaces</div>
          {content.links.map((l) => (
            <div key={l} className="text-fg py-0.5 transition-colors hover:text-brand cursor-pointer">{l}</div>
          ))}
        </div>
        <div className="text-sm">
          <div className="text-muted mb-2 font-medium">Contacto</div>
          <div className="text-fg py-0.5">hola@minegocio.com</div>
          <div className="text-fg py-0.5">+54 11 1234 5678</div>
        </div>
      </div>
      <div className="text-xs text-muted mt-8">© {content.year} {content.brand}. Todos los derechos reservados.</div>
    </footer>
  )
}

export const footer: GadgetDefinition<FooterContent> = {
  meta: {
    id: 'footer',
    category: 'navegacion',
    name: 'Pie de página',
    description: 'Datos, enlaces y contacto.',
    fitsBusiness: 'all',
    tier: 'base',
  },
  Component: Footer,
  defaultContent: (b) => ({
    brand: brandName(b),
    tagline: 'Gracias por visitarnos.',
    links: ['Inicio', 'Servicios', 'Nosotros', 'Contacto'],
    year: new Date().getFullYear(),
  }),
}
