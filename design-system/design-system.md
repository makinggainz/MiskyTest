---
project: MistX
version: 0.1.0
status: alpha
description: |
  Faithful Next.js + TS reconstruction of Mistral AI's homepage. Atmospheric
  sunset gradients (mustard / orange / deep red) over mountain photography,
  horizontal "sunset stripe" closer band, cream-yellow surfaces, saturated
  orange CTA, near-serif voice for hero displays. The "Mistral Rainbow"
  (red → orange-dark → orange → orange-light → yellow) is the brand's
  signature palette and ships in tokens.css as `--mistral-footer-band-2`
  through `-6`.
brand_voice: |
  "Use these assets with responsibility and respect." (mistral.ai/brand)
  Brand chose Arial for "universal appeal and captivating simplicity."
font_stack:
  declared: "Rubik (next/font/google)" — used by the homepage we cloned
  brand_spec: "Arial" — declared on mistral.ai/brand
  inconsistency: yes — the token --font-sans starts with Arial, but app/layout.tsx forces Rubik via next/font
brand_color:
  hex: "#ff8205"
  rgb: "255/130/5"
  cmyk: "0/49/98/0"
  name: "Mistral Orange"
methodology: Tailwind v4 utility-first + CSS custom-property tokens
canonical_files:
  tokens: design-system/styles/tokens.css
  utilities: design-system/styles/utilities.css
  reference: design-system/design-system.md (this file)
