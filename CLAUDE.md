# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project overview

This repository contains the Polish single-page landing site for **Akademia AI
– Textilimpex**, a 64-hour AI training program for business owners, managers,
and leaders. Its primary conversion is an external registration form.

The site is deliberately dependency-free: plain HTML, CSS, and JavaScript,
with no framework, package manager, bundler, or automated test suite. Do not
change that architecture unless the user explicitly requests it.

## Repository map

```text
index.html                    semantic markup, copy, SEO, prices and summary dates
styles.css                    all styling, responsive rules and CSS animation
main.js                       all interactions and detailed schedule data
build.js                      dependency-free asset cache-busting script
assets/                       responsive images, logo, icons and social preview
site.webmanifest              installable-site metadata and icons
robots.txt                    crawler directives
.github/workflows/static.yml  GitHub Pages deployment
README.md                     project documentation in Polish
AGENTS.md                     canonical working rules for AI agents in Polish
```

Read `AGENTS.md` before making changes. It is the canonical agent instruction
file; keep this file aligned with it.

## Runtime behavior

`main.js` initializes six features:

- the eight-module program accordion,
- schedule filters and a native `<dialog>` with generated month calendars,
- `IntersectionObserver`-based reveal effects,
- animated hero counters,
- scroll state for the navigation, progress bar, and back-to-top button,
- custom smooth scrolling for navigation links.

Motion code respects `prefers-reduced-motion`. Schedule dialog focus returns to
the tile that opened it.

## Content sources of truth

- General copy, program, pricing, contacts, CTA links, edition tiles, and the
  “Najbliższy start” card are in `index.html`.
- Full edition dates, recruitment deadlines, attendance mode, hours, calendar
  days, and dialog notes are in `scheduleEditions` at the top of `main.js`.
- Visual tokens, component rules, breakpoints, and motion are in `styles.css`.
- Canonical, Open Graph, Twitter, favicon, manifest, and font declarations are
  in the `<head>` of `index.html`.

Summary start dates intentionally appear in `index.html` while detailed
schedules live in `main.js`. Update both whenever an edition changes. Pricing
and subsidy claims also occur in several page sections and SEO metadata; search
the repository and keep every occurrence consistent.

Current facts that must not drift accidentally:

- 8 modules and 64 clock hours,
- base price: PLN 6,400,
- individual contribution: PLN 448 at 93% subsidy, with no surcharge,
- company/employee contribution: PLN 960 at 85% subsidy,
- subsidy: up to 93% for an individual and 85% for a company/employee,
- venue: Textilimpex Sp. z o.o., ul. Traugutta 25, Łódź,
- five on-site or hybrid editions from October 2026 through January 2027,
- instructor: Szymon Kapturkiewicz.

## Implementation constraints

- Keep all user-facing copy in Polish.
- Keep CSS in `styles.css` and JavaScript in `main.js`; do not add inline styles
  or scripts to `index.html`.
- Reuse the existing semantic markup, class naming, and CSS custom properties.
- Preserve the navy/orange B2B visual identity.
- Do not add dependencies or build tooling for work that plain browser APIs can
  handle.
- Keep the classic deferred script setup; this project does not use JS modules.
- Do not wrap imports or scripts in `try/catch`.
- Do not manually add `?v=...` query strings to local assets.

For section imagery, preserve the AVIF/WebP/JPG `<picture>` fallback sets. Use
meaningful `alt` text for informative images and empty alternatives for purely
decorative imagery.

Accessibility is a release requirement: maintain keyboard operation, visible
focus, correct ARIA state, dialog focus restoration, and reduced-motion
behavior.

## Local development and verification

Serve the repository root:

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`. After every change run:

```bash
git diff --check
```

For visual or behavioral changes, test desktop and mobile viewports and verify
the accordion, schedule filters, dialog (including Escape and backdrop close),
CTA links, custom scrolling, back-to-top behavior, keyboard focus, and reduced
motion. Capture a screenshot when the environment supports it.

## Cache-busting and deployment

`build.js` rewrites local references in `index.html` and `styles.css`, adding a
10-character SHA-256 content hash to `styles.css`, `main.js`, and files below
`assets/`. It handles HTML `href`/`src`/`srcset` attributes and CSS `url(...)`
and replaces an existing generated version parameter.

Do not run it in the normal working tree merely to validate changes: it edits
tracked source files. GitHub Actions runs it on a fresh checkout before upload,
so committed sources must remain free of generated `?v=...` values.

Pushes to `main` and manual workflow dispatches run
`.github/workflows/static.yml`, which configures Pages, versions assets, uploads
the repository root, and deploys it to GitHub Pages.

If public URLs or page structure change, update canonical/social metadata and
`robots.txt` as applicable. If icons change, also verify `site.webmanifest`.
