'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { services, galleryImages } from '@/lib/site-config'
import { CutReveal } from '@/components/shared/cut-reveal'
import { PreloadTrigger } from '@/components/shared/preload-trigger'

const nextSectionImages = galleryImages.slice(0, 4).map((img) => img.src)

export function WhatWeDo() {
  return (
    <section className="cv-auto relative bg-[#0a0a0a] py-24 md:py-36">
      <PreloadTrigger images={nextSectionImages} />
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-16 flex items-baseline justify-between md:mb-24">
          <div>
            <p className="micro-label mb-4 text-gold">01 / 04</p>
            <h2 className="font-display text-5xl leading-none tracking-tight text-bone md:text-7xl">
              WHAT WE DO
            </h2>
          </div>
          <Link
            href="/services"
            data-cursor="interactive"
            className="micro-label items-center gap-2 text-bone/70 transition-transform hover:text-gold active:scale-95 flex"
          >
            ALL SERVICES <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="flex flex-col">
          {services.map((service, i) => {
            const fromLeft = i % 2 === 0
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group grid grid-cols-1 items-center gap-6 border-t border-bone/10 py-10 md:grid-cols-[auto_1fr_auto_140px] md:gap-10 md:py-14"
              >
                <span className="font-display text-3xl text-bone/25 md:text-5xl">{service.number}</span>

                <div>
                  <h3 className="font-display text-3xl tracking-tight text-bone transition-colors group-hover:text-gold md:text-5xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm text-bone/65 md:text-base">{service.description}</p>
                </div>

                <Link
                  href={`/services#${service.slug}`}
                  data-cursor="interactive"
                  className="micro-label inline-block w-fit whitespace-nowrap text-bone/70 transition-transform hover:text-gold active:scale-95"
                >
                  EXPLORE SERVICE →
                </Link>

                <div className="relative h-24 w-full overflow-hidden rounded-sm md:h-28 md:w-36">
                  <Image
                    src={service.image}
                    alt={`${service.title} — Rathnam Tattoos Studio`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="144px"
                  />
                </div>
              </motion.div>
            )
          })}
          <div className="border-t border-bone/10" />
        </div>
      </div>
      <CutReveal />
    </section>
  )
}
