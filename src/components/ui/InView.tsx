import type { ReactNode } from 'react'
import { useInView, usePrefersReducedMotion } from '../../lib/motion'

export type RevealAnimation = 'rise' | 'fade' | 'scale' | 'slide-left'

// Estado "oculto" por animación (Open/Closed: agregar una entrada = nuevo efecto).
const FROM: Record<RevealAnimation, string> = {
  rise: 'translate-y-4',
  fade: '',
  scale: 'scale-95',
  'slide-left': '-translate-x-4',
}

// Revela a sus hijos cuando entran en viewport. Respeta prefers-reduced-motion.
export function InView({
  children,
  animation = 'rise',
  delay = 0,
  className,
}: {
  children: ReactNode
  animation?: RevealAnimation
  delay?: number
  className?: string
}) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const hidden = !reduced && !inView

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${className ?? ''} ${
        hidden ? `opacity-0 ${FROM[animation]}` : 'opacity-100 translate-x-0 translate-y-0 scale-100'
      }`}
      style={{ transitionDelay: hidden ? '0ms' : `${delay}ms` }}
    >
      {children}
    </div>
  )
}
