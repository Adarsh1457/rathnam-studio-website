'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { galleryImages } from '@/lib/site-config'
import { CutReveal } from '@/components/shared/cut-reveal'

const supporting = galleryImages.slice(1, 4)

export function FeaturedGallery() {
  const featured = galleryImages[0]

  return (
    <section className="cv-auto relative bg-[#0a0a0a] py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="micro-label mb-4 text-gold">FEATURED</p>
            <h2 className="font-display text-5xl leading-none tracking-tight text-bone md:text-7xl">
              OUR WORK
            </h2>
          </div>
          <Link
            href="/gallery"
            data-cursor="interactive"
            className="micro-label flex w-fit items-center gap-2 text-bone/70 transition-transform hover:text-gold active:scale-95"
          >
            VIEW FULL GALLERY <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[420px] overflow-hidden rounded-sm bg-neutral-900 md:h-[620px]"
          >
            <Image
              src={featured.src}
              alt={featured.alt}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {supporting.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.12 * i, ease: [0.16, 1, 0.3, 1] }}
                className={`relative overflow-hidden rounded-sm bg-neutral-900 ${i === 0 ? 'col-span-2 h-64 md:h-[298px]' : 'h-56 md:h-[298px]'}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <CutReveal />
    </section>
  )
}
