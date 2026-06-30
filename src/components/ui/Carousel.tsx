import { Children, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../lib/motion'
import { Icon } from './Icon'

// Carrusel horizontal con CSS scroll-snap (GPU-friendly): swipe + botones + autoplay opcional.
// Respeta prefers-reduced-motion (sin autoplay y sin scroll suave) y se pausa al hover.
export function Carousel({
  children,
  autoPlay = true,
  interval = 4500,
  slideWidth = 280,
  className,
}: {
  children: ReactNode
  autoPlay?: boolean
  interval?: number
  slideWidth?: number
  className?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const slides = Children.toArray(children)
  const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth'

  function move(dir: 1 | -1) {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: el.clientWidth * 0.85 * dir, behavior })
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el || !autoPlay || reduced) return
    let paused = false
    const onEnter = () => (paused = true)
    const onLeave = () => (paused = false)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    const id = window.setInterval(() => {
      if (paused) return
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + el.clientWidth * 0.85, behavior: 'smooth' })
    }, interval)
    return () => {
      window.clearInterval(id)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [autoPlay, reduced, interval])

  return (
    <div className={`relative ${className ?? ''}`}>
      <div ref={trackRef} className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory pb-1">
        {slides.map((slide, i) => (
          <div key={i} className="snap-start shrink-0" style={{ width: slideWidth, maxWidth: '100%' }}>
            {slide}
          </div>
        ))}
      </div>
      <button
        onClick={() => move(-1)}
        aria-label="Anterior"
        className="absolute left-1 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-surface text-fg border border-line shadow-sm transition-colors hover:bg-surface2"
      >
        <Icon name="chevron-left" size={18} />
      </button>
      <button
        onClick={() => move(1)}
        aria-label="Siguiente"
        className="absolute right-1 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-surface text-fg border border-line shadow-sm transition-colors hover:bg-surface2"
      >
        <Icon name="chevron-right" size={18} />
      </button>
    </div>
  )
}
