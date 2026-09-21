# Kathaa · kathaa.com.au — PRD

## Original problem statement
Build the public marketing website for Kathaa (कथा), a Sydney live-events brand from Pravaha House Pty Ltd, following the "Kathaa · Website & Brand Brief" (21 Sep 2026): a front-end-only, static-deployable site (Cloudflare Pages) structured like a book (Prologue, chapters I–VII, Epilogue), with a gold "thread" scroll-progress line as the signature device, Rozha One / Cormorant / Instrument Sans typography, the Harbour Ink palette, Lenis + GSAP motion, and strict content rules (no yacht/party/charity/fundraiser/donation, no vessel name, no Opera House/Harbour Bridge, no prices, no ABN, no checkout).

## Architecture
- React (CRA + craco) front end only. `yarn build` → static `build/` directory (Cloudflare Pages: build command `yarn build`, output `build`).
- Template backend/MongoDB left untouched and unused (to be removed in the GitHub finishing pass).
- Motion: `lenis` (lerp 0.08) + `gsap` (ScrollTrigger, CustomEase `cubic-bezier(0.22,1,0.36,1)`). `prefers-reduced-motion` disables Lenis, pinning, counters and reduces reveals to fades.
- Config: `src/config/site.js` — CONTACT_EMAIL, PARTNER_URL, TICKET_URL, FORM_ENDPOINT, INSTAGRAM_URL, FACEBOOK_URL, `published`, `artistRevealed`, chapterOne (title, date, media, artist, evening details, gallery).
- Logo: single `<LogoMark />` placeholder (`src/components/LogoMark.jsx`) for a one-file swap.

## Pages
Home · /chapter-one · /our-story · /privacy · /terms · 404. No /partner page (links out via PARTNER_URL).

## Implemented — 21 Sep 2026
- Prologue: कथा masthead, load animation (shirorekha draws, letters hang, drop line becomes the thread, KATHAA letterspacing tightens), once per session, skippable.
- The thread: fixed 1px gold scroll line (70%/12%), 7px chapter nodes, sindoor roman numerals (desktop), piecewise progress so the line reaches each node as its chapter is reached.
- I Premise (word-by-word scrub reveal) · II Now Showing (year rewind 2026→2000s with Chrome Dusk sheen, media + artist slots, ticket CTA logic) · III Unfolds (pinned horizontal on desktop, vertical on mobile) · IV Standard (ivory page) · V Chapters · VI Partnerships · VII Join the list (consent checkbox, success state, FORM_ENDPOINT TODO) · Epilogue footer.
- Chapter One page: Chrome Dusk hero, story + self-drawing cassette SVG, artist block, 6+1 gallery slots with parallax, evening details, Know-before-you-go panel, FAQ accordion, WhatsApp share, .ics download.
- Our Story: held-note animation (ा highlighted in gold, stroke extends into the thread), Pravaha House, founders' placeholder.
- Privacy/Terms with desktop TOC; 404 ivory page.
- Custom gold cursor (fine pointer only), film grain, gold link underline draw, left→right button fill.
- SEO: page titles/descriptions, OG/Twitter tags, placeholder og-image.png, favicon.svg.

## Preview flags
`published = true`, `artistRevealed = true` for review. Both must be `false` before the brand-only launch (pending Inception written approval).

## Placeholders still in the site
[CHAPTER ONE TITLE] (preview "The 2000s, Retold") · [EVENT HERO MEDIA] · [MEDIA CAPTION] · [ARTIST PORTRAIT] · [ARTIST NAME] · [ARTIST LINE] · [ARTIST STORY] · [ARTIST QUOTE] · [AUDIO CLIP] · [VESSEL IMAGE 1–6] · [EVENT VIDEO] · [BOARDING TIME] · [DEPARTURE LOCATION] · [FOOD DETAILS] · [FOUNDERS' STORY] · [PRIVACY POLICY TEXT] · [TERMS TEXT] · [DATE] (last updated) · [INSTAGRAM URL] · [FACEBOOK URL] · FORM_ENDPOINT · TICKET_URL · og-image.png · kathaa-logo.svg.

## Backlog
- P0: Push to GitHub (Prompt 8); remove template backend in finishing pass; wire FORM_ENDPOINT (A-75); final logo SVG (A-72).
- P1: Tagline/title decisions (A-71); real OG image; approved vessel media; artist content.
- P2: Countdown, playlist embed, Journal page, Tell-us-your-story page, Cloudflare Web Analytics, full Nepali version.
