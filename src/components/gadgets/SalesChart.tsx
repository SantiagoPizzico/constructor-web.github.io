import { Suspense, lazy } from 'react'
import type { GadgetDefinition, GadgetProps } from '../../types'

const Chart = lazy(() => import('./SalesChartInner'))

interface SalesContent {
  title: string
  subtitle: string
  data: { label: string; value: number }[]
}

function SalesChart({ content }: GadgetProps<SalesContent>) {
  return (
    <section className="px-6 py-12 bg-surface text-fg">
      <h2 className="font-heading text-2xl font-bold mb-1">{content.title}</h2>
      <p className="text-muted text-sm mb-5">{content.subtitle}</p>
      <Suspense fallback={<div style={{ height: 240 }} />}>
        <Chart data={content.data} />
      </Suspense>
    </section>
  )
}

export const salesChart: GadgetDefinition<SalesContent> = {
  meta: {
    id: 'sales-chart',
    category: 'analisis',
    name: 'Gráfico de ventas',
    description: 'Tendencia de ventas en el tiempo (panel de datos).',
    fitsBusiness: 'all',
    tier: 'panel',
    isPanel: true,
  },
  Component: SalesChart,
  defaultContent: () => ({
    title: 'Ventas por mes',
    subtitle: 'Últimos 6 meses (datos de muestra)',
    data: [
      { label: 'Ene', value: 320 },
      { label: 'Feb', value: 410 },
      { label: 'Mar', value: 380 },
      { label: 'Abr', value: 520 },
      { label: 'May', value: 470 },
      { label: 'Jun', value: 610 },
    ],
  }),
}
