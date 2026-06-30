import { Suspense, lazy } from 'react'
import type { GadgetDefinition, GadgetProps } from '../../types'

const Chart = lazy(() => import('./DonutChartInner'))

interface DonutContent {
  title: string
  subtitle: string
  data: { name: string; value: number }[]
}

function DonutChart({ content }: GadgetProps<DonutContent>) {
  return (
    <section className="px-6 py-12 bg-surface text-fg">
      <h2 className="font-heading text-2xl font-bold mb-1">{content.title}</h2>
      <p className="text-muted text-sm mb-3">{content.subtitle}</p>
      <Suspense fallback={<div style={{ height: 220 }} />}>
        <Chart data={content.data} />
      </Suspense>
    </section>
  )
}

export const donutChart: GadgetDefinition<DonutContent> = {
  meta: {
    id: 'donut',
    category: 'analisis',
    name: 'Composición (torta)',
    description: 'Mix de productos o categorías (panel de datos).',
    fitsBusiness: 'all',
    tier: 'panel',
    isPanel: true,
  },
  Component: DonutChart,
  defaultContent: () => ({
    title: 'Ventas por categoría',
    subtitle: 'Participación del mes (datos de muestra)',
    data: [
      { name: 'Indumentaria', value: 42 },
      { name: 'Accesorios', value: 28 },
      { name: 'Calzado', value: 18 },
      { name: 'Otros', value: 12 },
    ],
  }),
}
