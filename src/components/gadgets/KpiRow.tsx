import type { GadgetDefinition, GadgetProps } from '../../types'

interface Kpi {
  label: string
  value: string
  delta: string
  up: boolean
}

interface KpiContent {
  title: string
  items: Kpi[]
}

function KpiRow({ content }: GadgetProps<KpiContent>) {
  return (
    <section className="px-6 py-12 bg-surface text-fg">
      <h2 className="font-heading text-2xl font-bold mb-5">{content.title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
        {content.items.map((k: Kpi) => (
          <div key={k.label} className="rounded-theme bg-surface2 p-4">
            <div className="text-sm text-muted">{k.label}</div>
            <div className="text-2xl font-bold text-brand">{k.value}</div>
            <div className={k.up ? 'text-xs text-green-500' : 'text-xs text-muted'}>{k.delta}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export const kpis: GadgetDefinition<KpiContent> = {
  meta: {
    id: 'kpis',
    category: 'analisis',
    name: 'KPIs / Métricas',
    description: 'Tarjetas de métricas con variación (panel de datos).',
    fitsBusiness: 'all',
    tier: 'panel',
    isPanel: true,
  },
  Component: KpiRow,
  defaultContent: () => ({
    title: 'Resumen de ventas',
    items: [
      { label: 'Ventas del mes', value: '$1.2M', delta: '+15% vs. mes anterior', up: true },
      { label: 'Unidades', value: '320', delta: '+8%', up: true },
      { label: 'Ticket promedio', value: '$45', delta: '= estable', up: false },
      { label: 'Clientes nuevos', value: '180', delta: '+5%', up: true },
    ],
  }),
}
