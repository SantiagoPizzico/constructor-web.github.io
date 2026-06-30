import type { GadgetDefinition, GadgetProps } from '../../types'
import { heroCopy } from '../../data/demo'
import { PlaceholderFill } from '../ui/ImagePlaceholder'
import { InView } from '../ui/InView'
import { Icon } from '../ui/Icon'

interface HeroContent {
  title: string
  subtitle: string
  cta: string
}

function Badge({ light = false }: { light?: boolean }) {
  return (
    <div
      className={
        light
          ? 'inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur'
          : 'inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted'
      }
    >
      <Icon name="star-fill" size={13} className={light ? 'text-white' : 'text-brand'} /> 4.9 · +500 clientes felices
    </div>
  )
}

function Trust() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {['A', 'M', 'L'].map((c) => (
          <span
            key={c}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[var(--brand-ink)] border-2 text-[11px] font-semibold"
            style={{ borderColor: 'var(--surface)' }}
          >
            {c}
          </span>
        ))}
      </div>
      <span className="text-sm text-muted">Elegido por cientos de clientes</span>
    </div>
  )
}

function Actions({ cta }: { cta: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        className="group inline-flex items-center gap-2 bg-brand text-[var(--brand-ink)] px-6 py-3 rounded-theme font-medium transition-transform hover:-translate-y-0.5 active:translate-y-0"
        style={{ boxShadow: '0 12px 26px color-mix(in srgb, var(--brand) 32%, transparent)' }}
      >
        {cta}
        <Icon name="chevron-right" size={16} className="transition-transform group-hover:translate-x-0.5" />
      </button>
      <button className="border border-line bg-surface px-6 py-3 rounded-theme font-medium hover:bg-surface2 transition-colors">
        Ver más
      </button>
    </div>
  )
}

// Mini gráfico de tendencia (decorativo) para la tarjeta flotante de stat.
function Sparkline() {
  return (
    <svg width="58" height="22" viewBox="0 0 58 22" fill="none" aria-hidden="true">
      <polyline
        points="1,18 12,12 22,14 33,6 44,9 57,2"
        stroke="var(--accent)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Visual del hero: área diseñada (gradiente + patrón teñido) con glow de marca
// y dos tarjetas flotantes que le dan vida y lectura de "producto real".
function HeroVisual({ aspect = 'aspect-[4/3]' }: { aspect?: string }) {
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[40px]"
        style={{ background: 'radial-gradient(60% 60% at 60% 40%, color-mix(in srgb, var(--brand) 28%, transparent), transparent)' }}
      />
      <div className={`relative ${aspect} overflow-hidden rounded-theme border border-line shadow-xl`}>
        <PlaceholderFill />
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, color-mix(in srgb, var(--surface) 35%, transparent), transparent 40%)' }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-muted/70">
          <Icon name="hero" size={40} />
        </span>
      </div>

      <div className="hero-float absolute -left-3 top-6 flex items-center gap-2 rounded-theme border border-line bg-surface px-3 py-2 shadow-lg">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--brand)_15%,var(--surface-2))] text-brand">
          <Icon name="star-fill" size={15} />
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-semibold">4.9</span>
          <span className="block text-[11px] text-muted">+500 reseñas</span>
        </span>
      </div>

      <div className="hero-float absolute -right-3 bottom-6 rounded-theme border border-line bg-surface px-3 py-2 shadow-lg" style={{ animationDelay: '-2.4s' }}>
        <span className="flex items-center gap-1 text-[11px] text-muted">
          <Icon name="stats" size={12} className="text-brand" /> este mes
        </span>
        <span className="flex items-center gap-2">
          <span className="text-sm font-semibold">+38%</span>
          <Sparkline />
        </span>
      </div>
    </div>
  )
}

function Hero({ content, variant = 'dividido' }: GadgetProps<HeroContent>) {
  if (variant === 'centrado') {
    return (
      <header className="relative overflow-hidden px-6 py-16 bg-surface text-fg text-center">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-72"
          style={{ background: 'radial-gradient(50% 100% at 50% 0%, color-mix(in srgb, var(--brand) 18%, transparent), transparent)' }}
        />
        <div className="relative mx-auto max-w-2xl">
          <InView animation="fade"><Badge /></InView>
          <InView delay={80}>
            <h1 className="font-heading text-[2.75rem] font-bold leading-[1.08] tracking-tight mt-4 mb-3">{content.title}</h1>
          </InView>
          <InView delay={160}><p className="text-muted text-lg mb-7 max-w-xl mx-auto">{content.subtitle}</p></InView>
          <InView delay={240}><div className="flex justify-center"><Actions cta={content.cta} /></div></InView>
          <InView delay={320}><div className="mt-7 flex justify-center"><Trust /></div></InView>
        </div>
        <InView animation="scale" delay={200} className="relative mx-auto mt-12 max-w-2xl">
          <HeroVisual aspect="aspect-[16/8]" />
        </InView>
      </header>
    )
  }

  if (variant === 'fondo') {
    return (
      <header className="relative overflow-hidden px-6 py-24 text-center">
        <PlaceholderFill />
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.62)), radial-gradient(70% 60% at 50% 30%, color-mix(in srgb, var(--brand) 30%, transparent), transparent)' }}
        />
        <div className="relative mx-auto max-w-2xl">
          <InView animation="fade"><Badge light /></InView>
          <InView delay={80}>
            <h1 className="font-heading text-[2.75rem] font-bold leading-[1.08] tracking-tight mt-4 mb-3 text-white">{content.title}</h1>
          </InView>
          <InView delay={160}><p className="text-white/80 text-lg mb-7 max-w-xl mx-auto">{content.subtitle}</p></InView>
          <InView delay={240}>
            <div className="flex justify-center">
              <button className="group inline-flex items-center gap-2 bg-brand text-[var(--brand-ink)] px-6 py-3 rounded-theme font-medium shadow-xl transition-transform hover:-translate-y-0.5">
                {content.cta}
                <Icon name="chevron-right" size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </InView>
        </div>
      </header>
    )
  }

  return (
    <header className="relative overflow-hidden px-6 py-16 bg-surface text-fg">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--brand) 16%, transparent), transparent 70%)' }}
      />
      <div className="relative" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px', alignItems: 'center' }}>
        <div>
          <InView animation="fade"><Badge /></InView>
          <InView delay={80}>
            <h1 className="font-heading text-[2.75rem] font-bold leading-[1.08] tracking-tight mt-4 mb-3">{content.title}</h1>
          </InView>
          <InView delay={160}><p className="text-muted text-lg mb-7 max-w-md">{content.subtitle}</p></InView>
          <InView delay={240}><div className="mb-7"><Actions cta={content.cta} /></div></InView>
          <InView delay={320}><Trust /></InView>
        </div>
        <InView animation="scale" delay={180}>
          <HeroVisual />
        </InView>
      </div>
    </header>
  )
}

export const hero: GadgetDefinition<HeroContent> = {
  meta: {
    id: 'hero',
    category: 'hero',
    name: 'Portada (Hero)',
    description: 'Titular, frase y botón principal.',
    fitsBusiness: 'all',
    tier: 'base',
    variants: [
      { id: 'dividido', name: 'Dividido' },
      { id: 'centrado', name: 'Centrado' },
      { id: 'fondo', name: 'Imagen de fondo' },
    ],
  },
  Component: Hero,
  defaultContent: (b) => heroCopy[b],
}
