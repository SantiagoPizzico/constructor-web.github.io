import type { GadgetDefinition, GadgetProps } from '../../types'
import { SectionHeading } from '../ui/SectionHeading'
import { InView } from '../ui/InView'
import { Icon } from '../ui/Icon'
import { Carousel } from '../ui/Carousel'

interface Testimonial {
  quote: string
  author: string
}

interface TestimonialsContent {
  title: string
  items: Testimonial[]
}

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-brand mb-3" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star-fill" size={15} />
      ))}
    </div>
  )
}

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="h-full rounded-theme border border-line p-5 bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand">
      <div className="font-heading text-4xl leading-none text-brand mb-1" style={{ opacity: 0.25 }} aria-hidden="true">
        {'“'}
      </div>
      <Stars />
      <p className="mb-4">{t.quote}</p>
      <div className="flex items-center gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-[var(--brand-ink)] text-xs font-semibold"
          style={{ boxShadow: '0 0 0 3px color-mix(in srgb, var(--brand) 22%, transparent)' }}
        >
          {initials(t.author)}
        </span>
        <div>
          <div className="text-sm font-semibold leading-tight">{t.author}</div>
          <div className="text-xs text-muted leading-tight">Cliente</div>
        </div>
      </div>
    </div>
  )
}

function Testimonials({ content, variant = 'grid' }: GadgetProps<TestimonialsContent>) {
  return (
    <section className="px-6 py-12 bg-bg text-fg">
      <SectionHeading eyebrow="Opiniones" title={content.title} />
      {variant === 'carrusel' ? (
        <Carousel slideWidth={300}>
          {content.items.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </Carousel>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {content.items.map((t, i) => (
            <InView key={i} delay={i * 90} className="h-full">
              <Card t={t} />
            </InView>
          ))}
        </div>
      )}
    </section>
  )
}

export const testimonials: GadgetDefinition<TestimonialsContent> = {
  meta: {
    id: 'testimonials',
    category: 'prueba-social',
    name: 'Testimonios',
    description: 'Reseñas con estrellas (hasta +270% conversión).',
    fitsBusiness: 'all',
    tier: 'base',
    variants: [
      { id: 'grid', name: 'Grilla' },
      { id: 'carrusel', name: 'Carrusel' },
    ],
  },
  Component: Testimonials,
  defaultContent: () => ({
    title: 'Lo que dicen nuestros clientes',
    items: [
      { quote: 'Excelente atención y resultados. Súper recomendados.', author: 'María González' },
      { quote: 'La mejor decisión que tomé. Volvería sin dudarlo.', author: 'Juan Pérez' },
      { quote: 'Profesionales de principio a fin. Cinco estrellas.', author: 'Lucía Ramírez' },
    ],
  }),
}
