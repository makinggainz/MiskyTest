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

### Pre-change checklist (run mentally every time)

- [ ] What design-system rule does this element come from?
- [ ] How many places consume that rule?
- [ ] Am I editing the rule, not a single instance?
- [ ] Have I updated tokens / spec / showcase together?
- [ ] Did I verify the change actually propagated?

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

### Border radius

**Standing rule — enforce on every visual change, always.**

| Surface type | Radius | Token / class |
|---|---|---|
| Buttons, chips, badges, interactive labels | **8px** | `rounded-[8px]` |
| Inputs, info panels, small surfaces | 12px | `rounded-[12px]` / `--radius-md` |
| Cards, dialogs, medium containers | 16px | `rounded-[16px]` / `--radius-lg` |
| Large photographic / decorative surfaces | 20px | `rounded-[20px]` / `--radius-xl` |
| Hero containers | 24px | `rounded-[24px]` / `--radius-2xl` |
| Layout containers (`<section>`, full-width `<div>`) | **0 — square** | no `rounded-*` |
| Purely decorative circles (e.g. 8×8px color dots) | pill | `rounded-full` |

- **`rounded-full` is banned on buttons, badges, and chips.** It is only allowed on elements that are geometrically circular (equal width and height, decorative only).
- When in doubt, use the explicit px value (`rounded-[8px]`) rather than a named Tailwind class, so intent is unambiguous.
- Token definitions live in `design-system/styles/tokens.css` under `--radius-sm` through `--radius-3xl`. Keep those in sync when the rule changes.
- Full rationale and all component-level patterns are in `design-system/design-system.md` §3 and §8.

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
