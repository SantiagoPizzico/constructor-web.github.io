import { useState } from 'react'
import type { GadgetDefinition, GadgetProps } from '../../types'
import { Icon } from '../ui/Icon'

interface FiltersContent {
  ranges: string[]
}

function PanelFilters({ content }: GadgetProps<FiltersContent>) {
  const [active, setActive] = useState(content.ranges.length - 1)
  return (
    <section className="px-6 py-6 bg-surface text-fg">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-1.5 text-sm text-muted">
          <Icon name="filter" size={15} /> Período
        </span>
        <div className="inline-flex rounded-theme border border-line overflow-hidden">
          {content.ranges.map((r, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={
                i === active
                  ? 'px-3 py-1.5 text-sm bg-brand text-[var(--brand-ink)]'
                  : 'px-3 py-1.5 text-sm hover:bg-surface2 transition-colors'
              }
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export const panelFilters: GadgetDefinition<FiltersContent> = {
  meta: {
    id: 'filters',
    category: 'analisis',
    name: 'Filtros + rango de fechas',
    description: 'Acota el panel por período (cross-filtering).',
    fitsBusiness: 'all',
    tier: 'panel',
    isPanel: true,
  },
  Component: PanelFilters,
  defaultContent: () => ({ ranges: ['Hoy', '7 días', '30 días', '12 meses'] }),
}
