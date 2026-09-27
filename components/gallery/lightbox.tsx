'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useScrollLock } from '@/hooks/use-scroll-lock'

type GalleryImg = { id: string | number; src: string; alt: string }

export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: GalleryImg[]
  index: number | null
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}) {
  const touchStartX = useRef<number | null>(null)
  const open = index !== null

  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(((index as number) + 1) % images.length)
      if (e.key === 'ArrowLeft') onNavigate(((index as number) - 1 + images.length) % images.length)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, index, images.length, onClose, onNavigate])

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Tattoo image viewer"
          className="fixed inset-0 z-[95] flex items-center justify-center bg-[#0a0a0a]/97 backdrop-blur-sm"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return
            const delta = e.changedTouches[0].clientX - touchStartX.current
            if (delta > 60) onNavigate((index - 1 + images.length) % images.length)
            if (delta < -60) onNavigate((index + 1) % images.length)
            touchStartX.current = null
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close viewer"
            data-cursor="interactive"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-bone/25 text-bone transition-colors hover:border-gold hover:text-gold"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate((index - 1 + images.length) % images.length)}
            aria-label="Previous image"
            data-cursor="interactive"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-bone/25 text-bone transition-colors hover:border-gold hover:text-gold md:left-8"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate((index + 1) % images.length)}
            aria-label="Next image"
            data-cursor="interactive"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-bone/25 text-bone transition-colors hover:border-gold hover:text-gold md:right-8"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <motion.div
            key={images[index].id}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto h-[70vh] w-[90vw] max-w-4xl md:h-[80vh]"
          >
            <Image
              src={images[index].src}
              alt={images[index].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </motion.div>

          <p className="micro-label absolute bottom-6 left-1/2 -translate-x-1/2 text-bone/60">
            {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
