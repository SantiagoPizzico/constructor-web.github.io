import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { usePrefersReducedMotion } from '../../lib/motion'
import { Icon } from './Icon'

export interface LightboxImage {
  src?: string
  alt?: string
}

// Overlay modal de imagen, controlado por `index` (null = cerrado).
// Portal a body (no queda atrapado en el contenedor del preview). Accesible:
// foco al abrir + restaura al cerrar, Escape/flechas, click-afuera, scroll bloqueado.
export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: LightboxImage[]
  index: number | null
  onClose: () => void
  onIndex?: (i: number) => void
}) {
  const reduced = usePrefersReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (index === null) return
    const current = index
    restoreRef.current = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight' && onIndex) onIndex(Math.min(images.length - 1, current + 1))
      else if (e.key === 'ArrowLeft' && onIndex) onIndex(Math.max(0, current - 1))
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      restoreRef.current?.focus?.()
    }
  }, [index, images.length, onClose, onIndex])

  if (index === null || typeof document === 'undefined') return null
  const img = images[index]
  const anim = reduced ? '' : 'animate-[reveal-in_0.25s_ease-out]'
  const ctrl = 'absolute flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20'

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Vista de imagen"
      className="fixed inset-0 z-[60] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.82)' }}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        aria-label="Cerrar"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className={`${ctrl} right-4 top-4`}
      >
        <Icon name="x" size={20} />
      </button>

      {onIndex && images.length > 1 && (
        <>
          <button
            aria-label="Anterior"
            onClick={(e) => {
              e.stopPropagation()
              onIndex(Math.max(0, index - 1))
            }}
            className={`${ctrl} left-4 top-1/2 -translate-y-1/2`}
          >
            <Icon name="chevron-left" size={20} />
          </button>
          <button
            aria-label="Siguiente"
            onClick={(e) => {
              e.stopPropagation()
              onIndex(Math.min(images.length - 1, index + 1))
            }}
            className={`${ctrl} right-4 top-1/2 -translate-y-1/2`}
          >
            <Icon name="chevron-right" size={20} />
          </button>
        </>
      )}

      {img?.src ? (
        <img
          src={img.src}
          alt={img.alt ?? ''}
          onClick={(e) => e.stopPropagation()}
          className={`max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl ${anim}`}
        />
      ) : (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`flex h-[60vh] w-[80vw] max-w-[680px] items-center justify-center rounded-lg bg-[#1c1c1e] text-white/30 shadow-2xl ${anim}`}
        >
          <Icon name="gallery" size={48} />
        </div>
      )}
    </div>,
    document.body,
  )
}
