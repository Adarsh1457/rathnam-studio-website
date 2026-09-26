'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/**
 * Cinematic ink + ember wipe between routes.
 *
 * Perf note: the overlay animates in its own AnimatePresence, keyed by
 * pathname, that never wraps `children`. The destination route mounts
 * immediately beneath the wipe instead of waiting for an exit animation to
 * finish first — the animation only ever plays on top of already-loaded
 * content, never in place of a loading state. `mode="popLayout"` lets a
 * second, faster wipe interrupt an in-flight one instead of queueing.
 */
export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <>{children}</>
  }

  return (
    <>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={pathname}
          className="pointer-events-none fixed inset-0 z-[80]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeOut' } }}
        >
          <motion.div
            className="absolute inset-0 bg-[#0a0a0a]"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0, transition: { duration: 0.45, delay: 0.08, ease: [0.76, 0, 0.24, 1] } }}
            style={{ transformOrigin: 'bottom', willChange: 'transform' }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{
              opacity: [1, 1, 0],
              transition: { duration: 0.5, delay: 0.08, times: [0, 0.4, 1] },
            }}
          >
            <motion.span
              className="block h-10 w-10 rotate-45 border border-gold/80"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: [0.3, 1, 1], opacity: [0, 1, 1], transition: { duration: 0.35, delay: 0.1 } }}
              style={{ willChange: 'transform, opacity' }}
            />
          </motion.div>
          <motion.div
            className="absolute inset-x-0 top-0 h-[2px]"
            style={{ background: 'linear-gradient(90deg, transparent, #c9a24b, transparent)' }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, transition: { duration: 0.3, delay: 0.3 } }}
          />
        </motion.div>
      </AnimatePresence>
      {children}
    </>
  )
}
