# des3 — Kathaa colour system and fixes

Branched from `main`. Answers "make it fun, creative, simple yet sophisticated"
without loosening anything in the brand brief.

## The premise

`des2` read "more vibrant" as "more bright" and raised the background lightness.
Brightness is not vibrancy. Both `main` and `des2` carry only two chromatic
colours (gold, sindoor), and sindoor appears at roughly 2% coverage — so the
site is effectively monochrome ivory-on-navy whatever the background does.
Vibrancy comes from chromatic *range*, and sophistication comes from the
discipline with which that range is spent.

## The ramp — navy-green to off-white

Superseded 22 Sep: the single-green ramp only travelled L* 10 → 33 across
the dark half, which is why it read as nothing happening. The page now
sweeps **hue as well as brightness** — navy-green at the masthead, through
navy blue, into off-white at the invitation.

Solved rather than eyeballed, against three constraints at once:
lightness rises at every section; every stop clears AA for body, secondary
AND accent; each section's gradient ends on the next one's start colour.

| section | ground | L* | type |
| --- | --- | --- | --- |
| Hero | `#08201e` | 10 | ivory |
| I Premise | `#08201e → #0f373e` | 10 → 21 | ivory |
| II Now Showing | `#0f373e → #1a4e67` | 21 → 31 | ivory |
| III Unfolds | `#1a4e67 → #215e8c` | 31 → 38 | ivory |
| IV The Standard | `#215e8c → #296ba5` | 38 → 44 | ivory |
| V The Chapters | `#5b8bae → #84a5ba` | 56 → 66 | near-black |
| VI Partnerships | `#84a5ba → #afc1cc` | 66 → 77 | near-black |
| VII Join the list | `#afc1cc → #cfd8dd` | 77 → 86 | near-black |
| Footer | `#cfd8dd → #eef2f3` | 86 → 95 | near-black |

**The one discontinuity, and why it has to be there.** Around L* 45–55 no
text colour works: ivory falls below AA above ~45, near-black falls below
it under ~53. The ramp crosses that band in a single move at the IV/V
boundary — 12 L*, the same size as the steps either side of it, so the
ground reads as continuing while the type flips once.

On the light tier, body, secondary and accent are all near-black
(`#0b1218` / `#12202a` / `#05202f`). Anything greyer fails against the top
of V. Secondary text differentiates by size and weight there, not by
lightness.

## The thread carries the palette

The brand's one signature now also carries its colour: the drawn line runs
through the chapter hues as it descends. The palette is therefore *structural*,
not applied — one element, the whole system, which is what §2.3 of the brief
asks for ("one signature, used with discipline").

`Thread.jsx` switched from `transform: scaleY()` to `clip-path: inset()`, so the
gradient no longer stretches with the fill.

## Fixes carried in

- **Shirorekha.** Rozha One draws its own headline stroke into the glyphs; the
  gold line sat ~10px below it at display size, so the masthead showed two
  parallel strokes out of register. Now sized and placed to land exactly on the
  glyph bar, above it in z-order, so the gold *becomes* the shirorekha and the
  letters hang from it — §5.1's animation, as written.
- **Mobile thread.** Was at 50%, running through कथा, through the H of KATHAA
  and through the tagline. Moved to a 20px left margin. Most visitors arrive
  from Facebook, Instagram and WhatsApp on a phone, so this was the first thing
  most people saw.
- **Density.** The manifesto ran at 28ch in a 1440px viewport, leaving ~45% of
  the screen empty — unfinished rather than unhurried. Widened to 34ch.
- **Unreached words** in the manifesto went from 0.15 to 0.22 opacity: still
  unlit, but legible if someone lands mid-section or stops scrolling.

## Kept from des2

- The **bilingual eyebrow** — the best idea in either branch. Now Sanskrit
  (`lang="sa"`), per your call, all strings in `src/config/eyebrows.js`.
  Set at 1.45rem, not 1.1rem: Rozha One is a display face and its matras
  dissolve below ~1.3rem.
- The **two-column Join the list** layout.

## Dropped from des2

- **The gold ticker.** It sat directly beneath "Details that don't shout",
  competed with the thread for the role of signature, hard-baked a tagline
  still marked `FOR DISCUSSION`, and — being full-bleed — collided with the
  fixed thread rail, rendering numeral IV at 2.65:1 over gold.
- **The hero ellipse.** An orbit means nothing in a system about threads and
  held vowels; on mobile its dot landed inside the क.
- **The red sentence and red submit button.** §2 scopes sindoor to "rare
  accent… never loud". Red at 4.37:1 on ivory is also under AA for normal text.
- **framer-motion.** ~38kB gzipped for one component, and a second animation
  system in a page that already ships GSAP. The eyebrow is now GSAP, matching
  every other reveal. Bundle: 135.6kB vs main's 134.8kB.

## Still open — not design

- `config/site.js` ships `published = true` and `artistRevealed = true`, above
  a comment saying both must be false before written approval. Clause 13 needs
  written approval from info@inceptioncruises.com.au first. Left as-is on this
  branch **so the Chapter One work is reviewable** — flip both before deploy.
- `package.json` depends on two tarballs from `assets.emergent.sh`. A clean
  `npm install` fails on them; Cloudflare Pages will too. Remove at export.
- All 46 `components/ui/*` are imported by nothing. `backend/` is unused.
