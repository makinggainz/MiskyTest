"use client";

/* eslint-disable @next/next/no-img-element */

/**
 * MistX — Design System showcase page.
 *
 * Renders the entire contents of design-system/design-system.md visually.
 * Styled using the tokens it documents (the page is a self-demo).
 */

import { useEffect, useState } from "react";

// ----------------------------------------------------------------------------
// Data — everything below is sourced from design-system.md (canonical) and
// design-system/styles/tokens.css. Keep in sync with both.
// ----------------------------------------------------------------------------

const sections = [
  { id: "overview", label: "Overview" },
  { id: "color", label: "Color" },
  { id: "typography", label: "Typography" },
  { id: "radius", label: "Border radius" },
  { id: "spacing", label: "Spacing" },
  { id: "layout", label: "Layout" },
  { id: "elevation", label: "Elevation" },
  { id: "motion", label: "Motion" },
  { id: "components", label: "Components" },
  { id: "logo", label: "Logo" },
  { id: "imagery", label: "Imagery" },
  { id: "iconography", label: "Iconography" },
  { id: "dos-donts", label: "Do's & Don'ts" },
  { id: "responsive", label: "Responsive" },
  { id: "gaps", label: "Iteration & Gaps" },
];

const mistralRainbow = [
  { name: "Pale Sky", hex: "#E8EFFD", rgb: "232/239/253", cmyk: "8/6/0/1", token: "--color-mistral-footer-band-1" },
  { name: "Bright Blue", hex: "#2663EB", rgb: "38/99/235", cmyk: "84/58/0/8", token: "--color-mistral-footer-band-2" },
  { name: "Brand Blue", hex: "#154ACC", rgb: "21/74/204", cmyk: "90/64/0/20", token: "--color-mistral-footer-band-3" },
  { name: "Deep Blue", hex: "#12369C", rgb: "18/54/156", cmyk: "88/65/0/39", token: "--color-mistral-footer-band-4" },
  { name: "Navy", hex: "#0E256E", rgb: "14/37/110", cmyk: "87/66/0/57", token: "--color-mistral-footer-band-5" },
  { name: "Deep Navy", hex: "#091442", rgb: "9/20/66", cmyk: "86/70/0/74", token: "--color-mistral-footer-band-6" },
];

const brandAccent = [
  { name: "MistX Blue", token: "--color-mistral-orange", hex: "#154ACC (HSL 220 81% 44%)", note: "Primary brand accent (token name retained for compatibility)" },
  { name: "Bright Blue", token: "--color-mistral-orange-bright", hex: "#2663EB (HSL 219 84% 54%)", note: "Hover/active variant" },
  { name: "Orange Darker", token: "--color-mistral-orange-darker", hex: "(declared inline)", note: "Hover/pressed (legacy token name)" },
];

const beigeNeutrals = [
  { name: "Surface Light", token: "--color-mistral-beige", hex: "#F1F5FE", note: "Pale-blue page background (replaces cream)" },
  { name: "Surface Deep", token: "--color-mistral-beige-deep", hex: "#DCE7FB", note: "Secondary blue-tinted surface" },
  { name: "Surface Deeper", token: "--color-mistral-beige-deeper", hex: "#B8CCF5", note: "Border / soft divider tint" },
];

const sunshinePalette = [
  { token: "--color-mistral-sunshine-50", hex: "#EEF3FE" },
  { token: "--color-mistral-sunshine-100", hex: "#DCE7FB" },
  { token: "--color-mistral-sunshine-200", hex: "#C7D7F8" },
  { token: "--color-mistral-sunshine-300", hex: "#A8C0F4" },
  { token: "--color-mistral-sunshine-400", hex: "#7EA0EE" },
  { token: "--color-mistral-sunshine-500", hex: "#5582EA" },
  { token: "--color-mistral-sunshine-600", hex: "#2663EB" },
  { token: "--color-mistral-sunshine-700", hex: "#1B57DC" },
  { token: "--color-mistral-sunshine-750", hex: "#154ACC" },
  { token: "--color-mistral-sunshine-800", hex: "#1340B3" },
  { token: "--color-mistral-sunshine-900", hex: "#12369C" },
  { token: "--color-mistral-sunshine-950", hex: "#0E256E" },
];

const inkScale = [
  { name: "Black", token: "--mistral-deep-black", hex: "#000000", brand: "Brand 'Black'" },
  { name: "Black Matt", token: "--color-mistral-black", hex: "#1f1f1f (HSL 0 0% 12%)", brand: "≈ Brand 'Black Tinted' (#1e1e1e — 1 hex digit drift)" },
  { name: "Black Matt Tint", token: "--color-mistral-black-tint", hex: "#3d3d3d", brand: "Secondary text" },
  { name: "Foreground", token: "--color-foreground", hex: "#1f1f1f", brand: "Default page text" },
];

const surfaces = [
  { name: "Background", token: "--color-background", hex: "#F1F5FE", note: "Page background (pale blue)" },
  { name: "Card", token: "--color-card", hex: "#ffffff", note: "Card surface" },
  { name: "Popover", token: "--color-popover", hex: "#ffffff", note: "Popover/dropdown surface" },
  { name: "Primary", token: "--color-primary", hex: "#154ACC", note: "Primary action background (MistX Blue)" },
  { name: "Secondary", token: "--color-secondary", hex: "#DCE7FB", note: "Secondary action surface (blue-tinted)" },
  { name: "Muted", token: "--color-muted", hex: "#F1F5FE", note: "Muted/disabled surface" },
  { name: "Accent", token: "--color-accent", hex: "#154ACC", note: "Accent surface (= primary)" },
  { name: "Destructive", token: "--color-destructive", hex: "#dc3030", note: "Destructive — kept red for error semantics" },
];

const hairlines = [
  { name: "Border", token: "--color-border", hex: "#F1F5FE (HSL 220 89% 97%)", note: "Default hairline" },
  { name: "Input", token: "--color-input", hex: "#e3e3ea", note: "Form input border" },
  { name: "Ring", token: "--color-ring", hex: "#F1F5FE", note: "Focus ring" },
];

const blockGrid = [
  { token: "--block-1-color", hex: "#DCE7FB" },
  { token: "--block-2-color", hex: "#A8C0F4" },
  { token: "--block-3-color", hex: "#2663EB" },
  { token: "--block-4-color", hex: "#EEF3FE" },
  { token: "--block-5-color", hex: "#DCE7FB" },
  { token: "--block-6-color", hex: "#A8C0F4" },
  { token: "--block-7-color", hex: "#154ACC" },
  { token: "--block-grid-color", hex: "#EEF3FE" },
  { token: "--block-grid-color-2", hex: "#F1F5FE" },
];

const headingScale = [
  { token: "--font-size-heading-0", mobile: 72, mobileLh: 72, desktop: 103, desktopLh: 97.85, sample: "Frontier AI." },
  { token: "--font-size-heading-1", mobile: 56, mobileLh: 56, desktop: 90, desktopLh: 90, sample: "In your hands." },
  { token: "--font-size-heading-2", mobile: 40, mobileLh: 42, desktop: 56, desktopLh: 53.2, sample: "High finance, without friction" },
  { token: "--font-size-heading-3", mobile: 30, mobileLh: 34.5, desktop: 48, desktopLh: 45.6, sample: "Enterprise-grade security" },
];

const bodyScale = [
  { name: "text-xs", size: "12px (0.75rem)" },
  { name: "text-sm", size: "14px (0.875rem)" },
  { name: "text-base", size: "16px (1rem)" },
  { name: "text-lg", size: "18px (1.125rem)" },
  { name: "text-xl", size: "20px (1.25rem)" },
  { name: "text-2xl", size: "24px (1.5rem)" },
  { name: "text-3xl", size: "30px (1.875rem)" },
  { name: "text-4xl", size: "36px (2.25rem)" },
  { name: "text-5xl", size: "48px (3rem)" },
  { name: "text-6xl", size: "60px (3.75rem)" },
  { name: "text-7xl", size: "72px (4.5rem)" },
];

const fontWeights = [
  { token: "--font-weight-normal", value: 400, label: "Normal" },
  { token: "--font-weight-medium", value: 500, label: "Medium" },
  { token: "--font-weight-semibold", value: 600, label: "Semibold" },
  { token: "--font-weight-bold", value: 700, label: "Bold" },
  { token: "--font-weight-black", value: 900, label: "Black" },
];

const radiusScale = [
  { token: "--radius-sm", value: "0.5rem (8px) — buttons, chips, badges", className: "rounded-sm" },
  { token: "--radius-md", value: "0.75rem (12px) — inputs, info panels", className: "rounded-md" },
  { token: "--radius-lg", value: "1rem (16px) — cards, dialogs", className: "rounded-lg" },
  { token: "--radius-xl", value: "1.25rem (20px) — large photographic surfaces", className: "rounded-xl" },
  { token: "--radius-2xl", value: "1.5rem (24px) — hero containers", className: "rounded-2xl" },
  { token: "--radius-3xl", value: "1.75rem (28px) — max size", className: "rounded-3xl" },
  { token: "(Tailwind)", value: "9999px — decorative circles only", className: "rounded-full" },
];

const spacingScale = [
  { token: "--spacing-sm", px: 12 },
  { token: "--spacing-md / --gap-md", px: 16 },
  { token: "--spacing-xl / --gap-xl", px: 24 },
  { token: "--spacing-2xl / --gap-2xl", px: 32 },
  { token: "--spacing-2xl-2 / --gap-2xl-2", px: 40 },
  { token: "--spacing-3xl / --gap-3xl", px: 48 },
  { token: "--spacing-4xl / --gap-4xl", px: 64 },
  { token: "--spacing-5xl", px: 96 },
  { token: "--spacing-6xl / --gap-6xl", px: 128 },
];

