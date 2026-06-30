import type { GadgetDefinition, GadgetProps } from '../../types'

interface Column {
  key: string
  label: string
  align?: 'left' | 'right'
}

interface TableContent {
  title: string
  columns: Column[]
  rows: Record<string, string>[]
}

function DataTable({ content }: GadgetProps<TableContent>) {
  return (
    <section className="px-6 py-12 bg-surface text-fg">
      <h2 className="font-heading text-2xl font-bold mb-4">{content.title}</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-muted border-b border-line">
            {content.columns.map((c: Column) => (
              <th key={c.key} className={c.align === 'right' ? 'py-2 font-medium text-right' : 'py-2 font-medium text-left'}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.rows.map((r: Record<string, string>, i: number) => (
            <tr key={i} className="border-b border-line">
              {content.columns.map((c: Column) => (
                <td key={c.key} className={c.align === 'right' ? 'py-2 text-right' : 'py-2 text-left'}>
                  {r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export const dataTable: GadgetDefinition<TableContent> = {
  meta: {
    id: 'data-table',
    category: 'analisis',
    name: 'Tabla de datos',
    description: 'Detalle accionable (ej. productos más vendidos).',
    fitsBusiness: 'all',
    tier: 'panel',
    isPanel: true,
  },
  Component: DataTable,
  defaultContent: () => ({
    title: 'Productos más vendidos',
    columns: [
      { key: 'producto', label: 'Producto', align: 'left' },
      { key: 'unidades', label: 'Unidades', align: 'right' },
      { key: 'ingresos', label: 'Ingresos', align: 'right' },
    ],
    rows: [
      { producto: 'Producto A', unidades: '128', ingresos: '$5.760' },
      { producto: 'Producto B', unidades: '96', ingresos: '$4.320' },
      { producto: 'Producto C', unidades: '74', ingresos: '$3.330' },
      { producto: 'Producto D', unidades: '52', ingresos: '$2.340' },
    ],
  }),
}
