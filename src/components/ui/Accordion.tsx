import { useState } from 'react'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../lib/motion'
import { Icon } from './Icon'

export interface AccordionItem {
  title: ReactNode
  content: ReactNode
}

// Acordeón reutilizable. Anima la altura con el truco grid-template-rows 0fr→1fr
// (animable y sin jank, sin medir altura ni usar max-height). Respeta reduced-motion.
export function Accordion({
  items,
  single = true,
  defaultOpen = 0,
}: {
  items: AccordionItem[]
  single?: boolean
  defaultOpen?: number | null
}) {
  const [open, setOpen] = useState<Set<number>>(() => (defaultOpen == null ? new Set() : new Set([defaultOpen])))
  const reduced = usePrefersReducedMotion()

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(single ? [] : prev)
      if (prev.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div>
      {items.map((it, i) => {
        const isOpen = open.has(i)
        return (
          <div key={i} className="border-b border-line">
            <button
              className="w-full text-left py-4 flex justify-between items-center gap-4 font-medium hover:text-brand transition-colors"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
            >
              <span>{it.title}</span>
              <span className={`shrink-0 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                <Icon name="chevron" size={18} />
              </span>
            </button>
            <div
              className={reduced ? '' : 'transition-[grid-template-rows] duration-300 ease-out'}
              style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <div className="pb-4 text-muted text-sm">{it.content}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
