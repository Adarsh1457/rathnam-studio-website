'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { services } from '@/lib/site-config'
import { ImageMarquee, type MarqueeImage } from '@/components/shared/image-marquee'
import { whatsappHref } from '@/lib/site-config'

type Service = (typeof services)[number]

export function ServiceSection({
  service,
  index,
  bandImages,
  bandDuration,
  onSelectImage,
}: {
  service: Service
  index: number
  bandImages: MarqueeImage[]
  bandDuration: number
  onSelectImage?: (index: number) => void
}) {
  const imageFromLeft = index % 2 === 0
  const rotation = imageFromLeft ? -3 : 3

  return (
    <section className="cv-auto relative border-t border-bone/10 py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div
          className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16 ${
            imageFromLeft ? '' : 'md:[&>*:first-child]:order-2'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: imageFromLeft ? -60 : 60, rotate: rotation, clipPath: 'inset(4% 4% 4% 4%)' }}
            whileInView={{ opacity: 1, x: 0, rotate: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[360px] overflow-hidden rounded-sm md:h-[520px]"
          >
            <Image
              src={service.image}
              alt={`${service.title} — Rathnam Tattoos Studio, Vijayawada`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: imageFromLeft ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="micro-label mb-4 text-gold">SERVICE {service.number}</p>
            <span className="font-display block text-[7rem] leading-none text-bone/10 md:text-[10rem]">
              {service.number}
            </span>
            <h2 className="font-display -mt-8 text-4xl tracking-tight text-bone md:-mt-14 md:text-6xl">
              {service.title}
            </h2>
            <p className="mt-5 max-w-md text-base text-bone/70 md:text-lg">{service.description}</p>
            {service.extra && <p className="mt-3 max-w-md text-sm text-bone/50">{service.extra}</p>}
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="interactive"
              className="micro-label mt-8 inline-flex items-center gap-2 text-bone/80 transition-colors hover:text-gold"
            >
              EXPLORE SERVICE <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>
      </div>

      <div className="mt-14 md:mt-20">
        <ImageMarquee
          images={bandImages}
          durationSeconds={bandDuration}
          caption={`${service.title} example images`}
          reverse={index % 2 === 1}
          onSelect={onSelectImage}
        />
      </div>
    </section>
  )
}
