import type { GadgetDefinition, GadgetProps } from '../../types'
import { brandName } from '../../data/business'
import { Icon } from '../ui/Icon'

interface NavbarContent {
  brand: string
  links: string[]
  cta: string
}

function monogram(brand: string) {
  return brand
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function Navbar({ content }: GadgetProps<NavbarContent>) {
  return (
    <nav className="flex items-center justify-between gap-4 px-6 py-4 border-b border-line bg-surface text-fg">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-[var(--brand-ink)] font-heading text-sm font-bold">
          {monogram(content.brand)}
        </span>
        <span className="font-heading font-semibold">{content.brand}</span>
      </div>
      <div className="nav-links flex items-center gap-6 text-sm text-muted">
        {content.links.map((l) => (
          <span
            key={l}
            className="relative cursor-pointer pb-0.5 transition-colors hover:text-fg after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-brand after:transition-all after:duration-300 hover:after:w-full"
          >
            {l}
          </span>
        ))}
        <button
          className="bg-brand text-[var(--brand-ink)] px-4 py-2 rounded-theme text-sm font-medium transition-transform hover:-translate-y-0.5"
          style={{ boxShadow: '0 8px 18px color-mix(in srgb, var(--brand) 28%, transparent)' }}
        >
          {content.cta}
        </button>
      </div>
      <button className="nav-burger items-center justify-center text-fg" aria-label="Abrir menú">
        <Icon name="menu" size={22} />
      </button>
    </nav>
  )
}

export const navbar: GadgetDefinition<NavbarContent> = {
  meta: {
    id: 'navbar',
    category: 'navegacion',
    name: 'Barra de navegación',
    description: 'Logo, links y botón de acción.',
    fitsBusiness: 'all',
    tier: 'base',
  },
  Component: Navbar,
  defaultContent: (b) => ({
    brand: brandName(b),
    links: ['Inicio', 'Servicios', 'Nosotros'],
    cta: 'Contacto',
  }),
}
