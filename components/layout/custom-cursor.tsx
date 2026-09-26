'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Desktop-only decorative cursor: a small dot with a trailing ring that
 * glows gold over interactive elements. Disabled entirely on touch devices
 * and never blocks pointer events.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState<'default' | 'active'>('default')

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || prefersReduced) return
    setEnabled(true)

    let ringX = 0
    let ringY = 0
    let targetX = 0
    let targetY = 0

    function onMove(e: PointerEvent) {
      targetX = e.clientX
      targetY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
      }
      const el = e.target as HTMLElement
      const interactive = el.closest('a, button, [data-cursor="interactive"]')
      setVariant(interactive ? 'active' : 'default')
    }

    function tick() {
      ringX += (targetX - ringX) * 0.18
      ringY += (targetY - ringY) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }
      requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove)
    const raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
      />
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color,box-shadow] duration-200 ${
          variant === 'active'
            ? 'h-11 w-11 border-gold shadow-[0_0_18px_rgba(201,162,75,0.45)]'
            : 'h-7 w-7 border-bone/40'
        }`}
      />
    </div>
  )
}
