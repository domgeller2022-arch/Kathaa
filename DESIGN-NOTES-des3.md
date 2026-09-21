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

## One family, one direction

Superseded 22 Sep: the four-hue chapter palette (marigold / laligurans /
violet / teal) is gone. Jumping between unrelated hues page to page read as
discord rather than progression.

The page now runs a single **luminance ramp in one blue-green family**. It
starts at deep navy-green behind the masthead and lightens as you scroll,
turning into the light at The Kathaa Standard and arriving near-white at the
invitation. Each section's gradient *ends on the next section's start
colour*, so adjacent sections meet seamlessly whatever their heights — and
section heights vary a lot here, with a 150vh rewind stage and a pinned
horizontal scroll.

| | ground | type | secondary |
| --- | --- | --- | --- |
| Hero | `#08201e` | ivory | — |
| I Premise | `#08201e → #0c2825` | ivory 14.3–13.2:1 | `#9fb5b1` 7.9–7.2:1 |
| II Now Showing | `#0c2825 → #123430` | ivory 13.2–11.4:1 | 7.2–6.2:1 |
| III Unfolds | `#123430 → #1a433d` | ivory 11.4–9.3:1 | 6.2–5.1:1 |
| IV The Standard | `#dce8e5 → #e2ece9` | ink 14.2–14.8:1 | `#4c5f5b` 5.4–5.6:1 |
| V The Chapters | `#e2ece9 → #e9f2f0` | ink 14.8–15.6:1 | 5.6–6.0:1 |
| VI Partnerships | `#e9f2f0 → #eff6f4` | ink 15.6–16.2:1 | 6.0–6.2:1 |
| VII Join the list | `#eff6f4 → #f7fbfa` | ink 16.2–17.1:1 | 6.2–6.5:1 |
| Footer | `#f7fbfa` | ink | 6.5:1 |

**Why the turn is a step, not a fade.** Mid-luminance greens around
`#2a5a53` fail *both* ivory (6.6:1, and 3.4:1 for secondary) and ink
(2.4:1) — there is no readable text colour there. So the ramp steps over
that zone in one move, at the III/IV boundary, where it reads as the story
turning into the light rather than as a glitch. Everywhere else the change
is continuous.

Accents follow the half: `--mint #7fd4c9` on the dark (9.8:1 at the top),
`--teal-deep #0e5b55` on the light (6.3:1 at the turn).

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