const containerWidths = [
  { token: "--container-xs", value: "20rem (320px)" },
  { token: "--container-lg", value: "32rem (512px)" },
  { token: "--container-7xl", value: "80rem (1280px)" },
];

const breakpoints = [
  { name: "base", min: "< 640px", source: "default" },
  { name: "sm", min: "640px", source: "Tailwind default" },
  { name: "md", min: "768px", source: "Tailwind default" },
  { name: "lg", min: "1024px", source: "Tailwind default" },
  { name: "xl", min: "1248px", source: "custom (--breakpoint-xl)" },
  { name: "2xl", min: "1536px", source: "Tailwind default" },
  { name: "4xl", min: "1440px", source: "custom (--breakpoint-4xl)" },
];

const elevationLevels = [
  { level: 0, shadow: "none + 1px hairline border", use: "Flat (filled containers)" },
  { level: 1, shadow: "0 1px 2px rgba(0,0,0,0.04)", use: "Subtle lift — resting cards" },
  { level: 2, shadow: "0 4px 12px rgba(0,0,0,0.04)", use: "Standard cards / popovers" },
  { level: 3, shadow: "0 12px 24px -4px rgba(0,0,0,0.08)", use: "Mockup illustrations" },
  { level: 4, shadow: "0 16px 48px -8px rgba(0,0,0,0.12)", use: "Modals / dialogs" },
];

const easings = [
  { token: "--ease-in", value: "cubic-bezier(.4, 0, 1, 1)" },
  { token: "--ease-out", value: "cubic-bezier(0, 0, .2, 1)" },
  { token: "--ease-in-out", value: "cubic-bezier(.4, 0, .2, 1)" },
];

const animations = [
  { token: "--animate-spin", duration: "1s linear infinite", use: "Loading" },
  { token: "--animate-pulse", duration: "2s cubic-bezier infinite", use: "Skeleton loaders" },
  { token: "--animate-rotate-y", duration: "1s ease infinite", use: "Decorative rotation" },
  { token: "--animate-accordion-down", duration: "0.2s ease-out", use: "Disclosure open" },
  { token: "--animate-accordion-up", duration: "0.2s ease-out", use: "Disclosure close" },
];

const buttonVariants = [
  { name: "Primary", className: "bg-mistral-black text-white hover:bg-mistral-black/90 px-5 py-2 text-sm rounded-[8px] transition-colors", label: "Get started" },
  { name: "Accent", className: "bg-mistral-orange text-white hover:bg-mistral-orange-bright px-5 py-2 text-sm rounded-[8px] transition-colors", label: "Try Studio" },
  { name: "On-dark (glass)", className: "bg-white/10 text-white hover:bg-white hover:text-mistral-black px-5 py-2 text-sm rounded-[8px] transition-colors", label: "Contact Sales", darkBg: true },
  { name: "On-cream", className: "bg-mistral-black/10 text-mistral-black hover:bg-mistral-black hover:text-white px-5 py-2 text-sm rounded-[8px] transition-colors", label: "Learn more" },
  { name: "Outline", className: "border border-current bg-transparent text-mistral-black px-5 py-2 text-sm rounded-[8px] hover:bg-mistral-black/5 transition-colors", label: "Read docs" },
  { name: "Link", className: "border-b border-current pb-1 inline-flex items-center gap-3 text-mistral-black hover:text-mistral-orange transition-colors", label: "Read more →" },
];

const badgeVariants = [
  { name: "Brand Blue", className: "bg-mistral-orange text-white rounded-[8px] px-3 py-1 text-xs", label: "New" },
  { name: "Pale Surface", className: "bg-mistral-beige border border-mistral-black/20 rounded-[8px] px-3 py-1 text-xs text-mistral-black", label: "Beta" },
  { name: "Dark", className: "bg-mistral-black text-white rounded-[8px] px-3 py-1 text-xs", label: "Enterprise" },
  { name: "Outline", className: "rounded-[8px] border border-current px-3 py-1 text-xs text-mistral-black", label: "Manufacturing" },
];

const logoVariants = [
  { family: "Full logo", variants: ["Rainbow Dark", "Rainbow Light", "Full Dark", "Full Light"] },
  { family: "Rainbow logo", variants: ["Dark", "Light"] },
  { family: "M Icon", variants: ["Rainbow", "Black", "White", "Orange"] },
  { family: "M Icon Boxed", variants: ["Rainbow", "Black", "Orange"] },
];

const dosDonts = [
  { do: "Use Tailwind utilities that resolve to tokens (`bg-mistral-orange`, `text-mistral-black`)", dont: "Hardcode hex/RGB in JSX inline styles" },
  { do: "Pair surfaces with their `*-foreground` companion", dont: "Use `text-white` on `bg-card` (white-on-light fails contrast)" },
  { do: "Use `--space-*` / `--gap-*` for spacing (always 4px multiples)", dont: "Introduce non-grid values like `5px`, `7px`, `11px`" },
  { do: "Use Mistral's square corners (`--radius: 0rem`) by default", dont: "Round everything by default — Mistral leans squared" },
  { do: "Keep brand blue to CTAs and active states only", dont: "Use brand blue decoratively (it's a signal color)" },
  { do: "Always include the MistX rainbow band as a page closer", dont: "Drop the rainbow stripe — it's the brand signature" },
  { do: "Use Rainbow tokens (`--mistral-footer-band-1..6`) wherever a rainbow is needed", dont: "Repurpose individual rainbow stops as accent colors" },
  { do: "Use `aria-haspopup` + `aria-expanded` on dropdown triggers", dont: "Render dropdown content unconditionally" },
  { do: "Add new tokens to `tokens.css` AND document them here", dont: "Sneak undocumented `--my-thing` into a component" },
  { do: "Confirm minimum 44×44px touch targets on mobile", dont: "Make tap targets smaller than 40px" },
];

const knownGaps = [
  { gap: "Font inconsistency: Arial (brand) vs Rubik (app)", severity: "High" },
  { gap: "No source `tailwind.config.ts`", severity: "High" },
  { gap: "No graded ink scale (charcoal/slate/steel/stone)", severity: "Medium" },
  { gap: "No graded hairline tokens", severity: "Medium" },
  { gap: "No graded elevation scale (1 named shadow only)", severity: "Medium" },
  { gap: "No published dark-mode toggle UI", severity: "Medium" },
  { gap: "No animation/transition timing tokens beyond `.15s`", severity: "Low" },
  { gap: "No on-color tokens for `mistral-orange` / `mistral-black`", severity: "Low" },
  { gap: "No button / card / chip / input tokens", severity: "Medium-Low" },
  { gap: "No tabs / accordion / modal tokens", severity: "Low" },
  { gap: "No form-success state pattern", severity: "Low" },
  { gap: "No clear-space / min-size logo specs", severity: "Low" },
  { gap: "No formal photography / iconography spec", severity: "Low" },
  { gap: "Logo marquee animation frozen", severity: "Component-level" },
  { gap: "Customer carousel doesn't rotate", severity: "Component-level" },
];

// ----------------------------------------------------------------------------
// Helper components
// ----------------------------------------------------------------------------

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-border py-16 scroll-mt-24">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-medium text-mistral-black">{title}</h2>
        {intro && <p className="mt-3 text-base text-mistral-black-tint max-w-3xl">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl font-medium text-mistral-black mb-4 mt-8">{children}</h3>;
}

/**
 * Usage commentary box. Renders a "Used in: ..." panel with a status pill
 * (used / partially-used / unused). Verified against actual MistX homepage
 * components by grepping each token / utility class. Updated whenever
 * components change.
 *
 * Section labels (human-readable) for the 6 product components:
 *  - "Top nav"            → components/nav/Nav.tsx
 *  - "Hero band"          → Hero (top of homepage: 'Frontier AI. In your hands.')
 *  - "Customer carousel"  → Section1 ('Deployed in production' — Stellantis/ASML/CMA CGM cards)
 *  - "Marketecture grid"  → Section2 ('Powered by a deeply configurable AI platform')
 *  - "Privacy/deploy"     → Section3 ('AI deployments designed for privacy')
 *  - "Site footer"        → SiteFooter (footer + MistX rainbow band)
 */
function Usage({ status, children }: { status: "used" | "partial" | "unused"; children: React.ReactNode }) {
  const palette = {
    used: { bg: "#dcfce7", border: "#16a34a", color: "#166534", label: "✓ Used" },
    partial: { bg: "#fef3c7", border: "#f59e0b", color: "#92400e", label: "⚠ Partially used" },
    unused: { bg: "#fee2e2", border: "#dc2626", color: "#991b1b", label: "✗ Defined but unused" },
  }[status];
  return (
    <div className="mt-2 mb-4 rounded-md p-3 text-sm" style={{ background: palette.bg, borderLeft: `3px solid ${palette.border}`, color: palette.color }}>
      <span className="font-mono text-xs font-semibold uppercase tracking-wide mr-2">{palette.label}</span>
      <span>{children}</span>
    </div>
  );
}

