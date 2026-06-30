import type { CSSProperties } from 'react'
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Icon } from '../ui/Icon'
import type { IconName } from '../ui/Icon'
import { gadgets, registry } from '../../registry'
import { useStore } from '../../store'

const GADGET_ICON: Record<string, IconName> = {
  navbar: 'navbar',
  hero: 'hero',
  services: 'services',
  gallery: 'gallery',
  'product-showcase': 'box',
  pricing: 'pricing',
  stats: 'stats',
  testimonials: 'testimonials',
  faq: 'faq',
  booking: 'booking',
  team: 'users',
  map: 'map',
  'whatsapp-float': 'phone',
  kpis: 'kpis',
  'sales-chart': 'sales',
  donut: 'donut',
  'top-products': 'top',
  'data-table': 'table',
  'goal-gauge': 'target',
  filters: 'filter',
  funnel: 'funnel',
  inventory: 'box',
}

function gadgetIcon(id: string): IconName {
  return GADGET_ICON[id] ?? 'services'
}

function sectionLabel(extra?: string) {
  return `text-[11px] font-semibold uppercase tracking-wider text-ui-muted ${extra ?? ''}`
}

function SortableItem({ id }: { id: string }) {
  const def = registry[id]
  const toggle = useStore((s) => s.toggleGadget)
  const setVariant = useStore((s) => s.setVariant)
  const variant = useStore((s) => s.variantById[id])
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : undefined,
    boxShadow: isDragging ? '0 10px 24px rgba(0,0,0,0.28)' : undefined,
  }
  const variants = def?.meta.variants
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={
        isDragging
          ? 'rounded-lg bg-ui-surface border border-ui-line'
          : 'rounded-lg bg-ui-surface2 border border-transparent hover:border-ui-line transition-colors'
      }
    >
      <div className="flex items-center gap-1.5 px-2 py-2">
        <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-ui-muted hover:text-ui-text transition-colors" aria-label="Arrastrar para reordenar">
          <Icon name="grip" size={16} />
        </button>
        <Icon name={gadgetIcon(id)} size={16} className="text-ui-muted shrink-0" />
        <span className="flex-1 min-w-0 text-sm font-medium leading-tight truncate">{def?.meta.name}</span>
        {def?.meta.isPanel && <span className="text-[10px] text-ui-muted bg-ui-surface2 rounded px-1.5 py-0.5">panel</span>}
        <button onClick={() => toggle(id)} className="text-ui-muted hover:text-ui-text transition-colors" aria-label="Quitar">
          <Icon name="x" size={15} />
        </button>
      </div>
      {variants && variants.length > 1 && (
        <div className="px-2 pb-2 pl-9">
          <select
            value={variant ?? variants[0].id}
            onChange={(e) => setVariant(id, e.target.value)}
            className="w-full text-xs border border-ui-line rounded-md px-1.5 py-1 bg-ui-surface text-ui-text hover:border-ui-text transition-colors"
            aria-label={`Diseño de ${def?.meta.name}`}
          >
            {variants.map((v) => <option key={v.id} value={v.id}>Diseño: {v.name}</option>)}
          </select>
        </div>
      )}
    </div>
  )
}

function AddRow({ id }: { id: string }) {
  const def = registry[id]
  const toggle = useStore((s) => s.toggleGadget)
  return (
    <button onClick={() => toggle(id)} className="group w-full flex items-start gap-2 px-2 py-2 rounded-lg hover:bg-ui-surface2 transition-colors text-left">
      <Icon name={gadgetIcon(id)} size={16} className="text-ui-muted mt-0.5 shrink-0" />
      <span className="flex-1">
        <span className="flex items-center gap-1 text-sm font-medium leading-tight">
          {def?.meta.name}
          <Icon name="plus" size={13} className="text-ui-muted group-hover:text-ui-text transition-colors" />
        </span>
        <span className="block text-xs text-ui-muted leading-tight">{def?.meta.description}</span>
      </span>
    </button>
  )
}

export default function Catalog() {
  const order = useStore((s) => s.order)
  const setOrder = useStore((s) => s.setOrder)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const inactive = gadgets.filter((g) => !order.includes(g.meta.id))
  const webAdd = inactive.filter((g) => !g.meta.isPanel)
  const panelAdd = inactive.filter((g) => g.meta.isPanel)

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const oldI = order.indexOf(String(active.id))
    const newI = order.indexOf(String(over.id))
    if (oldI < 0 || newI < 0) return
    setOrder(arrayMove(order, oldI, newI))
  }

  return (
    <aside className="border-r border-ui-line bg-ui-surface overflow-auto thin-scroll">
      <div className="p-3">
        <div className="flex items-center justify-between px-2 mb-2">
          <h2 className={sectionLabel()}>Tu página</h2>
          <span className="text-[11px] text-ui-muted">{order.length} {order.length === 1 ? 'bloque' : 'bloques'}</span>
        </div>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={order} strategy={verticalListSortingStrategy}>
            <div className="space-y-1">
              {order.map((id) => <SortableItem key={id} id={id} />)}
            </div>
          </SortableContext>
        </DndContext>
        {order.length === 0 && <p className="text-xs text-ui-muted px-2 py-3">Tu página está vacía. Agregá componentes desde abajo.</p>}

        {webAdd.length > 0 && (
          <>
            <h2 className={sectionLabel('px-2 mt-5 mb-1')}>Agregar · web</h2>
            {webAdd.map((g) => <AddRow key={g.meta.id} id={g.meta.id} />)}
          </>
        )}
        {panelAdd.length > 0 && (
          <>
            <h2 className={sectionLabel('px-2 mt-4 mb-1')}>Agregar · panel</h2>
            {panelAdd.map((g) => <AddRow key={g.meta.id} id={g.meta.id} />)}
          </>
        )}
      </div>
    </aside>
  )
}
