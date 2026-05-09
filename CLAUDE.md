# CLAUDE.md — MistX project rules

This is a Next.js 16 + TypeScript + Tailwind v4 reconstruction of the Mistral AI homepage.

---

## ⚠️ MUST-READ: design-system-driven changes (the prime directive)

> The user wants this rule enforced **across all chats and all instances, always**. Honor it on every visual / element-level change in this project.

**When the user asks to change an element on any page, the change is to be reflected in the design system, not in a single component.**

The default mental model is *"every page is built FROM the design system, so the change should propagate everywhere the rule or element applies."*

### The workflow

1. **Identify the design-system rule that produces the requested element.**
   - Is it a token (color, spacing, radius, font-size)?
   - Is it a component pattern (button variant, card style, badge)?
   - Is it a utility class composition?
   - Is it a typography style (heading-large, body-medium)?
2. **Figure out every instance affected.** A single CTA button might map to 1 occurrence — or 5. Don't guess; grep / search the codebase to find them all.
3. **Make the change at the design-system level** — update the relevant token in [`design-system/styles/tokens.css`](design-system/styles/tokens.css) (or the active token file), the design-system spec in [`design-system/design-system.md`](design-system/design-system.md), and any component patterns documented there.
4. **Update the showcase pages** ([/design](app/design/page.tsx), [/ColumbusDesign](app/ColumbusDesign/page.tsx), [/compareM-C](app/compareM-C/page.tsx)) so they reflect the new state.
5. **Verify the change actually propagated** — run `npm run build`, then visually check (or curl + grep) each place the changed token/pattern is consumed. The change should affect *every* page where the rule applies.
6. **If anything's unclear, ASK BEFORE CHANGING.** Better to clarify than to silently apply the change in the wrong scope.

### When to scope a change to a single place

**Only when the user explicitly says** "only here," "just this one," "single place," "don't propagate," or similar. Otherwise: assume system-wide.

### Result quality is the highest priority

- Don't take shortcuts that produce a "looks right on this page" result if the design-system rule wasn't actually updated.
- Double-check after the work: re-grep, re-verify the build, re-load the relevant pages. If the change didn't propagate to all expected sites, the work isn't done.
- Documentation drift (design-system.md not matching tokens.css not matching components) is a defect, not acceptable trade-off.

### What this looks like in practice

