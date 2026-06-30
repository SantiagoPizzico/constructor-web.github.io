import type { GadgetDefinition, GadgetProps } from '../../types'

interface Stage {
  label: string
  value: number
}

interface FunnelContent {
  title: string
  stages: Stage[]
}

function FunnelChart({ content }: GadgetProps<FunnelContent>) {
  const max = content.stages[0]?.value || 1
  return (
    <section className="px-6 py-12 bg-surface text-fg">
      <h2 className="font-heading text-2xl font-bold mb-5">{content.title}</h2>
      <div className="space-y-2" style={{ maxWidth: 560 }}>
        {content.stages.map((s, i) => {
          const pct = Math.round((s.value / max) * 100)
          const prev = content.stages[i - 1]
          const conv = i === 0 ? 100 : Math.round((s.value / prev.value) * 100)
          return (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span>{s.label}</span>
                <span className="text-muted">{s.value.toLocaleString('es-AR')} · {conv}%</span>
              </div>
              <div className="h-7 rounded-theme bg-surface2 overflow-hidden">
                <div className="h-7 rounded-theme bg-brand" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export const funnel: GadgetDefinition<FunnelContent> = {
  meta: {
    id: 'funnel',
    category: 'analisis',
    name: 'Embudo de conversión',
    description: 'Dónde se cae la venta, etapa por etapa.',
    fitsBusiness: 'all',
    tier: 'panel',
    isPanel: true,
  },
  Component: FunnelChart,
  defaultContent: () => ({
    title: 'Embudo de conversión',
    stages: [
      { label: 'Visitas', value: 5000 },
      { label: 'Agregó al carrito', value: 1800 },
      { label: 'Inició compra', value: 900 },
      { label: 'Compró', value: 540 },
    ],
  }),
}
