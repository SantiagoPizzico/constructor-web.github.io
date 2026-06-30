import type { GadgetDefinition, GadgetProps } from '../../types'

interface Item {
  label: string
  value: number
}

interface TopContent {
  title: string
  items: Item[]
}

function TopProducts({ content }: GadgetProps<TopContent>) {
  const max = Math.max(...content.items.map((i: Item) => i.value), 1)
  return (
    <section className="px-6 py-12 bg-surface text-fg">
      <h2 className="font-heading text-2xl font-bold mb-4">{content.title}</h2>
      <div className="space-y-3">
        {content.items.map((it: Item) => (
          <div key={it.label}>
            <div className="flex justify-between text-sm mb-1">
              <span>{it.label}</span>
              <span className="text-muted">{it.value}</span>
            </div>
            <div className="h-2.5 bg-surface2 rounded-full">
              <div className="h-2.5 rounded-full bg-brand" style={{ width: `${Math.round((it.value / max) * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export const topProducts: GadgetDefinition<TopContent> = {
  meta: {
    id: 'top-products',
    category: 'analisis',
    name: 'Top productos / clientes',
    description: 'Ranking con barras proporcionales (panel de datos).',
    fitsBusiness: 'all',
    tier: 'panel',
    isPanel: true,
  },
  Component: TopProducts,
  defaultContent: () => ({
    title: 'Top productos',
    items: [
      { label: 'Producto A', value: 128 },
      { label: 'Producto B', value: 96 },
      { label: 'Producto C', value: 74 },
      { label: 'Producto D', value: 52 },
    ],
  }),
}
