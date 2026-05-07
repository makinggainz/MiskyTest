# MistX

A Next.js + TypeScript reconstruction of the Mistral AI homepage. Started life as a 1.8 MB "Save Page As → Complete" snapshot; now restructured into a real project that collaborators can clone, branch, and iterate on.

## Quickstart

```bash
npm install
npm run dev          # http://127.0.0.1:3002 (intentionally not 3000)
npm run build        # production build (statically prerendered)
npm run lint
```

## Stack

- **Next.js 16** (App Router) + React 19
- **TypeScript** (strict)
- **Tailwind v4** via `@tailwindcss/postcss`
- **Rubik** font from Google via `next/font/google`
- Mistral's compiled CSS preserved verbatim — extracted from the 8 inline `<style>` blocks of the snapshot into modular files under `design-system/styles/`

## Folder map

```
MistX/
├── _legacy/snapshot.html               1.8 MB original "Save Page As" file, archived
├── _legacy/sections/*.html             Per-region markup extracts (reference only)
├── _legacy/sections/_jsx-*.txt         Auto-generated JSX-ready strings used to build components
├── app/
│   ├── layout.tsx                      Root <html>, fonts (Rubik), <Nav /> + children + <SiteFooter />
│   ├── page.tsx                        Composes the homepage sections in order
│   ├── fonts.ts                        next/font/google for Rubik
│   └── globals.css                     Tailwind import + Mistral's split styles
├── components/
│   ├── nav/Nav.tsx                     Top navigation
│   ├── footer/SiteFooter.tsx
│   └── sections/
│       ├── Hero.tsx                    Gradient hero band + logo marquee + value-props grid
│       ├── Section1.tsx                Customer carousel ("Deployed in production")
│       ├── Section2.tsx                Marketecture image ("Powered by a deeply configurable AI platform")
│       └── Section3.tsx                Privacy/Deploy CTA with floating logos
├── content/                            (Empty for v1 — see "What's next" below)
├── design-system/
│   └── styles/                         8 inline <style> blocks split into named files
│       ├── 01-background-images.css    --sf-img-N CSS vars (referenced by inline style attrs)
│       ├── 02-tokens-and-utilities.css ~1284 design tokens + compiled Tailwind utilities + dark: variants
│       ├── 03-splide.css               Carousel module
│       ├── 04-katex.css                Math rendering
│       ├── 05-axeptio.css              Cookie banner
│       ├── 06-helper-sf-hidden.css     Save-Page-As helper (.sf-hidden)
│       ├── 07-helper-empty-img.css     Empty-image hider
│       └── 08-vendor-third-party.css   Hashed third-party widget styles
├── public/
│   └── images/                         49 extracted assets + _manifest.json
├── types/
│   └── css.d.ts                        Augments React.CSSProperties to allow `--*` keys in style objects
├── package.json                        dev script binds to port 3002 (not 3000)
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── README.md
└── CLAUDE.md
```

## What's next (deferred from v1)

- **Lift copy into `content/home.ts`**: components currently embed all copy inline (Stellantis, ASML, CMA CGM customer stories, hero title + subhead, etc.). Future work: extract into typed objects so editing copy doesn't require touching JSX.
- **Carousel interactivity**: the customer carousel in `Section1` renders all 3 slides with the original transform offset; the next/prev buttons aren't yet wired to actual slide-switching state. Mistral's site uses Splide; we kept the markup so wiring up Splide-React (or a small `useState` slider) is a small follow-up.
- **Logo marquee animation**: the `.logoloop` markup is preserved with its inline `transform: translate3d(...)` initial offset. The actual horizontal scroll animation runs via Mistral's JS, which the snapshot stripped. Add a small `useEffect` ticker when needed.
- **Dark mode toggle**: the `dark:` Tailwind variants are compiled into `02-tokens-and-utilities.css`; the page defaults to `class="light"` per the snapshot. Adding a toggle is one wire-up away.
- **Mobile menu**: the header's mobile-menu button (`<button class="lg:hidden">`) renders but the dropdown isn't wired up. Same structure as desktop nav once you add state.

## Reference: original artifact

The original 1.8 MB snapshot lives at [`_legacy/snapshot.html`](_legacy/snapshot.html). Open in a browser to see the pixel-faithful target. Per-region HTML extracts are in [`_legacy/sections/`](_legacy/sections/) for reference. Not loaded at runtime.
