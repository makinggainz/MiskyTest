---
project: Columbus (extracted reference)
branch_extracted: experimentV6-newTechV3.1-NewUseCases-ValeV4
extracted_at: 2026-05-06
extraction_method: from-scratch from CSS / TS source files only — no .md files were read.
source_files_read:
  - "~/Documents/ColumbusPage/design-system/tokens.css (M3 system, ~340 tokens)"
  - "~/Documents/ColumbusPage/app/globals.css (brand vars + Axiforma + accessibility modes + utility classes)"
  - "~/Documents/ColumbusPage/components/enterprise/enterprise-tokens.css (page-scoped, ~80 tokens)"
  - "~/Documents/ColumbusPage/app/fonts.ts (next/font/google declarations)"
  - "~/Documents/ColumbusPage/lib/fonts.ts (additional next/font/local declarations)"
  - "~/Documents/ColumbusPage/app/layout.tsx (root layout — confirms which fonts are applied)"
explicitly_not_read:
  - "Any *.md file in the project (design-system.md, M3 docs, page-specific spec docs)"
  - "components/products/how-it-works-tokens.css (mapsgpt-page-scoped — explicitly out of scope per user)"
  - "Any file under /mapsgpt routes"
authority: extracted_from_code
methodology: |
  Material Design 3 (M3) as the primary system-wide design system, layered with two
  secondary systems:
    1. A globals layer with self-hosted Axiforma display font + brand vars
       + a deep utility class library + accessibility body-mode overrides.
    2. An enterprise-page layer (`.ent-scope`) — page-scoped design tokens
       for the /products/enterprise route with its own typography scale,
       palette, and motion specs.
location_in_mistx: design-system/Columbusdesign.md
showcase_page: app/ColumbusDesign/page.tsx (MistX route /ColumbusDesign)
---

# Columbus — Design System (extracted reference)

> **Three layered systems running in parallel:**
>
> 1. **M3 (Material Design 3)** — system-wide. Defined in `design-system/tokens.css`. Reference→System→Component three-tier hierarchy. Theming via `data-theme="light" | "dark"`.
> 2. **Globals** — `app/globals.css`. Self-hosted Axiforma display font (5 weights), brand color vars (`--primary`, `--accent`), Tailwind v4 `@theme` additions, utility class library (glass buttons, glass cards, grid sections, structure lines, sonar pulses), and **accessibility body modes** that override M3 tokens (sepia, dark, dyslexia).
> 3. **Enterprise tokens** — `components/enterprise/enterprise-tokens.css`. Activated by `.ent-scope` selector on `/products/enterprise`. Page-local design system with its own e1–e12 typography scale, multi-tier blue palette, monitor-frame chrome, prompt-glow shadows.

> **Out of scope (user instruction):** the `components/products/how-it-works-tokens.css` file (mapsgpt-scoped) is intentionally not documented here.

---

## 0. Philosophy

Columbus follows **Material Design 3 strictly** as its primary system:

1. **Never use raw values in components.** Always reference a token. No hardcoded `#6750a4`, no `16px` margins. Use `var(--md-sys-color-primary)` and `var(--md-sys-shape-corner-medium)`.
2. **Use system tokens (`md-sys-*`) in components, not reference tokens (`md-ref-*`).**
3. **Use component tokens (`md-comp-*`) for component-specific overrides.**
4. **Spacing on a 4px grid.** Multiples of 4 only.
5. **15-style type scale.** Don't invent custom font-size/weight combos.

The globals layer adds a **brand identity** on top: Axiforma as the display face for hero `<h1>`, `#1D1D1F` as primary, `#0066CC` as accent.

The enterprise layer adds a **page-scoped extension** for sections that need richer typography (e1–e12 scale up to 76px), specialized accent blues for enterprise pages, and bespoke monitor / prompt-glow shadows.

Body-mode classes (`bg-mode-sepia`, `bg-mode-dark`, `dyslexia-mode`) re-target M3 tokens at the body level — the system stays internally consistent regardless of which mode is active.

---

## 1. Color

### 1.1 Reference palettes (`--md-ref-palette-*`) — 78 tokens

Six tonal palettes × 13 stops (`0`, `10`, `20`, `30`, `40`, `50`, `60`, `70`, `80`, `90`, `95`, `99`, `100`). **Don't use directly** — they're palette primitives.

| Palette | `40` (light primary) | `80` (dark primary) | Use |
|---|---|---|---|
| **Primary** | `#6750a4` | `#d0bcff` | Brand action color base |
| **Secondary** | `#625b71` | `#ccc2dc` | Secondary actions |
| **Tertiary** | `#7d5260` | `#efb8c8` | Complementary accent |
| **Error** | `#ba1a1a` | `#ffb4ab` | Errors / warnings |
| **Neutral** | `#605d62` | `#cac5cd` | Surfaces + text |
| **Neutral Variant** | `#605d66` | `#cac4d0` | Surface variants, outlines |

