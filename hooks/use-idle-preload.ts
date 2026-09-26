'use client'

import { useEffect } from 'react'
import { preloadImagesIdle } from '@/lib/image-preload'

/**
 * Preloads a batch of images progressively during browser idle time after
 * this component mounts, in small chunks so it never competes with the
 * current page's own render.
 */
export function useIdlePreload(images: readonly string[], chunkSize?: number) {
  useEffect(() => {
    preloadImagesIdle(images, chunkSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length, chunkSize])
}
