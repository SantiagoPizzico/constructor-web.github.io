import type { GadgetDefinition, GadgetProps } from '../../types'
import { SectionHeading } from '../ui/SectionHeading'
import { InView } from '../ui/InView'
import { Icon } from '../ui/Icon'

interface ContactContent {
  title: string
  subtitle: string
  cta: string
}

function Field({ label, placeholder, type = 'text' }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        type={type}
        className="field w-full border border-line rounded-theme px-4 py-3 bg-surface text-fg placeholder:text-muted"
        placeholder={placeholder}
      />
    </div>
  )
}

function ContactForm({ content }: GadgetProps<ContactContent>) {
  return (
    <section className="px-6 py-12 bg-bg text-fg">
      <SectionHeading eyebrow="Contacto" title={content.title} subtitle={content.subtitle} />
      <InView className="grid gap-4 max-w-[560px] mx-auto">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
          <Field label="Nombre" placeholder="Tu nombre" />
          <Field label="Email" placeholder="tu@email.com" type="email" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Mensaje</label>
          <textarea
            className="field w-full border border-line rounded-theme px-4 py-3 bg-surface text-fg placeholder:text-muted"
            rows={4}
            placeholder="Contanos en qué te podemos ayudar"
          />
        </div>
        <button
          className="group inline-flex items-center justify-center gap-2 bg-brand text-[var(--brand-ink)] px-6 py-3 rounded-theme font-medium transition-transform hover:-translate-y-0.5"
          style={{ boxShadow: '0 12px 24px color-mix(in srgb, var(--brand) 30%, transparent)' }}
        >
          {content.cta}
          <Icon name="chevron-right" size={16} className="transition-transform group-hover:translate-x-0.5" />
        </button>
        <p className="flex items-center justify-center gap-1.5 text-xs text-muted">
          <Icon name="check" size={13} className="text-brand" /> Respondemos en menos de 24 h.
        </p>
      </InView>
    </section>
  )
}

export const contact: GadgetDefinition<ContactContent> = {
  meta: {
    id: 'contact',
    category: 'conversion',
    name: 'Formulario de contacto',
    description: 'Campos cortos + botón (menos campos, más conversión).',
    fitsBusiness: 'all',
    tier: 'base',
  },
  Component: ContactForm,
  defaultContent: () => ({
    title: '¿Hablamos?',
    subtitle: 'Dejanos tu mensaje y te respondemos a la brevedad.',
    cta: 'Enviar mensaje',
  }),
}
