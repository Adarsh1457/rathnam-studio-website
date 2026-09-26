'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { ServiceSection } from '@/components/services/service-section'
import type { services } from '@/lib/site-config'
import type { MarqueeImage } from '@/components/shared/image-marquee'

// The lightbox is only ever needed after a user clicks a band image, so its
// code (and framer-motion usage within it) is split into its own chunk
// instead of shipping with the initial services page bundle.
const Lightbox = dynamic(() => import('@/components/gallery/lightbox').then((mod) => mod.Lightbox))

type Service = (typeof services)[number]

export function ServicesSections({
  sections,
}: {
  sections: { service: Service; bandImages: MarqueeImage[]; bandDuration: number }[]
}) {
  const [active, setActive] = useState<{ sectionIndex: number; imageIndex: number } | null>(null)

  const activeImages = active ? sections[active.sectionIndex].bandImages : []
  const lightboxImages = activeImages.map((img, i) => ({ id: i, src: img.src, alt: img.alt }))

  return (
    <>
      {sections.map(({ service, bandImages, bandDuration }, i) => {
        const next = sections[i + 1]
        const preloadNext = next
          ? [next.service.image, ...next.bandImages.slice(0, 4).map((img) => img.src)]
          : []
        return (
          <ServiceSection
            key={service.slug}
            service={service}
            index={i}
            bandImages={bandImages}
            bandDuration={bandDuration}
            preloadNext={preloadNext}
            onSelectImage={(imageIndex) => setActive({ sectionIndex: i, imageIndex })}
          />
        )
      })}
      <Lightbox
        images={lightboxImages}
        index={active ? active.imageIndex : null}
        onClose={() => setActive(null)}
        onNavigate={(next) => setActive((prev) => (prev ? { ...prev, imageIndex: next } : prev))}
      />
    </>
  )
}
