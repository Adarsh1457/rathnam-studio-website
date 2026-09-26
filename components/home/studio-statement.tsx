'use client'

import { motion } from 'framer-motion'
import { CutReveal } from '@/components/shared/cut-reveal'

const lines = ['YOUR IDEA.', 'OUR CRAFT.', 'ONE PERMANENT STORY.']

export function StudioStatement() {
  return (
    <section className="cv-auto relative overflow-hidden bg-[#0a0a0a] py-28 md:py-44">
      <p
        aria-hidden="true"
        className="font-display text-stroke-gold pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[26vw] leading-none opacity-60"
      >
        INK
      </p>

      <div className="relative mx-auto max-w-3xl px-5 text-center md:px-10">
        <h2 className="font-display text-4xl leading-tight tracking-tight text-bone md:text-6xl">
          {lines.map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`block ${i === 2 ? 'text-gold' : ''}`}
            >
              {line}
            </motion.span>
          ))}
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-8 max-w-lg text-base text-bone/65 md:text-lg"
        >
          Every tattoo begins with an idea. We turn that idea into a piece designed with intention,
          detail and character.
        </motion.p>
      </div>
      <CutReveal />
    </section>
  )
}
