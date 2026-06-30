import type { GadgetDefinition, GadgetProps } from '../../types'
import { CountUp } from '../ui/CountUp'
import { InView } from '../ui/InView'

interface Stat {
  value: number
  label: string
  prefix?: string
  suffix?: string
  decimals?: number
}

interface StatsContent {
  items: Stat[]
}

function Stats({ content }: GadgetProps<StatsContent>) {
  return (
    <section className="px-6 py-12 bg-surface text-fg">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12 }}>
        {content.items.map((s, i) => (
          <InView key={s.label} delay={i * 80} className="h-full">
            <div className="h-full rounded-theme border border-line bg-surface2 px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brand">
              <div className="font-heading text-4xl font-bold text-brand tracking-tight">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
              </div>
              <div className="text-sm text-muted mt-1">{s.label}</div>
            </div>
          </InView>
        ))}
      </div>
    </section>
  )
}

export const stats: GadgetDefinition<StatsContent> = {
  meta: {
    id: 'stats',
    category: 'prueba-social',
    name: 'Stats / Contadores',
    description: 'Números que cuentan hacia arriba al entrar en pantalla (prueba social).',
    fitsBusiness: 'all',
    tier: 'base',
  },
  Component: Stats,
  defaultContent: () => ({
    items: [
      { value: 500, prefix: '+', label: 'Clientes felices' },
      { value: 10, label: 'Años de experiencia' },
      { value: 25, label: 'Servicios' },
      { value: 4.9, decimals: 1, suffix: '★', label: 'Valoración promedio' },
    ],
  }),
}