Replace with brand palette via M3 Theme Builder (https://m3.material.io/theme-builder) — every `md-sys-*` and `md-comp-*` token then re-resolves automatically.

### 1.2 System color roles (`--md-sys-color-*`) — light theme

These are the ones to use in components.

| Role | Light | Dark |
|---|---|---|
| `primary` | `#6750a4` | `#d0bcff` |
| `on-primary` | `#ffffff` | `#381e72` |
| `primary-container` | `#eaddff` | `#4f378b` |
| `on-primary-container` | `#21005d` | `#eaddff` |
| `secondary` | `#625b71` | `#ccc2dc` |
| `on-secondary` | `#ffffff` | `#332d41` |
| `secondary-container` | `#e8def8` | `#4a4458` |
| `on-secondary-container` | `#1d192b` | `#e8def8` |
| `tertiary` | `#7d5260` | `#efb8c8` |
| `on-tertiary` | `#ffffff` | `#492532` |
| `tertiary-container` | `#ffd8e4` | `#633b48` |
| `error` | `#ba1a1a` | `#ffb4ab` |
| `error-container` | `#ffdad6` | `#93000a` |
| `background` | `#fffbfe` | `#1c1b1f` |
| `on-background` | `#1c1b1f` | `#e6e1e5` |
| `surface` | `#fffbfe` | `#1c1b1f` |
| `on-surface` | `#1c1b1f` | `#e6e1e5` |
| `surface-variant` | `#e7e0ec` | `#49454f` |
| `on-surface-variant` | `#49454f` | `#cac4d0` |
| `outline` | `#79747e` | `#938f99` |
| `outline-variant` | `#cac4d0` | `#49454f` |
| `inverse-surface` | `#313033` | `#e6e1e5` |
| `inverse-on-surface` | `#f4eff4` | `#313033` |
| `inverse-primary` | `#d0bcff` | `#6750a4` |
| `shadow` | `#000000` | `#000000` |
| `scrim` | `#000000` | `#000000` |

### 1.3 Surface container hierarchy (5 layers)

| Token | Light | Dark | Role |
|---|---|---|---|
| `surface-container-lowest` | `#ffffff` | `#0f0d13` | Background (furthest back) |
| `surface-container-low` | `#f4eff4` | `#1c1b1f` (neutral20) | Default surface / page |
| `surface-container` | `#e6e1e5` | `#211f26` | Nav bars, bottom sheets |
| `surface-container-high` | `#ece6f0` | `#2b2930` | Cards, menus |
| `surface-container-highest` | `#e7e0ec` | `#48454e` (variant30 → variant80?) | Dialogs, tooltips |

### 1.4 Globals brand colors (`app/globals.css`) — separate layer

| Token | Value | Use |
|---|---|---|
| `--background` | `#FFFFFF` | Page background fallback (overrides M3 surface in places) |
| `--foreground` | `#1D1D1F` | Default body text color |
| `--primary` | `#1D1D1F` | Brand black (used in nav + headlines) |
| `--accent` | `#0066CC` | Accent blue |
| `--container-padding` | `24px` (mobile) → `1vw` at ≥940px | Container gutter |
| `--page-padding` | `24px` | Aligned with structure-line + navbar logo edges |
| `--grid-line` | `rgba(37, 99, 235, 0.3)` | Vertical hairline color |
| `--cta-right` | `46px` (default) | Navbar CTA right offset |

### 1.5 Section-line utility colors (`app/globals.css`)

For section-bordered layouts:

| Class | Color | Use |
|---|---|---|
| `.section-lines-dark::before/::after` | `rgba(255,255,255,0.12)` | 1px vertical hairlines on dark sections |
| `.section-lines-light::before/::after` | `rgba(37,99,235,0.6)` | 1px vertical hairlines on light sections |
| `.grid-section::before/::after` | `var(--grid-line)` | Vertical grid lines on each grid-section |

### 1.6 Enterprise palette (`.ent-scope`) — page-scoped

#### 1.6.1 Text colors

| Token | Value | Use |
|---|---|---|
| `--ent-text-primary` | `#1D1D1F` | Primary body |
| `--ent-text-navy` | `#0A1344` | Navy headlines / accents |
| `--ent-text-secondary` | `#374151` | Secondary text |
| `--ent-text-tertiary` | `#6B7280` | Tertiary text |
| `--ent-text-muted` | `rgba(10, 19, 68, 0.40)` | Muted navy text |

#### 1.6.2 Text on dark (4 tiers)

| Token | Value |
|---|---|
| `--ent-dark-text-full` | `rgba(255, 255, 255, 1.0)` |
| `--ent-dark-text-high` | `rgba(255, 255, 255, 0.75)` |
| `--ent-dark-text-medium` | `rgba(255, 255, 255, 0.45)` |
| `--ent-dark-text-low` | `rgba(255, 255, 255, 0.25)` |

#### 1.6.3 Accent blues (4 tones)

| Token | Value | Use |
|---|---|---|
| `--ent-blue-primary` | `#2563EB` | Primary CTA blue |
| `--ent-blue-deep` | `#1B37CE` | Deep variant for prompts/pressed |
| `--ent-blue-tint` | `#0066CC` | Same value as globals `--accent` |
| `--ent-blue-shimmer` | `#8A9BD4` | Shimmer / soft accent |

#### 1.6.4 Gradient blues (PromptShowcase)

| Token | Value |
|---|---|
| `--ent-gradient-start` | `#06096D` |
| `--ent-gradient-end` | `#318BCA` |

#### 1.6.5 Surfaces

| Token | Value | Use |
|---|---|---|
| `--ent-bg-light` | `#F9F9F9` | Light surface |
| `--ent-bg-white` | `#FFFFFF` | White |
| `--ent-bg-card` | `#FDFDFD` | Card surface |
| `--ent-bg-dark` | `#060810` | Deep dark |
| `--ent-bg-dark-alt` | `#1a1a1a` | Alt dark |
| `--ent-bg-monitor-frame` | `#1D1D1F` | Monitor frame chrome |
| `--ent-bg-monitor-titlebar` | `#F5F5F7` | Monitor titlebar (Apple-style) |

#### 1.6.6 Borders

| Token | Value |
|---|---|
| `--ent-border-card` | `#EDEDED` |
| `--ent-border-subtle` | `rgba(0, 0, 0, 0.07)` |
| `--ent-border-medium` | `rgba(0, 0, 0, 0.10)` |
| `--ent-border-dark-grid` | `rgba(255, 255, 255, 0.10)` |
| `--ent-border-dark-subtle` | `rgba(255, 255, 255, 0.06)` |
| `--ent-border-accent` | `rgba(27, 55, 206, 0.25)` |

#### 1.6.7 Buttons (enterprise)

| Token | Value |
|---|---|
| `--ent-btn-dark` | `#1D1D1F` |
| `--ent-btn-navy` | `#0A1344` |
| `--ent-btn-navy-alt` | `#0E1A44` |

#### 1.6.8 Window chrome (Apple-style monitor frame)

| Token | Value |
|---|---|
| `--ent-chrome-red` | `#FF5F57` |
| `--ent-chrome-yellow` | `#FEBC2E` |
| `--ent-chrome-green` | `#28C840` |

### 1.7 Body-mode token overrides (accessibility)

Three `body.bg-mode-*` classes re-target the M3 system tokens:

#### 1.7.1 Sepia mode

```
body.bg-mode-sepia { background: #f4ecd8; color: #433422; }
```
Token overrides:
- `--md-sys-color-primary: #8a5a2b`
- `--md-sys-color-background: #f4ecd8`
- `--md-sys-color-on-background: #433422`
- `--md-sys-color-surface: #f4ecd8`
- `--md-sys-color-surface-variant: #e8dcc0`
- `--md-sys-color-on-surface-variant: #6b5640`
- `--md-sys-color-outline: #a08a6b`
- `--md-sys-color-outline-variant: #d1c5b0`

#### 1.7.2 Dark mode (body-level)

```
body.bg-mode-dark { background: #111318; color: #e2e2e9; }
```
- `--md-sys-color-primary: #a8c8ff`
- `--md-sys-color-background: #111318`
- `--md-sys-color-surface: #111318`
- `--md-sys-color-surface-variant: #44464f`

#### 1.7.3 Dyslexia mode

```
body.dyslexia-mode, body.dyslexia-mode * {
  font-family: 'OpenDyslexic', 'Comic Sans MS', sans-serif !important;
}
```

These modes don't conflict with the page-level `data-theme` attribute used elsewhere — they're a higher-specificity body-level override.

---

## 2. Typography

### 2.1 M3 Type Scale (15 styles × 5 sub-tokens = 75 tokens)

Five roles × three sizes. Each style has 5 sub-tokens: `*-font`, `*-size`, `*-line-height`, `*-weight`, `*-tracking`.

| Role | Size | Font | px | Line-height | Weight | Tracking |
|---|---|---|---|---|---|---|
| Display | Large | Brand | 57 | 64 | 400 | -0.015625rem |
| Display | Medium | Brand | 45 | 52 | 400 | 0 |
| Display | Small | Brand | 36 | 44 | 400 | 0 |
| Headline | Large | Brand | 32 | 40 | 400 | 0 |
| Headline | Medium | Brand | 28 | 36 | 400 | 0 |
| Headline | Small | Brand | 24 | 32 | 400 | 0 |
| Title | Large | Brand | 22 | 28 | 400 | 0 |
| Title | Medium | Plain | 16 | 24 | 500 | 0.009375rem |
| Title | Small | Plain | 14 | 20 | 500 | 0.00625rem |
| Body | Large | Plain | 16 | 24 | 400 | 0.03125rem |
| Body | Medium | Plain | 14 | 20 | 400 | 0.015625rem |
| Body | Small | Plain | 12 | 16 | 400 | 0.025rem |
| Label | Large | Plain | 14 | 20 | 500 | 0.00625rem |
| Label | Medium | Plain | 12 | 16 | 500 | 0.03125rem |
| Label | Small | Plain | 11 | 16 | 500 | 0.03125rem |

Both `--md-ref-typeface-brand` and `--md-ref-typeface-plain` resolve to: `var(--font-dm-sans), 'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif`.

### 2.2 Project font roster

#### 2.2.1 From `app/fonts.ts` (next/font/google)

| Font | Variable | Weight(s) | Active in layout? |
|---|---|---|---|
| **DM Sans** | `--font-dm-sans` | (default) | ✓ — applied to `<body>` className |
| **Geist** | `--font-geist-sans` | (default) | ✓ — registered as variable on `<html>` for legacy refs |
| **Cormorant Garamond** | (no variable) | 600 | Available; not applied at layout level |
| **Cambo** | (no variable) | 400 | Available; not applied at layout level |
| **Instrument Serif** | (no variable) | 400 | Defined but **not exported into layout** |

#### 2.2.2 From `lib/fonts.ts` (next/font/google + next/font/local)

| Font | Source | Weights | Use |
|---|---|---|---|
| **Cormorant Garamond** (Google) | next/font/google | 600 | Duplicate of app/fonts.ts |
| **Cormorant Garamond** (local) | `lib/fonts/CormorantGaramond-{400,500}-latin.woff2` | 400, 500 | Specialty page imports |
| **Shanti** (local) | `lib/fonts/Shanti-400-latin.woff2` | 400 | Specialty page imports |
| **Shippori Mincho** (local) | `lib/fonts/ShipporiMincho-{400,500}-latin.woff2` | 400, 500 | Japanese-style serif for specific pages |

#### 2.2.3 Self-hosted Axiforma (`app/globals.css` `@font-face`)

| Weight | File |
|---|---|
| 300 (Light) | `/fonts/Axiforma-Light.woff2` |
| 400 (Regular) | `/fonts/Axiforma-Regular.woff2` |
| 500 (Medium) | `/fonts/Axiforma-Medium.woff2` |
| 600 (SemiBold) | `/fonts/Axiforma-SemiBold.woff2` |
| 700 (Bold) | `/fonts/Axiforma-Bold.woff2` |

Total: ~210KB across 5 weights. Commercial display sans by Kastelov.

### 2.3 Hero font alias (`--font-hero`)

```css
--font-hero: "Axiforma", var(--font-dm-sans), "SF Pro",
             -apple-system, BlinkMacSystemFont, sans-serif;
```

Each hero `<h1>` across the site sets `font-family: var(--font-hero)` — a single change in `globals.css` swaps the display face everywhere.

### 2.4 Tailwind theme additions (`@theme {}`)

| Token | Value | Tailwind utility |
|---|---|---|
| `--text-md` | `1.0625rem` (17px) | `text-md` |
| `--text-display` | `4rem` (64px) | `text-display` |

### 2.5 Enterprise typography scale (`.ent-scope`)

Page-local 12-step typography scale (e1–e12, base 16px Major Third 1.25 ratio):

| Token | Size | Use (e-number) |
|---|---|---|
| `--ent-text-display-xl` | 76px | e1 — hero lg |
| `--ent-text-display-l` | 64px | e2 — showcase headings lg |
| `--ent-text-display-m` | 49px | e3 — section headings lg |
| `--ent-text-display-s` | 39px | e4 — hero mobile |
| `--ent-text-heading-l` | 28px | e5 — section headings mobile |
| `--ent-text-heading-m` | 22px | e6 — sub-headings |
| `--ent-text-body-l` | 20px | e7 — body large, CTA |
| `--ent-text-body` | 16px | e8 — body |
| `--ent-text-body-s` | 15px | e9 — small body |
| `--ent-text-ui` | 14px | e10 — buttons, links |
| `--ent-text-caption` | 13px | e11 — card details |
| `--ent-text-overline` | 11px | e12 — uppercase labels |

#### 2.5.1 Enterprise weights, tracking, leading

| Type token | Value |
|---|---|
| `--ent-weight-light` | 300 |
| `--ent-weight-regular` | 400 |
| `--ent-weight-medium` | 500 |
| `--ent-weight-semibold` | 600 |
| `--ent-tracking-display` | -0.03em (e1–e2) |
| `--ent-tracking-heading` | -0.02em (e3–e6) |
| `--ent-tracking-body` | -0.01em (e7–e11) |
| `--ent-tracking-overline` | 0.12em (e12) |
| `--ent-leading-display-xl` | 1.1 |
| `--ent-leading-display-l` | 1.05 |
| `--ent-leading-display` | 1.1 |
| `--ent-leading-body-l` | 1.55 |
| `--ent-leading-body` | 1.5 |
| `--ent-leading-overline` | 1.2 |

#### 2.5.2 Enterprise font stack

```
--ent-font-sans: 'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif;
```

The enterprise scope **does not use the Axiforma display face** — it standardizes on SF Pro. Different brand identity from the homepage.

### 2.6 Body styling

| Element | Rule |
|---|---|
| `<html>`, `<body>` | `margin:0; padding:0; background:#FFFFFF; color:#1D1D1F; overflow-x:clip; min-height:100%` |
| `<html>` | `scroll-behavior: auto` (Lenis disabled by default) |
| `body` | inherits DM Sans (`dmSans.className`) + `antialiased` + `bg-white min-h-screen` (Tailwind utility classes) |
| `.brand-wordmark`, `.header-font` | `font-family: inherit` — pulls Geist (which is `<html>` body class fallback context) |

---

## 3. Shape

### 3.1 M3 corner radii (7 tokens)

| Token | Value | Use |
|---|---|---|
| `--md-sys-shape-corner-none` | 0px | Dividers, banners |
| `--md-sys-shape-corner-extra-small` | 4px | Text fields, snackbars, menus |
| `--md-sys-shape-corner-small` | 8px | Chips, filled text fields |
| `--md-sys-shape-corner-medium` | 12px | **Cards (default)** |
| `--md-sys-shape-corner-large` | 16px | Nav drawer, side sheets, FAB |
| `--md-sys-shape-corner-extra-large` | 28px | Dialogs, time pickers |
| `--md-sys-shape-corner-full` | 9999px | **Buttons (default)**, FAB extended, badges, sliders |

### 3.2 Enterprise radii (`.ent-scope`)

| Token | Value | Use |
|---|---|---|
| `--ent-radius-sm` | 3px | Tight corners |
| `--ent-radius-base` | 6px | Default |
| `--ent-radius-md` | 10px | Cards (enterprise) |
| `--ent-radius-lg` | 14px | Larger surfaces |
| `--ent-radius-xl` | 18px | Prominent containers |
| `--ent-radius-2xl` | 24px | Showcase panels |
| `--ent-radius-full` | 9999px | Pills |

The enterprise scale is **finer-grained near zero** (3/6/10/14) than M3's (4/8/12). Don't conflate the two.

---

## 4. Spacing

### 4.1 M3 spacing rules

M3 uses a **4px base grid** by convention. **No tokenized spacing scale** in tokens.css — spacing is by convention only.

| Multiplier | px | Usage |
|---|---|---|
| 1u | 4px | Icon inner padding, dense list dividers |
| 2u | 8px | Icon-to-label gap, chip internal padding |
| 4u | 16px | Card padding, list item padding |
| 6u | 24px | Dialog padding, section separation |
| 8u | 32px | Large section gaps |
| 12u | 48px | Page section vertical rhythm |
| 16u | 64px | Hero spacing |

**Touch target:** ≥ 48×48px regardless of visual size.

### 4.2 Enterprise spacing scale (`.ent-scope`) — 16 tokens

Numeric 4px-grid scale plus section padding tokens:

| Token | Value | px |
|---|---|---|
| `--ent-space-1` | 4 | 4 |
| `--ent-space-2` | 8 | 8 |
| `--ent-space-3` | 12 | 12 |
| `--ent-space-4` | 16 | 16 |
| `--ent-space-5` | 20 | 20 |
| `--ent-space-6` | 24 | 24 |
| `--ent-space-8` | 32 | 32 |
| `--ent-space-10` | 40 | 40 |
| `--ent-space-12` | 48 | 48 |
| `--ent-space-16` | 64 | 64 |
| `--ent-space-20` | 80 | 80 |
| `--ent-space-24` | 96 | 96 |
| `--ent-space-28` | 112 | 112 |
| `--ent-space-32` | 128 | 128 |
| `--ent-space-40` | 160 | 160 |
| `--ent-space-48` | 192 | 192 |

Section padding (vertical):

| Token | Value |
|---|---|
| `--ent-section-sm` | 96px |
| `--ent-section-md` | 112px |
| `--ent-section-lg` | 128px |
| `--ent-section-xl` | 160px |
| `--ent-section-hero` | 192px |

### 4.3 Globals padding tokens

| Token | Value |
|---|---|
| `--container-padding` | 24px (default) → 1vw at ≥940px |
| `--page-padding` | inherits from `--container-padding` |
| `--ent-content-px` | 24px (mobile) → 32px (≥768px) → 48px (≥1024px) |

---

## 5. Layout

### 5.1 Container widths

| Token | Value | Use |
|---|---|---|
| `--ent-max-width` | 1287px | Enterprise content max-width |
| `--ent-monitor-max-width` | 1100px | Monitor frame inner width |
| `.ent-content-bounds` | `max-width: 1287px; margin: auto` | Content bounds class |

(M3 has its own grid spec — Compact <600px / Medium 600–840px / Expanded >840px — but no width tokens; values are by convention.)

### 5.2 Breakpoints (used in CSS @media queries)

Inferred from `app/globals.css` and `enterprise-tokens.css` `@media` rules:

| Breakpoint | Min-width | Behavior |
|---|---|---|
| Mobile | < 768px | Default styles |
| Tablet | ≥ 768px | `--ent-content-px: 32px` |
| ≥ 940px | 940px | `--container-padding: 1vw` (instead of 24px) |
| Desktop | ≥ 1024px | `--ent-content-px: 48px` |
| Narrow | ≤ 1374px | Disable Capabilities scroll-driven expansion |

### 5.3 Navbar layout

| Token | Value |
|---|---|
| `--cta-right` | 46px (default) — nav CTA right offset |
| Desktop breakpoint | ≥ 900px → CTA layout switches to `display: contents` |

---

## 6. Elevation

### 6.1 M3 elevation (5 levels)

| Token | Shadow |
|---|---|
| `--md-sys-elevation-level0` | `none` |
| `--md-sys-elevation-level1` | `0px 1px 2px rgba(0,0,0,0.30), 0px 1px 3px 1px rgba(0,0,0,0.15)` |
| `--md-sys-elevation-level2` | `0px 1px 2px rgba(0,0,0,0.30), 0px 2px 6px 2px rgba(0,0,0,0.15)` |
| `--md-sys-elevation-level3` | `0px 1px 3px rgba(0,0,0,0.30), 0px 4px 8px 3px rgba(0,0,0,0.15)` |
| `--md-sys-elevation-level4` | `0px 2px 3px rgba(0,0,0,0.30), 0px 6px 10px 4px rgba(0,0,0,0.15)` |
| `--md-sys-elevation-level5` | `0px 4px 4px rgba(0,0,0,0.30), 0px 8px 12px 6px rgba(0,0,0,0.15)` |

### 6.2 Enterprise shadows (`.ent-scope`)

| Token | Value | Use |
|---|---|---|
| `--ent-shadow-monitor` | `0 40px 100px rgba(0,0,0,0.50), 0 12px 32px rgba(0,0,0,0.30)` | Monitor frame body shadow |
| `--ent-shadow-monitor-top` | `0 -20px 60px rgba(0,0,0,0.30), 0 -6px 20px rgba(0,0,0,0.15)` | Monitor frame top reflection |
| `--ent-shadow-card` | `0px 0px 30px rgba(0,0,0,0.2)` | Enterprise card |
| `--ent-shadow-prompt-glow` | `0px 0px 30px 5px rgba(191, 197, 235, 0.25)` | Prompt input glow effect |

The enterprise shadows are intentionally heavier and bespoke — designed for the photographic monitor mockups in the enterprise hero, not for general UI elevation.

---

## 7. Motion

### 7.1 M3 durations (16 tokens)

| Group | Tokens | Range |
|---|---|---|
| Short | `short1`–`short4` | 50, 100, 150, 200ms |
| Medium | `medium1`–`medium4` | 250, 300, 350, 400ms |
| Long | `long1`–`long4` | 450, 500, 550, 600ms |
| Extra long | `extra-long1`–`extra-long4` | 700, 800, 900, 1000ms |

**Default state-change duration:** `medium2` (300ms).

### 7.2 M3 easings (10 tokens)

| Token | Curve |
|---|---|
| `--md-sys-motion-easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--md-sys-motion-easing-standard-decelerate` | `cubic-bezier(0, 0, 0, 1)` |
| `--md-sys-motion-easing-standard-accelerate` | `cubic-bezier(0.3, 0, 1, 1)` |
| `--md-sys-motion-easing-emphasized` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--md-sys-motion-easing-emphasized-decelerate` | `cubic-bezier(0.05, 0.7, 0.1, 1)` |
| `--md-sys-motion-easing-emphasized-accelerate` | `cubic-bezier(0.3, 0, 0.8, 0.15)` |
| `--md-sys-motion-easing-legacy` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--md-sys-motion-easing-legacy-decelerate` | `cubic-bezier(0, 0, 0.2, 1)` |
| `--md-sys-motion-easing-legacy-accelerate` | `cubic-bezier(0.4, 0, 1, 1)` |
| `--md-sys-motion-easing-linear` | `cubic-bezier(0, 0, 1, 1)` |

### 7.3 Enterprise motion (`.ent-scope`)

| Token | Value |
|---|---|
| `--ent-duration-fast` | 150ms |
| `--ent-duration-normal` | 300ms |
| `--ent-duration-slow` | 600ms |
| `--ent-duration-reveal` | 750ms |
| `--ent-easing-default` | ease-out |
| `--ent-easing-reveal` | ease |
| `--ent-easing-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `--ent-easing-toggle` | `cubic-bezier(0.25, 1, 0.5, 1)` |

### 7.4 Globals keyframes (defined in `app/globals.css`)

A library of 30+ named keyframes; sample:

| Keyframe | Use |
|---|---|
| `blink` | Cursor blink |
| `intro-blob-A/B/C` | Section F gradient blob orbital paths |
| `text-shimmer-down` | Hero shimmer effect |
| `noteAppear` | Bottle scene note pop-in |
| `sonar-pulse` / `sonar-pulse-dark` | List bullet expanding ring |
| `heroFadeIn` | Section D vision title fade-in (with blur) |
| `case-intro-arrow-bounce` | Arrow bounce on card hover |
| `see-case-studies-arrow-float` | Slow arrow float (5s ease-in-out infinite) |
| `float-sinusoidal` | TravelPromo logo sinusoidal hover (8s) |
| `flowerBounceIn` | Flower swing-in with rebound |
| `heartFloat1` / `heartFloat2` | Subtle heart hovering |
| `flowerWind` | Flower wind sway |
| `geo-warning-shake` / `geo-warning-fall` | GeoWarning soft shake then fall |
| `unique-spots-ticker-scroll` | Ticker horizontal scroll (50s linear infinite) |
| `trusted-marquee-scroll` | Trusted-by marquee (40s) |
| `recommendations-marquee-scroll` | Recommendations marquee (60s, pause on hover) |
| `ai-thinking-wave` | AI shimmer text effect (0.45s ease-in-out 3 forwards) |
| `wave-flow` | Wavy divider line |
| `rec-orb-drift-a` / `rec-orb-drift-b` | Recommendation section gradient orbs |
| `bee-hover` | Favorites section emoji bee-like wobble |
| `hero-float` | Section B floating icons gentle bob (3s) |
| `heading line shimmer` | (text-shimmer-down) |

All animations respect `@media (prefers-reduced-motion: reduce)` — set to `animation: none`.

---

## 8. State Layers

| State | Token | Opacity |
|---|---|---|
| Hover | `--md-sys-state-hover-state-layer-opacity` | 0.08 |
| Focus | `--md-sys-state-focus-state-layer-opacity` | 0.12 |
| Pressed | `--md-sys-state-pressed-state-layer-opacity` | 0.12 |
| Dragged | `--md-sys-state-dragged-state-layer-opacity` | 0.16 |
| Disabled (container) | `--md-sys-state-disabled-container-opacity` | 0.12 |
| Disabled (content) | `--md-sys-state-disabled-content-opacity` | 0.38 |

---

## 9. Component tokens (M3) — 8 components

### 9.1 Filled Button

| Token | Default |
|---|---|
| `--md-comp-filled-button-container-color` | `var(--md-sys-color-primary)` |
| `--md-comp-filled-button-label-text-color` | `var(--md-sys-color-on-primary)` |
| `--md-comp-filled-button-container-height` | 40px |
| `--md-comp-filled-button-container-shape` | `var(--md-sys-shape-corner-full)` |
| `--md-comp-filled-button-horizontal-padding` | 24px |
| `--md-comp-filled-button-icon-size` | 18px |
| (label uses) | Label Large typescale |

### 9.2 FAB

| Token | Default |
|---|---|
| `--md-comp-fab-container-color` | `var(--md-sys-color-primary-container)` |
| `--md-comp-fab-icon-color` | `var(--md-sys-color-on-primary-container)` |
| `--md-comp-fab-container-shape` | `var(--md-sys-shape-corner-large)` |
| `--md-comp-fab-container-size` | 56px |
| `--md-comp-fab-icon-size` | 24px |
| `--md-comp-fab-container-elevation` | `var(--md-sys-elevation-level3)` |

### 9.3 Card

| Token | Default |
|---|---|
| `--md-comp-card-container-color` | `var(--md-sys-color-surface-container-low)` |
| `--md-comp-card-container-shape` | `var(--md-sys-shape-corner-medium)` |
| `--md-comp-card-container-elevation` | `var(--md-sys-elevation-level1)` |
| `--md-comp-card-outline-color` | `var(--md-sys-color-outline-variant)` |
| `--md-comp-card-padding` | 16px |

### 9.4 Navigation Bar

| Token | Default |
|---|---|
| `--md-comp-navigation-bar-container-color` | `var(--md-sys-color-surface-container)` |
| `--md-comp-navigation-bar-active-indicator-color` | `var(--md-sys-color-secondary-container)` |
| `--md-comp-navigation-bar-icon-color` | `var(--md-sys-color-on-surface-variant)` |
| `--md-comp-navigation-bar-active-icon-color` | `var(--md-sys-color-on-secondary-container)` |
| `--md-comp-navigation-bar-container-height` | 80px |
| `--md-comp-navigation-bar-icon-size` | 24px |
| `--md-comp-navigation-bar-active-indicator-shape` | `var(--md-sys-shape-corner-full)` |
| `--md-comp-navigation-bar-active-indicator-width` | 64px |
| `--md-comp-navigation-bar-active-indicator-height` | 32px |

### 9.5 Outlined Text Field

| Token | Default |
|---|---|
| `--md-comp-outlined-text-field-container-shape` | `var(--md-sys-shape-corner-extra-small)` |
| `--md-comp-outlined-text-field-container-height` | 56px |
| `--md-comp-outlined-text-field-outline-color` | `var(--md-sys-color-outline)` |
| `--md-comp-outlined-text-field-focus-outline-color` | `var(--md-sys-color-primary)` |
| `--md-comp-outlined-text-field-horizontal-padding` | 16px |

### 9.6 Chip

| Token | Default |
|---|---|
| `--md-comp-chip-container-shape` | `var(--md-sys-shape-corner-small)` |
| `--md-comp-chip-container-height` | 32px |
| `--md-comp-chip-horizontal-padding` | 16px |
| `--md-comp-chip-selected-container-color` | `var(--md-sys-color-secondary-container)` |
| `--md-comp-chip-icon-size` | 18px |

### 9.7 Dialog

| Token | Default |
|---|---|
| `--md-comp-dialog-container-color` | `var(--md-sys-color-surface-container-high)` |
| `--md-comp-dialog-container-shape` | `var(--md-sys-shape-corner-extra-large)` |
| `--md-comp-dialog-container-elevation` | `var(--md-sys-elevation-level3)` |
| `--md-comp-dialog-padding` | 24px |

### 9.8 Top App Bar

| Token | Default |
|---|---|
| `--md-comp-top-app-bar-container-color` | `var(--md-sys-color-surface)` |
| `--md-comp-top-app-bar-container-height` | 64px |
| `--md-comp-top-app-bar-small-container-height` | 56px |

---

## 10. Globals utility class library

`app/globals.css` ships a deep utility class library beyond what M3 + Tailwind provide:

### 10.1 Glass button (`.glass-btn`)

Premium glass-effect button with `@property --angle-1` and `@property --angle-2` for animated conic gradients. ~100 lines of CSS. Used for primary CTAs.

| Class | Use |
|---|---|
| `.glass-btn-wrap` | Wrapper (sets pointer-events) |
| `.glass-btn-wrap--cta` | 200px-wide CTA variant |
| `.glass-btn` | Inner button (46px / 58px CTA variant) |
| `.glass-btn-shadow` | Animated shadow underlay |
| `.glass-btn span` | Content; transitions on hover |

### 10.2 Glass card (`.rec-glass-card`)

| Property | Value |
|---|---|
| Backdrop filter | `blur(8px)` |
| Border | `1px solid rgba(255,255,255,0.7)` |
| Box shadow | `inset 0 1px 1px #ffffffcc, 0 4px 24px rgba(0,0,0,0.09)` |
| Hover transform | `translateY(-6px) scale(1.015)` |

### 10.3 Glass pill (`.rec-glass-pill`)

Same backdrop filter pattern as glass card, with `border-radius: 999px`.

### 10.4 Section structure lines

| Class | Use |
|---|---|
| `.section-lines-dark` | 1px vertical hairlines on dark sections |
| `.section-lines-light` | 1px vertical hairlines on light sections (blue-tinted) |
| `.grid-section` | Wrapping selector for grid line layout |
| `.grid-section + .grid-section` | `margin-top: -1px` to collapse adjacent borders |
| `.grid-section-fade-top` | Top fade gradient |

### 10.5 Marquees

| Class | Animation | Duration |
|---|---|---|
| `.unique-spots-ticker` | unique-spots-ticker-scroll | 50s linear infinite |
| `.trusted-marquee` | trusted-marquee-scroll | 40s linear infinite |
| `.adventurers-marquee` | trusted-marquee-scroll | 35s linear infinite |
| `.recommendations-marquee` | recommendations-marquee-scroll | 60s linear infinite (pause on hover) |

### 10.6 Recommendation orbs

`.rec-orb-1`, `.rec-orb-2`, `.rec-orb-3`, `.rec-orb-4` — 440–640px gradient orbs with `radial-gradient`, `filter: blur(72-80px)`, animated drift via `rec-orb-drift-a/b`.

### 10.7 Other utility classes

| Class | Use |
|---|---|
| `.bullet-halo` / `.bullet-halo-dark` | Sonar pulse on list bullets |
| `.case-intro-card` | Section D case intro card with hover overlay |
| `.case-intro-arrow` / `.see-case-studies-arrow` | Arrow bounce / float animations |
| `.travel-promo-float` | Sinusoidal hover for emojis (8s) |
| `.hover-bee` | Bee-like wobble for emojis |
| `.phone-clickable` | Phone hover/active (translate + scale) |
| `.capabilities-scale` | Scroll-driven scale; disabled below 1374px |
| `.glass-rect` | Section E (Chat) sidebar glass cells (with SVG noise) |
| `.mobile-blur-reduce` / `.mobile-blur-none` | Mobile performance — reduce backdrop blur |
| `.lenis`, `.lenis.lenis-stopped`, `.lenis.lenis-smooth iframe` | Lenis smooth-scroll integration |
| `.ai-thinking-text` | AI shimmer wave animation |
| `.bg-mode-sepia`, `.bg-mode-dark`, `.dyslexia-mode` | Body-level accessibility modes |

### 10.8 `@property` registrations

`@property --angle-1` and `@property --angle-2` register CSS angle properties for the glass button's animated conic gradients. (CSS Houdini.)

---

## 11. Theming

Apply `data-theme="light"` (default) or `data-theme="dark"` to `<html>` or any container — every M3 system token resolves automatically.

```html
<html data-theme="dark">
```

**Body-level overrides** (higher specificity):
- `body.bg-mode-sepia` — re-targets M3 tokens to sepia palette
- `body.bg-mode-dark` — re-targets M3 tokens to dark palette (mirrors `[data-theme="dark"]` but on body)
- `body.dyslexia-mode` — replaces all `font-family` with OpenDyslexic

**Dynamic color:** generate a custom palette at https://m3.material.io/theme-builder, replace `--md-ref-palette-*` values in `tokens.css`. Every system + component token updates automatically.

---

## 12. Do's & Don'ts

| Do | Don't |
|---|---|
| Use `--md-sys-color-*` tokens for all colors | Hardcode hex values in components |
| Use `--md-sys-typescale-*` tokens for all M3-page text | Mix `--md-sys-*` and `--ent-*` in the same component |
| Use `--ent-*` tokens **only** inside `.ent-scope` | Leak `.ent-scope` rules to non-enterprise pages |
| Use `--md-sys-shape-corner-*` for M3 radii | Use `border-radius: 50%` for pills (use `corner-full`) |
| Use 4px-multiple spacing | Use odd values like 5px, 7px, 11px |
| Use `--md-sys-elevation-level*` for general shadows | Use `--ent-shadow-monitor` outside enterprise mockups |
| Use `data-theme="dark"` for dark mode | Maintain a separate dark stylesheet |
| Use `body.bg-mode-*` for accessibility modes | Apply accessibility modes via inline styles |
| Use `--md-sys-motion-duration-medium2` (300ms) for state changes | Use `linear` easing for state transitions |
| Pair `primary` background with `on-primary` text | Use `--md-ref-palette-*` directly in components |
| Use `var(--font-hero)` for hero `<h1>` | Hardcode `font-family: "Axiforma"` |
| Confirm minimum 48×48px touch targets | Make tap targets smaller for visual neatness |

---

## 13. Iteration & Known Gaps

### 13.1 Iteration principles

- One component at a time — don't refactor multiple sections at once.
- Reference **system** tokens (`var(--md-sys-color-primary)`), never reference tokens (`var(--md-ref-palette-primary40)`).
- Default cards → `corner-medium`, default buttons → `corner-full`.
- Default state-change duration → `--md-sys-motion-duration-medium2` (300ms).
- Apply `data-theme` rather than maintaining parallel stylesheets.
- For new pages with bespoke design needs, follow the `.ent-scope` pattern: scope tokens inside a single class, prefix with a 3-letter shorthand.

### 13.2 Known gaps (severity-ranked)

| Gap | Severity | Notes |
|---|---|---|
| **Three competing systems coexist (M3 + globals + .ent-scope)** | Medium | M3 is canonical; ent-scope adds page-local typography and palette. Designers should know which scale to use where. |
| **No `--md-sys-spacing-*` tokens** | Medium | M3 spacing is by convention only (not tokenized). `.ent-scope` *does* tokenize spacing. |
| **DM Sans serves as both `brand` and `plain`** | Low | M3 spec recommends two distinct typefaces; both aliases resolve to DM Sans. |
| **Axiforma not bundled via next/font** | Low | Self-hosted .woff2; no automatic preload. |
| **Multiple cormorant-garamond definitions** | Low | Both `app/fonts.ts` (Google) and `lib/fonts.ts` (local) declare it. Choose one. |
| **`instrumentSerif` defined but never applied at layout level** | Low | Available via import; apply at the page level if needed. |
| **No state-layer tokens used in observable components** | Low | Opacity tokens exist; components compose hover/focus differently. |
| **No CMYK / print color formats** | Low | M3 colors are RGB only. |
| **No logo / iconography spec in tokens** | Low | Visual identity bundle separate from this token system. |
| **Two `0066CC` accent declarations** | Low | `--accent` (globals) and `--ent-blue-tint` (enterprise) are the same value but in different scopes. |

### 13.3 Provenance

| Section | Source file |
|---|---|
| §1.1–1.3 M3 colors | `design-system/tokens.css` |
| §1.4 Globals brand colors | `app/globals.css` |
| §1.5 Section-line utility colors | `app/globals.css` |
| §1.6 Enterprise palette | `components/enterprise/enterprise-tokens.css` |
| §1.7 Body-mode overrides | `app/globals.css` |
| §2.1 M3 type scale | `design-system/tokens.css` |
| §2.2 Project fonts | `app/fonts.ts`, `lib/fonts.ts` |
| §2.3 `--font-hero` | `app/globals.css` |
| §2.4 `@theme` additions | `app/globals.css` |
| §2.5 Enterprise typography | `components/enterprise/enterprise-tokens.css` |
| §3 Shape | `design-system/tokens.css`, `components/enterprise/enterprise-tokens.css` |
| §4 Spacing | `components/enterprise/enterprise-tokens.css` (M3 has no tokens) |
| §5 Layout | `components/enterprise/enterprise-tokens.css`, `app/globals.css` |
| §6.1 M3 elevation | `design-system/tokens.css` |
| §6.2 Enterprise shadows | `components/enterprise/enterprise-tokens.css` |
| §7.1–7.2 M3 motion | `design-system/tokens.css` |
| §7.3 Enterprise motion | `components/enterprise/enterprise-tokens.css` |
| §7.4 Globals keyframes | `app/globals.css` |
| §8 State layers | `design-system/tokens.css` |
| §9 Component tokens | `design-system/tokens.css` |
| §10 Globals utility classes | `app/globals.css` |
| §11 Theming | `design-system/tokens.css`, `app/globals.css` |

All values verbatim from the source files at branch `experimentV6-newTechV3.1-NewUseCases-ValeV4`.

### 13.4 Files explicitly NOT consulted

- Any `*.md` file in the project (per user instruction — including any unused M3 spec doc).
- `components/products/how-it-works-tokens.css` (mapsgpt-page-scoped — out of scope per user).
- Any file under mapsgpt routes.
