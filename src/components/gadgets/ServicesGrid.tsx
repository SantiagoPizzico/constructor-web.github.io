import type { GadgetDefinition, GadgetProps } from '../../types'
import { servicesItems, servicesTitle } from '../../data/demo'
import { SectionHeading } from '../ui/SectionHeading'
import { InView } from '../ui/InView'
import { Icon } from '../ui/Icon'
import type { IconName } from '../ui/Icon'

interface ServicesContent {
  title: string
  items: { title: string; desc: string }[]
}

const ICONS: IconName[] = ['target', 'top', 'star-fill']

function Tile({ i }: { i: number }) {
  return (
    <div
      className="flex h-11 w-11 items-center justify-center rounded-theme text-brand mb-3 shrink-0 transition-transform duration-300 group-hover:scale-110"
      style={{ background: 'color-mix(in srgb, var(--brand) 14%, var(--surface-2))' }}
    >
      <Icon name={ICONS[i % ICONS.length]} size={20} />
    </div>
  )
}

function MoreLink() {
  return (
    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
      Ver más <Icon name="chevron-right" size={14} />
    </span>
  )
}

function ServicesGrid({ content, variant = 'grid' }: GadgetProps<ServicesContent>) {
  const isList = variant === 'lista'
  return (
    <section className="px-6 py-12 bg-bg text-fg">
      <SectionHeading eyebrow="Nuestra oferta" title={content.title} />
      <div
        style={
          isList
            ? { display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 640, margin: '0 auto' }
            : { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16 }
        }
      >
        {content.items.map((item, i) =>
          isList ? (
            <InView key={i} delay={i * 70} animation="slide-left">
              <div className="group flex items-start gap-4 rounded-theme border border-line p-4 bg-surface transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-brand">
                <Tile i={i} />
                <div>
                  <h3 className="font-heading font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted">{item.desc}</p>
                </div>
              </div>
            </InView>
          ) : (
            <InView key={i} delay={i * 70} className="h-full">
              <div className="group flex h-full flex-col rounded-theme border border-line p-5 bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand">
                <Tile i={i} />
                <h3 className="font-heading font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted">{item.desc}</p>
                <MoreLink />
              </div>
            </InView>
          ),
        )}
      </div>
    </section>
  )
}

export const services: GadgetDefinition<ServicesContent> = {
  meta: {
    id: 'services',
    category: 'oferta',
    name: 'Grilla de servicios',
    description: 'Tarjetas de servicios/productos (se adapta al rubro).',
    fitsBusiness: 'all',
    tier: 'base',
    variants: [
      { id: 'grid', name: 'Grilla' },
      { id: 'lista', name: 'Lista' },
    ],
  },
  Component: ServicesGrid,
  defaultContent: (b) => ({
    title: servicesTitle[b],
    items: servicesItems[b].map((t) => ({ title: t, desc: 'Descripción breve de lo que ofrecés en este punto.' })),
  }),
}
