import type { GadgetDefinition, GadgetProps } from '../../types'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { Icon } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'

interface MapContent {
  title: string
  address: string
  lat?: number
  lng?: number
}

// Embed interactivo de OpenStreetMap (sin API key; pan/zoom incluidos).
function osmEmbed(lat: number, lng: number, d = 0.008) {
  const bbox = [lng - d, lat - d, lng + d, lat + d].join(',')
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`
}

function MapLocation({ content }: GadgetProps<MapContent>) {
  const hasCoords = typeof content.lat === 'number' && typeof content.lng === 'number'
  const directions = hasCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${content.lat},${content.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content.address)}`

  return (
    <section className="px-6 py-12 bg-bg text-fg">
      <SectionHeading eyebrow="Ubicación" title={content.title} />
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div className="relative aspect-[16/7] mb-4 overflow-hidden rounded-theme border border-line">
          {hasCoords ? (
            <iframe
              title="Mapa de ubicación"
              src={osmEmbed(content.lat as number, content.lng as number)}
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-popups"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
            />
          ) : (
            <>
              <ImagePlaceholder className="absolute inset-0" bare />
              <span className="absolute inset-0 flex items-center justify-center">
                <Icon name="pin" size={34} className="text-brand drop-shadow" />
              </span>
            </>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-theme border border-line p-4 bg-surface">
          <span className="flex items-center gap-2 text-sm">
            <Icon name="pin" size={16} className="text-muted" /> {content.address}
          </span>
          <a
            href={directions}
            target="_blank"
            rel="noreferrer"
            className="bg-brand text-[var(--brand-ink)] px-4 py-2 rounded-theme text-sm font-medium"
          >
            Cómo llegar
          </a>
        </div>
      </div>
    </section>
  )
}

export const mapLocation: GadgetDefinition<MapContent> = {
  meta: {
    id: 'map',
    category: 'funcional',
    name: 'Mapa / Ubicación',
    description: 'Mapa interactivo con marcador y botón "Cómo llegar".',
    fitsBusiness: 'all',
    tier: 'base',
  },
  Component: MapLocation,
  // Ubicación por defecto (placeholder): el cliente la reemplaza por la suya.
  defaultContent: () => ({
    title: 'Dónde estamos',
    address: 'Obelisco, Av. 9 de Julio, Buenos Aires',
    lat: -34.6037,
    lng: -58.3816,
  }),
}
