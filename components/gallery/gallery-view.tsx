'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { GalleryRows } from '@/components/gallery/gallery-rows'
import { galleryImages } from '@/lib/site-config'

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
