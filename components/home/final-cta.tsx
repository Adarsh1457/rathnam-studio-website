'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { whatsappHref } from '@/lib/site-config'
import { CutReveal } from '@/components/shared/cut-reveal'

export function FinalCta() {
  return (
    <section className="cv-auto relative overflow-hidden bg-[#0a0a0a] py-28 md:py-40">
      <div
        aria-hidden="true"
        className="ember-drift absolute inset-0 opacity-60"
        style={{ backgroundSize: '100% 100%' }}
      />
      <div className="relative mx-auto max-w-2xl px-5 text-center md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl leading-tight tracking-tight text-bone md:text-6xl"
        >
          READY TO MAKE IT{' '}
          <span className="text-gold" style={{ textShadow: '0 0 30px rgba(201,162,75,0.5)' }}>
            PERMANENT
          </span>
          ?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 max-w-md text-base text-bone/70 md:text-lg"
        >
          Tell us your idea and let&apos;s create something that belongs to you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-5"
        >
          <Link
            href="/contact"
            data-cursor="interactive"
            className="micro-label rounded-full border border-gold bg-gold px-8 py-4 text-[#0a0a0a] transition-transform hover:scale-[1.03] active:scale-95"
          >
            BOOK NOW
          </Link>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="interactive"
            className="micro-label rounded-full border border-bone/30 px-8 py-4 text-bone transition-transform hover:border-gold hover:text-gold active:scale-95"
          >
            CHAT ON WHATSAPP
          </a>
        </motion.div>
      </div>
      <CutReveal />
    </section>
  )
}
