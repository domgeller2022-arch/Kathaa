# Kathaa · kathaa.com.au — build plan for approval

## What gets built

The public marketing site for Kathaa (कथा), following the brief's Prompts 1–7 in one pass rather than one prompt per message. Front end only. No backend, database, accounts, payments, checkout or ticketing logic. The result is a static site that can be pushed to GitHub and deployed on Cloudflare Pages.

Pages: Home · /chapter-one · /our-story · /privacy · /terms · 404. No /partner page.

### Home, in order
- **Prologue** — कथा monumental, KATHAA in small caps beneath (≈1/6 height), tagline *Stories, told live.* Load animation: shirorekha draws left→right in gold, letters fade up beneath it, the ा stroke drops and becomes the scroll thread, KATHAA tightens from 0.8em to 0.35em letterspacing. Under 2.5s, once per session, skippable by scrolling. Minimal nav: Chapter One · Our Story · Partnerships (outbound) · Join the list; full-screen ink menu on mobile.
- **I · The Premise** — eyebrow "A new initiative from Pravaha House"; manifesto revealed line by line (unread at 15% opacity).
- **II · Now Showing — Chapter One** — behind a `published` flag. Year counter rewinds 2026 → 2001 → "2000s" with the Chrome Dusk sheen (used only here). Eyebrow "Kathaa Live presents · Chapter One", title placeholder "The 2000s, Retold", "Friday 11 December 2026 · An evening on Sydney Harbour". [EVENT HERO MEDIA] slot (image or muted looping video with poster) + [MEDIA CAPTION]. Artist block behind `artistRevealed` (silhouette + "The voice of a decade. Revealing soon." when false). CTA switches between "Join the list / Tickets open soon." and "Get tickets →" based on TICKET_URL.
- **III · How a Kathaa evening unfolds** — pinned horizontal scroll on desktop through The Arrival / The Telling / The Performance / The Afterword; vertical on mobile.
- **IV · The Kathaa Standard** — ivory "page" section, asymmetric editorial layout.
- **V · The Chapters** — Chapter One card (or "coming soon" when unpublished) beside the blank ivory page *Chapter Two — not yet written.*
- **VI · Partnerships** — one-line teaser + "Partner with Pravaha House →" to PARTNER_URL.
- **VII · Join the list** — first name, email, required unticked consent checkbox, success state; posts to FORM_ENDPOINT (empty, TODO).
- **Epilogue** — small logo, "Kathaa is an initiative of Pravaha House Pty Ltd · ACN 702 078 804", Instagram, Facebook (hidden while empty), contact email, Partnerships, Privacy, Terms, Acknowledgement of Country.

### /chapter-one (wrapped in `published`)
Hero with Chrome Dusk title · The story (with a self-drawing gold SVG cassette-and-pencil) · The artist (portrait, name, story, optional quote, empty [AUDIO CLIP] slot) · On the water gallery (6 image slots + 1 video slot, default "Artist's impression" caption, gentle parallax desktop only) · The evening details list (Arrive by 6:40pm emphasised in gold; boarding, departure, food as placeholders) · Know before you go panel · FAQ accordion · Join the list / Get tickets, Share on WhatsApp, Add to calendar (.ics, Fri 11 Dec 2026 6:40–11:00pm Sydney).

### /our-story
कथा large → "Kathaa means story." · The held note (ा highlighted in gold, stroke extends into the thread) · Pravaha House paragraph · Why we started as a [FOUNDERS' STORY] pull quote · closes with a Chapter One link and the list form. No names, photos or bios.

### /privacy, /terms, 404
Readable text pages with [PRIVACY POLICY TEXT] / [TERMS TEXT] placeholders and a desktop table of contents. 404: "This page hasn't been written yet." on a blank ivory page with the thread and "Back to the beginning".

## Signature system (as specified in the brief)
- **The thread**: 1px gold scroll-progress line, left margin ~48px desktop / centred mobile, 70% drawn / 12% undrawn, 7px nodes at each chapter, roman numerals in Cormorant Garamond italic, Sindoor red.
- Fonts: Rozha One (Devanagari, `lang="ne"`, Noto Serif Devanagari fallback), Cormorant SC, Cormorant Garamond 300 + italic, Instrument Sans. No Inter.
- Colours: Harbour Ink, Deep Tide, Ivory Page, Lamp Gold, Sindoor, Smoke. ~3% film grain overlay.
- Motion: Lenis smooth scroll + GSAP ScrollTrigger/SplitText; easing cubic-bezier(0.22,1,0.36,1), 0.8–1.4s; reveals once at ~20% viewport; `prefers-reduced-motion` disables smooth scroll, pinning and counters. Gold link underline draw, left→right gold button fill, gold dot cursor on desktop only.
- Single `<LogoMark />` placeholder component for a one-file logo swap later.
- All settable values in one config file: CONTACT_EMAIL, PARTNER_URL, TICKET_URL, FORM_ENDPOINT, INSTAGRAM_URL, FACEBOOK_URL, `published`, `artistRevealed`, chapter title, artist placeholders.

## Content rules enforced
Nowhere on the site: yacht, party, charity, fundraiser, donation, flood relief, percentages, the vessel or operator name, Opera House, Harbour Bridge, route promises, prices or tiers, food/drink packages, VIP inclusions, boarding wharf, an ABN, Chitra Live / Hasya Live, any checkout or payment. Placeholders stay in square brackets. Where an image will go: a labelled empty frame, no stock photos.

## Decisions taken as assumptions (push back on any)

1. **Tagline: "Stories, told live."** — the brief's recommended option. One-line change later.
2. **Chapter One title placeholder: "The 2000s, Retold"** — the brief's preview text; `[CHAPTER ONE TITLE]` stays a single config value.
3. **Preview shows Chapter One.** `published` and `artistRevealed` are both set to **true in the preview** so the whole event section and page can be reviewed. Both must be flipped to **false before the brand-only launch** (until Inception's written approval). The brief's default is false; this is reversed only for review.
4. **Build tooling.** The environment's React app is used (Create React App, not Vite). It still builds to a static folder — the build command is `yarn build` and the output directory is **`build/`** (not `dist/`) for Cloudflare Pages. The template's backend and database are left untouched and unused; the finishing pass on GitHub removes them.
5. **Config values at build time:** CONTACT_EMAIL = admin@pravahahouse.com.au · PARTNER_URL = mailto:admin@pravahahouse.com.au?subject=Partnership%20enquiry · TICKET_URL = "" · FORM_ENDPOINT = "" · INSTAGRAM_URL = "" (placeholder until supplied) · FACEBOOK_URL = "" (hidden).
6. **Acknowledgement of Country** is included in the footer (brief marks it FOR DISCUSSION — easy to remove).
7. **Not built now**, per the brief's "further suggestions": playlist embed, countdown, Journal page, Tell-us-your-story page, analytics, Meta pixel, GitHub push (Prompt 8 — done as a separate step when you're happy with the preview).
8. **Copy** is used verbatim from the brief; no marketing copy invented beyond it.

## What you get back
A live preview URL to review on your phone first, then desktop, plus a list of every `[PLACEHOLDER]` still in the site so you can track them.