| User says | Right interpretation |
|---|---|
| "Change the CTA button's hover color" | Find the CTA token / utility class. Update it in tokens.css + design-system.md + showcase. Verify every CTA across all pages reflects the change. |
| "Make the card padding tighter" | Find the card padding token. Update it. Verify every card (homepage carousel, marketecture frame, footer CTA, etc.) gets the new padding. |
| "Change the orange to a redder orange" | Update `--color-mistral-orange` (or whichever brand color is being changed). Verify everywhere `bg-mistral-orange` / `text-mistral-orange` is used. Consider whether `--mistral-footer-band-*` rainbow stops also need adjusting (they're related). |
| **"Make the hero CTA bigger — only on the homepage"** | Explicit single-place. Don't propagate. Apply locally to that one component. |

### .md files must stay current — always

> **Every time a design system rule changes, both `CLAUDE.md` and `design-system/design-system.md` must be updated in the same commit.** Never let the spec drift behind the code.

- `design-system/design-system.md` — human-readable token reference, component patterns, do/don't rules. Update the relevant section whenever a token value, component pattern, or visual rule changes.
- `CLAUDE.md` — project-wide conventions summary. Update the relevant table or rule whenever it no longer matches the actual code.
- If you changed it in `tokens.css` or a component and didn't update both `.md` files, the work is **incomplete**.

### Pre-change checklist (run mentally every time)

- [ ] What design-system rule does this element come from?
- [ ] How many places consume that rule?
- [ ] Am I editing the rule, not a single instance?
- [ ] Have I updated tokens / spec / showcase together?
- [ ] Have I updated **both `CLAUDE.md` and `design-system.md`** to reflect the new rule?
- [ ] Did I verify the change actually propagated?
- [ ] (For new UI) Did I read the neighboring sections and match their visual register?

---

## Design system: Mistral's tokens (NOT M3, NOT Hebbia BEM)

Don't confuse this project with sibling projects:
- **ColumbusPage** uses Material Design 3 (`--md-sys-*` tokens) — different system.
- **HebX** uses Hebbia's BEM modules + custom `--color-*` / `--space-*` / `--ff-*` token namespaces — different markup conventions.
- **MistX (here)** uses Mistral's own design system: ~1284 design tokens compiled with Tailwind utilities + `dark:` variants. Tokens live in [`design-system/styles/tokens.css`](design-system/styles/tokens.css); compiled utilities in [`design-system/styles/utilities.css`](design-system/styles/utilities.css).

### Token namespaces present

- `--color-*` — palette (`--color-primary`, `--color-blue-500`, `--color-mistral-orange`, `--color-mistral-beige-deep`, semantic role colors)
- `--space-*` — spacing scale + semantic (`--space-xl`, `--space-2xl`, `--space-mobile`, `--space-desktop`)
- `--block-*` — layout block tokens (`--block-1-color`, `--block-size`, `--block-grid-color`)
- `--animate-*` — animation tokens (`--animate-accordion-down`, `--animate-spin`, `--animate-rotate-y`)
- `--blur-*`, `--breakpoint-*`, `--font-*`, `--aspect-*`, `--ease-*`, `--text-*`

### CSS architecture

Tailwind utilities, **not BEM**. Class names look like `text-3xl md:text-5xl text-center mb-10` — composed utilities. The compiled utilities live in [`design-system/styles/utilities.css`](design-system/styles/utilities.css) and include all the `dark:` and breakpoint variants Mistral generated.

When adding new markup, prefer Tailwind utilities. If a utility doesn't exist in the compiled CSS, you'll need to either:
1. Use an inline `style={{}}` referencing the relevant CSS variable, or
2. Re-compile the CSS by adding the class to a Tailwind source config (currently the project ships compiled-only CSS, not source).

### Fonts

Two-font system loaded via [`app/fonts.ts`](app/fonts.ts) using `next/font/google`:

| Role | Font | CSS variable | Usage |
|---|---|---|---|
| Display / headings | **Funnel Display** | `--font-display` | `h1`–`h4`, hero titles, large UI labels |
| Body / copy | **Opening Hours Sans** (`public/fonts/`, `next/font/local`) | `--font-body` | Base `font-family` on `:root` |

`globals.css` applies `--font-body` at `:root` level and `--font-display` to `h1`–`h4`.
Opening Hours Sans only ships Regular weight — don't specify font-weight values other than 400 for body copy.
Don't introduce other fonts without updating this table and `app/fonts.ts`.

### Section spacing

**Standing rule — enforce on every visual change, always.**

| Gap location | Class | px |
|---|---|---|
| Between major sections | `py-10 md:py-[100px]` | 80px mobile (40+40) / 200px desktop (100+100) — padding not margin, so gaps never collapse |
| Between section heading and its content grid | `mb-10 md:mb-20` | 40px mobile / 80px desktop |
| Between h2 and a subtitle paragraph within a section heading block | `mt-6 md:mt-12` | 24px (`--gap-xl`) mobile / 48px (`--gap-3xl`) desktop |
| Between individual cards in a grid | `gap-4 md:gap-6` | 16px mobile / 24px desktop |

All sections must use these values. Never use `my-10 md:my-24` (margin-based section spacing — it collapses), `md:mb-12`, `md:gap-5`, or `mt-4` for heading-subtitle gaps — those are off-system values that caused inconsistency.

### Border radius

**Standing rule — enforce on every visual change, always.**

| Surface type | Radius | Token / class |
|---|---|---|
| CTA buttons (primary, accent, on-cream, on-dark, outline) | 7px | `rounded-[7px]` |
| Chips, badges, role pills, tabs, decorative circles | **pill** | `rounded-full` |
| Inputs, info panels, small surfaces | 10px | `rounded-[10px]` / `--radius-3xl` |
| Cards, dialogs, medium containers | 20px (squircle) | `rounded-[20px]` / `--radius-lg` |
| Large photographic / decorative surfaces | 8px | `rounded-[8px]` / `--radius-xl` |
| Hero containers | 9px | `rounded-[9px]` / `--radius-2xl` |
| Layout containers (`<section>`, full-width `<div>`) | **0 — square** | no `rounded-*` |
| Purely decorative circles (e.g. 8×8px color dots) | pill | `rounded-full` |

- **CTA buttons use `rounded-[7px]`** — primary, accent, on-cream, on-dark glass, and outlined CTAs.
- **Chips, badges, role pills, tabs, and decorative circles use `rounded-full`** — pill shape for everything that isn't a CTA.
- Cards use `rounded-[10px]`, photographic surfaces use `rounded-[8px]` — these do NOT get pill treatment.
- Token definitions live in `design-system/styles/tokens.css` under `--radius-sm` through `--radius-3xl`. Keep those in sync when the rule changes.
- Full rationale and all component-level patterns are in `design-system/design-system.md` §3 and §8.

### Page-scoped color exceptions

**Standing rule.** The cool pale-blue base palette (`--color-background`, the `mistral-beige-deep` border family, and the `mistral-sunshine-*` accents) is the default for every page in the project. Individual pages may override this base **only when explicitly authorised** as a documented exception below. New page-level color exceptions require a CLAUDE.md / design-system.md entry before shipping; an undocumented override is a defect.

**How an exception is implemented.** A `theme-{route}` class is applied to the route's outermost element (`<main className="theme-X bg-background">…`). The exception ships as **two CSS rules** in `globals.css`:

1. `body:has(.theme-X) { … }` — re-declares `--color-background` (and any neighbouring tokens). Hoisting to `body` means the `<Nav />` (a sibling of `<main>`, not a descendant) also inherits the override via the CSS custom-property cascade. The `:has()` selector ensures the variable redeclaration only fires when the route is active.
2. `.theme-X { background-image: …; --grid-color: …; }` — optionally paints a soft `background-image` overlay (radial / linear gradients in the new palette) so the page reads as a deliberate atmosphere rather than a flat fill, and overrides any *contextual* utility variables (e.g. `--grid-color` for `.bg-grid-pattern`) so global utilities pick up the page-scoped palette. This rule stays scoped to the page surface so the gradient does not bleed onto the Nav.

The `<SiteFooter />` is unaffected by the variable override because it uses its own dark gradient image, not `var(--color-background)`. If a future exception wants to retheme the footer too, override its `background:` declaration explicitly.

**Companion-token rule.** When a page exception introduces a palette that diverges from the global cool-blue family, **every cool-blue token the page consumes must have a warm companion** declared on `body:has(.theme-X)`. Naming convention is `--color-{route}-{role}` (e.g. `--color-elio-border`, `--color-elio-grid-dot`). Components inside the page reference these companions via `border-[color:var(--color-{route}-border,#FALLBACK)]` so the cool-blue value remains the global default and the warm value only takes effect inside the themed page. Without companion tokens, the page leaks the cool-blue family through borders, dots, and chips against a warm canvas — that visual dissonance is the defect this rule prevents.

**Approved exceptions.**

| Route | Class | Override | Surfaces affected | Why |
|---|---|---|---|---|
| `/elio` | `.theme-elio` | `--color-background: #FCF3E8` — **sampled from the centre of `ElioBackground2.png`** so the page bg meets the hero image edge with zero visible seam; companion stops `--color-elio-bg-light: #FEF6EB`, `--color-elio-bg-dark: #F6EBDE`; **warm companion tokens** `--color-elio-border: #D8C8AE` (replaces global `#C7D7F8` borders) and `--color-elio-grid-dot: #E5D9C5` (warms `.bg-grid-pattern` via `--grid-color` override on `.theme-elio`); soft warm radial gradient overlay on `<main>` | Page surface, Nav, every Elio section's hairline borders and dot grid. (Footer keeps its global dark gradient.) | Beach / sun-warmed-sand register for the consumer travel-discovery product. The cool pale-blue base reads as enterprise SaaS; the warm beige reads as lifestyle. The page also opts out of the global `MapShape` decoration. |

⚠️ **`#FCF3E8` is not a global token.** It's the central pixel value of `ElioBackground2.png` and exists **only** as the `--color-background` value inside `body:has(.theme-elio)`. Do not reference `#FCF3E8` elsewhere in the project; do not import it as a Tailwind utility; do not use it on any other route. Outside `/elio` the global pale-blue `--color-background` stays canonical. The point of using the sampled hex is that the page bg blends seamlessly into the hero image — that promise only holds on `/elio` because that's the only route serving `ElioBackground2.png`.

The `.theme-elio` rule lives in [`app/globals.css`](app/globals.css) under "Page-scoped color exception: /elio". Pair any future exception with a row in the table above, a companion-token block, and the corresponding section in [`design-system/design-system.md`](design-system/design-system.md). **Note: `--color-elio-*` tokens are page-scoped — do NOT promote them to global tokens or use them outside `/elio`.**

## Visual design intent — read before building any new UI

> This section exists because token knowledge alone is not enough. Knowing the palette doesn't tell you which part of the palette to use. These rules define the visual personality of the site and prevent generic, out-of-context design decisions.

### The site's visual character

MistX is **restrained and typography-forward**. Content sections feel quiet. The dominant impression when scrolling past Section1, Section2, and Section3 is:

- Pale `bg-background` (`hsl(220 89% 97%)`) as the overwhelmingly dominant surface
- Dark text carrying most of the meaning
- Space and type scale doing the design work, not color or decoration
- Strong brand color (the deep blues) used sparingly: hero band, CTAs, active states

There is a deliberate high-contrast between the deep-blue hero and the quiet pale content sections beneath it. That contrast is intentional — it makes the hero feel powerful. New content sections should not compete with the hero.

### Colour context rules

| Zone | What's appropriate |
|---|---|
| Hero band | Deep/saturated blues, gradients, white text, the dot-canvas |
| Content sections (everything below the hero) | `bg-background` or `bg-white` surfaces, dark text, minimal accent |
| Cards in content sections | White or `bg-mistral-beige-deep` surface, thin `border-[#C7D7F8]` border |
| Labels / badges in content sections | `bg-mistral-beige-deep` + dark text — same pattern as the feature chips in Section1 |
| CTA buttons anywhere | `bg-mistral-black text-white hover:bg-mistral-black/80 rounded-full` (primary filled); on dark surfaces use `bg-white/10 text-white hover:bg-white/20 rounded-full`; directional arrow icon always `text-mistral-orange` |

**Gradients, saturated blue fills, frosted glass, and dark card backgrounds belong in the hero only.** If a new component uses any of these, that is a red flag — stop and question whether it actually fits.

### The process before building any new section or component

1. **Read the neighboring files first.** Open the section above and below where the new element will sit. Study their surfaces, type scale, label style, and button style.
2. **Match the visual register.** A new section should feel indistinguishable from its neighbors in terms of visual weight and tone. If it looks like it came from a different product, it's wrong.
3. **Default to the quietest valid option.** Pale surface, thin border, dark text, standard CTA button. Only add visual weight if the design explicitly calls for it.
4. **Check for an existing pattern before inventing.** Building a card? Look at Section1's carousel cards. Building a label? Look at the `bg-mistral-beige-deep` feature chips. Extend what exists rather than inventing something new.

### The "does this fit?" test

Before finalising any new UI: imagine someone scrolling through the full page. Would the new section feel like a natural continuation, or would it feel like a mismatch — something louder, darker, or more decorated than everything around it? If the latter, simplify until it passes.

### What to do when the brief is vague

When a design instruction is vague ("add a section", "make it look good"), **the site itself is the brief**. The right answer is almost always the quieter, more restrained option that matches the existing sections — not the more visually impressive one.

## `/research` page patterns

The `/research` route ports content from a sibling project's `/technology` page and introduced four reusable patterns. Don't reinvent these on other pages — extend them. Full spec lives in [`design-system/design-system.md`](design-system/design-system.md) §8.12.

| Pattern | When to reuse | Key tokens |
|---|---|---|
| Vertical accordion list | Long-form explanations broken into 3+ sections | `border-b border-mistral-black/10` rows, `gridTemplateRows` 0fr↔1fr animation, plus glyph rotates 45° |
| Definition tooltip | Inline term with a 1–2 sentence explainer | dotted-underline trigger, `260px` popover with `rounded-[10px] border-[#C7D7F8] bg-white` |
| Multi-tab form card | Contact / inquiry forms with multiple audiences | tab bar inside `rounded-[20px]` card, active tab `bg-mistral-black text-white`, inputs `rounded-[10px] bg-mistral-beige` |
| Hairline comparison table | 3-column side-by-side comparisons | `rounded-[20px] bg-white` card with `border-[#C7D7F8]/60` row + column dividers; "winning" column gets `bg-mistral-beige-deep` |
| Anchor pill nav | In-page TOC at the top of long pages | `rounded-full border-[#C7D7F8]` pills with chevron-down |

The `/research` content is a verbatim port from the sibling project's `/technology` page — strings, brand names ("Columbus", "Columbus-01", "MapsGPT", "Elio", "LGM", "UGM"), and form copy are not edited here. If you need to update content on `/research`, the source of truth is the sibling project; mirror changes verbatim.

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

- Editing [`design-system/styles/utilities.css`](design-system/styles/utilities.css) directly — this is compiled Tailwind output from Mistral's build. Ask before mutating. (`tokens.css` is safe to edit freely.)
- Adding a new dependency — keep deps minimal (next, react, tailwind, types).
- Changing the dev port — currently `3002`. ColumbusPage typically runs on 3000, HebX on 3001. Pick a non-conflicting port if you change it.

## Out of scope (v1)

- Real interactive carousel (currently shows all 3 slides offset; no auto-rotate or button-driven swap)
- Logo marquee animation (snapshot captured a frozen `transform: translate3d(...)` state)
- Dark-mode toggle UI (variants compiled in CSS, but no toggle button rendered)
- Mobile menu drawer
- Other pages beyond the homepage
- Source-Tailwind reconstruction (we ship compiled output verbatim)