sources_ranked:
  authoritative_extracted:
    - design-system/styles/tokens.css (extracted from the homepage's compiled CSS)
  authoritative_brand:
    - https://mistral.ai/brand (Mistral's own brand page — color hex/RGB/CMYK + logo + font)
  synthesized:
    - "Component patterns under §8 derived from observed Tailwind class composition in mistral.ai HTML"
  suggested_third_party:
    - "Elevation scale (§6.2), animation timings (§7.3), component token naming (§8) — gap-fillers from a community replication; not validated against the live site"
coverage:
  - homepage (this project ports it)
  - "(out of scope) Le Studio, Coding solutions, news article, contact form, services tier page"
last_updated: 2026-05-06
---

# MistX — Design System

> Source-of-truth ranking, top to bottom:
> 1. **[`styles/tokens.css`](styles/tokens.css)** (235 tokens, extracted verbatim from the homepage)
> 2. **[mistral.ai/brand](https://mistral.ai/brand)** (Mistral's own brand spec — colors, font, logo)
> 3. **Synthesized patterns** (component conventions derived from observed Tailwind classes)
> 4. **3rd-party recommendations** (elevation scale, motion timings, component naming — gap-fillers, marked clearly)
>
> Where they conflict, #1 wins.

---

## 0. Philosophy

MistX is a **utility-first** system, not a component-token system. You write Tailwind classes (`bg-mistral-black text-white rounded-md p-md`) and they resolve to tokens. Component-specific tokens (`--button-bg`, `--card-radius`) are NOT the primary unit of design; they exist only where genuinely component-scoped (`--nav-height`, `--logoloop-gap`).

If a token doesn't exist for the value you need, **don't invent one**. Either compose existing utilities or extend the token set in `tokens.css` and document it here.

**Brand philosophy (from mistral.ai/brand):** treat brand assets with responsibility and respect. The chosen typeface (Arial) is meant to convey *universal appeal and captivating simplicity*.

---

## 1. Color

48 unique color tokens in tokens.css plus a 12-step Mistral Sunshine ramp. All Mistral brand colors are HSL custom properties wrapped in `hsl(var(--name))`, so dark-mode variants can override the inner HSL components without re-declaring the outer token.

### 1.1 Mistral Rainbow — the brand signature 🌈

The Mistral Rainbow is the **primary brand color story**. It runs across the page as a horizontal stripe (the "sunset band" / footer rainbow) and the gradient at the closer of every page. mistral.ai/brand specifies these 5 stops with exact print color formats:

| # | Brand name | Hex | RGB | CMYK | Token in our system |
|---|---|---|---|---|---|
| 1 | Red | `#e10500` | 225/5/0 | 0/98/100/12 | `--color-mistral-footer-band-6` |
| 2 | Orange Dark | `#fa500f` | 250/80/15 | 0/68/94/2 | `--color-mistral-footer-band-5` (≈ matches HSL `17 96% 52%`) |
| 3 | Orange | `#ff8205` | 255/130/5 | 0/49/98/0 | `--color-mistral-footer-band-4` (HSL `30 100% 51%`) |
| 4 | Orange Light | `#ffaf00` | 255/175/0 | 0/31/100/0 | `--color-mistral-footer-band-3` (HSL `41 100% 50%`) |
| 5 | Yellow | `#ffd800` | 255/216/0 | 0/15/100/0 | `--color-mistral-footer-band-2` (HSL `51 100% 50%`) |

⚠️ **Token name vs. brand semantics**: in tokens.css these are named `--mistral-footer-band-N` (because they were originally only used in the rainbow footer), but they ARE the official brand rainbow. Use them anywhere the rainbow gradient is needed — not just the footer.

### 1.2 Brand / Accent (3 tokens)

| Token | Resolves to | Hex | RGB | CMYK | Usage |
|---|---|---|---|---|---|
| `--color-mistral-orange` | `hsl(17 96% 52%)` | ≈ `#fc6c1c` | 252/108/28 | 0/57/89/1 | Primary brand accent for CTAs, highlights, hover states. ⚠️ Note: matches "Orange Dark" from brand spec, NOT brand's primary "Orange" #ff8205 — see §1.1. |
| `--color-mistral-orange-bright` | `hsl(30 100% 51%)` | ≈ `#ff7400` | 255/116/0 | 0/55/100/0 | Brighter dark-mode-friendly variant. |
| `--color-mistral-orange-darker` | (declared inline only) | — | — | — | Hover/pressed state. |

### 1.3 Cream / warm neutrals (3 tokens + 12-step Sunshine palette)

**Beige tokens (semantic):**

| Token | Resolves to | Approx hex | Brand-spec equivalent |
|---|---|---|---|
| `--color-mistral-beige` | `hsl(45 100% 96%)` | ≈ `#fffaeb` | **Beige Light** (#fffaeb in brand) ✓ exact match |
| `--color-mistral-beige-deep` | `hsl(45 100% 88%)` | ≈ `#ffefc1` | (close to Beige Medium #fff0c3) |
| `--color-mistral-beige-deeper` | `hsl(45.4 66.07% 78.04%)` | ≈ `#e6dbbe` | ≈ Beige Dark `#e9e2cb` (slight tint diff) |

**Mistral Sunshine palette (12 steps — undocumented in brand page but present in tokens.css):**

| Token | Hex |
|---|---|
| `--color-mistral-sunshine-50` | `#fff0c3` |
| `--color-mistral-sunshine-100` | `#ffe295` |
| `--color-mistral-sunshine-200` | `#ffdd8a` |
| `--color-mistral-sunshine-300` | `#ffd06a` |
| `--color-mistral-sunshine-400` | `#ffc452` |
| `--color-mistral-sunshine-500` | `#ffb83e` |
| `--color-mistral-sunshine-600` | `#ffad2e` |
| `--color-mistral-sunshine-700` | `#ffa110` |
| `--color-mistral-sunshine-750` | `#f2920b` |
| `--color-mistral-sunshine-800` | `#ff9500` |
| `--color-mistral-sunshine-900` | `#ff8a00` |
| `--color-mistral-sunshine-950` | `#ff7f00` |

This is the warm-yellow ramp used in product surfaces, badges, and gradient stops. Sunshine-50 (`#fff0c3`) is the same as the brand-page's "Beige Medium" — a designated cream surface.

### 1.4 Ink / text scale

mistral.ai/brand documents two black variants:

| Brand name | Hex | RGB | CMYK | Token |
|---|---|---|---|---|
| Black | `#000000` | 0/0/0 | 0/0/0/100 | `--mistral-deep-black` (HSL `0 0% 0%`) |
| Black Tinted | `#1e1e1e` | 30/30/30 | 0/0/0/88 | `--mistral-black-matt` (HSL `0 0% 12%` ≈ `#1f1f1f`) — 1 hex digit off from brand spec |

**Implementation tokens:**

| Token | Resolves to | Use |
|---|---|---|
| `--color-mistral-black` | `hsl(0 0% 12%)` ≈ `#1f1f1f` | Primary body text on light surfaces, buttons, headlines |
| `--color-mistral-black-tint` | `hsl(0 0% 24%)` ≈ `#3d3d3d` | Secondary text |
| `--color-foreground` | `hsl(0 0% 12%)` | Default page text color |
| `--color-muted-foreground` | `hsl(0 0% 24%)` | Muted text |

⚠️ **Gap**: there's no extended ink scale (charcoal/slate/steel/stone/muted greys). For non-default text shades, use the Tailwind palette tokens (`--color-gray-500` etc.) or compose with opacity.

### 1.5 Surfaces (semantic — 7 tokens)

| Token | HSL | Hex | Use |
|---|---|---|---|
| `--color-background` | `45 100% 96%` | ≈ `#fffaeb` | Page background. Cream by default. |
| `--color-card` | `0 0% 100%` | `#ffffff` | Card surface (white). |
| `--color-popover` | `0 0% 100%` | `#ffffff` | Popover/dropdown surface. |
| `--color-primary` | `17 96% 52%` | ≈ `#fc6c1c` | Primary action background. |
| `--color-secondary` | `45 100% 88%` | ≈ `#ffefc1` | Secondary action surface (cream). |
| `--color-muted` | `45 100% 96%` | ≈ `#fffaeb` | Muted/disabled surface. |
| `--color-accent` | `17 96% 52%` | ≈ `#fc6c1c` | Accent surface (orange — same as primary). |
| `--color-destructive` | `1 100% 44%` | ≈ `#e10500` | Destructive (red — same as Rainbow Red). |

### 1.6 Foreground / on-color tokens (6 tokens)

For every semantic surface there's a `*-foreground` companion. **Honor the pairing**.

| Surface | Foreground | Foreground hex |
|---|---|---|
| `--color-background` | `--color-foreground` | ≈ `#1f1f1f` (mistral-black) |
| `--color-card` | `--color-card-foreground` | ≈ `#0a0a0b` |
| `--color-popover` | `--color-popover-foreground` | ≈ `#0a0a0b` |
| `--color-primary` | `--color-primary-foreground` | ≈ `#fffaeb` (cream) |
| `--color-secondary` | `--color-secondary-foreground` | `#000` |
| `--color-accent` | `--color-accent-foreground` | ≈ `#ffefc1` |
| `--color-muted` | `--color-muted-foreground` | ≈ `#3d3d3d` |
| `--color-destructive` | `--color-destructive-foreground` | ≈ `#fafafa` |

### 1.7 Hairlines / borders (3 tokens)

| Token | HSL | Use |
|---|---|---|
| `--color-border` | `45 100% 96%` (= cream) | Default hairline color. Very subtle on cream backgrounds. |
| `--color-input` | `240 5.9% 90%` ≈ `#e3e3ea` | Form input border. |
| `--color-ring` | `45 100% 96%` | Focus ring color. |

⚠️ **Gap**: no graded hairline scale (soft/strong). For more contrast use `border-mistral-beige-deep` or `border-mistral-black/20` (utility classes) inline.

### 1.8 Block / grid colors (12 tokens)

The marketecture diagram in section 2 uses a 7-color block system:

| Token | Hex | Note |
|---|---|---|
| `--block-1-color` | `#ffe295` | sunshine-100 |
| `--block-2-color` | `#ffd900` | bright yellow ≈ Rainbow Yellow |
| `--block-3-color` | `#ff8d06` | orange ≈ Rainbow Orange |
| `--block-4-color` | `#fef2cb` | pale cream |
| `--block-5-color` | `#ffe295` | sunshine-100 |
| `--block-6-color` | `#ffd900` | bright yellow |
| `--block-7-color` | `#ff8105` | brand Orange ✓ exact |
| `--block-grid-color` | `#fff0c3` | sunshine-50 |
| `--block-grid-color-2` | `#fef1c3` | near-sunshine-50 |
| `--block-size` | `25px` | base grid cell size |
| `--block-size-2` / `-3` | `25px` | duplicates |

These are also the **sunset gradient** stops — the horizontal sunset stripe band that appears as a closer at the bottom of pages (block-5 → block-6 → block-7 = yellow → bright-yellow → orange).

### 1.9 Tailwind palette (slate / gray / blue / amber / zinc / red / green / orange / yellow / lime / neutral)

Standard Tailwind palette tokens shipped in the bundle (`--color-blue-50` through `--color-blue-900`, etc.). Available, but Mistral's own design uses these sparingly — prefer `mistral-*` tokens for brand consistency.

---

## 2. Typography

### 2.1 Font families (4 tokens + brand spec)

| Token | Stack | Use |
|---|---|---|
| `--font-sans` | `Arial, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` | Default body + headings |
| `--font-mono` | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` | Code |
| `--font-vibe` | `"FragmentMono", "Consolas", "Courier New", Courier, monospace` | Alternate display mono |
| `--font-pixel` | `"Pixelbasel", "Consolas", "Courier New", Courier, monospace` | Specialty pixel display (rare) |

⚠️ **Font inconsistency:** mistral.ai/brand declares Arial as the official typeface ("for its universal appeal and captivating simplicity"). Our `--font-sans` token reflects this (Arial is first in the stack). HOWEVER, [`app/layout.tsx`](../app/layout.tsx) loads **Rubik** via `next/font/google` and applies it to `<html>`, overriding the token-level Arial preference. The original snapshot's compiled CSS also declares `font-family: "Rubik"` directly. This is an artifact of cloning the homepage at a point in time when Mistral may have been using Rubik. **Project decision needed:** keep Rubik (matches the snapshot) or switch to Arial (matches current brand spec).

### 2.2 Heading scale (Mistral's actual sizes — mobile + md)

Mistral's compiled CSS has explicit `--font-size-heading-{0,1,2,3}` and `-md` variants:

| Class / Token | Mobile size | Mobile line-height | `md:` size | `md:` line-height |
|---|---|---|---|---|
| `--font-size-heading-0` | 72px | 72px | 103px | 97.85px |
| `--font-size-heading-1` | 56px | 56px | 90px | 90px |
| `--font-size-heading-2` | 40px | 42px | 56px | 53.2px |
| `--font-size-heading-3` | 30px | 34.5px | 48px | 45.6px |
| `--font-size-subtitle` | 24px | 27.6px | 32px | 36.8px |

Mobile-first: the un-suffixed value applies until `md:` (≥ 768px) where the larger size kicks in.

### 2.3 Body type scale (Tailwind text-* tokens)

| Class | Size | Line-height token |
|---|---|---|
| `text-xs` | 0.75rem (12px) | `--text-xs--line-height: calc(1/.75)` |
| `text-sm` | 0.875rem (14px) | calc(1.25/.875) |
| `text-base` | 1rem (16px) | calc(1.5/1) |
| `text-lg` | 1.125rem (18px) | calc(1.75/1.125) |
| `text-xl` | 1.25rem (20px) | calc(1.75/1.25) |
| `text-2xl` | 1.5rem (24px) | calc(2/1.5) |
| `text-3xl` | 1.875rem (30px) | calc(2.25/1.875) |
| `text-4xl` | 2.25rem (36px) | calc(2.5/2.25) |
| `text-5xl` | 3rem (48px) | line-height: 1 |
| `text-6xl` | 3.75rem (60px) | line-height: 1 |
| `text-7xl` | 4.5rem (72px) | line-height: 1 |

### 2.4 Font weights (5 tokens)

| Token | Value |
|---|---|
| `--font-weight-normal` | 400 |
| `--font-weight-medium` | 500 |
| `--font-weight-semibold` | 600 |
| `--font-weight-bold` | 700 |
| `--font-weight-black` | 900 |

### 2.5 Tracking + leading (7 tokens)

| Token | Value | Usage |
|---|---|---|
| `--tracking-tight` | -0.025em | Display headings |
| `--tracking-wide` | 0.025em | Eyebrows, small caps |
| `--tracking-wider` | 0.05em | Emphasis labels |
| `--tracking-widest` | 0.1em | Uppercase micro-text |
| `--leading-tight` | 1.25 | Headlines |
| `--leading-normal` | 1.5 | Default body |
| `--leading-relaxed` | 1.625 | Long-form prose |

### 2.6 Typography pairing principle

Mistral's voice (per brand page + observed homepage usage):
- **Headlines**: large, slightly tight tracking, Arial (per brand) / Rubik (current implementation)
- **Body**: same family at 1rem, line-height 1.5
- **Code/mono**: ui-monospace stack
- The brand favors **single-family pairing** (no editorial-serif + sans pairing). Don't introduce a second family unless the brand spec changes.

---

## 3. Border Radius (6 tokens)

| Token | Value | Use |
|---|---|---|
| `--radius` | `0rem` | **Base anchor — square by default.** This is unusual; Mistral leans squared corners. |
| `--radius-sm` | `calc(--radius - 4px)` (clamps to 0) | "Smaller than base" — but base is 0, so effectively 0 |
| `--radius-md` | `calc(--radius - 2px)` (clamps to 0) | Default for buttons / cards |
| `--radius-lg` | `var(--radius)` (= 0rem) | Same as base |
| `--radius-xl` | 0.75rem | Soft corner for cards in some contexts |
| `--radius-2xl` | 1rem | Large containers |
| `--radius-3xl` | 1.5rem | Hero / standout containers |
| `rounded-full` (Tailwind) | 9999px | Pills, badges |

**Rules:**
- **Mistral defaults to square corners** (`--radius: 0rem`). Don't reach for rounded utilities unless the design explicitly calls for them.
- Pills/chips use `rounded-full`.
- For deliberately soft cards, use `rounded-xl` / `rounded-2xl`.
- Never write `border-radius: 11px` — use a token.

---

## 4. Spacing (4px base — 16 tokens)

Mistral uses **two parallel** spacing scales that resolve to identical values (Tailwind's `--spacing-*` and Mistral's `--gap-*`):

| Tokens | px | Semantic use |
|---|---|---|
| `--spacing-sm` | 12 | Tight padding, icon gaps |
| `--spacing-md` / `--gap-md` | 16 | Standard padding |
| `--spacing-xl` / `--gap-xl` | 24 | Component padding, between cards in a grid |
| `--spacing-2xl` / `--gap-2xl` | 32 | Section content gaps |
| `--spacing-2xl-2` / `--gap-2xl-2` | 40 | Larger between-block gaps |
| `--spacing-3xl` / `--gap-3xl` | 48 | Vertical rhythm between blocks |
| `--spacing-4xl` / `--gap-4xl` | 64 | Major section vertical gap |
| `--spacing-5xl` | 96 | (not duplicated in `--gap-*`) |
| `--spacing-6xl` / `--gap-6xl` | 128 | Hero / above-the-fold spacing |

**Responsive context tokens (used inline):**

| Token | Default | Inline override use |
|---|---|---|
| `--space-mobile` | 64px | Section gap on mobile |
| `--space-desktop` | 64px | Section gap on desktop |

Applied via `style={{ '--space-mobile': '32px', '--space-desktop': '96px' }}` on layout wrappers.

**Touch targets:** buttons 40–44px height minimum; inputs 44px; pill tabs 32px desktop / 44px mobile.

---

## 5. Layout

### 5.1 Container widths (3 tokens)

| Token | Width | Use |
|---|---|---|
| `--container-xs` | 20rem (320px) | Mobile column / centered narrow form (~contact form is ~520px which falls between xs and lg) |
| `--container-lg` | 32rem (512px) | Narrow lead/eyebrow content |
| `--container-7xl` | 80rem (1280px) | **Default page container — Mistral's marketing max-width** |

Default gutter: ~24px (use `--space-xl`).

### 5.2 Page-level layout patterns observed

| Pattern | Description |
|---|---|
| **Hero band** | Full-width gradient (orange linear-gradient over mountain photography) at 700–740px height, single column on mobile, single column with 60% text + 40% (illustrative) on desktop |
| **Logo marquee** | `.logoloop` horizontal scroll across full container width below hero |
| **Value-props grid** | 2-column on `md:` and up: hero image left + 4 stacked feature blocks right |
| **Customer carousel** | Section 1 — full-bleed black cards 1248×600px max, swipe carousel |
| **Marketecture image** | Section 2 — single centered image inside `bg-grid-pattern` background |
| **Privacy/deploy band** | Section 3 — central text with floating logo squares positioned absolute around it |
| **Footer rainbow band** | Horizontal multi-stop sunset gradient, full-width, edge-to-edge — the brand's signature closer |

### 5.3 Breakpoints (Tailwind defaults + 2 custom)

| Breakpoint | Min-width | Source |
|---|---|---|
| `sm` | 640px | Tailwind default |
| `md` | 768px | Tailwind default |
| `lg` | 1024px | Tailwind default |
| `xl` | **1248px** | Custom — `--breakpoint-xl` |
| `2xl` | 1536px | Tailwind default |
| `4xl` | **1440px** | Custom — `--breakpoint-4xl` |

Note: `xl` (1248px) is wider than `4xl` (1440px) is — this is intentional: `xl` matches `--container-7xl` (1280px container width) plus 32px of horizontal breathing room, while `4xl` represents "ultra-wide desktop" for typography upscaling.

---

## 6. Elevation

### 6.1 What's actually in tokens.css

⚠️ **Mistral does not have a graded elevation scale.** Their compiled CSS ships exactly **one** named shadow:

| Token | Value | Use |
|---|---|---|
| `--shadow-deploy-logo` | (multi-stop drop shadow) | Floating logo squares in the deploy/privacy section ONLY |

### 6.2 RECOMMENDED elevation scale (gap-filler — not from Mistral)

Since the system doesn't ship a graded elevation system, here's a **recommended 5-level scale** for new components. ⚠️ **This is a 3rd-party suggestion / community convention — NOT extracted from mistral.ai.** Do not put these in `tokens.css` unless the team agrees to adopt them officially.

| Level | Shadow | Use |
|---|---|---|
| 0 | none + 1px hairline border | Flat (filled containers, cards on cream background) |
| 1 | `0 1px 2px rgba(0,0,0,0.04)` | Subtle lift — resting cards |
| 2 | `0 4px 12px rgba(0,0,0,0.04)` | Standard cards / popovers |
| 3 | `0 12px 24px -4px rgba(0,0,0,0.08)` | Mockup illustrations, prominent cards |
| 4 | `0 16px 48px -8px rgba(0,0,0,0.12)` | Modals / dialogs / sheets |

For most everyday needs use Tailwind's stock `shadow-sm` / `shadow` / `shadow-md` / `shadow-lg` / `shadow-xl` / `shadow-2xl` utilities (compiled into `utilities.css`).

---

## 7. Motion

### 7.1 Easing (3 tokens)

| Token | Curve |
|---|---|
| `--ease-in` | cubic-bezier(.4, 0, 1, 1) |
| `--ease-out` | cubic-bezier(0, 0, .2, 1) |
| `--ease-in-out` | cubic-bezier(.4, 0, .2, 1) |

Default transition: `--default-transition-duration: .15s` + `--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1)`.

### 7.2 Animations (5 keyframes — declared in tokens.css)

| Token | Duration | Use |
|---|---|---|
| `--animate-spin` | 1s linear infinite | Loading indicators |
| `--animate-pulse` | 2s cubic-bezier(.4,0,.6,1) infinite | Skeleton loaders |
| `--animate-rotate-y` | 1s ease infinite | Decorative element rotation |
| `--animate-accordion-down` | 0.2s ease-out | Disclosure open |
| `--animate-accordion-up` | 0.2s ease-out | Disclosure close |

### 7.3 RECOMMENDED transition timings (gap-filler)

⚠️ **Mistral doesn't ship explicit transition-duration tokens beyond `.15s` default.** A 3rd-party suggestion proposes:

| Use | Duration | Easing |
|---|---|---|
| Default state changes | 150ms | `--ease-in-out` |
| Hover transitions | 150–200ms | `--ease-out` |
| Modal enter | 200ms | `--ease-out` |
| Modal exit | 150ms | `--ease-in` |
| Page transitions | 300ms | `--ease-in-out` |

These are conventions, not extracted from the live site. The live site uses `transition-colors duration-500` and `transition-opacity duration-500` (500ms — slower than typical) on the nav, suggesting Mistral leans toward calmer transitions than the recommendation above.

---

## 8. Component patterns

> Component-level tokens are sparse. The patterns below are **synthesized** from observed Tailwind class compositions in the live mistral.ai HTML. Recommendation: don't introduce per-component tokens unless a pattern is reused in 3+ places.

### 8.1 Buttons (synthesized — no named tokens currently)

**Base pattern:**

```html
<button class="inline-flex items-center justify-center gap-md whitespace-nowrap
               rounded-md ring-offset-background transition-colors
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
               disabled:pointer-events-none disabled:opacity-50">
```

> Note: the outline variant (`bg-transparent` + `border`) overrides the default `rounded-md` and uses `rounded-full` instead — see the `button-secondary` row below.

**Variants observed:**

| Variant name (suggested) | Class composition |
|---|---|
| `button-primary` | `bg-mistral-black text-white hover:bg-mistral-black/90 px-4 py-2 text-sm` |
| `button-accent` | `bg-mistral-orange text-white hover:bg-mistral-orange-bright` |
| `button-on-dark` (white-glass) | `bg-white/10 text-white hover:bg-white hover:text-mistral-black` |
| `button-on-cream` | `bg-mistral-black/10 text-mistral-black hover:bg-mistral-black hover:text-white` |
| `button-secondary` (outline) | `border border-current bg-transparent rounded-full` — outline pattern uses full radius (pill) so the empty fill reads as a deliberate shape, not as un-styled square edges |
| `button-link` | `border-b border-current pb-2 inline-flex items-center gap-3` |
| `button-disabled` | append `disabled:opacity-50 disabled:pointer-events-none` |

**Heights:** `h-10` (40px) standard / `h-11` (44px) touch-friendly. Hit target ≥ 44px.

### 8.2 Cards / Containers (synthesized)

| Variant (suggested) | Class composition |
|---|---|
| `card-base` | `bg-card text-card-foreground rounded-md p-md` |
| `card-feature` | `bg-mistral-beige-deep p-xl rounded-md` |
| `card-cream` | `bg-mistral-beige p-md` |
| `card-cream-soft` | `bg-mistral-beige p-xl border border-mistral-beige-deep` |
| `card-photographic` | `bg-mistral-black text-white p-6 md:p-10 max-w-[1248px] h-[600px] relative overflow-hidden` (matches Stellantis/ASML/CMA CGM customer cards) |
| `card-feature-product` | (TBD — pattern not in MistX yet) |
| `pricing-card` | (TBD) |
| `pricing-card-featured` | (TBD) |

### 8.3 Badges / Status chips

```html
<span class="rounded-full shrink-0 border border-current relative inline-block px-3 py-1">
  Manufacturing
</span>
```

| Variant (suggested) | Class composition |
|---|---|
| `badge-orange` | `bg-mistral-orange text-white rounded-full px-3 py-1 text-xs` |
| `badge-cream` | `bg-mistral-beige border border-mistral-black/20 rounded-full px-3 py-1 text-xs` |
| `badge-dark` | `bg-mistral-black text-white rounded-full px-3 py-1 text-xs` |
| `promo-banner` | (typically a horizontal cream strip above the nav) |

### 8.4 Inputs / Forms (no examples on homepage)

The homepage has **no forms**. If you add forms (contact page, etc.), follow this pattern:

```html
<input class="border border-input bg-background rounded-md h-10 px-3 text-sm
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
              disabled:opacity-50" />
<textarea class="border border-input bg-background rounded-md min-h-[120px] p-3 text-sm
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
```

| Variant (suggested) | Class composition |
|---|---|
| `text-input` | base above |
| `text-input-focused` | `focus-visible:ring-2 focus-visible:ring-ring` |
| `text-area` | `min-h-[120px] p-3` |
| `contact-form-panel` | `bg-mistral-beige border border-border rounded-md p-xl max-w-[520px]` |

### 8.5 Tabs (no examples on homepage — pattern reserved)

| Variant (suggested) | Class composition |
|---|---|
| `pill-tab` | `rounded-full px-4 py-2 text-sm border border-current` |
| `pill-tab-active` | `bg-mistral-black text-white border-mistral-black` |
| `segmented-tab` | `border-b border-transparent pb-3 text-sm` |
| `segmented-tab-active` | `border-b-2 border-mistral-orange text-mistral-orange` |

### 8.6 Code blocks (no examples on homepage — recommended pattern)

| Variant (suggested) | Class composition |
|---|---|
| `code-block` | `bg-mistral-black text-white font-mono text-sm rounded-md p-md` |
| `code-block-header` | `flex items-center justify-between border-b border-white/10 pb-2 mb-2` |

### 8.7 Doc / marketing tiles

| Variant | Pattern |
|---|---|
| `feature-icon-tile` | `bg-mistral-beige p-xl rounded-md` with icon top + title + body |
| `industry-tile` | similar to `card-feature` with industry icon + label |
| `stat-cell` | text-4xl/5xl number + caption below |
| `customer-testimonial-card` | photographic card pattern from §8.2 |
| `logo-wall-item` | `h-8 to h-10` constrained logo with `object-contain` |
| `faq-accordion-item` | uses `--animate-accordion-down/up` tokens |
| `app-store-badge` | external badge image, ~40-44px tall |

### 8.8 Top nav (2 tokens)

| Token | Value | Use |
|---|---|---|
| `--nav-height` | 100px | Desktop nav height |
| `--nav-height-mobile` | 88px | Mobile nav height |

Implementation in [`components/nav/Nav.tsx`](../components/nav/Nav.tsx). Nav slides a white backdrop down when scrolled past 80px.

### 8.9 Logo marquee (custom CSS class with inline-style props)

`.logoloop` with 2 inline style props:
- `--logoloop-gap: 72px`
- `--logoloop-logoHeight: 38px`

Set on the wrapping `<div>` inline; not in tokens.css. The horizontal scroll animation is JS-driven (currently frozen at the snapshot's `transform` value).

### 8.10 Signature elements

The defining brand visuals — never modify these without designer review:

| Element | Description | Implementation |
|---|---|---|
| `hero-band-sunset` | 135° gradient (orange-dark → orange → beige) over mountain photography. Hero panel of the homepage. | `bg-linear-to-bl from-[#9F521A] via-[#D3812F] to-[#B35D20]` + photo `<img>` overlay |
| `sunset-stripe-band` | Full-width horizontal multi-stop gradient as a closer at the bottom of every page. Uses Mistral Rainbow stops. | Footer rainbow rendered in `SiteFooter.tsx`. **The key brand signature.** Don't drop it. |
| `cta-banner-cream` | Cream-surfaced CTA panel, often near the page bottom | `bg-mistral-beige border border-mistral-beige-deep p-xl` |
| `footer-region` | Dark footer below sunset stripe with 4–6 column nav, social icons, copyright | `SiteFooter.tsx` |
| `footer-link` | `text-sm hover:underline transition-opacity opacity-80 hover:opacity-100` | — |

---

## 9. Logo

(Cataloged from mistral.ai/brand. **Logo files are not in the project yet** — download from the brand page when needed.)

### 9.1 Logo variants (11 total)

| Family | Variants |
|---|---|
| Full Logo | Rainbow Dark, Rainbow Light, Full Dark, Full Light |
| Rainbow Logo | Dark, Light |
| M Icon | Rainbow, Black, White, Orange |
| M Icon Boxed | Rainbow, Black, Orange |

### 9.2 Recommendations (gap — not in brand spec)

The brand page does NOT publish: clear-space rules, minimum sizes, exclusion-zone diagrams, or do/don't logo placement.

⚠️ **Until the brand publishes formal rules, follow these conventions:**
- Clear space ≥ height of the M icon on all sides
- Minimum logo height: 24px (digital), 12mm (print)
- Don't recolor outside the published variants
- Don't stretch, distort, or apply effects (drop shadow, glow, outline)
- Don't lock up Mistral logo with another logo — separator pipe ≥ 24px

### 9.3 Brand voice (from brand page)

Per mistral.ai/brand: *"use these assets with responsibility and respect"*. Treat the rainbow + logo as Mistral's most recognizable signatures — they should appear on every page in their canonical form.

---

## 10. Imagery / Photography

The brand voice on the homepage uses **mountain photography under sunset gradients** for the hero. Style guidance (synthesized — not in brand spec):

- 16:9 aspect ratio for hero photography
- Cool-to-warm orange palette overlay (135° linear gradient)
- Subject silhouettes against sunset sky preferred
- Logo wall items: 60–80px height, monochromatic at default opacity, color on hover

⚠️ **Gap**: no formal photography spec exists from Mistral. Follow the homepage's hero precedent.

---

## 11. Iconography

Observed pattern: **simple line / 2-state icons** rendered inline as SVG. 12px–24px sizes. Use `currentColor` so they inherit text color.

⚠️ **Gap**: no icon library is shipped with MistX. Mistral uses bespoke SVG icons embedded in the markup. For a richer icon set, pull from `lucide-react` (or similar) — which is what ColumbusPage does.

---

## 12. Do's and Don'ts

| Do | Don't |
|---|---|
| Use Tailwind utilities that resolve to tokens (`bg-mistral-orange`, `text-mistral-black`) | Hardcode hex/RGB in JSX inline styles |
| Pair surfaces with their `*-foreground` (e.g. `bg-card text-card-foreground`) | Use raw `text-white` on `bg-card` (white-on-light fails contrast) |
| Use `--space-*` / `--gap-*` for spacing (always 4px multiples) | Introduce non-grid values like `5px`, `7px`, `11px` |
| Use Mistral's square corners (`--radius: 0rem`) by default; opt into rounded explicitly | Round everything by default — Mistral leans squared |
| Keep the orange to CTAs and active states only | Use orange decoratively (it's a signal color) |
| Always include the sunset-stripe band as a page closer (`SiteFooter`) | Drop the rainbow stripe — it's the brand signature |
| Use Rainbow tokens (`--mistral-footer-band-2..6`) outside the footer when a rainbow is needed | Repurpose individual rainbow stops as accent colors |
| Use `aria-haspopup="menu"` + `aria-expanded` on dropdown triggers | Render dropdown content unconditionally |
| Use `rounded-full` for pills/badges only | Add a second sans-serif font (Mistral is single-family) |
| Add new tokens to `tokens.css` AND document them in this file | Sneak undocumented `--my-thing` into a component file |
| Confirm minimum 44×44px touch targets on mobile | Make tap targets smaller than 40px |
| Honor the `dark:` variants compiled into the bundle | Maintain a separate dark stylesheet |

---

## 13. Responsive

Mobile-first. Default styles apply to all sizes; `md:`, `lg:`, `xl:`, `4xl:` prefixes upgrade.

### 13.1 Breakpoint behavior table

| Breakpoint | Width | Layout pivots |
|---|---|---|
| **base** (< 640px) | Mobile portrait | Single column. Drawer nav. Hero full-bleed photo + short text. Type at `text-base` → `text-2xl` for headlines. |
| `sm:` (≥ 640px) | Mobile landscape | Mostly inherits base. Some 2-column adjustments. |
| `md:` (≥ 768px) | Tablet + small laptop | Nav becomes inline. Hero text + photo split. First multi-column grids (3-up features, 4-up cards). Type upgrades via `md:`. |
| `lg:` (≥ 1024px) | Standard desktop | Full 6-item nav visible; CTAs + Try Studio split button visible. 2-column hero. Customer carousel at full size. |
| `xl:` (≥ 1248px — custom) | Wide desktop | Container max-width caps. Hero photo at full breath. |
| `4xl:` (≥ 1440px — custom) | Ultra-wide | Typography upscales (heading-0 jumps to 103px). Whitespace expands. |

### 13.2 Hero responsive scale (for reference)

The 3rd-party replication suggests scaling hero text from 40 → 52 → 64 → 76 → 84px across breakpoints. **Mistral's actual values** (per tokens.css):

| Token | Mobile | Desktop (`md:`) |
|---|---|---|
| heading-0 | 72px | 103px |
| heading-1 | 56px | 90px |
| heading-2 | 40px | 56px |
| heading-3 | 30px | 48px |

Use Mistral's actual values, not the suggested scale.

### 13.3 Element-level responsive guidance

| Element | Mobile | Desktop |
|---|---|---|
| Promo banner | Hidden or condensed | Full text |
| Top nav | 88px tall, hamburger drawer | 100px tall, inline links |
| Hero image | 16:9, full-bleed | 16:9, contained inside `max-w-1280px` |
| Logo wall | 60–80px tall logos | 60–80px tall logos (same) |
| Pricing cards | Stacked single column | 4-up |
| Stat row | 1-up | 3-up |
| Footer | Stacked columns | 4–6 columns |
| **Sunset stripe** | Always full-width | Always full-width |

---

## 14. Iteration Guide & Known Gaps

### 14.1 Adding a new token

1. Decide if it really belongs as a token (will it be reused in 3+ places?) or is one-off (use inline `style={{ ... }}` with `var(--existing)`).
2. Add the declaration to [`styles/tokens.css`](styles/tokens.css) inside the existing `:root, :host` block.
3. Document it here in the matching section.
4. If you want a Tailwind utility class for it (e.g. `bg-my-color`), this currently requires modifying `utilities.css` directly — see "no source tailwind.config.ts" gap below.

### 14.2 Iteration principles

- One component at a time — don't refactor multiple sections in a single change.
- Reference tokens directly in components (`bg-mistral-orange`, not `bg-[#fc6c1c]`).
- Default body text → `text-base` (`body-md` semantic).
- Default page hero → `--font-size-heading-0` + `md:` upgrade.
- Keep the Mistral Rainbow + sunset stripe as canonical closers on every page.
- Confine `--color-mistral-orange` to action signals (CTAs, active state, hover); not decorative.

### 14.3 Known gaps (severity-ranked)

| Gap | Severity | Notes |
|---|---|---|
| **Font inconsistency: Arial (brand) vs Rubik (app)** | High | Brand spec says Arial; we ship Rubik via next/font/google. Project decision needed. |
| **No source `tailwind.config.ts`** | High | We ship Mistral's compiled output. Adding a class that doesn't exist requires hand-editing `utilities.css` until source recompilation is added. |
| **No graded ink scale** | Medium | Just `mistral-black` + `mistral-black-tint`. Add charcoal/slate/steel if reuse increases. |
| **No graded hairline tokens** | Medium | Only `--color-border`. Use `border-mistral-beige-deep` directly when needing a non-default. |
| **No graded elevation scale** | Medium | Mistral defines 1 named shadow. §6.2 is a recommended scale but not in tokens.css. |
| **No published dark-mode tokens** | Medium | The compiled `dark:` variants exist in utilities.css but no toggle UI. Adding a theme toggle is one wire-up away. |
| **No animation/transition timing tokens beyond `.15s` default** | Low | §7.3 recommends 150–200ms range. Mistral often uses 500ms (`duration-500`) on nav. |
| **No on-color tokens for `mistral-orange` / `mistral-black`** | Low | Implicit: white text on either. Document explicitly if reuse increases. |
| **No button / card / chip / input tokens** | Medium-Low | Mistral is utility-first. Patterns documented in §8 as recommended naming, not tokenized. |
| **No tabs, accordion, modal tokens** | Low | Not present in homepage. Add when components arrive. |
| **No form-success state pattern** | Low | No forms on homepage. Define when contact page is built. |
| **Sunset stripe gradient stops are token-named, not gradient-named** | Low | Tokens are `--mistral-footer-band-N`; consider aliasing as `--rainbow-{N}` for brand clarity. |
| **No clear-space / min-size logo specs** | Low | Brand page doesn't publish them. §9.2 has interim conventions. |
| **No formal photography / iconography spec** | Low | §10/11 capture observed style; no published guidance. |
| **Logo marquee animation frozen** | Component-level | The JS-driven horizontal scroll isn't replicated. |
| **Customer carousel doesn't rotate** | Component-level | Renders all 3 slides at once with snapshot's transform offset. |

### 14.4 Where things live

```
design-system/
├── design-system.md            ← this file (human reference)
└── styles/
    ├── tokens.css              ← :root token declarations (235 tokens)
    ├── utilities.css           ← compiled Tailwind utilities (~63 KB)
    ├── 01-background-images.css ← --sf-img-* (image-as-CSS-var refs)
    ├── 03-splide.css           ← carousel third-party
    ├── 04-katex.css            ← math rendering third-party
    ├── 05-axeptio.css          ← cookie banner third-party
    ├── 06-helper-sf-hidden.css ← Save-Page-As helper
    ├── 07-helper-empty-img.css ← empty-image hider
    └── 08-vendor-third-party.css ← misc vendor CSS
```

Imports flow through [`app/globals.css`](../app/globals.css) in cascade-correct order. Don't reorder without testing — utilities depend on tokens.

---

## 15. Provenance / Sources

| Section | Primary source | Authority |
|---|---|---|
| §1.1 Mistral Rainbow (hex/RGB/CMYK) | mistral.ai/brand | Brand authoritative |
| §1.2–1.7 Color tokens | tokens.css (extracted from snapshot) | Authoritative for our project |
| §1.4 Black variants (hex) | mistral.ai/brand | Brand authoritative — note 1-digit hex diff with our `--mistral-black-matt` |
| §1.8 Block grid colors | tokens.css | Authoritative |
| §1.9 Tailwind palette | tokens.css | Authoritative |
| §2.1 Font families | tokens.css + mistral.ai/brand | Both — see inconsistency note |
| §2.2 Heading scale | tokens.css | Authoritative |
| §2.3 Body type scale | tokens.css | Authoritative |
| §3 Border radius | tokens.css | Authoritative |
| §4 Spacing | tokens.css | Authoritative |
| §5.1 Containers, §5.3 Breakpoints | tokens.css | Authoritative |
| §5.2 Layout patterns | Observed homepage markup | Synthesized |
| §6.1 Elevation (1 shadow) | tokens.css | Authoritative |
| §6.2 5-level recommendation | 3rd-party community convention | Suggestion (NOT in tokens.css) |
| §7.1 Easing, §7.2 Animations | tokens.css | Authoritative |
| §7.3 Suggested transition timings | 3rd-party community convention | Suggestion |
| §8 Component patterns | Observed mistral.ai HTML class composition | Synthesized |
| §8.10 Signature elements | Brand identity + observed homepage | Synthesized |
| §9 Logo variants | mistral.ai/brand | Brand authoritative |
| §9.2 Logo conventions | Industry conventions | Suggestion (Mistral hasn't published) |
| §10 Imagery, §11 Iconography | Observed homepage style | Synthesized |
| §12 Do's and Don'ts | Mistral brand voice + utility-first methodology | Synthesized |
| §13 Responsive | tokens.css breakpoints + observed behavior | Authoritative + synthesized |
| §14 Gaps | Audit | Authoritative |
