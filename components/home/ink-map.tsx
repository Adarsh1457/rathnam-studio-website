'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/site-config'

const nodePositions = [
  { top: '68%', left: '48%' },
  { top: '55%', left: '64%' },
  { top: '40%', left: '50%' },
  { top: '26%', left: '66%' },
  { top: '13%', left: '52%' },
]

const pathD =
  'M 48 78 C 56 72, 58 62, 64 58 C 70 54, 62 46, 50 42 C 44 40, 42 30, 66 26 C 74 24, 62 16, 52 13'

const VISITED_KEY = 'ratnam-ink-visited'

/**
 * The interactive ink map: numbered studs sitting along a needle-line path
 * traced over the backdrop, linking to each section. A gold ember marks
 * "you are here"; a dimmer ember marks sections already explored this visit.
 */
export function InkMap() {
  const pathname = usePathname()
  const [visited, setVisited] = useState<string[]>([])

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem(VISITED_KEY) ?? '[]') as string[]
    const next = stored.includes(pathname) ? stored : [...stored, pathname]
    sessionStorage.setItem(VISITED_KEY, JSON.stringify(next))
    setVisited(next)
  }, [pathname])

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-20 hidden md:block" aria-hidden="false">
        <svg
          className="absolute inset-0 h-full w-full opacity-70"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d={pathD}
            fill="none"
            stroke="#c9a24b"
            strokeWidth="0.15"
            strokeDasharray="1 1.4"
            vectorEffect="non-scaling-stroke"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="7s" repeatCount="indefinite" />
          </path>
        </svg>

        {siteConfig.nav.map((item, i) => {
          const active = pathname === item.href
          const explored = !active && visited.includes(item.href)
          const pos = nodePositions[i]
          return (
            <Link
              key={item.href}
              href={item.href}
              data-cursor="interactive"
              aria-label={`${item.label}${active ? ' — you are here' : ''}`}
              aria-current={active ? 'page' : undefined}
              className="group pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center focus:outline-none"
              style={{ top: pos.top, left: pos.left }}
            >
              <span
                className={`relative flex h-14 w-14 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:[animation-duration:2.5s] group-focus-visible:ring-2 group-focus-visible:ring-gold group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[#0a0a0a] breathing-scale ${
                  active
                    ? 'border-gold bg-gold/15 shadow-[0_0_22px_rgba(201,162,75,0.55)]'
                    : 'border-gold/40 bg-[#0a0a0a]/40 group-hover:border-gold group-hover:shadow-[0_0_18px_rgba(201,162,75,0.4)]'
                }`}
              >
                <span className={`font-display text-sm ${active ? 'text-gold' : 'text-bone/80'}`}>
                  {item.number}
                </span>
                {active && (
                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_rgba(201,162,75,0.9)]" />
                )}
                {explored && (
                  <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-gold/50" />
                )}
              </span>
              <span className="micro-label mt-2 whitespace-nowrap text-bone/0 transition-colors duration-300 group-hover:text-bone group-focus-visible:text-bone">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center gap-3 md:hidden"
        aria-hidden="false"
      >
        {siteConfig.nav.map((item) => {
          const active = pathname === item.href
          const explored = !active && visited.includes(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              data-cursor="interactive"
              aria-label={`${item.label}${active ? ' — you are here' : ''}`}
              aria-current={active ? 'page' : undefined}
              className="group pointer-events-auto flex flex-col items-center focus:outline-none"
            >
              <span
                className={`relative flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 group-active:scale-90 group-focus-visible:ring-2 group-focus-visible:ring-gold group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[#0a0a0a] ${
                  active
                    ? 'border-gold bg-gold/15 shadow-[0_0_18px_rgba(201,162,75,0.5)]'
                    : 'border-gold/40 bg-[#0a0a0a]/50'
                }`}
              >
                <span className={`font-display text-xs ${active ? 'text-gold' : 'text-bone/80'}`}>
                  {item.number}
                </span>
                {active && (
                  <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(201,162,75,0.9)]" />
                )}
                {explored && (
                  <span className="absolute -right-0.5 -top-0.5 h-1 w-1 rounded-full bg-gold/50" />
                )}
              </span>
            </Link>
          )
        })}
      </div>
    </>
  )
}
