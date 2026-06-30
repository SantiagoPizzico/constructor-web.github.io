import type { GadgetDefinition, GadgetProps } from '../../types'
import { SectionHeading } from '../ui/SectionHeading'
import { Accordion } from '../ui/Accordion'

interface QA {
  q: string
  a: string
}

interface FaqContent {
  title: string
  items: QA[]
}

function Faq({ content }: GadgetProps<FaqContent>) {
  return (
    <section className="px-6 py-12 bg-surface text-fg">
      <SectionHeading eyebrow="Ayuda" title={content.title} />
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <Accordion items={content.items.map((it) => ({ title: it.q, content: it.a }))} />
      </div>
    </section>
  )
}

export const faq: GadgetDefinition<FaqContent> = {
  meta: {
    id: 'faq',
    category: 'conversion',
    name: 'Preguntas frecuentes',
    description: 'Acordeón que resuelve objeciones antes de comprar.',
    fitsBusiness: 'all',
    tier: 'base',
  },
  Component: Faq,
  defaultContent: () => ({
    title: 'Preguntas frecuentes',
    items: [
      { q: '¿Cómo reservo o me contacto?', a: 'Podés escribirnos por el formulario o por WhatsApp y te respondemos enseguida.' },
      { q: '¿Cuáles son los medios de pago?', a: 'Aceptamos efectivo, transferencia y tarjetas. Consultanos por promociones.' },
      { q: '¿Dónde están ubicados?', a: 'Tenemos atención presencial y también online según el servicio.' },
    ],
  }),
}
