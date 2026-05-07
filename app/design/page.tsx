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
  { name: "Red", hex: "#e10500", rgb: "225/5/0", cmyk: "0/98/100/12", token: "--color-mistral-footer-band-6" },
  { name: "Orange Dark", hex: "#fa500f", rgb: "250/80/15", cmyk: "0/68/94/2", token: "--color-mistral-footer-band-5" },
  { name: "Orange", hex: "#ff8205", rgb: "255/130/5", cmyk: "0/49/98/0", token: "--color-mistral-footer-band-4" },
  { name: "Orange Light", hex: "#ffaf00", rgb: "255/175/0", cmyk: "0/31/100/0", token: "--color-mistral-footer-band-3" },
  { name: "Yellow", hex: "#ffd800", rgb: "255/216/0", cmyk: "0/15/100/0", token: "--color-mistral-footer-band-2" },
];

const brandAccent = [
  { name: "Mistral Orange", token: "--color-mistral-orange", hex: "#fc6c1c (HSL 17 96% 52%)", note: "Primary brand accent" },
  { name: "Orange Bright", token: "--color-mistral-orange-bright", hex: "#ff7400 (HSL 30 100% 51%)", note: "Dark-mode-friendly" },
  { name: "Orange Darker", token: "--color-mistral-orange-darker", hex: "(declared inline)", note: "Hover/pressed" },
];

const beigeNeutrals = [
  { name: "Beige Light", token: "--color-mistral-beige", hex: "#fffaeb", note: "= brand 'Beige Light'" },
  { name: "Beige Deep", token: "--color-mistral-beige-deep", hex: "#ffefc1", note: "≈ brand 'Beige Medium'" },
  { name: "Beige Deeper", token: "--color-mistral-beige-deeper", hex: "#e6dbbe", note: "≈ brand 'Beige Dark'" },
];

const sunshinePalette = [
  { token: "--color-mistral-sunshine-50", hex: "#fff0c3" },
  { token: "--color-mistral-sunshine-100", hex: "#ffe295" },
  { token: "--color-mistral-sunshine-200", hex: "#ffdd8a" },
  { token: "--color-mistral-sunshine-300", hex: "#ffd06a" },
  { token: "--color-mistral-sunshine-400", hex: "#ffc452" },
  { token: "--color-mistral-sunshine-500", hex: "#ffb83e" },
  { token: "--color-mistral-sunshine-600", hex: "#ffad2e" },
  { token: "--color-mistral-sunshine-700", hex: "#ffa110" },
  { token: "--color-mistral-sunshine-750", hex: "#f2920b" },
  { token: "--color-mistral-sunshine-800", hex: "#ff9500" },
  { token: "--color-mistral-sunshine-900", hex: "#ff8a00" },
  { token: "--color-mistral-sunshine-950", hex: "#ff7f00" },
];

const inkScale = [
  { name: "Black", token: "--mistral-deep-black", hex: "#000000", brand: "Brand 'Black'" },
  { name: "Black Matt", token: "--color-mistral-black", hex: "#1f1f1f (HSL 0 0% 12%)", brand: "≈ Brand 'Black Tinted' (#1e1e1e — 1 hex digit drift)" },
  { name: "Black Matt Tint", token: "--color-mistral-black-tint", hex: "#3d3d3d", brand: "Secondary text" },
  { name: "Foreground", token: "--color-foreground", hex: "#1f1f1f", brand: "Default page text" },
];

const surfaces = [
  { name: "Background", token: "--color-background", hex: "#fffaeb", note: "Page background (cream)" },
  { name: "Card", token: "--color-card", hex: "#ffffff", note: "Card surface" },
  { name: "Popover", token: "--color-popover", hex: "#ffffff", note: "Popover/dropdown surface" },
  { name: "Primary", token: "--color-primary", hex: "#fc6c1c", note: "Primary action background" },
  { name: "Secondary", token: "--color-secondary", hex: "#ffefc1", note: "Secondary action surface (cream)" },
  { name: "Muted", token: "--color-muted", hex: "#fffaeb", note: "Muted/disabled surface" },
  { name: "Accent", token: "--color-accent", hex: "#fc6c1c", note: "Accent surface (= primary)" },
  { name: "Destructive", token: "--color-destructive", hex: "#e10500", note: "Destructive (= Rainbow Red)" },
];

