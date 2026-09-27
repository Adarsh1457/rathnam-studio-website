'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { PreloadTrigger } from '@/components/shared/preload-trigger'
import type { galleryImages } from '@/lib/site-config'

type GalleryImg = (typeof galleryImages)[number]

// All rows always drift left-to-right (animationDirection: reverse plays the
// marquee keyframe backwards, which visually moves images from left to
// right across the row) so the gallery feels continuously alive.
const rowConfig = [
  { height: 'h-64 md:h-[440px]', duration: 46 },
  { height: 'h-48 md:h-[300px]', duration: 34 },
  { height: 'h-40 md:h-[240px]', duration: 58 },
]

export function GalleryRows({
  rows,
  onSelect,
}: {
  rows: GalleryImg[][]
  onSelect: (image: GalleryImg) => void
}) {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {rows.map((row, rowIndex) => {
        const config = rowConfig[rowIndex % rowConfig.length]
        const track = [...row, ...row]
        const fromSide = rowIndex % 2 === 0 ? -60 : 60

        return (
          <motion.div
            key={rowIndex}
            initial={{ opacity: 0, x: fromSide }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: rowIndex * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden"
          >
            <PreloadTrigger
              images={row.slice(2, 6).map((image) => image.src)}
              rootMargin="900px 0px 900px 0px"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#0a0a0a] to-transparent md:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#0a0a0a] to-transparent md:w-24" />

            <div className="motion-reduce:overflow-x-auto motion-reduce:no-scrollbar">
              <div
                className={cn(
                  'marquee-track motion-reduce:animate-none flex w-max gap-3 md:gap-4'
                )}
                style={{
                  animationDuration: `${config.duration}s`,
                  animationDirection: 'reverse',
                }}
              >
                {track.map((img, i) => (
                  <button
                    key={`${img.id}-${i}`}
                    type="button"
                    onClick={() => onSelect(img)}
                    data-cursor="interactive"
                    aria-label={`Open ${img.alt} in lightbox`}
                    className={cn(
                      'relative shrink-0 overflow-hidden rounded-sm transition-transform duration-300 hover:z-20 hover:scale-[1.06] focus-visible:z-20 focus-visible:scale-[1.06] focus-visible:outline-2 focus-visible:outline-gold',
                      config.height,
                      rowIndex === 0 ? 'w-52 md:w-[340px]' : rowIndex === 1 ? 'w-40 md:w-64' : 'w-32 md:w-56'
                    )}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 340px, 208px"
                      loading={i < 2 ? 'eager' : 'lazy'}
                      fetchPriority={i < 2 ? 'high' : 'auto'}
                    />
                    <span className="micro-label absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/0 text-transparent transition-colors group-hover:bg-[#0a0a0a]/0 hover:bg-[#0a0a0a]/40 hover:text-gold">
                      VIEW
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        )
      })}
    </div>
  )
}
