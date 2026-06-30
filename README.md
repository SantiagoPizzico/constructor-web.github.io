# Constructor Web

Constructor visual para armar **una web o un panel** eligiendo rubro, estilo y secciones, y exportarlo como un **spec accionable** (brief para el cliente, prompt para Claude Code, o JSON machine-readable).

Es una SPA 100% cliente (sin backend): elegís un rubro, el constructor te propone una combinación inicial de secciones, las reordenás con drag & drop, aplicás uno de los estilos y obtenés el material listo para construir el sitio real.

## Stack

- **React 18** + **Vite** + **TypeScript** (tipado estricto, sin `any` en la lógica)
- **Tailwind CSS** con sistema de diseño basado en CSS variables (tokens)
- **Zustand** para el estado
- **@dnd-kit** para el reordenamiento por puntero y teclado
- **Recharts** para los gadgets de panel (cargados con `lazy()`)
- **Vitest** + Testing Library para los tests

## Puesta en marcha

Requiere Node 20+ (probado con Node 22/24).

```bash
npm install
npm run dev        # servidor de desarrollo (Vite)
```

## Scripts

| Script | Qué hace |
|--------|----------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | `tsc --noEmit` + build de producción a `dist/` |
| `npm run preview` | Sirve el build de producción |
| `npm run typecheck` | Solo chequeo de tipos |
| `npm test` | Corre la suite de tests una vez |
| `npm run test:watch` | Tests en modo watch |
| `npm run ci` | Gate de integración: `tsc --noEmit && vitest run` |

## Qué incluye

- **8 rubros** con combinación inicial de secciones (gimnasio, restaurante, comercio, salud, estética, servicios, inmobiliaria, portfolio)
- **25 secciones/gadgets** entre web (hero, servicios, precios, galería, testimonios, FAQ, reservas, equipo, mapa, contacto…) y panel (KPIs, gráficos de ventas, donut, top de productos, tabla de datos, embudo, inventario…)
- **12 estilos** (claros y oscuros), cada uno con contraste WCAG AA garantizado por test
- Vista previa con toggle de **escritorio / móvil** y modo **pantalla completa**
- Tema de la UI claro/oscuro que sigue al sistema operativo salvo elección manual

## Estructura

```
src/
  components/
    builder/    Constructor: catálogo, preview, toolbar, resumen
    gadgets/    Las 25 secciones (web + panel)
    ui/         Primitivas reutilizables (acordeón, carrusel, lightbox…)
  data/         Rubros, presets por rubro, estilos, contenido demo
  lib/          Lógica pura: export del spec, contraste, fuentes, motion
  store.ts      Estado global (Zustand)
  registry.tsx  Registro de todos los gadgets
  types.ts      Tipos del dominio
```

## Exportar el proyecto

Desde el panel de resumen se generan tres formatos (ver `src/lib/export.ts`):

- **diseño.md** — brief humano para alinear con el cliente
- **build-prompt** — instrucción lista para pegar en Claude Code + skills
- **JSON** — spec determinístico y machine-readable

## Tests y CI

La suite cubre lógica de estado, derivación web/panel/mixto, render de los gadgets en todos los rubros, contraste AA de los estilos, y el export del spec. El workflow de [GitHub Actions](.github/workflows/ci.yml) corre `npm run ci` y el build de producción en cada push y pull request.

```bash
npm run ci
```
