'use client'

import { useEffect, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

let activeLenis: Lenis | null = null

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      // Touch keeps native momentum scrolling instead of being virtualized
      // like wheel/trackpad input: syncTouch trades a small feel difference
      // for real jank on fast mobile swipes, which the native scroller never has.
      syncTouch: false,
    })
    activeLenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const raf1 = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(raf1)
      lenis.destroy()
      activeLenis = null
    }
  }, [])

  // Keep the smoothed scroll position perfectly in sync with client-side
  // route changes: jump to top instantly instead of easing back up, so the
  // next page never feels like it's still "catching up" to the browser.
  useEffect(() => {
    activeLenis?.scrollTo(0, { immediate: true })
  }, [pathname])

  return <>{children}</>
}
