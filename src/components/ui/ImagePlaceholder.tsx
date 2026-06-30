import { Icon } from './Icon'
import type { IconName } from './Icon'

// Fondo reutilizable: gradiente + patrón de puntos teñidos con el color del tema.
export function PlaceholderFill() {
  return (
    <>
      <span
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--brand) 18%, var(--surface-2)), var(--surface-2))' }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(color-mix(in srgb, var(--brand) 32%, transparent) 1.2px, transparent 1.2px)',
          backgroundSize: '14px 14px',
          opacity: 0.5,
        }}
      />
    </>
  )
}

export function ImagePlaceholder({
  label,
  className,
  rounded = true,
  bare = false,
  icon = 'gallery',
}: {
  label?: string
  className?: string
  rounded?: boolean
  bare?: boolean
  icon?: IconName
}) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${rounded ? 'rounded-theme' : ''} ${className ?? ''}`}>
      <PlaceholderFill />
      {!bare && (
        <span className="relative flex flex-col items-center gap-1 text-muted">
          <Icon name={icon} size={22} />
          {label && <span className="text-xs">{label}</span>}
        </span>
      )}
    </div>
  )
}
