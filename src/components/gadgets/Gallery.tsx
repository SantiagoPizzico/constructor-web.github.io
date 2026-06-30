import { useState } from 'react'
import type { GadgetDefinition, GadgetProps } from '../../types'
import { galleryTitle } from '../../data/demo'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { InView } from '../ui/InView'
import { Icon } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'
import { Lightbox } from '../ui/Lightbox'
import type { LightboxImage } from '../ui/Lightbox'

interface GalleryContent {
  title: string
  images: LightboxImage[]
}

const HEIGHTS = [180, 130, 165, 210, 140, 175, 150, 195]

function Gallery({ content }: GadgetProps<GalleryContent>) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="px-6 py-12 bg-bg text-fg">
      <SectionHeading eyebrow="Nuestro trabajo" title={content.title} />
      <div style={{ columns: '150px', columnGap: '10px' }}>
        {content.images.map((im, i) => (
          <InView key={i} delay={(i % 3) * 80} animation="scale" className="mb-2.5 break-inside-avoid">
            <button
              onClick={() => setOpen(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className="group relative block w-full overflow-hidden rounded-theme"
              style={{ height: HEIGHTS[i % HEIGHTS.length] }}
            >
              <span className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
                {im.src ? (
                  <img src={im.src} alt={im.alt ?? ''} className="h-full w-full object-cover" />
                ) : (
                  <ImagePlaceholder className="h-full w-full" rounded={false} bare />
                )}
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.45))' }}
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-10 w-10 scale-90 items-center justify-center rounded-full bg-white/90 text-black opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <Icon name="search" size={18} />
                </span>
              </span>
            </button>
          </InView>
        ))}
      </div>
      <Lightbox images={content.images} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  )
}

export const gallery: GadgetDefinition<GalleryContent> = {
  meta: {
    id: 'gallery',
    category: 'oferta',
    name: 'Galería / Portfolio',
    description: 'Grilla de imágenes con lightbox al hacer clic.',
    fitsBusiness: 'all',
    tier: 'base',
  },
  Component: Gallery,
  defaultContent: (b) => ({
    title: galleryTitle[b] ?? 'Galería',
    images: Array.from({ length: 6 }).map(() => ({})),
  }),
}
