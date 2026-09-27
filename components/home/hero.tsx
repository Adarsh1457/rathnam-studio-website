import Link from 'next/link'
import type { CSSProperties } from 'react'
import { InkBackdrop } from '@/components/realm/ink-backdrop'
import { PreloadTrigger } from '@/components/shared/preload-trigger'
import { services, siteConfig } from '@/lib/site-config'

const nextSectionImages = services.map((s) => s.image)

const lines = ['WE CREATE', 'TIMELESS', 'TATTOOS THAT', 'TELL YOUR STORY']

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#0a0a0a]">
      <InkBackdrop mood="home" />
      <PreloadTrigger images={nextSectionImages} />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <p className="hero-fade-in micro-label mb-5 text-gold">
          #{siteConfig.tagline}
        </p>

        <h1 className="font-display max-w-xl text-[13vw] leading-[0.95] tracking-tight text-bone sm:max-w-2xl sm:text-[7vw] md:text-[5vw] lg:text-[4.2vw]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span
                style={{ '--hero-line': i } as CSSProperties}
                className={`hero-line-reveal block ${i === 1 ? 'text-gold' : ''}`}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-fade-in hero-copy mt-6 max-w-md text-base text-bone/75 md:text-lg">
          Custom tattoos created with precision, creativity and attention to every detail.
        </p>

        <div className="hero-fade-in hero-actions mt-9 flex flex-wrap items-center gap-5">
          <Link
            href="/contact"
            data-cursor="interactive"
            className="micro-label rounded-full border border-gold bg-gold px-8 py-4 text-[#0a0a0a] transition-transform hover:scale-[1.03] active:scale-95"
          >
            BOOK NOW
          </Link>
          <Link
            href="/gallery"
            data-cursor="interactive"
            className="micro-label flex items-center gap-2 text-bone/85 transition-transform hover:text-gold active:scale-95"
          >
            OUR WORKS <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 z-10 flex flex-col items-start gap-3 pl-5 pr-24 text-left md:bottom-7 md:flex-row md:items-end md:justify-between md:px-10 md:pr-10">
        <p className="micro-label text-bone/60">
          {siteConfig.city.toUpperCase()} · {siteConfig.state.toUpperCase()}
        </p>
        <div className="flex items-center gap-2 text-bone/60">
          <span className="micro-label">KEEP SCROLLING</span>
          <span aria-hidden="true" className="hero-scroll-indicator h-8 w-px bg-gold/60" />
        </div>
      </div>
    </section>
  )
}
