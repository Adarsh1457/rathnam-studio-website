'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { preloadImagesIdle } from '@/lib/image-preload'
import { moodImage } from '@/components/realm/ink-backdrop'
import { services, galleryImages, about } from '@/lib/site-config'

const heroImages = Object.values(moodImage)

// What's worth quietly warming next, keyed by the page currently being
// viewed. Every entry also always includes every hero image (tiny files)
// so switching between any two pages in the nav always feels instant.
const nextPageImages: Record<string, string[]> = {
  '/': [...services.map((s) => s.image), ...galleryImages.slice(0, 8).map((g) => g.src)],
  '/services': [...galleryImages.slice(0, 8).map((g) => g.src), about.mainImage, about.secondaryImage],
  '/gallery': [about.mainImage, about.secondaryImage],
  '/about-us': [],
  '/contact': [],
}

/**
 * Once the current page has had a moment to settle, quietly warms the
 * browser's cache for the hero image of every route plus the images the
 * user is most likely to need next. Runs in idle-time chunks (see
 * `preloadImagesIdle`) so it never competes with the current page's own
 * render, and every URL is only ever requested once across the whole
 * session.
 */
export function RoutePreloader() {
  const pathname = usePathname()

  useEffect(() => {
    preloadImagesIdle([...heroImages, ...(nextPageImages[pathname] ?? [])])
  }, [pathname])

  return null
}