function ColorSwatch({ hex, label, sub, big = false, dark = false }: { hex: string; label: string; sub?: string; big?: boolean; dark?: boolean }) {
  return (
    <div className="flex flex-col">
      <div
        className={"w-full " + (big ? "h-32" : "h-20") + " rounded-md border border-mistral-black/10"}
        style={{ backgroundColor: hex }}
        aria-hidden="true"
      />
      <div className="mt-2">
        <div className={"text-sm font-medium " + (dark ? "text-white" : "text-mistral-black")}>{label}</div>
        {sub && <div className={"text-xs font-mono " + (dark ? "text-white/70" : "text-mistral-black-tint") + " mt-0.5 break-all"}>{sub}</div>}
      </div>
    </div>
  );
}

function TokenCode({ children }: { children: React.ReactNode }) {
  return <code className="px-1.5 py-0.5 rounded-sm bg-mistral-black/5 text-mistral-black text-xs font-mono">{children}</code>;
}

// ----------------------------------------------------------------------------
// Page
// ----------------------------------------------------------------------------

export default function DesignPage() {
  const [activeSection, setActiveSection] = useState<string>("overview");

  // Smooth-scrolling section highlight
  useEffect(() => {
    const onScroll = () => {
      let current = "overview";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top - 120 <= 0) current = s.id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-background text-mistral-black min-h-screen pt-[100px]">
      {/* Header */}
      <header className="container max-w-[1280px] mx-auto px-6 py-12 md:py-20">
        <div className="flex items-end gap-6 flex-wrap">
          <div className="size-12 rounded-md" style={{ backgroundColor: "#154ACC" }} />
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-mistral-black-tint">MistX · v0.1.0 · alpha</p>
            <h1 className="text-4xl md:text-6xl font-medium leading-tight mt-2">Design System</h1>
          </div>
        </div>
        <p className="mt-6 text-base md:text-lg text-mistral-black-tint max-w-3xl">
          MistX rebrand of the Mistral AI homepage clone — cool blue spectrum, pale-blue surfaces, the MistX Rainbow (pale-sky → deep-navy) as the brand signature, square corners by default, single-family typography. This page is a self-demo: it&apos;s built using the tokens it documents.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono">
          <span className="px-2 py-1 bg-mistral-black/5 rounded-sm">235 tokens</span>
          <span className="px-2 py-1 bg-mistral-black/5 rounded-sm">~63 KB compiled utilities</span>
          <span className="px-2 py-1 bg-mistral-black/5 rounded-sm">Tailwind v4 utility-first</span>
          <span className="px-2 py-1 bg-mistral-orange/10 text-mistral-orange rounded-sm">brand: #154ACC</span>
        </div>
      </header>

      {/* Layout: sticky TOC + content */}
      <div className="container max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12">
        {/* TOC */}
        <nav className="lg:sticky lg:top-[120px] lg:self-start lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto pb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-mistral-black-tint mb-3">Contents</div>
          <ul className="flex lg:flex-col gap-1 flex-wrap">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={
                    "block px-2 py-1 text-sm transition-colors " +
                    (activeSection === s.id
                      ? "text-mistral-orange font-medium"
                      : "text-mistral-black-tint hover:text-mistral-black")
                  }
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div>
          {/* === OVERVIEW === */}
          <Section
            id="overview"
            title="Overview"
            intro="Mistral's design system extracted verbatim from the homepage's compiled CSS, augmented with the brand spec at mistral.ai/brand. Every value below is sourced from the project's tokens.css; values that aren't (recommended elevation, motion timings, component naming) are clearly labeled as suggestions."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Brand color", value: "#154ACC", note: "MistX Brand Blue" },
                { label: "Type stack", value: "Rubik (app) / Arial (brand)", note: "see §2.1 inconsistency" },
                { label: "Default radius", value: "0rem (square)", note: "Mistral leans squared" },
                { label: "Spacing base", value: "4px grid", note: "All tokens are multiples of 4 or 8" },
                { label: "Container max-w", value: "1280px", note: "--container-7xl" },
                { label: "Brand font", value: "Arial (mistral.ai/brand)", note: "Override via next/font" },
              ].map((c) => (
                <div key={c.label} className="p-5 bg-card border border-border rounded-md">
                  <div className="text-xs uppercase tracking-wide text-mistral-black-tint">{c.label}</div>
                  <div className="text-lg font-medium mt-1">{c.value}</div>
                  <div className="text-sm text-mistral-black-tint mt-1">{c.note}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* === COLOR === */}
          <Section
            id="color"
            title="Color"
            intro="48 unique brand color tokens plus the 12-step Ocean ramp. All MistX brand colors are HSL custom properties wrapped in hsl(var(--name)) so dark-mode variants work without re-declaration."
          >
            <SubHeading>🌊 MistX Rainbow — the brand signature</SubHeading>
            <p className="text-sm text-mistral-black-tint mb-6 max-w-3xl">
              The 6-stop blue spectrum used in the footer stripe and gradient closers. Pale sky → deep navy. Don&apos;t repurpose individual stops as accent colors.
            </p>
            <Usage status="partial">
              Rendered on the homepage as a single <strong>blue stripe gradient at the bottom of the Site footer</strong> (1 ref to <code className="font-mono text-xs">--mistral-footer-band-*</code>). Individual stops are not consumed separately — the rainbow appears only as the composed gradient, not as standalone accent colors.
            </Usage>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              {mistralRainbow.map((c) => (
                <div key={c.hex}>
                  <div className="h-32 rounded-md" style={{ backgroundColor: c.hex }} />
                  <div className="mt-2">
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs font-mono text-mistral-black-tint mt-0.5">{c.hex}</div>
                    <div className="text-xs font-mono text-mistral-black-tint">RGB {c.rgb}</div>
                    <div className="text-xs font-mono text-mistral-black-tint">CMYK {c.cmyk}</div>
                    <div className="text-xs font-mono text-mistral-black-tint mt-1 break-all">{c.token}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-12 w-full rounded-md" style={{ background: `linear-gradient(90deg, ${mistralRainbow.map((r) => r.hex).join(", ")})` }} aria-label="MistX rainbow band preview" />

            <SubHeading>Brand / Accent</SubHeading>
            <Usage status="used">
              <strong>--color-mistral-orange</strong> (now MistX Blue, token name retained for compatibility) appears 18× across the homepage: Top nav (4 refs — link hover, &ldquo;Try le Chat&rdquo; button), Hero (1 ref — primary CTA), Customer carousel (5 refs — accent on stats and arrows), Privacy/deploy (1 ref), Site footer (1 ref — section heading). <strong>--color-mistral-orange-bright</strong> is consumed via <code className="font-mono text-xs">text-mistral-orange-bright</code> (6 refs) + <code className="font-mono text-xs">hover:text-mistral-orange-bright</code> (6 refs) — interactive hover state on Customer carousel and Site footer links. <strong>--color-mistral-orange-darker</strong> is declared in tokens.css but has no utility-class consumer in components.
            </Usage>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {brandAccent.map((c) => {
                // Render a square; map to the new blue palette
                const bg = c.token === "--color-mistral-orange" ? "#154ACC" : c.token === "--color-mistral-orange-bright" ? "#2663EB" : "#0E256E";
                return <ColorSwatch key={c.token} hex={bg} label={c.name} sub={`${c.token}\n${c.hex}\n${c.note}`} big />;
              })}
            </div>

            <SubHeading>Pale-blue surfaces</SubHeading>
            <Usage status="partial">
              <strong>--color-mistral-beige-deep</strong> (now a blue-tinted surface; token name retained) is the dominant secondary surface (20 utility refs as <code className="font-mono text-xs">bg-mistral-beige-deep</code> + 2 as border): Top nav (2 refs — dropdown panel background), Customer carousel (5 refs — &ldquo;Deployed in production&rdquo; card backgrounds), Marketecture grid (1 ref). Plain <strong>--color-mistral-beige</strong> (the lightest tint) and <strong>--color-mistral-cream</strong> are <em>defined but not consumed</em> as utility classes anywhere on the homepage.
            </Usage>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {beigeNeutrals.map((c) => (
                <ColorSwatch key={c.token} hex={c.hex.split(" ")[0]} label={c.name} sub={`${c.token}\n${c.hex}\n${c.note}`} big />
              ))}
            </div>

            <SubHeading>Ocean palette (12 steps)</SubHeading>
            <Usage status="unused">
              All 12 steps of the ocean ramp (<code className="font-mono text-xs">--color-mistral-sunshine-50</code> through <code className="font-mono text-xs">--color-mistral-sunshine-950</code> — token name retained from the original Mistral system) are declared in tokens.css but <strong>have zero utility-class refs across the homepage</strong> — no Hero, nav, sections, or footer consumes them. Only used speculatively inside this design page itself (e.g. the &ldquo;Medium&rdquo; gap-severity badge). Candidate for tightening tokens or actually applying to a homepage element.
            </Usage>
            <p className="text-sm text-mistral-black-tint mb-4">Cool-blue 12-step ramp interpolated from the MistX rainbow stops. Used for product surfaces, badges, and gradient stops.</p>
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-2">
              {sunshinePalette.map((c) => (
                <div key={c.token}>
                  <div className="h-16 rounded-sm" style={{ backgroundColor: c.hex }} />
                  <div className="text-[10px] font-mono text-mistral-black-tint mt-1 break-all">{c.token.replace("--color-mistral-", "")}</div>
                  <div className="text-[10px] font-mono text-mistral-black-tint">{c.hex}</div>
                </div>
              ))}
            </div>

            <SubHeading>Ink / text scale</SubHeading>
            <Usage status="partial">
              <strong>--color-mistral-black</strong> is the workhorse ink — 27 utility refs spread across Top nav (12 — link text, hamburger, &ldquo;Contact sales&rdquo; button), Customer carousel (5 — section heading + body), Marketecture/Privacy/Hero (sparingly). Used as <code className="font-mono text-xs">text-mistral-black</code>, <code className="font-mono text-xs">bg-mistral-black</code> (16 refs — dark CTA backgrounds), and <code className="font-mono text-xs">hover:bg-mistral-black</code> (8 refs). The lighter ink steps (<strong>--color-mistral-black-tint</strong>, <strong>--color-mistral-black-shade</strong>) are declared but not consumed as utility classes on the homepage — they appear only inline within this design page.
            </Usage>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {inkScale.map((c) => {
                const hexOnly = c.hex.split(" ")[0];
                return (
                  <div key={c.token}>
                    <div className="h-24 rounded-md" style={{ backgroundColor: hexOnly }} />
                    <div className="mt-2">
                      <div className="text-sm font-medium">{c.name}</div>
                      <div className="text-xs font-mono text-mistral-black-tint mt-0.5 break-all">{c.token}</div>
                      <div className="text-xs font-mono text-mistral-black-tint">{c.hex}</div>
                      <div className="text-xs text-mistral-black-tint mt-1">{c.brand}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <SubHeading>Surfaces (semantic)</SubHeading>
            <Usage status="partial">
              <strong>bg-background</strong> wraps the page shell (5 refs across Hero, sections, footer). <strong>bg-card</strong>, <strong>bg-popover</strong>, <strong>bg-secondary</strong>, <strong>bg-muted</strong>, <strong>bg-accent</strong> — all declared as semantic surface tokens — have <em>zero utility-class refs</em> in component markup. The homepage uses concrete brand surfaces instead (<code className="font-mono text-xs">bg-mistral-black</code>, <code className="font-mono text-xs">bg-mistral-beige-deep</code>). Semantic tokens exist for theming but aren&apos;t the canonical pattern here.
            </Usage>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {surfaces.map((c) => (
                <ColorSwatch key={c.token} hex={c.hex} label={c.name} sub={`${c.token}\n${c.hex}\n${c.note}`} />
              ))}
            </div>

            <SubHeading>Hairlines / borders</SubHeading>
            <Usage status="partial">
              The semantic <strong>border-border</strong> and <strong>border-input</strong> utilities have <em>zero refs</em> in the homepage components. Borders on the homepage are explicit colors: <code className="font-mono text-xs">border-white</code> (4 refs — Customer carousel chips), <code className="font-mono text-xs">border-mistral-beige-deep</code> (2 refs — section accents), <code className="font-mono text-xs">border-mistral-black</code> (2 refs — CTA outlines), <code className="font-mono text-xs">border-mistral-orange</code> (2 refs — active accent), <code className="font-mono text-xs">border-black</code> (1 ref). Semantic borders show up only in the design-page demos.
            </Usage>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {hairlines.map((c) => {
                const hexOnly = c.hex.split(" ")[0];
                return (
                  <div key={c.token} className="p-4 border border-mistral-black/10 rounded-md">
                    <div className="h-px w-full mb-2" style={{ backgroundColor: hexOnly }} />
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs font-mono text-mistral-black-tint mt-0.5 break-all">{c.token}</div>
                    <div className="text-xs font-mono text-mistral-black-tint">{c.hex}</div>
                    <div className="text-xs text-mistral-black-tint mt-1">{c.note}</div>
                  </div>
                );
              })}
            </div>

            <SubHeading>Block / grid colors (rainbow gradient stops)</SubHeading>
            <Usage status="partial">
              The <code className="font-mono text-xs">--mistral-footer-band-*</code> stops (which compose the MistX rainbow band) are referenced 6× inside the <strong>Site footer</strong> as <code className="font-mono text-xs">bg-mistral-footer-band-{`<step>`}</code> — these paint the rainbow band along the bottom of the page. The remaining <code className="font-mono text-xs">--block-*</code> grid tokens (page-block fill colors, grid-line colors) are declared in tokens.css but have no utility-class consumers on the homepage; reserved for layout templates not present in v1.
            </Usage>
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-2">
              {blockGrid.map((c) => (
                <div key={c.token}>
                  <div className="h-16 rounded-sm" style={{ backgroundColor: c.hex }} />
                  <div className="text-[10px] font-mono text-mistral-black-tint mt-1 break-all">{c.token.replace("--", "")}</div>
                  <div className="text-[10px] font-mono text-mistral-black-tint">{c.hex}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* === TYPOGRAPHY === */}
          <Section
            id="typography"
            title="Typography"
            intro="Single-family system. The token --font-sans starts with Arial (per brand spec); the app overrides with Rubik via next/font/google. Mistral uses heading-0 through heading-3 with explicit mobile + md sizes."
          >
            <SubHeading>Font families</SubHeading>
            <Usage status="partial">
              <strong>Rubik</strong> (loaded via <code className="font-mono text-xs">app/fonts.ts</code> using <code className="font-mono text-xs">next/font/google</code> and bound globally in <code className="font-mono text-xs">app/globals.css :root</code>) is the only font family actually rendered across the homepage — it inherits to every <code className="font-mono text-xs">font-sans</code> consumer (most text). <strong>--font-mono</strong> appears once via <code className="font-mono text-xs">font-mono</code> on the design page itself but isn&apos;t consumed by Hero/Section1-3/Nav/Footer. <strong>--font-vibe</strong> (FragmentMono) and <strong>--font-pixel</strong> (Pixelbasel) are declared in tokens but <em>have no homepage consumer</em>.
            </Usage>
            <div className="space-y-4">
              {[
                { token: "--font-sans", name: "Arial → Rubik (app override)", sample: "The quick brown fox jumps over the lazy dog. 1234567890.", className: "font-sans" },
                { token: "--font-mono", name: "ui-monospace stack", sample: "const lib = require('mistral'); // hello world", className: "font-mono" },
                { token: "--font-vibe", name: "FragmentMono (specialty)", sample: "AI-DRIVEN AGENTS / MISTRAL", className: "" },
                { token: "--font-pixel", name: "Pixelbasel (rare)", sample: "FRONTIER AI MODELS", className: "" },
              ].map((f) => (
                <div key={f.token} className="border border-border p-5 rounded-md">
                  <div className="text-xs font-mono text-mistral-black-tint">{f.token}</div>
                  <div className="text-sm font-medium mb-2">{f.name}</div>
                  <div className={"text-2xl " + f.className}>{f.sample}</div>
                </div>
              ))}
            </div>

            <SubHeading>Heading scale</SubHeading>
            <Usage status="partial">
              The named tokens <code className="font-mono text-xs">--font-size-heading-0</code> through <code className="font-mono text-xs">-3</code> (and their mobile variants) are <strong>not directly consumed</strong>. Headings on the homepage use Tailwind size + responsive utilities instead — Hero uses <code className="font-mono text-xs">text-3xl md:text-5xl lg:text-7xl</code>; Section1/2/3 use <code className="font-mono text-xs">text-2xl md:text-4xl</code> and similar compositions. Same end result, different naming surface.
            </Usage>
            <p className="text-sm text-mistral-black-tint mb-4">Mobile-first; the un-suffixed value applies until <code className="text-xs">md:</code> (≥ 768px) where the larger size kicks in.</p>
            <div className="space-y-6">
              {headingScale.map((h) => (
                <div key={h.token} className="border-l-2 border-mistral-orange pl-6 py-2">
                  <div className="flex items-baseline gap-3 mb-2">
                    <code className="text-xs font-mono text-mistral-black-tint break-all">{h.token}</code>
                    <span className="text-xs text-mistral-black-tint">mobile {h.mobile}/{h.mobileLh} · md: {h.desktop}/{h.desktopLh}</span>
                  </div>
                  <div style={{ fontSize: `${h.mobile}px`, lineHeight: `${h.mobileLh}px`, letterSpacing: "-0.025em", fontWeight: 500 }}>
                    {h.sample}
                  </div>
                </div>
              ))}
            </div>

            <SubHeading>Body type scale</SubHeading>
            <Usage status="used">
              Body sizes are consumed via Tailwind utilities, not the named scale. Heaviest use: <code className="font-mono text-xs">text-sm</code> + <code className="font-mono text-xs">text-base</code> in Hero subhead and Section1-3 paragraphs; <code className="font-mono text-xs">text-xs</code> in nav meta + footer disclaimers; <code className="font-mono text-xs">text-[14px]/[24.5px]</code> as a one-off in Site footer column lists. Larger sizes (<code className="font-mono text-xs">text-2xl</code>, <code className="font-mono text-xs">text-3xl</code>) appear in component sub-headings inside Customer carousel and Privacy/deploy.
            </Usage>
            <div className="space-y-2">
              {bodyScale.map((b) => (
                <div key={b.name} className="flex items-baseline gap-4 py-1 border-b border-border last:border-b-0">
                  <code className="text-xs font-mono text-mistral-black-tint w-24 shrink-0">{b.name}</code>
                  <span className="text-xs text-mistral-black-tint w-32 shrink-0">{b.size}</span>
                  <span className={b.name}>The quick brown fox jumps</span>
                </div>
              ))}
            </div>

            <SubHeading>Font weights</SubHeading>
            <Usage status="partial">
              The homepage runs almost exclusively on <strong>regular (400)</strong> via Rubik&apos;s default + Tailwind <code className="font-mono text-xs">font-normal</code> (5 explicit refs across components). <code className="font-mono text-xs">font-medium</code> appears 1× and <code className="font-mono text-xs">font-semibold</code> appears 1× — both as one-off emphasis. <code className="font-mono text-xs">font-light</code> and <code className="font-mono text-xs">font-bold</code> have <em>zero refs</em> on the homepage. Visible weight variation comes from Mistral&apos;s headings rendering at large sizes, not from heavy weights.
            </Usage>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {fontWeights.map((w) => (
                <div key={w.token} className="border border-border p-4 rounded-md">
                  <div className="text-xs font-mono text-mistral-black-tint break-all">{w.token}</div>
                  <div className="text-xs text-mistral-black-tint mt-1">{w.value} · {w.label}</div>
                  <div className="text-2xl mt-3" style={{ fontWeight: w.value }}>Aa</div>
                </div>
              ))}
            </div>

            <SubHeading>Tracking + leading</SubHeading>
            <Usage status="unused">
              No homepage component sets explicit tracking (<code className="font-mono text-xs">tracking-*</code>) or leading (<code className="font-mono text-xs">leading-*</code>) — the inline <code className="font-mono text-xs">text-[14px]/[24.5px]</code> in Site footer is the closest, baking line-height into the size literal. Browser defaults and Rubik&apos;s metrics carry everything else. Useful for future fine-tuning, but not currently part of the actual visual surface.
            </Usage>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-border p-5 rounded-md">
                <div className="text-xs font-mono text-mistral-black-tint mb-3">Tracking (letter-spacing)</div>
                <div className="space-y-2">
                  <div className="text-base" style={{ letterSpacing: "-0.025em" }}>Tracking tight (-0.025em)</div>
                  <div className="text-base" style={{ letterSpacing: "0" }}>Tracking normal (0)</div>
                  <div className="text-base" style={{ letterSpacing: "0.025em" }}>Tracking wide (0.025em)</div>
                  <div className="text-base" style={{ letterSpacing: "0.05em" }}>Tracking wider (0.05em)</div>
                  <div className="text-base" style={{ letterSpacing: "0.1em" }}>TRACKING WIDEST (0.1em)</div>
                </div>
              </div>
              <div className="border border-border p-5 rounded-md">
                <div className="text-xs font-mono text-mistral-black-tint mb-3">Leading (line-height)</div>
                <div className="space-y-3">
                  <p className="text-sm" style={{ lineHeight: 1.25 }}><strong>Tight (1.25):</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                  <p className="text-sm" style={{ lineHeight: 1.5 }}><strong>Normal (1.5):</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                  <p className="text-sm" style={{ lineHeight: 1.625 }}><strong>Relaxed (1.625):</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                </div>
              </div>
            </div>
          </Section>

          {/* === BORDER RADIUS === */}
          <Section
            id="radius"
            title="Border radius"
            intro="Mistral leans squared corners — --radius defaults to 0rem. Use rounded-xl/2xl/3xl explicitly when softer corners are needed; rounded-[8px] for pills."
          >
            <Usage status="partial">
              Two split rules: <strong>layout containers stay square</strong> (default <code className="font-mono text-xs">--radius: 0rem</code> — cards, sections, surfaces, the customer-carousel slide tiles); <strong>interactive primitives are pills</strong> (<code className="font-mono text-xs">rounded-[8px]</code> — every button, the 15 chip-labels in Customer carousel feature rows, badges, and the Try Studio split-button wrapper). Intermediate radii (<code className="font-mono text-xs">rounded-sm</code>, <code className="font-mono text-xs">rounded-lg</code>, <code className="font-mono text-xs">rounded-xl/2xl/3xl</code>) are declared in tokens but unused. See §8.1 in design-system.md for the canonical pill rule.
            </Usage>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {radiusScale.map((r) => (
                <div key={r.token} className="text-center">
                  <div className={"size-20 mx-auto bg-mistral-orange/20 border border-mistral-orange/40 " + r.className} />
                  <div className="text-xs font-mono text-mistral-black-tint mt-2 break-all">{r.token}</div>
                  <div className="text-xs text-mistral-black-tint">{r.value}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* === SPACING === */}
          <Section
            id="spacing"
            title="Spacing"
            intro="4px base grid. Two parallel naming scales (--spacing-* and --gap-*) resolve to identical values."
          >
            <Usage status="used">
              Spacing is applied universally via Tailwind <code className="font-mono text-xs">p-*</code>, <code className="font-mono text-xs">m-*</code>, <code className="font-mono text-xs">gap-*</code>, <code className="font-mono text-xs">space-y-*</code> utilities. Most density: Top nav pill CTAs (<code className="font-mono text-xs">px-5 py-2</code>), Hero (<code className="font-mono text-xs">py-20</code> bands), Customer carousel + Marketecture grid (<code className="font-mono text-xs">gap-4</code> / <code className="font-mono text-xs">gap-6</code>), Site footer (<code className="font-mono text-xs">gap-y-14</code> + <code className="font-mono text-xs">gap-y-1</code>). The <code className="font-mono text-xs">--space-mobile</code> / <code className="font-mono text-xs">--space-desktop</code> custom-property pair is set as inline <code className="font-mono text-xs">style</code> on a few section wrappers so per-section spacing can be tuned without re-editing utility classes. Note: pill CTAs use <code className="font-mono text-xs">px-5</code> (20px) instead of the previous <code className="font-mono text-xs">px-4</code> so letterforms don&apos;t crowd the curved edges; chip-labels use <code className="font-mono text-xs">px-5 py-3</code> for the same reason.
            </Usage>
            <div className="space-y-3">
              {spacingScale.map((s) => (
                <div key={s.token} className="flex items-center gap-4">
                  <code className="text-xs font-mono text-mistral-black-tint w-72 shrink-0 break-all">{s.token}</code>
                  <div className="text-xs text-mistral-black-tint w-12 shrink-0">{s.px}px</div>
                  <div className="bg-mistral-orange h-3 rounded-sm" style={{ width: `${s.px}px` }} />
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-mistral-black-tint">
              Touch-target rule: buttons 40–44px height minimum, inputs 44px, pill tabs 32px desktop / 44px mobile.
            </p>
          </Section>

          {/* === LAYOUT === */}
          <Section
            id="layout"
            title="Layout"
            intro="Container widths, breakpoints, and page-level layout patterns."
          >
            <SubHeading>Container widths</SubHeading>
            <Usage status="partial">
              Two patterns dominate: the bare <code className="font-mono text-xs">container</code> utility (27 refs across every component — Nav, Hero, Section1, Section2, Section3, SiteFooter) which centers content with horizontal padding, and <code className="font-mono text-xs">max-w-7xl</code> (5 refs) which caps content at <code className="font-mono text-xs">--container-7xl: 1280px</code>. Smaller container widths (<code className="font-mono text-xs">max-w-5xl</code>, <code className="font-mono text-xs">max-w-3xl</code>) appear for prose blocks within the design page itself, not on the homepage.
            </Usage>
            <div className="space-y-3">
              {containerWidths.map((c) => (
                <div key={c.token} className="border-t border-border pt-3">
                  <div className="flex items-baseline gap-3 mb-2">
                    <code className="text-xs font-mono text-mistral-black-tint">{c.token}</code>
                    <span className="text-xs text-mistral-black-tint">{c.value}</span>
                  </div>
                  <div className="bg-mistral-orange/20 h-3 rounded-sm" style={{ width: c.value.match(/\d+/)?.[0] + "px" }} />
                </div>
              ))}
            </div>

            <SubHeading>Breakpoints</SubHeading>
            <Usage status="used">
              Mobile-first responsive prefixes are used heavily. <code className="font-mono text-xs">md:</code> (≥ 768px) is the workhorse — switches Top nav from hamburger to inline links, swaps Hero into desktop layout, expands Customer carousel grids, and stacks/un-stacks Site footer columns. <code className="font-mono text-xs">lg:</code> (≥ 1024px) tunes Hero typography. <code className="font-mono text-xs">sm:</code>, <code className="font-mono text-xs">xl:</code>, <code className="font-mono text-xs">4xl:</code> are present in the compiled utilities but unused on the current homepage.
            </Usage>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 font-medium">Breakpoint</th>
                    <th className="text-left p-2 font-medium">Min-width</th>
                    <th className="text-left p-2 font-medium">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {breakpoints.map((b) => (
                    <tr key={b.name} className="border-b border-border">
                      <td className="p-2 font-mono">{b.name}</td>
                      <td className="p-2">{b.min}</td>
                      <td className="p-2 text-mistral-black-tint">{b.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* === ELEVATION === */}
          <Section
            id="elevation"
            title="Elevation"
            intro="Mistral ships only one named shadow (--shadow-deploy-logo). The 5-level scale below is a recommended gap-filler — NOT extracted from the live site."
          >
            <Usage status="unused">
              <strong>No homepage component renders a shadow.</strong> The Mistral aesthetic relies on flat surfaces with hairline borders and color contrast for depth. The single named token <code className="font-mono text-xs">--shadow-deploy-logo</code> is reserved for the &ldquo;Deployed in production&rdquo; logo cards but has no current consumer; the 5-level scale shown here is a synthesized recommendation for future surfaces (modals, dropdowns) and should not be added to tokens.css unless adopted.
            </Usage>
            <div className="bg-mistral-beige/30 p-3 rounded-md text-xs text-mistral-black-tint mb-6">
              ⚠️ Suggestion only. Do not put in tokens.css unless the team adopts.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {elevationLevels.map((e) => (
                <div key={e.level} className="text-center">
                  <div
                    className="size-24 mx-auto bg-card border border-border rounded-md"
                    style={{
                      boxShadow:
                        e.level === 1
                          ? "0 1px 2px rgba(0,0,0,0.04)"
                          : e.level === 2
                          ? "0 4px 12px rgba(0,0,0,0.04)"
                          : e.level === 3
                          ? "0 12px 24px -4px rgba(0,0,0,0.08)"
                          : e.level === 4
                          ? "0 16px 48px -8px rgba(0,0,0,0.12)"
                          : "none",
                    }}
                  />
                  <div className="text-xs font-mono text-mistral-black-tint mt-3">level {e.level}</div>
                  <div className="text-xs text-mistral-black-tint mt-1">{e.use}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* === MOTION === */}
          <Section
            id="motion"
            title="Motion"
            intro="Easing curves, animation keyframes, and transition guidance."
          >
            <SubHeading>Easing</SubHeading>
            <Usage status="partial">
              The named easing tokens (<code className="font-mono text-xs">--ease-in</code>, <code className="font-mono text-xs">--ease-out</code>, <code className="font-mono text-xs">--ease-in-out</code>) aren&apos;t referenced by name. Homepage components use plain <code className="font-mono text-xs">transition-colors</code> on link/button hovers in Top nav and Site footer — which falls back to Tailwind&apos;s default <code className="font-mono text-xs">cubic-bezier(0.4, 0, 0.2, 1)</code>. No bespoke easing curves are applied to homepage interactions.
            </Usage>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {easings.map((e) => (
                <div key={e.token} className="border border-border p-5 rounded-md">
                  <code className="text-xs font-mono text-mistral-black-tint break-all">{e.token}</code>
                  <div className="text-xs text-mistral-black-tint mt-1 mb-3">{e.value}</div>
                  <div className="h-1 bg-mistral-black/5 relative">
                    <div
                      className="absolute top-0 size-3 bg-mistral-orange rounded-[8px] -mt-1 hover:translate-x-[200px] transition-transform duration-1000"
                      style={{ transitionTimingFunction: e.value }}
                    />
                  </div>
                  <div className="text-[10px] text-mistral-black-tint mt-2">Hover the row to demo</div>
                </div>
              ))}
            </div>

            <SubHeading>Animations (keyframes shipped)</SubHeading>
            <Usage status="unused">
              <strong>Zero <code className="font-mono text-xs">animate-*</code> utility refs across the homepage.</strong> The Mistral snapshot captured a frozen <code className="font-mono text-xs">transform: translate3d(...)</code> on the customer logo marquee, so its CSS-keyframe animation isn&apos;t actually running on the page (a known v1 gap). <code className="font-mono text-xs">animate-spin</code>, <code className="font-mono text-xs">animate-pulse</code>, <code className="font-mono text-xs">animate-rotate-y</code>, accordion keyframes etc. are compiled into utilities.css but await consumers.
            </Usage>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {animations.map((a) => (
                <div key={a.token} className="border border-border p-5 rounded-md">
                  <code className="text-xs font-mono text-mistral-black-tint break-all">{a.token}</code>
                  <div className="text-xs text-mistral-black-tint mt-1">{a.duration}</div>
                  <div className="text-xs text-mistral-black-tint">{a.use}</div>
                  {a.token === "--animate-spin" && (
                    <div className="size-6 border-2 border-mistral-orange border-t-transparent rounded-[8px] mt-3" style={{ animation: "spin 1s linear infinite" }} />
                  )}
                  {a.token === "--animate-pulse" && (
                    <div className="size-6 bg-mistral-orange rounded-[8px] mt-3" style={{ animation: "pulse 2s cubic-bezier(.4,0,.6,1) infinite" }} />
                  )}
                </div>
              ))}
            </div>
          </Section>

          {/* === COMPONENTS === */}
          <Section
            id="components"
            title="Components"
            intro="Component patterns synthesized from observed Tailwind class compositions on mistral.ai. No named component tokens beyond top-nav / logoloop."
          >
            <SubHeading>Buttons</SubHeading>
            <Usage status="used">
              <strong>Pill rule:</strong> every interactive primitive on the homepage uses <code className="font-mono text-xs">rounded-[8px]</code> — Top nav (&ldquo;Contact Sales&rdquo;, &ldquo;Try Studio&rdquo; split-button pill, mobile drawer CTAs), Customer carousel (5× &ldquo;Discover X&rdquo; product buttons, Prev/Next icon-only nav buttons), chip-labels, badges. Layout containers stay square — pill shape signals interactivity against a squared layout. The <em>Link</em> variant (border-bottom underline) is a text-link pattern and keeps no radius.
              {" "}<strong>Icon buttons</strong> (carousel Prev/Next) follow the same pill rule: <code className="font-mono text-xs">size-12 rounded-[8px]</code> with no label — documented as <code className="font-mono text-xs">button-icon</code> in design-system.md §8.1.
              {" "}<strong>Horizontal padding:</strong> all text pills use <code className="font-mono text-xs">px-5</code> (20px) — the rounded edges visually consume a few pixels of the apparent inset, so the bumped padding keeps text from crowding the curve. Chip-labels use <code className="font-mono text-xs">px-5 py-3</code> for the same reason.
            </Usage>
            <div className="space-y-4">
              {buttonVariants.map((b) => (
                <div key={b.name} className={"flex items-center gap-4 p-4 rounded-md " + (b.darkBg ? "bg-mistral-black" : "bg-card border border-border")}>
                  <button className={b.className}>{b.label}</button>
                  <div className="flex-1">
                    <div className={"text-sm font-medium " + (b.darkBg ? "text-white" : "text-mistral-black")}>{b.name}</div>
                    <code className={"text-xs font-mono " + (b.darkBg ? "text-white/60" : "text-mistral-black-tint") + " block mt-1"}>{b.className}</code>
                  </div>
                </div>
              ))}
            </div>

            <SubHeading>Badges</SubHeading>
            <Usage status="unused">
              No homepage component renders a badge component. Pill-style chips do appear in Customer carousel (industry tags), but they&apos;re composed from <code className="font-mono text-xs">rounded-[8px]</code> + <code className="font-mono text-xs">border-white</code> + <code className="font-mono text-xs">text-xs</code> ad-hoc rather than a named badge variant. The variants shown here are recommended patterns ready for future use.
            </Usage>
            <div className="flex flex-wrap gap-4 items-center">
              {badgeVariants.map((b) => (
                <div key={b.name} className="flex items-center gap-2">
                  <span className={b.className}>{b.label}</span>
                  <code className="text-xs font-mono text-mistral-black-tint">{b.name}</code>
                </div>
              ))}
            </div>

            <SubHeading>Cards</SubHeading>
            <Usage status="partial">
              Card surfaces are common but use brand-color utilities (<code className="font-mono text-xs">bg-mistral-beige-deep</code>, <code className="font-mono text-xs">bg-mistral-black</code>) directly rather than the semantic <code className="font-mono text-xs">bg-card</code> token: Customer carousel renders &ldquo;Deployed in production&rdquo; cards on cream surfaces, Marketecture grid shows feature cards. The <strong>photographic dark card</strong> variant (black + sunset-overlay gradient) uses <code className="font-mono text-xs">rounded-[20px]</code> — 20px is the system&apos;s XL corner radius (--radius-xl) for large photographic surfaces — on all three customer story tiles (Stellantis, ASML, CMA CGM) paired with <code className="font-mono text-xs">overflow-hidden</code> so the background photo clips to the curved corners. The <strong>base card</strong> with <code className="font-mono text-xs">bg-card</code> is recommended but not yet consumed on the homepage.
            </Usage>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card text-card-foreground rounded-md p-md border border-border">
                <div className="text-xs font-mono text-mistral-black-tint mb-2">card-base</div>
                <h4 className="text-lg font-medium">Base card</h4>
                <p className="text-sm text-mistral-black-tint mt-2">Default white card on cream background, with hairline border.</p>
              </div>
              <div className="bg-mistral-beige-deep p-xl rounded-md">
                <div className="text-xs font-mono text-mistral-black-tint mb-2">card-feature</div>
                <h4 className="text-lg font-medium">Feature card (cream)</h4>
                <p className="text-sm text-mistral-black-tint mt-2">Cream surface for feature blocks and value props.</p>
              </div>
              <div className="bg-mistral-black text-white p-6 rounded-[20px] md:col-span-2 h-48 flex flex-col justify-between relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1f1f1f 0%, #154ACC 200%)" }}>
                <div className="text-xs font-mono text-white/70">card-photographic · rounded-[20px] (--radius-xl, large photographic surfaces)</div>
                <div>
                  <h4 className="text-2xl font-medium">Photographic dark card</h4>
                  <p className="text-sm text-white/70 mt-2">Customer story pattern. 20px (--radius-xl) for large photographic surfaces. overflow-hidden clips the photo to the rounded corners.</p>
                </div>
              </div>
            </div>

            <SubHeading>Inputs (recommended pattern — no homepage example)</SubHeading>
            <Usage status="unused">
              The homepage has zero form fields — no search, no email capture, no comment box. The <code className="font-mono text-xs">border-input</code> and <code className="font-mono text-xs">ring-ring</code> tokens are declared for completeness but await any consumer. Use this pattern when you build the contact form, newsletter signup, or in-product surfaces.
            </Usage>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-mistral-black-tint">text-input</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="block w-full mt-1 border border-input bg-background rounded-md h-10 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-mistral-black-tint">text-area</label>
                <textarea
                  placeholder="Your message"
                  rows={3}
                  className="block w-full mt-1 border border-input bg-background rounded-md p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>

            <SubHeading>Tabs (suggested pattern)</SubHeading>
            <Usage status="unused">
              No tab UI is rendered on the homepage. Recommended for future product / docs pages where category-switching is needed. The two patterns shown (active pill + underlined) match the Mistral aesthetic — square corners on the underline variant, full pill on the chip variant.
            </Usage>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <button className="bg-mistral-black text-white border border-mistral-black rounded-[8px] px-4 py-2 text-sm">Active pill</button>
                <button className="rounded-[8px] px-4 py-2 text-sm border border-current text-mistral-black hover:bg-mistral-black/5 transition-colors">Pill tab</button>
                <button className="rounded-[8px] px-4 py-2 text-sm border border-current text-mistral-black hover:bg-mistral-black/5 transition-colors">Pill tab</button>
              </div>
              <div className="flex border-b border-border">
                {["Overview", "Pricing", "Docs"].map((t, i) => (
                  <button key={t} className={"pb-3 px-4 text-sm border-b-2 -mb-px " + (i === 0 ? "border-mistral-orange text-mistral-orange" : "border-transparent text-mistral-black-tint hover:text-mistral-black transition-colors")}>{t}</button>
                ))}
              </div>
            </div>

            <SubHeading>Code block</SubHeading>
            <Usage status="unused">
              No code samples appear on the homepage. Reserved for the docs and developer-facing pages (e.g., when <code className="font-mono text-xs">/docs</code>, <code className="font-mono text-xs">/api</code>, or product pages render snippets). Pattern follows Mistral&apos;s dark-on-black aesthetic with <code className="font-mono text-xs">bg-mistral-black</code> + monospace.
            </Usage>
            <div className="bg-mistral-black text-white font-mono text-sm rounded-md p-md">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                <span className="text-xs text-white/50">code-block-header</span>
                <span className="text-xs text-white/50">JavaScript</span>
              </div>
              <pre className="text-sm">{`const mistral = require("@mistralai/mistralai");
const client = new mistral.Client({ apiKey: process.env.MISTRAL_API_KEY });
const response = await client.chat({ model: "mistral-large-latest", messages: [...] });`}</pre>
            </div>

            <SubHeading>Top nav (component tokens)</SubHeading>
            <Usage status="used">
              Implemented in <code className="font-mono text-xs">components/nav/Nav.tsx</code> and rendered at the top of every page from <code className="font-mono text-xs">app/layout.tsx</code>. The <code className="font-mono text-xs">--nav-height</code> + <code className="font-mono text-xs">--nav-height-mobile</code> tokens drive the <code className="font-mono text-xs">pt-[100px]</code> offset on <code className="font-mono text-xs">&lt;main&gt;</code> and the slide-down white backdrop scroll behavior. Single canonical instance — the heaviest concentration of <code className="font-mono text-xs">mistral-black</code> (12 refs) and <code className="font-mono text-xs">mistral-orange</code> (4 refs) on the page.
            </Usage>
            <div className="border border-border p-5 rounded-md">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><code className="font-mono text-xs">--nav-height</code></div><div>100px (desktop)</div>
                <div><code className="font-mono text-xs">--nav-height-mobile</code></div><div>88px (mobile)</div>
              </div>
              <p className="text-xs text-mistral-black-tint mt-3">Implementation: <code className="font-mono">components/nav/Nav.tsx</code> — slides white backdrop down past 80px scroll.</p>
            </div>

            <SubHeading>Logo marquee (component CSS)</SubHeading>
            <Usage status="partial">
              Renders inside the <strong>Customer carousel (Section1)</strong> as a horizontal logo wall. The <code className="font-mono text-xs">--logoloop-gap</code> + <code className="font-mono text-xs">--logoloop-logoHeight</code> CSS variables are honored by the markup, but the JS-driven horizontal scroll animation isn&apos;t wired up — the snapshot captured a frozen <code className="font-mono text-xs">transform: translate3d(...)</code> state, so the logos are offset but static (known v1 gap, listed below).
            </Usage>
            <div className="bg-card border border-border rounded-md p-md">
              <div className="text-xs font-mono text-mistral-black-tint mb-2">.logoloop with inline-style props</div>
              <ul className="text-sm space-y-1">
                <li><code className="font-mono text-xs">--logoloop-gap</code>: 72px</li>
                <li><code className="font-mono text-xs">--logoloop-logoHeight</code>: 38px</li>
              </ul>
              <p className="text-xs text-mistral-black-tint mt-3">Animation is JS-driven (currently frozen at the snapshot&apos;s transform value — known gap).</p>
            </div>

            <SubHeading>Signature elements</SubHeading>
            <Usage status="used">
              The <strong>MistX rainbow band</strong> (6-stop blue gradient as a 90° stripe) is rendered at the bottom of <code className="font-mono text-xs">SiteFooter.tsx</code> via 6 <code className="font-mono text-xs">bg-mistral-footer-band-*</code> stop refs — the canonical brand-signature closer. The <strong>hero-band blue gradient</strong> (135°) appears in the Hero band background. The <strong>pale-blue CTA banner</strong> pattern (<code className="font-mono text-xs">bg-mistral-beige-deep</code> with dark CTA inside) appears in Customer carousel cards and the &ldquo;Bring frontier AI to your enterprise&rdquo; CTA closer.
            </Usage>
            <div className="space-y-4">
              <div className="rounded-md overflow-hidden border border-border">
                <div className="text-xs font-mono text-mistral-black-tint p-3 bg-mistral-black/5">hero-band-blue (135° gradient)</div>
                <div className="h-32" style={{ background: "linear-gradient(135deg, #2663EB 0%, #12369C 50%, #091442 100%)" }} />
              </div>
              <div className="rounded-md overflow-hidden border border-border">
                <div className="text-xs font-mono text-mistral-black-tint p-3 bg-mistral-black/5">MistX rainbow band — the brand signature closer</div>
                <div className="h-12" style={{ background: `linear-gradient(90deg, ${mistralRainbow.map((r) => r.hex).join(", ")})` }} />
              </div>
              <div className="bg-mistral-beige border border-mistral-beige-deep p-xl rounded-md">
                <div className="text-xs font-mono text-mistral-black-tint mb-2">cta-banner-pale</div>
                <h4 className="text-2xl font-medium">Bring frontier AI to your enterprise.</h4>
                <p className="text-sm text-mistral-black-tint mt-2">Pale-blue surfaced CTA panel near the page bottom.</p>
                <button className="mt-4 bg-mistral-black text-white px-5 py-2 text-sm rounded-[8px] hover:bg-mistral-black/90 transition-colors">Contact Sales</button>
              </div>
            </div>
          </Section>

          {/* === LOGO === */}
          <Section
            id="logo"
            title="Logo"
            intro="11 official variants from mistral.ai/brand. Logo files are not bundled in the project — download from the brand page when needed."
          >
            <Usage status="partial">
              Only the <strong>Mistral wordmark + M-icon (light)</strong> is rendered on the homepage — once in <code className="font-mono text-xs">Nav.tsx</code> (top-left brand mark) and once in <code className="font-mono text-xs">SiteFooter.tsx</code> (footer signature). The dark, monochrome, and rainbow lockup variants are documented for completeness from mistral.ai/brand but not used in this v1 homepage. Logo SVGs are served from <code className="font-mono text-xs">/public/images/</code> via the asset extraction step.
            </Usage>
            <div className="space-y-4">
              {logoVariants.map((f) => (
                <div key={f.family}>
                  <div className="text-xs font-mono uppercase tracking-wider text-mistral-black-tint mb-2">{f.family}</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {f.variants.map((v) => (
                      <div key={v} className={"size-24 rounded-md border border-border flex items-center justify-center text-xs " + (v.toLowerCase().includes("dark") ? "bg-mistral-black text-white" : v.toLowerCase().includes("rainbow") ? "" : "bg-card text-mistral-black")} style={v.toLowerCase().includes("rainbow") ? { background: `linear-gradient(135deg, ${mistralRainbow.map((r) => r.hex).join(", ")})`, color: "#fff" } : {}}>
                        {v}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-5 bg-mistral-beige rounded-md">
              <div className="text-sm font-medium mb-2">Interim conventions (until brand page publishes formal rules)</div>
              <ul className="text-sm text-mistral-black-tint space-y-1 list-disc pl-5">
                <li>Clear space ≥ height of the M icon on all sides</li>
                <li>Minimum logo height: 24px (digital), 12mm (print)</li>
                <li>Don&apos;t recolor outside the published variants</li>
                <li>Don&apos;t stretch, distort, or apply effects (drop shadow, glow, outline)</li>
              </ul>
            </div>
          </Section>

          {/* === IMAGERY === */}
          <Section
            id="imagery"
            title="Imagery"
            intro="Hero imagery uses an abstract blue gradient (no photo). Synthesized from observation — no formal brand spec."
          >
            <Usage status="partial">
              The <strong>Hero band</strong> renders as a pure CSS blue gradient (TODO: drop in a blue-friendly hero photo when one is sourced). <strong>Customer carousel</strong> &ldquo;Deployed in production&rdquo; cards still carry per-customer photographic backgrounds with subject silhouettes. Logo wall imagery is monochromatic by default. All imagery is served from <code className="font-mono text-xs">/public/images/</code> as <code className="font-mono text-xs">.webp</code>.
            </Usage>
            <div className="rounded-md overflow-hidden border border-border">
              <div className="h-64 relative" style={{ background: "linear-gradient(135deg, #2663EB 0%, #12369C 50%, #091442 100%)" }}>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wider opacity-60">hero band example</p>
                    <p className="text-3xl font-medium mt-2">Abstract blue. 16:9.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 text-xs text-mistral-black-tint">
                16:9 aspect ratio · pure CSS blue gradient (no image) · logo-wall items 60-80px tall, monochromatic by default
              </div>
            </div>
          </Section>

          {/* === ICONOGRAPHY === */}
          <Section
            id="iconography"
            title="Iconography"
            intro="Bespoke SVG icons rendered inline using currentColor so they inherit text color. 12px–24px sizes."
          >
            <Usage status="used">
              15 inline <code className="font-mono text-xs">&lt;svg&gt;</code> icons across the homepage: Hero (4 — chevron arrows + decorative), Customer carousel (5 — directional + accent), Top nav (3 — hamburger menu + social), Site footer (2 — App Store / Play Store glyphs), Privacy/deploy (1 — feature accent). All use <code className="font-mono text-xs">currentColor</code> for stroke/fill so they inherit text color, sized 12-24px. No SVG icon library — bespoke inline pattern matches the Mistral snapshot exactly.
            </Usage>
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {[
                <svg key="arrow" width="24" height="24" viewBox="0 0 9 13" fill="none"><path d="M2 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
                <svg key="chevron" width="24" height="24" viewBox="0 0 12 8" fill="none"><path d="M2 2l4 4 4-4" stroke="currentColor" strokeWidth="1.5" /></svg>,
                <svg key="check" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
                <svg key="x" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" /></svg>,
                <svg key="plus" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
                <svg key="external" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 4h6v6M10 14L20 4M19 13v6a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
                <svg key="menu" width="24" height="24" viewBox="0 0 75 63" fill="none"><path opacity=".5" d="M49.76 49.76H0V62.20H49.76V49.76Z" fill="currentColor" /><path opacity=".7" d="M74.64 24.88H0V37.32H74.64V24.88Z" fill="currentColor" /><path d="M74.64 0H0V12.44H74.64V0Z" fill="currentColor" /></svg>,
                <svg key="dots" width="24" height="24" viewBox="0 0 9 13" fill="none"><circle cx="7.22" cy="6.589" r="1.28" fill="currentColor"/><circle cx="4.658" cy="4.018" r="1.28" fill="currentColor"/><circle cx="2.099" cy="1.46" r="1.28" fill="currentColor"/><circle cx="4.658" cy="9.151" r="1.28" fill="currentColor"/><circle cx="2.099" cy="11.718" r="1.28" fill="currentColor"/></svg>,
              ].map((icon, i) => (
                <div key={i} className="border border-border p-4 rounded-md flex items-center justify-center text-mistral-black">
                  {icon}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-mistral-black-tint">All icons render with currentColor and inherit text color. Use 12-24px sizes.</p>
          </Section>

          {/* === DOS & DONTS === */}
          <Section
            id="dos-donts"
            title="Do's & Don'ts"
            intro="Brand voice + utility-first methodology rules."
          >
            <Usage status="used">
              These rules reflect how the homepage is actually built today: brand orange is confined to action signals (CTAs in Top nav + Hero + Customer carousel), the sunset stripe lives only at the bottom of the Site footer (canonical closer), square corners are the default everywhere, and every component composes from Tailwind utility classes that resolve to brand tokens. Treat these as audit criteria when adding new sections.
            </Usage>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-mistral-beige p-5 rounded-md">
                <div className="text-xs uppercase tracking-wider text-mistral-orange font-medium mb-3">✓ Do</div>
                <ul className="space-y-2 text-sm">
                  {dosDonts.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-mistral-orange shrink-0">•</span>
                      <span>{d.do}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-mistral-black/5 p-5 rounded-md">
                <div className="text-xs uppercase tracking-wider text-mistral-black-tint font-medium mb-3">✗ Don&apos;t</div>
                <ul className="space-y-2 text-sm">
                  {dosDonts.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-mistral-black-tint shrink-0">•</span>
                      <span>{d.dont}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          {/* === RESPONSIVE === */}
          <Section
            id="responsive"
            title="Responsive"
            intro="Mobile-first. Default styles apply at all sizes; md:, lg:, xl:, 4xl: prefixes upgrade."
          >
            <SubHeading>Element-level responsive guidance</SubHeading>
            <Usage status="used">
              Every row in the table reflects a real responsive switch on the homepage: Top nav swaps to a hamburger drawer below <code className="font-mono text-xs">md:</code>, Hero scales from <code className="font-mono text-xs">text-3xl</code> to <code className="font-mono text-xs">md:text-5xl lg:text-7xl</code>, Customer carousel stacks single-column then 4-up, Site footer goes from 2-column mobile to <code className="font-mono text-xs">md:grid-cols-4</code>. The sunset stripe stays full-width across all breakpoints by design.
            </Usage>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 font-medium">Element</th>
                    <th className="text-left p-2 font-medium">Mobile</th>
                    <th className="text-left p-2 font-medium">Desktop</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { e: "Promo banner", m: "Hidden or condensed", d: "Full text" },
                    { e: "Top nav", m: "88px tall, hamburger drawer", d: "100px tall, inline links" },
                    { e: "Hero image", m: "16:9, full-bleed", d: "16:9, contained inside max-w-1280px" },
                    { e: "Logo wall", m: "60–80px tall", d: "60–80px tall (same)" },
                    { e: "Pricing cards", m: "Stacked single column", d: "4-up" },
                    { e: "Stat row", m: "1-up", d: "3-up" },
                    { e: "Footer", m: "Stacked columns", d: "4–6 columns" },
                    { e: "Sunset stripe", m: "Always full-width", d: "Always full-width" },
                  ].map((r) => (
                    <tr key={r.e} className="border-b border-border">
                      <td className="p-2 font-medium">{r.e}</td>
                      <td className="p-2 text-mistral-black-tint">{r.m}</td>
                      <td className="p-2 text-mistral-black-tint">{r.d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* === GAPS === */}
          <Section
            id="gaps"
            title="Iteration & Known Gaps"
            intro="Severity-ranked gaps and the iteration pattern."
          >
            <SubHeading>Iteration principles</SubHeading>
            <Usage status="used">
              These principles match the prime directive in <code className="font-mono text-xs">CLAUDE.md</code>: design-system-driven changes propagate through tokens.css → utilities.css → components, never via single-component edits. Any new homepage section should reference <code className="font-mono text-xs">bg-mistral-orange</code> / <code className="font-mono text-xs">text-mistral-orange</code> for action signals (not raw <code className="font-mono text-xs">#154ACC</code>) and reuse the pale-blue + black surface vocabulary already established.
            </Usage>
            <ul className="text-sm space-y-1 list-disc pl-5 text-mistral-black-tint mb-8">
              <li>One component at a time — don&apos;t refactor multiple sections in a single change.</li>
              <li>Reference tokens directly in components (`bg-mistral-orange`, not `bg-[#154ACC]`).</li>
              <li>Default body text → `text-base`; default page hero → `--font-size-heading-0`.</li>
              <li>Keep the MistX Rainbow band as the canonical closer on every page.</li>
              <li>Confine `--color-mistral-orange` (now MistX Blue) to action signals (CTAs, active state, hover); not decorative.</li>
            </ul>

            <SubHeading>Known gaps (severity-ranked)</SubHeading>
            <Usage status="partial">
              Each gap names a specific homepage area where the design system is incomplete: the frozen logo marquee state lives in Customer carousel, dark-mode toggle UI doesn&apos;t yet exist (variants are compiled but not wired), and a chunk of declared tokens — <strong>--color-mistral-sunshine-* (12 steps)</strong>, semantic <strong>bg-card / border-border / border-input</strong>, every <strong>animate-*</strong> utility — has zero homepage consumers. These are listed below for reference; address by either retiring the unused tokens or wiring them into a new homepage section.
            </Usage>
            <div className="space-y-2">
              {knownGaps.map((g, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-b-0">
                  <span
                    className={
                      "text-xs px-2 py-1 rounded-sm font-medium shrink-0 " +
                      (g.severity === "High"
                        ? "bg-red-100 text-red-700"
                        : g.severity.startsWith("Medium")
                        ? "bg-mistral-sunshine-200 text-mistral-black"
                        : g.severity === "Low"
                        ? "bg-mistral-beige text-mistral-black-tint"
                        : "bg-mistral-black/10 text-mistral-black-tint")
                    }
                  >
                    {g.severity}
                  </span>
                  <span className="text-sm">{g.gap}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-5 bg-mistral-black text-white rounded-md">
              <div className="text-xs uppercase tracking-wider text-white/60 font-medium mb-2">Where things live</div>
              <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap">{`design-system/
├── design-system.md            ← source of truth (human reference)
└── styles/
    ├── tokens.css              ← :root token declarations (235 tokens)
    ├── utilities.css           ← compiled Tailwind utilities (~63 KB)
    ├── 01-background-images.css
    ├── 03-splide.css
    ├── 04-katex.css
    ├── 05-axeptio.css
    ├── 06-helper-sf-hidden.css
    ├── 07-helper-empty-img.css
    └── 08-vendor-third-party.css`}</pre>
            </div>
          </Section>

          {/* Footer of design page */}
          <div className="border-t border-border py-12 mt-12">
            <p className="text-sm text-mistral-black-tint">
              Source of truth: <code className="font-mono text-xs">design-system/design-system.md</code> +{" "}
              <code className="font-mono text-xs">design-system/styles/tokens.css</code>. This page renders both.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
