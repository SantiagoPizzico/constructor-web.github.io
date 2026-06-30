import type { GadgetDefinition, GadgetProps } from '../../types'
import { SectionHeading } from '../ui/SectionHeading'
import { InView } from '../ui/InView'
import { Icon } from '../ui/Icon'

interface Member {
  name: string
  role: string
}

interface TeamContent {
  title: string
  members: Member[]
}

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function Team({ content }: GadgetProps<TeamContent>) {
  return (
    <section className="px-6 py-12 bg-surface text-fg">
      <SectionHeading eyebrow="Quiénes somos" title={content.title} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
        {content.members.map((m, i) => (
          <InView key={i} delay={i * 80} animation="rise" className="text-center">
            <div className="group">
              <div
                className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full font-heading text-xl font-bold text-[var(--brand-ink)] transition-transform group-hover:scale-105"
                style={{ background: 'var(--brand)', boxShadow: '0 0 0 4px color-mix(in srgb, var(--brand) 16%, transparent)' }}
              >
                {initials(m.name)}
              </div>
              <div className="font-semibold">{m.name}</div>
              <div className="text-sm text-muted">{m.role}</div>
              <div className="mt-2 flex justify-center gap-2 opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                {(['instagram', 'contact'] as const).map((ic) => (
                  <span key={ic} className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-muted hover:text-brand hover:border-brand cursor-pointer">
                    <Icon name={ic} size={13} />
                  </span>
                ))}
              </div>
            </div>
          </InView>
        ))}
      </div>
    </section>
  )
}

export const team: GadgetDefinition<TeamContent> = {
  meta: {
    id: 'team',
    category: 'prueba-social',
    name: 'Equipo',
    description: 'Quiénes somos: fotos/iniciales del equipo (genera confianza).',
    fitsBusiness: 'all',
    tier: 'base',
  },
  Component: Team,
  defaultContent: () => ({
    title: 'Nuestro equipo',
    members: [
      { name: 'Ana López', role: 'Directora' },
      { name: 'Juan Pérez', role: 'Coordinador' },
      { name: 'Lucía Gómez', role: 'Especialista' },
      { name: 'Marco Ruiz', role: 'Atención al cliente' },
    ],
  }),
}
