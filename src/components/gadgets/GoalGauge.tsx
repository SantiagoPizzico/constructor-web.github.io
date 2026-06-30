import type { GadgetDefinition, GadgetProps } from '../../types'

interface GaugeContent {
  title: string
  label: string
  value: number
  target: number
  valueLabel: string
  targetLabel: string
}

function GoalGauge({ content }: GadgetProps<GaugeContent>) {
  const pct = Math.min(100, Math.round((content.value / content.target) * 100))
  return (
    <section className="px-6 py-12 bg-surface text-fg">
      <h2 className="font-heading text-2xl font-bold mb-4">{content.title}</h2>
      <div style={{ maxWidth: 440 }} className="rounded-theme border border-line p-5">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-sm text-muted">{content.label}</span>
          <span className="text-2xl font-bold text-brand">{pct}%</span>
        </div>
        <div className="h-3 bg-surface2 rounded-full">
          <div className="h-3 rounded-full bg-brand" style={{ width: `${pct}%` }} />
        </div>
        <div className="text-xs text-muted mt-2">
          {content.valueLabel} de {content.targetLabel}
        </div>
      </div>
    </section>
  )
}

export const goalGauge: GadgetDefinition<GaugeContent> = {
  meta: {
    id: 'goal-gauge',
    category: 'analisis',
    name: 'Meta / Objetivo',
    description: 'Avance hacia el objetivo del mes (panel de datos).',
    fitsBusiness: 'all',
    tier: 'panel',
    isPanel: true,
  },
  Component: GoalGauge,
  defaultContent: () => ({
    title: 'Meta del mes',
    label: 'Ventas',
    value: 1200000,
    target: 1500000,
    valueLabel: '$1.2M',
    targetLabel: '$1.5M',
  }),
}
