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

## Lamplight on dark water

The ground stays Harbour Ink. Each chapter owns ONE pigment, which appears in
exactly four places — its numeral, its Devanagari eyebrow, its hairline rules,
and a soft wash behind it. Never in body copy. Never as a background fill.

So at any one scroll position you see one accent, plus gold, plus ivory: simple
in the moment, rich across the journey. That is the whole idea.

| Token | Hex | Drawn from | On ink | On ivory (`-deep`) |
| --- | --- | --- | --- | --- |
| `--marigold` | `#e8a24a` | सयपत्री, the strung flower | 8.65:1 | 4.98:1 |
| `--laligurans` | `#e0658c` | लालीगुराँस, Nepal's rhododendron | 5.71:1 | 5.72:1 |
| `--violet` | `#a78be8` | the blue hour | 6.69:1 | 6.65:1 |
| `--teal` | `#4fc3b8` | harbour water after dark | 8.76:1 | 5.35:1 |
| `--gold` | `#c6a15b` | unchanged — the thread | 7.71:1 | 5.23:1 |

Every pair clears WCAG 2.2 AA at small text sizes. Ivory body copy over the
strongest wash still measures 13.4:1.

Chapter order is an evening: gold → marigold → laligurans → blue hour → night
water. Sections already carried `data-chapter`, so the hue cascades in CSS with
no component changes.

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
