import { useState } from 'react'
import type { GadgetDefinition, GadgetProps } from '../../types'
import { bookingServices } from '../../data/demo'
import { SectionHeading } from '../ui/SectionHeading'
import { InView } from '../ui/InView'
import { Icon } from '../ui/Icon'

interface Service {
  name: string
  duration: number
}

interface BookingContent {
  title: string
  services: Service[]
  slots: string[]
}

function chip(active: boolean) {
  return active
    ? 'px-3 py-1.5 rounded-theme text-sm bg-brand text-[var(--brand-ink)] font-medium shadow-sm'
    : 'px-3 py-1.5 rounded-theme text-sm border border-line hover:border-brand hover:bg-surface2 transition-colors'
}

function Step({ n, label }: { n: number; label: string }) {
  return (
    <div className="mb-2 flex items-center gap-2 text-sm text-muted">
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold text-brand"
        style={{ background: 'color-mix(in srgb, var(--brand) 16%, var(--surface-2))' }}
      >
        {n}
      </span>
      {label}
    </div>
  )
}

function nextDays(n: number) {
  return Array.from({ length: n }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return d.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric' })
  })
}

function Booking({ content }: GadgetProps<BookingContent>) {
  const [svc, setSvc] = useState(0)
  const [day, setDay] = useState(1)
  const [slot, setSlot] = useState<number | null>(null)
  const days = nextDays(5)
  const ready = slot !== null
  return (
    <section className="px-6 py-12 bg-bg text-fg">
      <SectionHeading eyebrow="Reservas" title={content.title} />
      <InView className="mx-auto max-w-[600px]">
        <div className="bg-surface rounded-theme border border-line p-5 shadow-sm">
          <Step n={1} label="Elegí un servicio" />
          <div className="flex flex-wrap gap-2 mb-4">
            {content.services.map((s, i) => (
              <button key={i} onClick={() => setSvc(i)} className={chip(i === svc)}>
                {s.name} · {s.duration}′
              </button>
            ))}
          </div>
          <Step n={2} label="Elegí el día" />
          <div className="flex flex-wrap gap-2 mb-4">
            {days.map((d, i) => (
              <button key={i} onClick={() => setDay(i)} className={chip(i === day)}>
                {d}
              </button>
            ))}
          </div>
          <Step n={3} label="Elegí un horario" />
          <div className="flex flex-wrap gap-2 mb-5">
            {content.slots.map((t, i) => (
              <button key={i} onClick={() => setSlot(i)} className={chip(i === slot)}>
                {t}
              </button>
            ))}
          </div>
          <div className="mb-4 flex items-center gap-2 rounded-theme border border-line bg-surface2 px-3 py-2 text-sm">
            <Icon name="booking" size={15} className="text-brand shrink-0" />
            <span className="text-muted">
              {content.services[svc]?.name} · {days[day]} ·{' '}
              {ready ? <span className="font-medium text-fg">{content.slots[slot]} hs</span> : 'elegí un horario'}
            </span>
          </div>
          <button
            disabled={!ready}
            className={
              ready
                ? 'inline-flex w-full items-center justify-center gap-2 bg-brand text-[var(--brand-ink)] py-2.5 rounded-theme font-medium transition-transform hover:-translate-y-0.5'
                : 'inline-flex w-full items-center justify-center gap-2 bg-brand text-[var(--brand-ink)] py-2.5 rounded-theme font-medium opacity-50 cursor-not-allowed'
            }
            style={ready ? { boxShadow: '0 10px 22px color-mix(in srgb, var(--brand) 28%, transparent)' } : undefined}
          >
            <Icon name="check" size={16} /> Confirmar turno
          </button>
        </div>
      </InView>
    </section>
  )
}

export const booking: GadgetDefinition<BookingContent> = {
  meta: {
    id: 'booking',
    category: 'conversion',
    name: 'Reserva de turnos',
    description: 'Servicio + día + horario (hasta -40% de ausencias).',
    fitsBusiness: 'all',
    tier: 'pro',
  },
  Component: Booking,
  defaultContent: (b) => ({
    title: 'Reservá tu turno',
    services: bookingServices[b] ?? [{ name: 'Turno', duration: 30 }],
    slots: ['09:00', '10:30', '12:00', '15:00', '16:30'],
  }),
}
