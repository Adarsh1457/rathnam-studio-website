'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { useScrollLock } from '@/hooks/use-scroll-lock'

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    function apply() {
      setScrolled(window.scrollY > 40)
      ticking = false
    }
    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useScrollLock(menuOpen)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[65] transition-all duration-500 ${
          scrolled ? 'border-b border-bone/10 bg-[#0a0a0a]/85 backdrop-blur-md' : 'bg-transparent'
        }`}
        
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display text-sm tracking-[0.18em] text-bone md:text-base"
            aria-label={`${siteConfig.name} — Home`}
          >
            <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-gold/40 md:h-8 md:w-8">
              <Image
                src="/images/logo.jpeg"
                alt={`${siteConfig.name} logo`}
                fill
  loading="lazy"
  className="object-cover"
                sizes="32px"
              />
            </span>
            {siteConfig.shortName}
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
            {siteConfig.nav.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-cursor="interactive"
                  className={`micro-label relative py-2 transition-transform active:scale-95 ${
                    active ? 'text-gold' : 'text-bone/75 hover:text-bone'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-0.5 left-0 h-px w-full bg-gold" aria-hidden="true" />
                  )}
                </Link>
              )
            })}
            <Link
              href="/contact"
              data-cursor="interactive"
              className="micro-label rounded-full border border-gold/50 px-5 py-2.5 text-gold transition-transform hover:bg-gold hover:text-[#0a0a0a] active:scale-95"
            >
              BOOK NOW
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center text-bone transition-transform active:scale-90 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex flex-col bg-[#0a0a0a] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-display text-sm tracking-[0.18em] text-bone">
                {siteConfig.shortName}
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center text-bone transition-transform active:scale-90"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav aria-label="Mobile primary" className="flex flex-1 flex-col justify-center gap-2 px-8">
              {siteConfig.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.08 * i } }}
                >
                  <Link
                    href={item.href}
                    className="flex items-baseline gap-4 py-4 font-display text-4xl tracking-tight text-bone transition-transform active:scale-95 active:text-gold"
                  >
                    <span className="text-sm text-gold">{item.number}</span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="border-t border-bone/10 p-8">
              <Link
                href="/contact"
                className="micro-label flex w-full items-center justify-center rounded-full border border-gold bg-gold py-4 text-[#0a0a0a] transition-transform active:scale-95"
              >
                BOOK NOW
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
