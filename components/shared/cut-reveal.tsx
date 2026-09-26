'use client'

import { motion } from 'framer-motion'

const viewport = { once: true, amount: 0.15 } as const
const emblemTiming = { duration: 0.6, times: [0, 0.3, 0.65, 1], ease: 'easeOut' as const }

/**
 * A filmic "cut" that plays once a section scrolls into view: a solid panel
 * uncovers the section top-to-bottom like a curtain lifting, stamped with a
 * gold ink-seal flash and a trailing blade of light. Drop as the last child
 * of any `relative` section to give it the same cut language as the
 * between-page transition.
 *
 * Each layer declares its own `initial`/`whileInView` instead of relying on
 * variant propagation from a shared parent — nested motion children can miss
 * their initial inline style until the parent's own trigger fires, which
 * left not-yet-visible sections showing the emblem at full opacity.
 */
export function CutReveal() {
  return (
    <div aria-hidden="true" className="motion-reduce:hidden pointer-events-none absolute inset-0 z-30">
      <motion.div
        className="absolute inset-0 bg-[#0a0a0a]"
        style={{ transformOrigin: 'bottom' }}
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="fixed inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 1, 1, 0] }}
        viewport={viewport}
        transition={emblemTiming}
      >
        <motion.span
          className="block h-8 w-8 rotate-45 border border-gold/80"
          initial={{ scale: 0.3 }}
          whileInView={{ scale: [0.3, 1, 1, 0.6] }}
          viewport={viewport}
          transition={emblemTiming}
        />
      </motion.div>
      <motion.div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent, #c9a24b, transparent)' }}
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 0 }}
        viewport={viewport}
        transition={{ duration: 0.4, delay: 0.32 }}
      />
    </div>
  )
}
