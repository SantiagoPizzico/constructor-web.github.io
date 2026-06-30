import type { BusinessType, Device, GadgetDefinition, StylePreset } from '../types'
import { brandName, businessLabel } from '../data/business'
import { kindLabel, projectKind } from './kind'
import { familyName } from './fonts'

// ─────────────────────────────────────────────────────────────────────────
// Export del proyecto a un SPEC accionable. De acá salen 3 formatos:
//   · diseño.md   → brief humano para alinear con el cliente
//   · build-prompt → instrucción lista para pegar en Claude Code + skills
//   · JSON        → spec determinístico, machine-readable
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

function variantSuffix(c: SpecComponent): string {
  return c.variant ? ` _(diseño: ${c.variant.name})_` : ''
}

export function specToMarkdown(spec: ProjectSpec): string {
  const c = spec.theme.colors
  const L = [
    `# Diseño — ${spec.business.label}`,
    ``,
    `> Tipo: **${spec.kind}** · Dispositivo base: ${spec.device === 'mobile' ? 'móvil' : 'escritorio'} · Generado: ${spec.generatedAt}`,
    ``,
    `## Identidad visual`,
    ``,
    `- **Estilo:** ${spec.theme.name}`,
    `- **Tipografías:** Títulos *${spec.theme.fonts.heading}* · Texto *${spec.theme.fonts.body}*`,
    `- **Radio base:** ${spec.theme.radius}px`,
    ``,
    `### Paleta`,
    ``,
    `| Rol | Color |`,
    `|-----|-------|`,
    `| Fondo | \`${c.bg}\` |`,
    `| Superficie | \`${c.surface}\` |`,
    `| Texto | \`${c.text}\` |`,
    `| Primario | \`${c.brand}\` |`,
    `| Acento | \`${c.accent}\` |`,
    ``,
    `_Apoyo: superficie-2 \`${c.surface2}\`, texto-tenue \`${c.muted}\`, borde \`${c.border}\`, texto-sobre-primario \`${c.brandInk}\`._`,
    ``,
    `## Estructura (${spec.components.length} secciones)`,
    ``,
    ...spec.components.flatMap((comp, i) => [
      `${i + 1}. **${comp.name}** — ${comp.purpose}${variantSuffix(comp)}`,
      ...comp.contentNeeds.map((n) => `   - [ ] ${n}`),
    ]),
    ``,
    `## Notas`,
    ``,
    `- Nombre sugerido del negocio: **${spec.business.suggestedName}** (reemplazar por el real).`,
    `- Aplicar los colores y tipografías a TODA la web (nada hardcodeado).`,
    `- Responsive y accesible (contraste WCAG AA).`,
    ``,
  ]
  return L.join('\n')
}

export function specToBuildPrompt(spec: ProjectSpec): string {
  const c = spec.theme.colors
  const tokens = [
    `  --bg: ${c.bg}`,
    `  --surface: ${c.surface}`,
    `  --surface-2: ${c.surface2}`,
    `  --text: ${c.text}`,
    `  --muted: ${c.muted}`,
    `  --border: ${c.border}`,
    `  --brand: ${c.brand}        /* primario: CTAs y énfasis */`,
    `  --brand-ink: ${c.brandInk}  /* texto sobre el primario */`,
    `  --accent: ${c.accent}      /* secundario: detalles y highlights */`,
  ].join('\n')

  const sections = spec.components
    .map((comp, i) => {
      const head = `${i + 1}. ${comp.name}${comp.variant ? ` — diseño "${comp.variant.name}"` : ''}: ${comp.purpose}`
      const needs = comp.contentNeeds.map((n) => `   · ${n}`).join('\n')
      return `${head}\n${needs}`
    })
    .join('\n\n')

  return [
    `# Encargo: construir ${spec.kind} para "${spec.business.label}"`,
    ``,
    `Actuá como desarrollador front-end senior. Construí ${spec.kind} profesional y lista para producción para el negocio "${spec.business.label}" (rubro ${spec.business.label}; nombre sugerido: ${spec.business.suggestedName}). Cuidá el detalle visual: tiene que verse como un sitio terminado de agencia, no como un wireframe.`,
    ``,
    `## Stack y convenciones`,
    `- React + Vite + TypeScript + Tailwind CSS. Mobile-first y accesible (WCAG AA).`,
    `- Definí el sistema de diseño como CSS variables y consumilo SOLO de forma semántica: nada de colores ni fuentes hardcodeadas.`,
    `- Una sección = un componente, en \`src/components/sections\`. Tipado estricto, sin \`any\`.`,
    `- Animaciones de entrada sutiles (solo \`transform\`/\`opacity\`, con IntersectionObserver) que respeten \`prefers-reduced-motion\`. Micro-interacciones al hover en tarjetas y botones.`,
    ``,
    `## Sistema de diseño (tokens)`,
    `Definí estas variables CSS en \`:root\` y usalas en todo el sitio:`,
    ``,
    `\`\`\`css`,
    `:root {`,
    tokens,
    `  --radius: ${spec.theme.radius}px;`,
    `  --font-heading: "${spec.theme.fonts.heading}";`,
    `  --font-body: "${spec.theme.fonts.body}";`,
    `}`,
    `\`\`\``,
    ``,
    `Cargá "${spec.theme.fonts.heading}" y "${spec.theme.fonts.body}" desde Google Fonts. Títulos con la fuente heading, cuerpo con la body.`,
    ``,
    `## Secciones (en este orden exacto)`,
    `Para cada sección: respetá su propósito y el diseño indicado, y dejá el contenido marcado como placeholder coherente con el rubro (· = dato que cargará el cliente).`,
    ``,
    sections,
    ``,
    `## Definición de "terminado"`,
    `- Responsive real: se ve bien de 360px a 1440px.`,
    `- Contraste AA en todo el texto; foco visible en cada elemento interactivo.`,
    `- HTML semántico (\`header\`/\`nav\`/\`main\`/\`section\`/\`footer\`), \`alt\` en imágenes, \`label\` en los campos de formulario.`,
    `- Motion sutil y desactivable por \`prefers-reduced-motion\`.`,
    `- Cero colores o fuentes fuera de los tokens.`,
    `- Imágenes como placeholders claramente marcados para reemplazar por las reales del cliente.`,
    ``,
    `## Cómo trabajar`,
    `- Si hay una skill de construcción de webs / componentes / QA disponible, usala para acelerar y mantener el estándar.`,
    `- Scaffoldeá el proyecto, implementá sección por sección en el orden dado, y verificá el resultado en el navegador antes de cerrar.`,
    ``,
  ].join('\n')
}

export function specToJson(spec: ProjectSpec): string {
  return JSON.stringify(spec, null, 2)
}
