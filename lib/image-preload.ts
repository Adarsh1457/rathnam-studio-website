// Shared image preloading utilities. Every background preload in the app
// goes through this module so the same URL is never requested twice, and
// so preloading can be skipped entirely on slow/data-saver connections.

const preloaded = new Set<string>()

function isSlowConnection() {
  if (typeof navigator === 'undefined') return false
  const connection = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection
  if (!connection) return false
  if (connection.saveData) return true
  return connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'
}

/** Warms the browser's image cache for a single URL, at most once. */
export function preloadImage(src: string) {
  if (!src || typeof window === 'undefined' || preloaded.has(src)) return
  preloaded.add(src)
  const img = new window.Image()
  img.decoding = 'async'
  img.src = src
}

/** Warms the cache for a batch of URLs immediately. */
export function preloadImages(srcs: readonly string[]) {
  srcs.forEach(preloadImage)
}

/**
 * Preloads a list of URLs in small chunks spread across idle time, so a
 * larger batch (e.g. an image gallery or the next likely page) never
 * competes with the current page's own render or an in-flight
 * higher-priority request. Skips entirely on data-saver / very slow
 * connections so mobile users on poor networks aren't penalized.
 */
export function preloadImagesIdle(srcs: readonly string[], chunkSize = 4) {
  if (typeof window === 'undefined' || isSlowConnection()) return
  const queue = srcs.filter((src) => src && !preloaded.has(src))
  if (!queue.length) return

  const schedule: (cb: () => void) => void =
    'requestIdleCallback' in window
      ? (cb) => (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void }).requestIdleCallback(cb, { timeout: 2000 })
      : (cb) => window.setTimeout(cb, 200)

  function step() {
    const chunk = queue.splice(0, chunkSize)
    preloadImages(chunk)
    if (queue.length) schedule(step)
  }
  schedule(step)
}