const hairlines = [
  { name: "Border", token: "--color-border", hex: "#fffaeb (HSL 45 100% 96%)", note: "Default hairline" },
  { name: "Input", token: "--color-input", hex: "#e3e3ea", note: "Form input border" },
  { name: "Ring", token: "--color-ring", hex: "#fffaeb", note: "Focus ring" },
];

const blockGrid = [
  { token: "--block-1-color", hex: "#ffe295" },
  { token: "--block-2-color", hex: "#ffd900" },
  { token: "--block-3-color", hex: "#ff8d06" },
  { token: "--block-4-color", hex: "#fef2cb" },
  { token: "--block-5-color", hex: "#ffe295" },
  { token: "--block-6-color", hex: "#ffd900" },
  { token: "--block-7-color", hex: "#ff8105" },
  { token: "--block-grid-color", hex: "#fff0c3" },
  { token: "--block-grid-color-2", hex: "#fef1c3" },
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
  { token: "--radius-sm", value: "calc(0 - 4px) → 0px", className: "rounded-sm" },
  { token: "--radius-md", value: "calc(0 - 2px) → 0px", className: "rounded-md" },
  { token: "--radius-lg", value: "0rem", className: "rounded-lg" },
  { token: "--radius-xl", value: "0.75rem (12px)", className: "rounded-xl" },
  { token: "--radius-2xl", value: "1rem (16px)", className: "rounded-2xl" },
  { token: "--radius-3xl", value: "1.5rem (24px)", className: "rounded-3xl" },
  { token: "(Tailwind)", value: "9999px", className: "rounded-full" },
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
  { name: "Primary", className: "bg-mistral-black text-white hover:bg-mistral-black/90 px-4 py-2 text-sm rounded-md transition-colors", label: "Get started" },
  { name: "Accent", className: "bg-mistral-orange text-white hover:bg-mistral-orange-bright px-4 py-2 text-sm rounded-md transition-colors", label: "Try Studio" },
  { name: "On-dark (glass)", className: "bg-white/10 text-white hover:bg-white hover:text-mistral-black px-4 py-2 text-sm rounded-md transition-colors", label: "Contact Sales", darkBg: true },
  { name: "On-cream", className: "bg-mistral-black/10 text-mistral-black hover:bg-mistral-black hover:text-white px-4 py-2 text-sm rounded-md transition-colors", label: "Learn more" },
  { name: "Outline", className: "border border-current bg-transparent text-mistral-black px-4 py-2 text-sm rounded-md hover:bg-mistral-black/5 transition-colors", label: "Read docs" },
  { name: "Link", className: "border-b border-current pb-1 inline-flex items-center gap-3 text-mistral-black hover:text-mistral-orange transition-colors", label: "Read more →" },
];

