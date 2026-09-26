'use client'

import { useEffect, useRef } from 'react'
import { preloadImages } from '@/lib/image-preload'

/**
 * Attach the returned ref to a sentinel placed inside the CURRENT section.
 * When that sentinel comes within `rootMargin` of the viewport — i.e. the
 * user is still viewing the current section but the next one is
 * approaching — the images passed in are preloaded in the background, so
 * by the time the user actually scrolls there nothing needs to pop in.
 */
export function usePreloadOnApproach(images: readonly string[], rootMargin = '600px 0px 600px 0px') {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!images.length) return
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      preloadImages(images)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          preloadImages(images)
          observer.disconnect()
        }
      },
      { rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
    // images is a derived array literal at call sites; length is a stable
    // enough proxy to avoid re-observing every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length, rootMargin])

  return ref
}
