# Optimization & Bug Fix Notes

Summary of the debugging and performance work done in this session, kept here for reference since none of this is otherwise documented in the codebase.

## Bugs fixed

### 1. Mobile menu / gallery lightbox let the background scroll behind them

`components/layout/navbar.tsx` (mobile menu) and `components/gallery/lightbox.tsx` locked
scroll with only `document.documentElement.style.overflow = 'hidden'`. That doesn't reliably
block background touch-scroll on iOS Safari, and it never paused the Lenis smooth-scroll
instance (`components/layout/smooth-scroll-provider.tsx`), which kept its own scroll loop
running underneath the "locked" overlay. Result: the hero background could keep moving behind
the mobile menu / lightbox while they were open.

**Fix:** added `hooks/use-scroll-lock.ts`, a shared hook that pins `body` with
`position: fixed` (preserving the scroll offset) and pauses/resumes Lenis via two new exports,
`pauseSmoothScroll` / `resumeSmoothScroll`, added to `smooth-scroll-provider.tsx`. Both the
navbar menu and the lightbox now use this hook instead of the old duplicated overflow toggle.

Verified live: opened the lightbox, confirmed `body` became `position: fixed` with the scroll
offset preserved, confirmed wheel/scroll input did nothing to the background while open, then
closed it and confirmed scroll position and styles were restored exactly. Same check repeated
on the mobile menu.

### 2. `next/image` `quality` config warning (Next.js 16 breaking change)

Next.js 16 changed the default for `images.qualities` from "allow any value" to `[75]` only.
`components/realm/ink-backdrop.tsx` uses `quality={30}` for the blurred hero duplicate layer,
which was outside that allowed list and got silently coerced/flagged on every page load.

**Fix:** added `qualities: [30, 75]` to the `images` block in `next.config.mjs`.

## Environment issue resolved (not a code bug)

`/services`, `/gallery`, `/about-us`, and `/contact` were returning server-side 404s on a
long-running `next dev` process, even though the route files exist on disk and are correct.
Root cause: a stale Turbopack dev-server cache. Fixed by stopping that process, clearing
`.next/`, and restarting. If this recurs: `rm -rf .next` then restart the dev server.

## Performance verification

Built the actual production static export (`next build` → `out/`), served it standalone, and
ran real Lighthouse audits (not estimates) with simulated throttling:

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Mobile  | 100 | 100 | 96 | 100 |
| Desktop | 100 | 100 | 96 | 100 |

Mobile: FCP 0.8s, LCP 1.4s, TBT 40ms, CLS 0, Speed Index 0.8s.

The only thing capping Best Practices at 96 (both): `@vercel/analytics` requests
`/_vercel/insights/script.js`, which only resolves on Vercel's own edge infrastructure — it
404s (and logs a console error) on any other host, including the local static server used for
this test. Not changed, since this is deployment-platform-dependent and deployment is handled
by someone else.

## Investigated, no fix needed

- **Search feature:** the original bug report mentioned a broken "search feature," but no
  search bar/input/logic exists anywhere in this codebase. Flagged to the user; not acted on.
- **Z-index stacking:** mapped every `z-*` layer in the app (floating actions 50 → film grain
  60 → header 65 → custom cursor 70 → route transition 80 → mobile menu 90 → lightbox 95). No
  collisions found — the scroll-lock bug above was the actual cause of the reported "menu
  collision" symptom.
- **Image weight:** 96 images, 8.7MB total, already WebP at sensible dimensions (640–1280px).
  Not a significant contributor to the performance score.

## Known follow-ups (not acted on — need a decision, not a quick fix)

- `components/home/final-cta.tsx` renders a `<div className="ember-drift" ...>` for a glow
  effect, but no `.ember-drift` CSS class is defined anywhere in the codebase — it's dead
  markup rendering nothing. Left alone since restoring the intended visual effect is a design
  decision, not a bug fix.
- `InkBackdrop` (`components/realm/ink-backdrop.tsx`) loads the same hero photo twice per page
  (sharp layer + blurred duplicate for the depth-of-field edge). Since `images.unoptimized:
  true` is required for static export, the `quality` prop has no effect on bytes served —
  both copies download at full size. A real fix means pre-generating an actual smaller/blurred
  asset at build time, which changes the visual pipeline, so it wasn't done without sign-off.
