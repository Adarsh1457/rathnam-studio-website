'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { GalleryRows } from '@/components/gallery/gallery-rows'
import { galleryImages } from '@/lib/site-config'
import { useIdlePreload } from '@/hooks/use-idle-preload'

// Warm only the first viewport and the next near-fold batch. Remaining images
// are requested by the browser as the marquee approaches them, avoiding a
// 45-image burst on the initial gallery load.
const initialGalleryImageSrcs = galleryImages.slice(0, 12).map((img) => img.src)

// The lightbox is only ever needed after a user clicks an image, so its code
// (and framer-motion usage within it) is split into its own chunk instead of
// shipping with the initial gallery page bundle.
const Lightbox = dynamic(() => import('@/components/gallery/lightbox').then((mod) => mod.Lightbox))

const rows = [
  galleryImages.filter((_, i) => i % 3 === 0),
  galleryImages.filter((_, i) => i % 3 === 1),
  galleryImages.filter((_, i) => i % 3 === 2),
]

export function GalleryView() {
  useIdlePreload(initialGalleryImageSrcs, 3)
  const [activeId, setActiveId] = useState<number | null>(null)
  const activeIndex = activeId === null ? null : galleryImages.findIndex((img) => img.id === activeId)

  return (
    <>
      <GalleryRows rows={rows} onSelect={(img) => setActiveId(img.id)} />
      <Lightbox
        images={galleryImages}
        index={activeIndex}
        onClose={() => setActiveId(null)}
        onNavigate={(next) => setActiveId(galleryImages[next].id)}
      />
    </>
  )
}
