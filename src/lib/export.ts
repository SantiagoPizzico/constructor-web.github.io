import type { BusinessType, Device, GadgetDefinition, StylePreset } from '../types'
import { brandName, businessLabel } from '../data/business'
import { kindLabel, projectKind } from './kind'
import { familyName } from './fonts'

// ─────────────────────────────────────────────────────────────────────────
// Export del proyecto a un SPEC accionable y de ahí a un mensaje de WhatsApp:
//   · buildSpec       → arma el spec (negocio, tema, secciones)
//   · specToWhatsapp  → diseño completo formateado para mandar por WhatsApp
// Funciones PURAS (sin store, sin DOM) → fáciles de testear.
// ─────────────────────────────────────────────────────────────────────────

export interface SpecComponent {
  id: string
  name: string
  category: string
  variant: { id: string; name: string } | null
  purpose: string
  isPanel: boolean
  contentNeeds: string[]
}

export interface ProjectSpec {
  business: { id: BusinessType; label: string; suggestedName: string }
  kind: string
  device: Device
  theme: {
    id: string
    name: string
    colors: {
      bg: string
      surface: string
      surface2: string
      text: string
      muted: string
      border: string
      brand: string
      brandInk: string
      accent: string
    }
    fonts: { heading: string; body: string }
    radius: number
  }
  components: SpecComponent[]
  generatedAt: string
}

// Qué contenido necesita cargar el cliente para cada sección (checklist del brief).
const CONTENT_NEEDS: Record<string, string[]> = {
  navbar: ['Nombre/logo', 'Ítems de menú', 'Texto del botón'],
  hero: ['Titular', 'Subtítulo', 'Texto del CTA', 'Imagen principal'],
  services: ['Título de sección', 'Servicios/productos: nombre + descripción'],
  gallery: ['Imágenes (6–12) con descripción'],
  'product-showcase': ['Productos: imagen, nombre, precio, stock'],
  pricing: ['Planes: nombre, precio, período, beneficios, plan destacado'],
  stats: ['Métricas: número + etiqueta'],
  testimonials: ['Reseñas: cita + autor (+ foto opcional)'],
  faq: ['Preguntas y respuestas'],
  booking: ['Servicios + duración', 'Horarios disponibles'],
  team: ['Integrantes: nombre, rol, foto'],
  map: ['Dirección real (lat/lng)'],
  'whatsapp-float': ['Número de WhatsApp'],
  cta: ['Titular, texto y CTA del cierre'],
  contact: ['Email/teléfono de destino del formulario'],
  footer: ['Datos de contacto, enlaces, redes'],
  kpis: ['Métricas clave + origen de datos'],
  'sales-chart': ['Serie de ventas (origen de datos)'],
  donut: ['Distribución por categoría (origen de datos)'],
  'top-products': ['Ranking de productos (origen de datos)'],
  'data-table': ['Columnas y filas (origen de datos)'],
  'goal-gauge': ['Meta y valor actual'],
  filters: ['Dimensiones a filtrar'],
  funnel: ['Etapas del embudo + valores'],
  inventory: ['Productos: stock, mínimo, estado'],
}

function needsFor(id: string): string[] {
  return CONTENT_NEEDS[id] ?? ['Contenido específico de la sección']
}

export interface SpecInput {
  business: BusinessType
  style: StylePreset
  components: { def: GadgetDefinition; variant: string | null }[]
  device: Device
  now?: Date
}

export function buildSpec(input: SpecInput): ProjectSpec {
  const { business, style, device } = input
  const t = style.tokens
  const defs = input.components.map((c) => c.def)

  const components: SpecComponent[] = input.components.map(({ def, variant }) => {
    const variants = def.meta.variants
    const resolved = variant && variants ? variants.find((v) => v.id === variant) ?? null : null
    return {
      id: def.meta.id,
      name: def.meta.name,
      category: def.meta.category,
      variant: resolved,
      purpose: def.meta.description,
      isPanel: !!def.meta.isPanel,
      contentNeeds: needsFor(def.meta.id),
    }
  })

  return {
    business: { id: business, label: businessLabel(business), suggestedName: brandName(business) },
    kind: kindLabel[projectKind(defs)],
    device,
    theme: {
      id: style.id,
      name: style.name,
      colors: {
        bg: t.bg,
        surface: t.surface,
        surface2: t.surface2,
        text: t.text,
        muted: t.muted,
        border: t.border,
        brand: t.brand,
        brandInk: t.brandInk,
        accent: t.accent,
      },
      fonts: { heading: familyName(t.fontHeading), body: familyName(t.fontBody) },
      radius: t.radius,
    },
    components,
    generatedAt: (input.now ?? new Date()).toISOString().slice(0, 10),
  }
}

// Mensaje de WhatsApp que envía el cliente: simple, escaneable y orientado a
// cerrar la venta. Negrita con *un* asterisco (formato de WhatsApp), viñetas y
// sin tablas ni markdown. Termina pidiendo presupuesto y tiempos para avanzar.
export function specToWhatsapp(spec: ProjectSpec): string {
  const c = spec.theme.colors

  const secciones = spec.components.map((comp) => {
    const variante = comp.variant ? ` (${comp.variant.name})` : ''
    return `• ${comp.name}${variante}`
  })

  return [
    `¡Hola! 👋 Diseñé ${spec.kind} para mi negocio con tu constructor y me encantó cómo quedó. Quiero ponerla online.`,
    ``,
    `*Negocio:* ${spec.business.label}`,
    `*Estilo:* ${spec.theme.name} · ${spec.theme.fonts.heading}/${spec.theme.fonts.body}`,
    `*Paleta:* primario ${c.brand}, acento ${c.accent}`,
    ``,
    `*Secciones (${spec.components.length}):*`,
    ...secciones,
    ``,
    `¿Me pasás presupuesto y tiempos de entrega? Quiero arrancar cuanto antes 🚀`,
  ].join('\n')
}
