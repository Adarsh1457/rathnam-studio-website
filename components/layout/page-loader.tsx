'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

/**
 * First-paint loading screen for cold loads (new tab / hard refresh).
 *
 * Renders in the server-sent HTML so it's visible immediately — before any
 * JS, fonts, or the hero's images have loaded — then fades out as soon as
 * the page is actually ready. A short minimum hold time keeps the large
 * dragon mark from flashing on fast connections, but it never adds
 * artificial delay beyond that: it clears the instant `load` fires (or
 * after a hard timeout so a slow asset can never strand the user behind
 * the overlay). The dragon mark itself is a single small transparent PNG
 * loaded with the highest fetch priority, so it never competes with or
 * delays the rest of the page's assets.
 *
 * Client-side route changes never remount this component (it lives once in
 * the root layout, above <RouteTransition>), so it only ever appears on the
 * very first load of a tab, not on internal navigation. Because of that,
 * this is also the single place that enforces Home as the site's only
 * entry point: whatever URL a tab was opened or refreshed on, the loader
 * silently swaps the route to "/" underneath itself before it fades away,
 * so every fresh visit — direct link, bookmark, or refresh — always lands
 * on Home.
 */
const MIN_VISIBLE_MS = 450
const HARD_TIMEOUT_MS = 2500

export function PageLoader() {
  const pathname = usePathname()
  const router = useRouter()
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const start = Date.now()
    let settled = false

    const finish = () => {
      if (settled) return
      settled = true

      // Every fresh entry into the site lands on Home, regardless of which
      // URL it started on. Swapping the route now — while still fully
      // covered by the opaque overlay — means the destination page has
      // already mounted underneath by the time the loader fades out.
      if (pathname !== '/') {
        router.replace('/')
      }

      const elapsed = Date.now() - start
      const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0)
      window.setTimeout(() => setFading(true), remaining)
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish, { once: true })
    }

    const hardTimeout = window.setTimeout(finish, HARD_TIMEOUT_MS)

    return () => {
      window.removeEventListener('load', finish)
      window.clearTimeout(hardTimeout)
    }
    // Intentionally runs once: this component never remounts on client-side
    // navigation, so pathname/router here only ever reflect the tab's very
    // first load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!fading) return
    const timeout = window.setTimeout(() => setVisible(false), 400)
    return () => window.clearTimeout(timeout)
  }, [fading])

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-[400ms] ease-out ${
        fading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="relative flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44">
          <span className="absolute h-full w-full animate-spin rounded-full border border-gold/20 border-t-gold [animation-duration:1.1s]" />
          <span className="absolute h-[82%] w-[82%] animate-pulse rounded-full bg-gold/5 blur-xl [animation-duration:1.4s]" />
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny decorative mark loaded with max priority; next/image's extra JS isn't worth it here */}
          <img
            src="/images/dragon-loader.png"
            alt=""
            width={100}
            height={100}
            fetchPriority="low"
            decoding="async"
            className="relative h-[68%] w-[68%] object-contain"
          />
        </span>
        <span className="font-display micro-label text-bone/70">Rathnam</span>
      </div>
    </div>
  )
}
