import { useState } from 'react'
import { PlaceholderFill } from './ImagePlaceholder'

export type RevealEffect = 'fade' | 'zoom' | 'slide'

// Estrategias de animación (Open/Closed): sumar un efecto = agregar una entrada.
const EFFECTS: Record<RevealEffect, { base: string; reveal: string }> = {
  fade: {
    base: 'transition-opacity duration-500 ease-out group-hover:opacity-0',
    reveal: 'opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100',
  },
  zoom: {
    base: 'transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-110',
    reveal: 'opacity-0 scale-110 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100',
  },
  slide: {
    base: 'transition-all duration-500 ease-out group-hover:opacity-0 group-hover:-translate-y-3',
    reveal: 'opacity-0 translate-y-5 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0',
  },
}

// Capa de imagen: muestra la imagen, o nada si falta/falla (deja ver el respaldo).
function Layer({ src, alt, fit, className }: { src?: string; alt?: string; fit: 'contain' | 'cover'; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return null
  return (
    <img
      src={src}
      alt={alt ?? ''}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`absolute inset-0 h-full w-full ${fit === 'cover' ? 'object-cover' : 'object-contain'} ${className ?? ''}`}
    />
  )
}

export function HoverRevealImage({
  base,
  reveal,
  effect = 'fade',
  alt,
  className,
}: {
  base?: string
  reveal?: string
  effect?: RevealEffect
  alt?: string
  className?: string
}) {
  const eff = EFFECTS[effect] ?? EFFECTS.fade
  const hasReveal = Boolean(reveal)
  return (
    <div className={`reveal-in group relative overflow-hidden rounded-theme ${className ?? ''}`}>
      <PlaceholderFill />
      <Layer
        src={base}
        alt={alt}
        fit="contain"
        className={hasReveal ? eff.base : 'transition-transform duration-500 ease-out group-hover:scale-105'}
      />
      {hasReveal && <Layer src={reveal} alt={alt} fit="cover" className={eff.reveal} />}
    </div>
  )
}
