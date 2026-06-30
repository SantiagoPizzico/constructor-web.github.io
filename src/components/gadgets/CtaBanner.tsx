import type { GadgetDefinition, GadgetProps } from '../../types'
import { InView } from '../ui/InView'
import { Icon } from '../ui/Icon'

interface CtaContent {
  title: string
  text: string
  cta: string
}

function CtaBanner({ content }: GadgetProps<CtaContent>) {
  return (
    <section className="relative px-6 py-16 bg-brand text-[var(--brand-ink)] text-center overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(color-mix(in srgb, var(--brand-ink) 25%, transparent) 1.2px, transparent 1.2px)',
          backgroundSize: '16px 16px',
          opacity: 0.35,
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 120% at 50% 0%, color-mix(in srgb, var(--brand-ink) 14%, transparent), transparent)' }}
      />
      <InView animation="scale" className="relative mx-auto max-w-xl">
        <h2 className="font-heading text-3xl font-bold mb-2">{content.title}</h2>
        <p className="opacity-90 mb-7">{content.text}</p>
        <button
          className="group inline-flex items-center gap-2 bg-[var(--brand-ink)] text-brand px-7 py-3 rounded-theme font-medium shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {content.cta}
          <Icon name="chevron-right" size={16} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </InView>
    </section>
  )
}

export const cta: GadgetDefinition<CtaContent> = {
  meta: {
    id: 'cta',
    category: 'conversion',
    name: 'Banner de cierre (CTA)',
    description: 'Llamado a la acción a todo el ancho, una sola acción.',
    fitsBusiness: 'all',
    tier: 'base',
  },
  Component: CtaBanner,
  defaultContent: () => ({
    title: '¿Listo para empezar?',
    text: 'Sumate hoy y descubrí por qué tantos nos eligen.',
    cta: 'Contactanos',
  }),
}
