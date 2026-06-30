import { useEffect, useState } from 'react'
import { useInView, usePrefersReducedMotion } from '../../lib/motion'

// Anima un número de 0 a `value` cuando entra en viewport.
// Degrada al valor final si hay reduced-motion o no hay requestAnimationFrame.
export function CountUp({
  value,
  duration = 1200,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
}: {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const [ref, inView] = useInView<HTMLSpanElement>()
  const reduced = usePrefersReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced || typeof requestAnimationFrame === 'undefined') {
      setN(value)
      return
    }
    let raf = 0
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setN(value * eased)
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  )
}