const badgeVariants = [
  { name: "Orange", className: "bg-mistral-orange text-white rounded-full px-3 py-1 text-xs", label: "New" },
  { name: "Cream", className: "bg-mistral-beige border border-mistral-black/20 rounded-full px-3 py-1 text-xs text-mistral-black", label: "Beta" },
  { name: "Dark", className: "bg-mistral-black text-white rounded-full px-3 py-1 text-xs", label: "Enterprise" },
  { name: "Outline", className: "rounded-full border border-current px-3 py-1 text-xs text-mistral-black", label: "Manufacturing" },
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
  { do: "Keep orange to CTAs and active states only", dont: "Use orange decoratively (it's a signal color)" },
  { do: "Always include the sunset-stripe band as a page closer", dont: "Drop the rainbow stripe — it's the brand signature" },
  { do: "Use Rainbow tokens (`--mistral-footer-band-2..6`) wherever a rainbow is needed", dont: "Repurpose individual rainbow stops as accent colors" },
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
          <div className="size-12 rounded-md" style={{ backgroundColor: "#ff8205" }} />
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-mistral-black-tint">MistX · v0.1.0 · alpha</p>
            <h1 className="text-4xl md:text-6xl font-medium leading-tight mt-2">Design System</h1>
          </div>
        </div>
        <p className="mt-6 text-base md:text-lg text-mistral-black-tint max-w-3xl">
          Faithful Next.js + TS reconstruction of Mistral AI&apos;s homepage. Atmospheric sunset gradients, cream-yellow surfaces, the Mistral Rainbow as the brand signature, square corners by default, single-family typography. This page is a self-demo: it&apos;s built using the tokens it documents.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono">
          <span className="px-2 py-1 bg-mistral-black/5 rounded-sm">235 tokens</span>
          <span className="px-2 py-1 bg-mistral-black/5 rounded-sm">~63 KB compiled utilities</span>
          <span className="px-2 py-1 bg-mistral-black/5 rounded-sm">Tailwind v4 utility-first</span>
          <span className="px-2 py-1 bg-mistral-orange/10 text-mistral-orange rounded-sm">brand: #ff8205</span>
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
                { label: "Brand color", value: "#ff8205", note: "Rainbow Orange" },
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
            intro="48 unique brand color tokens plus the 12-step Mistral Sunshine ramp. All Mistral colors are HSL custom properties wrapped in hsl(var(--name)) so dark-mode variants work without re-declaration."
          >
            <SubHeading>🌈 Mistral Rainbow — the brand signature</SubHeading>
            <p className="text-sm text-mistral-black-tint mb-6 max-w-3xl">
              The 5-stop spectrum used in the sunset stripe and gradient closers. Documented on mistral.ai/brand with print color formats. Don&apos;t repurpose individual stops as accent colors.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
            <div className="mt-6 h-12 w-full rounded-md" style={{ background: `linear-gradient(90deg, ${mistralRainbow.map((r) => r.hex).join(", ")})` }} aria-label="Sunset stripe band preview" />

            <SubHeading>Brand / Accent</SubHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {brandAccent.map((c) => {
                // Render a square; for "Mistral Orange" use HSL approximation, for others fall back
                const bg = c.token === "--color-mistral-orange" ? "#fc6c1c" : c.token === "--color-mistral-orange-bright" ? "#ff7400" : "#cc3a05";
                return <ColorSwatch key={c.token} hex={bg} label={c.name} sub={`${c.token}\n${c.hex}\n${c.note}`} big />;
              })}
            </div>

            <SubHeading>Cream / warm neutrals</SubHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {beigeNeutrals.map((c) => (
                <ColorSwatch key={c.token} hex={c.hex.split(" ")[0]} label={c.name} sub={`${c.token}\n${c.hex}\n${c.note}`} big />
              ))}
            </div>

            <SubHeading>Mistral Sunshine palette (12 steps)</SubHeading>
            <p className="text-sm text-mistral-black-tint mb-4">Warm-yellow ramp used for product surfaces, badges, and gradient stops. Not on brand page; present in tokens.css.</p>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {surfaces.map((c) => (
                <ColorSwatch key={c.token} hex={c.hex} label={c.name} sub={`${c.token}\n${c.hex}\n${c.note}`} />
              ))}
            </div>

            <SubHeading>Hairlines / borders</SubHeading>
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

            <SubHeading>Block / grid colors (sunset gradient stops)</SubHeading>
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
            intro="Mistral leans squared corners — --radius defaults to 0rem. Use rounded-xl/2xl/3xl explicitly when softer corners are needed; rounded-full for pills."
          >
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {easings.map((e) => (
                <div key={e.token} className="border border-border p-5 rounded-md">
                  <code className="text-xs font-mono text-mistral-black-tint break-all">{e.token}</code>
                  <div className="text-xs text-mistral-black-tint mt-1 mb-3">{e.value}</div>
                  <div className="h-1 bg-mistral-black/5 relative">
                    <div
                      className="absolute top-0 size-3 bg-mistral-orange rounded-full -mt-1 hover:translate-x-[200px] transition-transform duration-1000"
                      style={{ transitionTimingFunction: e.value }}
                    />
                  </div>
                  <div className="text-[10px] text-mistral-black-tint mt-2">Hover the row to demo</div>
                </div>
              ))}
            </div>

            <SubHeading>Animations (keyframes shipped)</SubHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {animations.map((a) => (
                <div key={a.token} className="border border-border p-5 rounded-md">
                  <code className="text-xs font-mono text-mistral-black-tint break-all">{a.token}</code>
                  <div className="text-xs text-mistral-black-tint mt-1">{a.duration}</div>
                  <div className="text-xs text-mistral-black-tint">{a.use}</div>
                  {a.token === "--animate-spin" && (
                    <div className="size-6 border-2 border-mistral-orange border-t-transparent rounded-full mt-3" style={{ animation: "spin 1s linear infinite" }} />
                  )}
                  {a.token === "--animate-pulse" && (
                    <div className="size-6 bg-mistral-orange rounded-full mt-3" style={{ animation: "pulse 2s cubic-bezier(.4,0,.6,1) infinite" }} />
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
            <div className="flex flex-wrap gap-4 items-center">
              {badgeVariants.map((b) => (
                <div key={b.name} className="flex items-center gap-2">
                  <span className={b.className}>{b.label}</span>
                  <code className="text-xs font-mono text-mistral-black-tint">{b.name}</code>
                </div>
              ))}
            </div>

            <SubHeading>Cards</SubHeading>
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
              <div className="bg-mistral-black text-white p-6 rounded-md md:col-span-2 h-48 flex flex-col justify-between relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1f1f1f 0%, #fa500f 200%)" }}>
                <div className="text-xs font-mono text-white/70">card-photographic</div>
                <div>
                  <h4 className="text-2xl font-medium">Photographic dark card</h4>
                  <p className="text-sm text-white/70 mt-2">Customer story pattern. Black background with optional photo overlay.</p>
                </div>
              </div>
            </div>

            <SubHeading>Inputs (recommended pattern — no homepage example)</SubHeading>
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
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <button className="bg-mistral-black text-white border border-mistral-black rounded-full px-4 py-2 text-sm">Active pill</button>
                <button className="rounded-full px-4 py-2 text-sm border border-current text-mistral-black hover:bg-mistral-black/5 transition-colors">Pill tab</button>
                <button className="rounded-full px-4 py-2 text-sm border border-current text-mistral-black hover:bg-mistral-black/5 transition-colors">Pill tab</button>
              </div>
              <div className="flex border-b border-border">
                {["Overview", "Pricing", "Docs"].map((t, i) => (
                  <button key={t} className={"pb-3 px-4 text-sm border-b-2 -mb-px " + (i === 0 ? "border-mistral-orange text-mistral-orange" : "border-transparent text-mistral-black-tint hover:text-mistral-black transition-colors")}>{t}</button>
                ))}
              </div>
            </div>

            <SubHeading>Code block</SubHeading>
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
            <div className="border border-border p-5 rounded-md">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><code className="font-mono text-xs">--nav-height</code></div><div>100px (desktop)</div>
                <div><code className="font-mono text-xs">--nav-height-mobile</code></div><div>88px (mobile)</div>
              </div>
              <p className="text-xs text-mistral-black-tint mt-3">Implementation: <code className="font-mono">components/nav/Nav.tsx</code> — slides white backdrop down past 80px scroll.</p>
            </div>

            <SubHeading>Logo marquee (component CSS)</SubHeading>
            <div className="bg-card border border-border rounded-md p-md">
              <div className="text-xs font-mono text-mistral-black-tint mb-2">.logoloop with inline-style props</div>
              <ul className="text-sm space-y-1">
                <li><code className="font-mono text-xs">--logoloop-gap</code>: 72px</li>
                <li><code className="font-mono text-xs">--logoloop-logoHeight</code>: 38px</li>
              </ul>
              <p className="text-xs text-mistral-black-tint mt-3">Animation is JS-driven (currently frozen at the snapshot&apos;s transform value — known gap).</p>
            </div>

            <SubHeading>Signature elements</SubHeading>
            <div className="space-y-4">
              <div className="rounded-md overflow-hidden border border-border">
                <div className="text-xs font-mono text-mistral-black-tint p-3 bg-mistral-black/5">hero-band-sunset (135° gradient)</div>
                <div className="h-32" style={{ background: "linear-gradient(135deg, #9F521A 0%, #D3812F 50%, #B35D20 100%)" }} />
              </div>
              <div className="rounded-md overflow-hidden border border-border">
                <div className="text-xs font-mono text-mistral-black-tint p-3 bg-mistral-black/5">sunset-stripe-band — the brand signature closer</div>
                <div className="h-12" style={{ background: `linear-gradient(90deg, ${mistralRainbow.map((r) => r.hex).join(", ")})` }} />
              </div>
              <div className="bg-mistral-beige border border-mistral-beige-deep p-xl rounded-md">
                <div className="text-xs font-mono text-mistral-black-tint mb-2">cta-banner-cream</div>
                <h4 className="text-2xl font-medium">Bring frontier AI to your enterprise.</h4>
                <p className="text-sm text-mistral-black-tint mt-2">Cream-surfaced CTA panel near the page bottom.</p>
                <button className="mt-4 bg-mistral-black text-white px-4 py-2 text-sm rounded-md hover:bg-mistral-black/90 transition-colors">Contact Sales</button>
              </div>
            </div>
          </Section>

          {/* === LOGO === */}
          <Section
            id="logo"
            title="Logo"
            intro="11 official variants from mistral.ai/brand. Logo files are not bundled in the project — download from the brand page when needed."
          >
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
            intro="Hero imagery uses mountain photography under sunset gradients. Synthesized from observation — no formal brand spec."
          >
            <div className="rounded-md overflow-hidden border border-border">
              <div className="h-64 relative" style={{ background: "linear-gradient(135deg, #9F521A 0%, #D3812F 50%, #B35D20 100%)" }}>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wider opacity-60">photographic hero example</p>
                    <p className="text-3xl font-medium mt-2">Mountains. 16:9. Sunset overlay.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 text-xs text-mistral-black-tint">
                16:9 aspect ratio · cool-to-warm orange overlay · subject silhouettes against sunset · logo-wall items 60-80px tall, monochromatic by default
              </div>
            </div>
          </Section>

          {/* === ICONOGRAPHY === */}
          <Section
            id="iconography"
            title="Iconography"
            intro="Bespoke SVG icons rendered inline using currentColor so they inherit text color. 12px–24px sizes."
          >
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {[
                <svg key="arrow" width="24" height="24" viewBox="0 0 9 13" fill="none"><path d="M2 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
                <svg key="chevron" width="24" height="24" viewBox="0 0 12 8" fill="none"><path d="M2 2l4 4 4-4" stroke="currentColor" strokeWidth="1.5" /></svg>,
                <svg key="check" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
                <svg key="x" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" /></svg>,
                <svg key="plus" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
                <svg key="external" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 4h6v6M10 14L20 4M19 13v6a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
                <svg key="menu" width="24" height="24" viewBox="0 0 75 63" fill="none"><path opacity=".5" d="M49.76 49.76H0V62.20H49.76V49.76Z" fill="currentColor" /><path opacity=".7" d="M74.64 24.88H0V37.32H74.64V24.88Z" fill="currentColor" /><path d="M74.64 0H0V12.44H74.64V0Z" fill="currentColor" /></svg>,
                <svg key="dots" width="24" height="24" viewBox="0 0 9 13" fill="none"><path d="M8.5 7.87L8.5 5.31L5.94 5.31L5.94 7.87L8.5 7.87Z" fill="currentColor" /><path d="M5.94 5.30L5.94 2.74L3.38 2.74L3.38 5.30L5.94 5.30Z" fill="currentColor" /><path d="M3.38 2.74L3.38 0.18L0.82 0.18L0.82 2.74L3.38 2.74Z" fill="currentColor" /><path d="M5.94 10.43L5.94 7.87L3.38 7.87L3.38 10.43L5.94 10.43Z" fill="currentColor" /><path d="M3.38 13L3.38 10.44L0.82 10.44L0.82 13L3.38 13Z" fill="currentColor" /></svg>,
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
            <ul className="text-sm space-y-1 list-disc pl-5 text-mistral-black-tint mb-8">
              <li>One component at a time — don&apos;t refactor multiple sections in a single change.</li>
              <li>Reference tokens directly in components (`bg-mistral-orange`, not `bg-[#fc6c1c]`).</li>
              <li>Default body text → `text-base`; default page hero → `--font-size-heading-0`.</li>
              <li>Keep the Mistral Rainbow + sunset stripe as canonical closers on every page.</li>
              <li>Confine `--color-mistral-orange` to action signals (CTAs, active state, hover); not decorative.</li>
            </ul>

            <SubHeading>Known gaps (severity-ranked)</SubHeading>
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
