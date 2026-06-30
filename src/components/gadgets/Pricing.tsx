import type { GadgetDefinition, GadgetProps } from '../../types'
import { SectionHeading } from '../ui/SectionHeading'
import { InView } from '../ui/InView'
import { Icon } from '../ui/Icon'

interface Plan {
  name: string
  price: string
  period: string
  features: string[]
  cta: string
  highlighted?: boolean
  badge?: string
}

interface PricingContent {
  title: string
  plans: Plan[]
}

function Pricing({ content }: GadgetProps<PricingContent>) {
  return (
    <section className="px-6 py-12 bg-bg text-fg">
      <SectionHeading eyebrow="Planes y precios" title={content.title} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16, alignItems: 'stretch' }}>
        {content.plans.map((p, i) => (
          <InView key={p.name} delay={i * 90} className="h-full">
            <div
              className={
                p.highlighted
                  ? 'relative z-10 flex h-full flex-col rounded-theme border-2 border-brand p-6 bg-surface shadow-xl'
                  : 'group relative flex h-full flex-col rounded-theme border border-line p-6 bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand'
              }
            >
              {p.highlighted && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-3 -z-10 rounded-[28px]"
                  style={{ background: 'radial-gradient(60% 70% at 50% 0%, color-mix(in srgb, var(--brand) 22%, transparent), transparent)' }}
                />
              )}
              {p.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand text-[var(--brand-ink)] text-xs px-3 py-1 font-medium shadow-md">
                  {p.badge}
                </span>
              )}
              <h3 className="font-heading font-semibold">{p.name}</h3>
              <div className="my-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight">{p.price}</span>
                <span className="text-sm text-muted">/{p.period}</span>
              </div>
              <ul className="space-y-2.5 my-5 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-full text-brand shrink-0"
                      style={{ background: 'color-mix(in srgb, var(--brand) 16%, var(--surface-2))' }}
                    >
                      <Icon name="check" size={12} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={
                  p.highlighted
                    ? 'group/btn inline-flex w-full items-center justify-center gap-2 bg-brand text-[var(--brand-ink)] py-2.5 rounded-theme font-medium transition-transform hover:-translate-y-0.5'
                    : 'inline-flex w-full items-center justify-center gap-2 border border-line py-2.5 rounded-theme font-medium hover:bg-surface2 transition-colors'
                }
                style={p.highlighted ? { boxShadow: '0 10px 22px color-mix(in srgb, var(--brand) 30%, transparent)' } : undefined}
              >
                {p.cta}
                {p.highlighted && <Icon name="chevron-right" size={15} className="transition-transform group-hover/btn:translate-x-0.5" />}
              </button>
            </div>
          </InView>
        ))}
      </div>
    </section>
  )
}

export const pricing: GadgetDefinition<PricingContent> = {
  meta: {
    id: 'pricing',
    category: 'oferta',
    name: 'Planes / Precios',
    description: '3 niveles, con el recomendado resaltado (efecto señuelo).',
    fitsBusiness: 'all',
    tier: 'base',
  },
  Component: Pricing,
  defaultContent: () => ({
    title: 'Planes',
    plans: [
      { name: 'Básico', price: '$9.900', period: 'mes', features: ['Acceso general', 'Soporte por email'], cta: 'Elegir' },
      { name: 'Profesional', price: '$15.900', period: 'mes', features: ['Todo lo del Básico', 'Atención prioritaria', 'Extras incluidos'], cta: 'Elegir', highlighted: true, badge: 'Más popular' },
      { name: 'Premium', price: '$24.900', period: 'mes', features: ['Todo lo del Pro', 'Beneficios exclusivos'], cta: 'Elegir' },
    ],
  }),
}
