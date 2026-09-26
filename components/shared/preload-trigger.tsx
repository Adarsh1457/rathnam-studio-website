'use client'

import { usePreloadOnApproach } from '@/hooks/use-preload-on-approach'

/**
 * Invisible, zero-size marker. Drop it near the top of a section and pass
 * it the NEXT section's image URLs — once this marker approaches the
 * viewport (while the current section is still on screen), those images
 * silently preload in the background ahead of the user reaching them.
 */
export function PreloadTrigger({
  images,
  rootMargin,
}: {
  images: readonly string[]
  rootMargin?: string
}) {
  const ref = usePreloadOnApproach(images, rootMargin)
  return <div ref={ref} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-px w-px" />
}
