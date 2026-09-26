'use client'

import Image from 'next/image'
import { useState, useId } from 'react'
import { Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

export type MarqueeImage = {
  src: string
  alt: string
}

/**
 * Seamless, transform-only, left-to-right infinite image band. Pauses on
 * hover/focus, offers a visible pause control, and degrades to a normal
 * horizontally-swipeable strip under prefers-reduced-motion.
 */
export function ImageMarquee({
  images,
  durationSeconds = 65,
  imageClassName,
  caption,
  reverse = false,
  onSelect,
  eagerCount = 0,
}: {
  images: MarqueeImage[]
  durationSeconds?: number
  imageClassName?: string
  caption?: string
  reverse?: boolean
  onSelect?: (index: number) => void
  /** Number of leading images (by original index) to load eagerly instead of lazily — use for a band that's visible without scrolling. */
  eagerCount?: number
}) {
  const [paused, setPaused] = useState(false)
  const labelId = useId()
  const track = [...images, ...images]

  return (
    <div
      className="group relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent md:w-28" />

      {caption && (
        <span id={labelId} className="sr-only">
          {caption}
        </span>
      )}

      <div className="motion-reduce:overflow-x-auto motion-reduce:no-scrollbar">
        <div
          aria-labelledby={caption ? labelId : undefined}
          className={cn(
            'marquee-track motion-reduce:animate-none flex w-max gap-4 motion-reduce:flex-nowrap',
            paused && 'paused'
          )}
          style={{
            animationDuration: `${durationSeconds}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        >
          {track.map((img, i) => {
            const originalIndex = i % images.length
            const isEager = originalIndex < eagerCount
            const content = (
              <>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={isEager}
                  className="object-cover"
                  sizes="220px"
                  loading={isEager ? undefined : 'lazy'}
                />
                {onSelect && (
                  <span className="micro-label absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/0 text-transparent transition-colors hover:bg-[#0a0a0a]/40 hover:text-gold">
                    VIEW
                  </span>
                )}
              </>
            )

            const className = cn(
              'relative h-56 w-40 shrink-0 overflow-hidden rounded-sm md:h-72 md:w-52',
              imageClassName
            )

            if (onSelect) {
              return (
                <button
                  key={`${img.src}-${i}`}
                  type="button"
                  onClick={() => onSelect(originalIndex)}
                  data-cursor="interactive"
                  aria-label={`Open ${img.alt} in lightbox`}
                  className={cn(className, 'transition-transform duration-300 hover:z-20 hover:scale-[1.06] focus-visible:z-20 focus-visible:scale-[1.06] focus-visible:outline-2 focus-visible:outline-gold')}
                >
                  {content}
                </button>
              )
            }

            return (
              <div key={`${img.src}-${i}`} className={className}>
                {content}
              </div>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? 'Play image band' : 'Pause image band'}
        data-cursor="interactive"
        className="absolute bottom-3 left-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-bone/25 bg-[#0a0a0a]/70 text-bone backdrop-blur transition-colors hover:border-gold hover:text-gold md:left-auto md:right-3"
      >
        {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
      </button>
    </div>
  )
}
