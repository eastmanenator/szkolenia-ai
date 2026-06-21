# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project overview

This repo is a single-page landing site for **Akademia AI – Textilimpex**, a 70-hour AI
training program (in Łódź, Poland) aimed at business owners, managers, and leaders. The
site is in Polish and exists to drive registrations of interest via an external form.

It is a **static site with no build process** — there is no `package.json`, no bundler,
no framework, and no dependency manager.

## Repository structure

```text
.
├── index.html              # the entire site: HTML + inline <style> + inline <script>
├── assets/
│   ├── logo.png             # nav logo
│   └── szymon.jpg           # photo of the instructor (Szymon Kapturkiewicz)
├── robots.txt                # crawler directives
├── .github/workflows/static.yml   # GitHub Pages deploy workflow
├── README.md                  # project overview (Polish)
└── AGENTS.md                  # prior instructions for Codex/AI agents (Polish)
```

There is no `src/`, no tests, no CI beyond the Pages deploy workflow.

## How the site is built

- `index.html` contains everything: a single `<style>` block (lines ~11–1225) followed by
  the markup (sections, lines ~1229–1807) and a single `<script>` block at the end
  (lines ~1808–1890).
- CSS uses custom properties defined in `:root` for the color palette and layout, e.g.
  `--navy`, `--navy2`, `--navy3` (dark navy backgrounds), `--orange` / `--orange2`
  (accent), `--gray` (secondary text), and `--container-max` / `--container-padding`
  for the desktop container width.
- Font is Inter, loaded from Google Fonts via `<link>` preconnect tags in `<head>`.
- JS is vanilla, no libraries: accordion toggle for the program modules, an
  `IntersectionObserver`-based scroll-reveal effect, an animated stat counter in the
  hero, and scroll-driven nav/progress-bar/back-to-top behavior. All animation logic
  checks `prefers-reduced-motion` and skips itself when the user has that preference set.

## Page sections (in order)

1. Nav
2. Hero (headline + CTA + animated stats)
3. "Dla kogo" (target audience)
4. "Co zyskasz" (benefits)
5. "Program" — accordion with 8 training modules
6. "Cennik" — pricing + subsidy info (dofinansowanie do 93%)
7. Expert quote section
8. "Prowadzący" — instructor profile (Szymon Kapturkiewicz)
9. "Informacje" — organizational info and contact details
10. "Rejestracja" — CTA linking to an external registration form
11. Footer

## Key facts to keep accurate in content edits

- 70-hour workshop program
- Location: Łódź, ul. Traugutta 25
- Organizer: Textilimpex
- Subsidy: up to 93% (dofinansowanie)
- Instructor: Szymon Kapturkiewicz
- 8 program modules in the accordion

## Conventions and constraints

- **Keep it a static project.** Do not introduce a framework, bundler, package manager,
  or build step unless the user explicitly asks for one.
- **Polish language only** for all user-facing site content.
- **Don't split CSS/JS into separate files** for small changes — they're intentionally
  inline in `index.html`. Only extract them if the user asks for a larger refactor.
- Preserve the existing visual identity: dark navy backgrounds, orange accents, white
  text, gray secondary text — match the existing CSS variables rather than hardcoding
  new colors.
- Use semantic HTML and follow existing class-naming patterns (e.g. `.fw-card`,
  `.benefit-card`, `.acc-item`, `.price-card`, `.info-card`, `.contact-card`).
- Accessibility requirements: meaningful `alt` text on informational images, visible
  focus states on links/buttons, full keyboard operability, and respect for
  `prefers-reduced-motion` in any new animation.
- No `try/catch` wrapping around imports/scripts — there are no imports/modules to begin
  with; keep the script inline and dependency-free.
- If the public structure of the site changes (new pages, a sitemap, etc.), update
  `robots.txt` accordingly.
- Keep `<title>` and the `meta description` in `index.html` concise and accurate to the
  page content if they need to change.

## Local development

No build step. Either open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Testing changes

There is no automated test suite. After making changes:

```bash
git diff --check
```

For visual or behavioral changes, run a local server, check the page in both desktop and
mobile viewport widths, and verify interactions (accordion, scroll reveal, nav-on-scroll,
back-to-top) work and remain keyboard-accessible.

## Deployment

Pushing to `main` triggers `.github/workflows/static.yml`, which deploys the repository
root directly to GitHub Pages (no build artifacts are generated — the raw files are
uploaded as-is).
