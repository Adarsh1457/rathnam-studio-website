'use client'

import { useEffect } from 'react'
import { pauseSmoothScroll, resumeSmoothScroll } from '@/components/layout/smooth-scroll-provider'

/**
 * Locks the page scroll behind a fixed full-screen overlay (mobile menu,
 * lightbox). Toggling `documentElement.style.overflow` alone is not enough:
 * iOS Safari still allows background touch-scrolling under `overflow:
 * hidden`, and Lenis keeps its own RAF-driven scroll running underneath —
 * both of which let the page (hero backgrounds included) visibly move
 * behind the overlay. This pins the body in place with the scroll offset
 * preserved, and pauses Lenis for the duration of the lock.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    const scrollY = window.scrollY
    const { body } = document
    const prevPosition = body.style.position
    const prevTop = body.style.top
    const prevWidth = body.style.width
    const prevOverflow = document.documentElement.style.overflow

    pauseSmoothScroll()
    document.documentElement.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'

    return () => {
      body.style.position = prevPosition
      body.style.top = prevTop
      body.style.width = prevWidth
      document.documentElement.style.overflow = prevOverflow
      window.scrollTo(0, scrollY)
      resumeSmoothScroll()
    }
  }, [locked])
}
