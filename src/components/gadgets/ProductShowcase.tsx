import type { GadgetDefinition, GadgetProps } from '../../types'
import { SectionHeading } from '../ui/SectionHeading'
import { HoverRevealImage } from '../ui/HoverRevealImage'
import type { RevealEffect } from '../ui/HoverRevealImage'

interface Product {
  name: string
  price: string
  units: number
  base: string
  reveal?: string
}

interface StockContent {
  title: string
  products: Product[]
}

// Disponibilidad derivada de las unidades (Single source of truth).
function statusOf(units: number) {
  if (units <= 0) return { agotado: true, dot: '#d64545', label: 'Sin stock' }
  if (units <= 5) return { agotado: false, dot: '#e0a82e', label: `Quedan ${units} u.` }
  return { agotado: false, dot: '#1d9e75', label: `En stock · ${units} u.` }
}

// Imágenes demo como data-URI SVG (offline; el cliente reemplaza por sus PNG).
function uri(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

function demoBase() {
  return uri(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect width='200' height='200' fill='#f1f3f5'/><g fill='none' stroke='#9aa3af' stroke-width='6' stroke-linejoin='round' stroke-linecap='round'><rect x='56' y='74' width='72' height='48' rx='8'/><path d='M128 86h22a8 8 0 0 1 8 8v12a8 8 0 0 1-8 8h-22'/><path d='M84 122v22h22v-22'/></g></svg>`,
  )
}

function demoReveal(c1: string, c2: string) {
  return uri(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${c1}'/><stop offset='1' stop-color='${c2}'/></linearGradient></defs><rect width='200' height='200' fill='url(#g)'/><g fill='#1c1a17'><rect x='54' y='72' width='76' height='52' rx='10'/><rect x='130' y='84' width='30' height='30' rx='6'/><rect x='82' y='122' width='26' height='26' rx='5'/></g></svg>`,
  )
}

function ProductShowcase({ content, variant = 'fade' }: GadgetProps<StockContent>) {
  return (
    <section className="px-6 py-12 bg-surface text-fg">
      <SectionHeading eyebrow="Stock" title={content.title} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        {content.products.map((p, i) => {
          const s = statusOf(p.units)
          return (
            <div key={i} className="text-center">
              <div className="relative mb-3">
                <HoverRevealImage
                  base={p.base}
                  reveal={s.agotado ? undefined : p.reveal}
                  effect={variant as RevealEffect}
                  alt={p.name}
                  className={s.agotado ? 'aspect-square grayscale opacity-60' : 'aspect-square'}
                />
                {s.agotado && (
                  <span className="absolute top-2 right-2 rounded-full bg-black/75 px-2.5 py-1 text-[11px] font-medium text-white">
                    Agotado
                  </span>
                )}
              </div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm font-medium">{p.price}</div>
              <div className="mt-0.5 flex items-center justify-center gap-1.5 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.dot }} />
                {s.label}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export const productShowcase: GadgetDefinition<StockContent> = {
  meta: {
    id: 'product-showcase',
    category: 'oferta',
    name: 'Stock disponible',
    description: 'Muestra del stock con precio, unidades y aviso de agotado; la imagen se revela al hover.',
    fitsBusiness: 'all',
    tier: 'base',
    variants: [
      { id: 'fade', name: 'Aparecer' },
      { id: 'zoom', name: 'Zoom' },
      { id: 'slide', name: 'Deslizar' },
    ],
  },
  Component: ProductShowcase,
  defaultContent: () => ({
    title: 'Stock disponible',
    products: [
      { name: 'Taladro percutor', price: '$45.900', units: 12, base: demoBase(), reveal: demoReveal('#ffd166', '#f4732a') },
      { name: 'Set de auriculares', price: '$12.500', units: 3, base: demoBase(), reveal: demoReveal('#a89bff', '#2b3a67') },
      { name: 'Cámara compacta', price: '$89.000', units: 0, base: demoBase(), reveal: demoReveal('#7fe0c1', '#0f6e56') },
      { name: 'Teclado mecánico', price: '$28.000', units: 8, base: demoBase(), reveal: demoReveal('#85b7eb', '#185fa5') },
    ],
  }),
}
