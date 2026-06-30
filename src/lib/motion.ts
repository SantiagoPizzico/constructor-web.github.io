import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

// ¿El usuario pidió menos movimiento? (accesibilidad). Una sola responsabilidad.
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])
  return reduced
}

// Detecta cuándo el elemento entra en viewport. Devuelve [ref, inView].
// Fallback: si no hay IntersectionObserver, se considera visible (degrada sin romper).
export function useInView<T extends Element = HTMLElement>(
  options?: { threshold?: number; once?: boolean },
): [RefObject<T>, boolean] {
  const { threshold = 0.2, once = true } = options ?? {}
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, once])

  return [ref, inView]
}
