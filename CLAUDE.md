# CLAUDE.md — MistX project rules

This is a Next.js 16 + TypeScript + Tailwind v4 reconstruction of the Mistral AI homepage.

## Design system: Mistral's tokens (NOT M3, NOT Hebbia BEM)

Don't confuse this project with sibling projects:
- **ColumbusPage** uses Material Design 3 (`--md-sys-*` tokens) — different system.
- **HebX** uses Hebbia's BEM modules + custom `--color-*` / `--space-*` / `--ff-*` token namespaces — different markup conventions.
- **MistX (here)** uses Mistral's own design system: ~1284 design tokens compiled with Tailwind utilities + `dark:` variants. All loaded from [`design-system/styles/02-tokens-and-utilities.css`](design-system/styles/02-tokens-and-utilities.css).

### Token namespaces present

- `--color-*` — palette (`--color-primary`, `--color-blue-500`, `--color-mistral-orange`, `--color-mistral-beige-deep`, semantic role colors)
- `--space-*` — spacing scale + semantic (`--space-xl`, `--space-2xl`, `--space-mobile`, `--space-desktop`)
- `--block-*` — layout block tokens (`--block-1-color`, `--block-size`, `--block-grid-color`)
- `--animate-*` — animation tokens (`--animate-accordion-down`, `--animate-spin`, `--animate-rotate-y`)
- `--blur-*`, `--breakpoint-*`, `--font-*`, `--aspect-*`, `--ease-*`, `--text-*`

### CSS architecture

Tailwind utilities, **not BEM**. Class names look like `text-3xl md:text-5xl text-center mb-10` — composed utilities. The compiled CSS lives in [`02-tokens-and-utilities.css`](design-system/styles/02-tokens-and-utilities.css) and includes all the `dark:` and breakpoint variants Mistral generated.

When adding new markup, prefer Tailwind utilities. If a utility doesn't exist in the compiled CSS, you'll need to either:
1. Use an inline `style={{}}` referencing the relevant CSS variable, or
2. Re-compile the CSS by adding the class to a Tailwind source config (currently the project ships compiled-only CSS, not source).

### Fonts

Rubik (Google Font) via [`app/fonts.ts`](app/fonts.ts) using `next/font/google`. Don't introduce other fonts.

## Component conventions

- Section components live in [`components/sections/`](components/sections/). Each renders `<section>` markup ported verbatim from the snapshot.
- Components are currently **stateless and inline-copy** — all customer names, headings, and image refs are hardcoded in JSX. Lifting them into `content/home.ts` is on the roadmap.
- For images use plain `<img>` (not `next/image`) — Mistral's snapshot uses native `<img>` and we kept that.
- `data-*` attributes from the snapshot are preserved (`data-nimg`, `data-roledescription`, etc.). Don't strip them — they're load-bearing for some Tailwind selectors and aria patterns.

## Style attribute pattern

Mistral's markup uses inline styles with CSS variables heavily, e.g.:

```jsx
<div style={{ "--space-desktop": "64px", "--space-mobile": "64px" }} />
```

The type augmentation in [`types/css.d.ts`](types/css.d.ts) makes TypeScript accept arbitrary `--*` keys in `React.CSSProperties`. Don't remove that file — it's load-bearing for compile.

## When to ask before changing

- Editing [`design-system/styles/02-tokens-and-utilities.css`](design-system/styles/02-tokens-and-utilities.css) directly — tokens + compiled utilities live here together. Ask before mutating.
- Adding a new dependency — keep deps minimal (next, react, tailwind, types).
- Changing the dev port — currently `3002`. ColumbusPage typically runs on 3000, HebX on 3001. Pick a non-conflicting port if you change it.

## Out of scope (v1)

- Real interactive carousel (currently shows all 3 slides offset; no auto-rotate or button-driven swap)
- Logo marquee animation (snapshot captured a frozen `transform: translate3d(...)` state)
- Dark-mode toggle UI (variants compiled in CSS, but no toggle button rendered)
- Mobile menu drawer
- Other pages beyond the homepage
- Source-Tailwind reconstruction (we ship compiled output verbatim)
