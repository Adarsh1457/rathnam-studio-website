'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { about, reviewImages } from '@/lib/site-config'
import { CutReveal } from '@/components/shared/cut-reveal'
import { ImageMarquee } from '@/components/shared/image-marquee'
import { InkBackdrop } from '@/components/realm/ink-backdrop'

export function AboutUs() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a]">
      <div className="relative flex min-h-[46vh] items-end overflow-hidden pb-16 pt-32 md:min-h-[54vh]">
        <InkBackdrop mood="about" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10">
          <p className="micro-label mb-4 text-gold">103 / 104</p>
          <h2 className="font-display text-5xl leading-none tracking-tight text-bone md:text-7xl">
            THE ARTIST BEHIND THE INK
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 pt-24 md:px-10 md:pt-36">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md md:mx-0"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
              <Image
                src={about.mainImage || '/placeholder.svg'}
                alt={`${about.name}, ${about.role.toLowerCase()}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 45vw"
              />
            </div>
            <div className="absolute -bottom-8 -left-6 h-32 w-28 overflow-hidden rounded-sm border-2 border-[#0a0a0a] shadow-2xl md:-bottom-10 md:-left-10 md:h-44 md:w-36">
              <Image
                src={about.secondaryImage || '/placeholder.svg'}
                alt={`${about.name} at work`}
                fill
                className="object-cover"
                sizes="180px"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="micro-label mb-3 text-gold">{about.role}</p>
            <h3 className="font-display text-6xl tracking-tight text-bone md:text-8xl">{about.name}</h3>
            <p className="mt-6 max-w-md text-base text-bone/65 md:text-lg">{about.statement}</p>

            <div className="mt-10 flex flex-wrap gap-10 border-t border-bone/10 pt-8">
              {about.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-4xl text-gold md:text-5xl">{stat.value}</p>
                  <p className="micro-label mt-2 text-bone/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="cv-auto mt-20 pb-20 md:mt-28 md:pb-28">
        <p className="micro-label mb-6 px-5 text-bone/60 md:px-10">WHAT CLIENTS SAY</p>
        <ImageMarquee
          images={reviewImages}
          caption="Client reviews for Rathnam Tattoos & Nail Art Studio"
          durationSeconds={50}
          imageClassName="!h-64 !w-64 md:!h-80 md:!w-80"
        />
      </div>

      <CutReveal />
    </section>
  )
}
