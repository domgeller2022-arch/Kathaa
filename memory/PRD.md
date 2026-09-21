# Kathaa · kathaa.com.au — PRD

## Original problem statement
Build the public marketing website for Kathaa (कथा), a Sydney live-events brand from Pravaha House Pty Ltd, following the "Kathaa · Website & Brand Brief" (21 Sep 2026): a front-end-only, static-deployable site (Cloudflare Pages) structured like a book (Prologue, chapters I–VII, Epilogue), with a gold "thread" scroll-progress line as the signature device, Rozha One / Cormorant / Instrument Sans typography, the Harbour Ink palette, Lenis + GSAP motion, and strict content rules (no yacht/party/charity/fundraiser/donation, no vessel name, no Opera House/Harbour Bridge, no prices, no ABN, no checkout).

## Architecture
- React (CRA + craco) front end only. `yarn build` → static `build/` directory (Cloudflare Pages: build command `yarn build`, output `build`).
- Template backend/MongoDB left untouched and unused (to be removed in the GitHub finishing pass).
- Motion: `lenis` (lerp 0.08) + `gsap` (ScrollTrigger, CustomEase `cubic-bezier(0.22,1,0.36,1)`) + existing `framer-motion` 11.18.0, now used for bilingual eyebrows and hero parallax. CSS editorial marquee has pause/play. `prefers-reduced-motion` disables Lenis, pinning, counters, marquee and hero parallax; headings remain visible.
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

## Latest enhancement — July 2026
### User request
“Bilingual Eyebrows: Give each chapter heading a small Devanagari eyebrow above the English, like the masthead does. also lets change the design language a little bit. make the website bit more vibrant. more bright.” User asked to implement directly without clarification.

### Completed
- Added reusable `BilingualEyebrow` in `components/ChapterHead.jsx`: small Rozha One text with `lang="ne"`, animated gold rule and optional English subtitle. All shared chapter headings on Home, Chapter One and Our Story now have specific Nepali eyebrows, including premise, Now Showing, Chapter One hero/card, signup, and all four Unfolds panels. English content and roman chapter numerals preserved.
- Brightened the palette to dusk ink #121a2d, tide #1a2744, ivory #f7f2e8, sunlit #fdfbf7, solar gold #e5b869 and sindoor #d13824. Home premise/Standard and internal story sections are now ivory; signup and FAQ are sunlit; Unfolds alternates light and dark panels. Dark footer and hero preserve the editorial identity. Updated form, checkbox, caption, artist-name, cassette and FAQ contrast for light surfaces.
- Added restrained Framer Motion masthead parallax and gold/teal orbit lines, small Sydney/live-experiences hero metadata, gold editorial marquee with accessible pause/play, responsive two-column signup and chapter-card hover movement. Reduced-motion disables movement appropriately.
- Corrected Framer Motion scroll-root measurement warning using positioned html root. ChapterOne's two ShareRow instances now have unique test IDs (bottom copy gets `-bottom`). Fixed hero label collision at 320–359px by vertically offsetting the scroll cue.
- No backend, auth, external integrations, publishing flags, approved imagery, content configuration or form submission logic changed. Unused backend removal remains unapproved and was NOT performed. Framer Motion was already installed, so no dependency installation was needed.

### Validation
- Final production `yarn build` passed after all fixes (179.79 kB gzipped JS, 14.61 kB CSS); frontend smoke test passed.
- `/app/test_reports/iteration_2.json`: all bilingual headings, brighter surfaces, desktop 1440 / mobile 390 layouts, horizontal/vertical Unfolds, marquee pause, navigation, FAQ, calendar and MOCK signup passed.
- `/app/test_reports/iteration_3.json`: Framer warning and duplicate-ID fixes passed; reduced-motion explicitly verified; 320px forms/headings/no-overflow passed. Found one hero-label overlap.
- `/app/test_reports/iteration_4.json`: final overlap correction passed at 320, 359 and 390px. No remaining user-facing issues reported.
- Public frontend: no test accounts or credentials are needed. Signup remains MOCKED (empty FORM_ENDPOINT, no saved submissions); ticketing and artist/media assets remain placeholders.

## Prioritized backlog / next tasks
- P0: Connect chosen signup provider via FORM_ENDPOINT (A-75); actual ticket URL when ready. No provider chosen yet.
- P0: GitHub upload remains a user platform action; unused template backend cleanup awaits explicit permission. Keep this site frontend-only for Cloudflare Pages.
- P0 before brand-only launch: confirm written approval or turn preview `published` and `artistRevealed` flags off. Current flags intentionally unchanged.
- P1: Final logo SVG (A-72); approved event/artist media and audio; final chapter title/tagline (A-71), event details and founders/legal copy.
- P1: Real Open Graph share image; sitemap and robots.txt; mobile accessibility/performance pass targeting Lighthouse 90+.
- P2: Remaining earlier motion ambition: true masked line-by-line heading reveals (existing GSAP word reveals remain); optional deeper 3D treatment beyond current hero parallax.
- P2: Countdown, playlist embed, Journal page, Tell-us-your-story page, Cloudflare Web Analytics and full Nepali version.
- Optional enhancement: a compact clickable chapter index that complements the bilingual headings and existing thread progress.
