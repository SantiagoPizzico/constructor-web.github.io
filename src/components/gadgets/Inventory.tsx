import type { GadgetDefinition, GadgetProps } from '../../types'

interface StockItem {
  name: string
  stock: number
  min: number
}

interface InventoryContent {
  title: string
  items: StockItem[]
}

function Inventory({ content }: GadgetProps<InventoryContent>) {
  return (
    <section className="px-6 py-12 bg-surface text-fg">
      <h2 className="font-heading text-2xl font-bold mb-4">{content.title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
        {content.items.map((it, i) => {
          const low = it.stock <= it.min
          return (
            <div key={i} className="rounded-theme border border-line p-4 bg-surface2">
              <div className="text-sm text-muted">{it.name}</div>
              <div className="text-2xl font-bold">{it.stock}</div>
              <div className={low ? 'text-xs font-medium text-red-500' : 'text-xs text-muted'}>
                {low ? 'Stock bajo · reponer' : 'En stock'}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export const inventory: GadgetDefinition<InventoryContent> = {
  meta: {
    id: 'inventory',
    category: 'analisis',
    name: 'Inventario / Stock',
    description: 'Niveles de stock con alerta de reposición.',
    fitsBusiness: 'all',
    tier: 'panel',
    isPanel: true,
  },
  Component: Inventory,
  defaultContent: () => ({
    title: 'Inventario',
    items: [
      { name: 'Producto A', stock: 120, min: 20 },
      { name: 'Producto B', stock: 8, min: 15 },
      { name: 'Producto C', stock: 54, min: 20 },
      { name: 'Producto D', stock: 3, min: 10 },
    ],
  }),
}
