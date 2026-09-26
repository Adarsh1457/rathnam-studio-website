import Image from 'next/image'
import { cn } from '@/lib/utils'

// Real studio photography only — actual finished tattoos on actual skin,
// pulled straight from the studio's own portfolio. No generated or stock
// imagery, and no edits beyond standard resizing/compression.
const moodImage: Record<Mood, string> = {
  home: '/images/hero/100.webp',
  services: '/images/hero/101.webp',
  gallery: '/images/hero/102.webp',
  about: '/images/hero/103.webp',
  contact: '/images/hero/104.webp',
}

const moodGradient: Record<Mood, string> = {
  home: 'from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent',
  services: 'from-[#0a0a0a] via-[#0a0a0a]/55 to-[#1a0f05]/40',
  gallery: 'from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0d0a14]/50',
  about: 'from-[#0a0a0a] via-[#0a0a0a]/65 to-[#12060c]/50',
  contact: 'from-[#0a0a0a] via-[#0a0a0a]/70 to-[#05050a]/60',
}

// Every hero photo is a tall portrait shot. On short/wide desktop viewports
// object-cover crops top/bottom, so the vertical focal point matters most.
// On narrow/tall mobile viewports it crops left/right instead, so the
// horizontal focal point matters most. Each image's tattoo sits in a
// different spot on the body, so each mood gets its own tuned position
// per breakpoint rather than one shared object-position for every hero.
const moodPosition: Record<Mood, string> = {
  // tribal forearm sleeve runs through the vertical center of frame, lower-middle
  home: 'object-[47%_58%] sm:object-[48%_54%] md:object-[48%_50%] lg:object-[48%_48%]',
  // geometric forearm armband sits centered, upper-middle of frame
  services: 'object-[47%_40%] sm:object-[47%_36%] md:object-[47%_32%]',
  // kanji forearm piece sits slightly right of center, upper-middle of frame
  gallery: 'object-[55%_44%] sm:object-[54%_40%] md:object-[53%_36%]',
  // snake collarbone piece sits left of center, mid frame
  about: 'object-[38%_54%] sm:object-[39%_50%] md:object-[40%_46%]',
  // batman chest piece sits centered, lower-middle of frame
  contact: 'object-[48%_60%] sm:object-[48%_56%] md:object-[48%_52%]',
}

export type Mood = 'home' | 'services' | 'gallery' | 'about' | 'contact'

/**
 * The living-ink backdrop persists behind every page: a real tattoo
 * photograph kept crisp and in sharp focus at the center of frame, as if
 * lit by one warm key light — never a fantasy or generated effect on the
 * skin itself. The edges fall into a soft photographic depth-of-field
 * blur so the eye lands on the real photo, not on texture. Each mood
 * swaps in its own real photo and grading so the deeper a visitor
 * travels into the site, the closer and lower-key the light gets.
 */
export function InkBackdrop({
  mood,
  intensity = 'full',
  className,
}: {
  mood: Mood
  intensity?: 'full' | 'muted'
  className?: string
}) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {/* sharp, in-focus base photo */}
      <div
        className={cn(
          'absolute inset-0 breathing-scale',
          intensity === 'muted' && 'opacity-70 scale-105'
        )}
      >
        <Image
          src={moodImage[mood]}
          alt="Finished tattoo work from the studio"
          fill
          priority={intensity === 'full'}
          className={cn('object-cover', moodPosition[mood])}
          sizes="100vw"
        />
      </div>

      {/* duplicate layer, blurred and masked to only the edges — a real depth-of-field falloff.
          Quality is lowered here since the blur filter makes the extra detail imperceptible,
          which meaningfully cuts the bytes for this second copy of the same photo. */}
      <div
        className="absolute inset-0 scale-110"
        style={{
          maskImage:
            'radial-gradient(ellipse 60% 55% at 50% 45%, transparent 55%, black 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 55% at 50% 45%, transparent 55%, black 100%)',
        }}
      >
        <Image
          src={moodImage[mood]}
          alt=""
          fill
          quality={30}
          priority={intensity === 'full'}
          className={cn('object-cover blur-md', moodPosition[mood])}
          sizes="100vw"
        />
      </div>

      <div className={cn('absolute inset-0 bg-gradient-to-t', moodGradient[mood])} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/85 via-[#0a0a0a]/10 to-transparent" />
      <div className="vignette absolute inset-0" />
    </div>
  )
}
