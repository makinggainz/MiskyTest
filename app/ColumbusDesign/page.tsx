"use client";

/* eslint-disable @next/next/no-img-element */

/**
 * /ColumbusDesign — visual showcase of ColumbusPage's design system.
 *
 * SCOPE: only tokens and patterns ACTUALLY CONSUMED in real components
 * (verified by grepping the project for var(--token-name) usage). Tokens
 * defined in tokens.css but never referenced in components are
 * intentionally excluded — those are dead code, not part of the active
 * design language. See §0 for an audit summary.
 *
 * Source: branch experimentV6-newTechV3.1-NewUseCases-ValeV4
 * Excludes: any *.md files; how-it-works-tokens.css (mapsgpt scope).
 */

import { useEffect, useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "audit", label: "Theory vs reality" },
  { id: "brand-color", label: "Brand color" },
  { id: "typography", label: "Typography (M3)" },
  { id: "fonts", label: "Fonts" },
  { id: "globals", label: "Globals layer" },
  { id: "blog-theme", label: "Blog M3 theming" },
  { id: "enterprise", label: "Enterprise scope" },
  { id: "body-modes", label: "Body-mode a11y" },
  { id: "utilities", label: "Globals utilities" },
];

const usedM3TypeScale = [
  { role: "Display", size: "Large", px: 57, lh: 64, font: "Brand", weight: "400", sample: "Big Display" },
  { role: "Display", size: "Medium", px: 45, lh: 52, font: "Brand", weight: "400", sample: "Medium display" },
  { role: "Display", size: "Small", px: 36, lh: 44, font: "Brand", weight: "400", sample: "Small display" },
  { role: "Headline", size: "Large", px: 32, lh: 40, font: "Brand", weight: "400", sample: "Headline Large" },
  { role: "Headline", size: "Medium", px: 28, lh: 36, font: "Brand", weight: "400", sample: "Headline medium" },
  { role: "Headline", size: "Small", px: 24, lh: 32, font: "Brand", weight: "400", sample: "Headline small" },
  { role: "Title", size: "Large", px: 22, lh: 28, font: "Brand", weight: "400", sample: "Title Large" },
  { role: "Title", size: "Medium", px: 16, lh: 24, font: "Plain", weight: "500", sample: "Title medium" },
  { role: "Title", size: "Small", px: 14, lh: 20, font: "Plain", weight: "500", sample: "Title small" },
  { role: "Body", size: "Large", px: 16, lh: 24, font: "Plain", weight: "400", sample: "Body large — paragraph text used in articles." },
  { role: "Body", size: "Medium", px: 14, lh: 20, font: "Plain", weight: "400", sample: "Body medium — list supporting text." },
  { role: "Body", size: "Small", px: 12, lh: 16, font: "Plain", weight: "400", sample: "Body small — fine print." },
  { role: "Label", size: "Large", px: 14, lh: 20, font: "Plain", weight: "500", sample: "BUTTON LABEL" },
  { role: "Label", size: "Medium", px: 12, lh: 16, font: "Plain", weight: "500", sample: "CHIP LABEL" },
  { role: "Label", size: "Small", px: 11, lh: 16, font: "Plain", weight: "500", sample: "MICRO LABEL" },
];

const usedProjectFonts = [
  { name: "DM Sans", source: "next/font/google (app/fonts.ts)", role: "Body — applied to <body>", refs: "Layout className, M3 brand+plain alias" },
  { name: "Axiforma", source: "@font-face (app/globals.css), 5 weights self-hosted", role: "Display / hero (--font-hero)", refs: "12 refs to var(--font-hero)" },
  { name: "Geist", source: "next/font/google (app/fonts.ts)", role: "--font-geist-sans on <html>", refs: "Variable mounted; legacy font fallback" },
  { name: "Cormorant Garamond", source: "next/font/google (app/fonts.ts) — 600", role: "Specialty serif — exported from layout", refs: "Page-level imports" },
  { name: "Cambo", source: "next/font/google (app/fonts.ts) — 400", role: "Specialty serif — exported from layout", refs: "Page-level imports" },
  { name: "Cormorant Garamond (local)", source: "next/font/local (lib/fonts.ts) — 400, 500", role: "Specialty page imports", refs: "lib export" },
  { name: "Shanti", source: "next/font/local (lib/fonts.ts) — 400", role: "Specialty page imports", refs: "lib export" },
  { name: "Shippori Mincho", source: "next/font/local (lib/fonts.ts) — 400, 500", role: "Japanese-style serif", refs: "lib export" },
];

const enterpriseUsedColors = {
  text: [
    { token: "--ent-text-primary", hex: "#1D1D1F" },
    { token: "--ent-text-navy", hex: "#0A1344" },
    { token: "--ent-text-secondary", hex: "#374151" },
    { token: "--ent-text-tertiary", hex: "#6B7280" },
    { token: "--ent-text-muted", hex: "rgba(10, 19, 68, 0.40)" },
  ],
  textOnDark: [
    { token: "--ent-dark-text-full", hex: "rgba(255, 255, 255, 1.0)" },
    { token: "--ent-dark-text-high", hex: "rgba(255, 255, 255, 0.75)" },
    { token: "--ent-dark-text-medium", hex: "rgba(255, 255, 255, 0.45)" },
    { token: "--ent-dark-text-low", hex: "rgba(255, 255, 255, 0.25)" },
  ],
  blues: [
    { token: "--ent-blue-primary", hex: "#2563EB" },
    { token: "--ent-blue-deep", hex: "#1B37CE" },
    { token: "--ent-blue-tint", hex: "#0066CC" },
  ],
  surfaces: [
    { token: "--ent-bg-light", hex: "#F9F9F9" },
    { token: "--ent-bg-white", hex: "#FFFFFF" },
    { token: "--ent-bg-card", hex: "#FDFDFD" },
    { token: "--ent-bg-dark", hex: "#060810" },
    { token: "--ent-bg-dark-alt", hex: "#1a1a1a" },
    { token: "--ent-bg-monitor-frame", hex: "#1D1D1F" },
    { token: "--ent-bg-monitor-titlebar", hex: "#F5F5F7" },
  ],
  borders: [
    { token: "--ent-border-card", hex: "#EDEDED" },
    { token: "--ent-border-subtle", hex: "rgba(0, 0, 0, 0.07)" },
    { token: "--ent-border-medium", hex: "rgba(0, 0, 0, 0.10)" },
    { token: "--ent-border-dark-grid", hex: "rgba(255, 255, 255, 0.10)" },
    { token: "--ent-border-dark-subtle", hex: "rgba(255, 255, 255, 0.06)" },
    { token: "--ent-border-accent", hex: "rgba(27, 55, 206, 0.25)" },
  ],
  buttons: [
    { token: "--ent-btn-dark", hex: "#1D1D1F" },
    { token: "--ent-btn-navy", hex: "#0A1344" },
    { token: "--ent-btn-navy-alt", hex: "#0E1A44" },
  ],
  chrome: [
    { token: "--ent-chrome-red", hex: "#FF5F57" },
    { token: "--ent-chrome-yellow", hex: "#FEBC2E" },
    { token: "--ent-chrome-green", hex: "#28C840" },
  ],
  shadows: [
    { token: "--ent-shadow-monitor", value: "0 40px 100px rgba(0,0,0,0.50), 0 12px 32px rgba(0,0,0,0.30)" },
    { token: "--ent-shadow-monitor-top", value: "0 -20px 60px rgba(0,0,0,0.30), 0 -6px 20px rgba(0,0,0,0.15)" },
    { token: "--ent-shadow-card", value: "0px 0px 30px rgba(0,0,0,0.2)" },
    { token: "--ent-shadow-prompt-glow", value: "0px 0px 30px 5px rgba(191, 197, 235, 0.25)" },
  ],
  easings: [
    { token: "--ent-easing-spring", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
    { token: "--ent-easing-toggle", value: "cubic-bezier(0.25, 1, 0.5, 1)" },
  ],
  gradients: [
    { token: "--ent-gradient-start", hex: "#06096D" },
    { token: "--ent-gradient-end", hex: "#318BCA" },
  ],
};

const enterpriseUnused = [
  "--ent-radius-* (7 tokens)",
  "--ent-space-1..48 (16 tokens)",
  "--ent-section-sm/md/lg/xl/hero (5 tokens)",
  "--ent-duration-* (4 tokens)",
  "--ent-tracking-* (4 tokens)",
  "--ent-leading-* (6 tokens)",
  "--ent-weight-* (4 tokens)",
  "--ent-noise-* (2 tokens)",
  "--ent-max-width / --ent-monitor-max-width / --ent-content-px",
];

const usedGlobalsTokens = [
  { token: "--grid-line", value: "rgba(37, 99, 235, 0.3)", refs: 45, use: "Vertical grid hairline" },
  { token: "--page-padding", value: "24px", refs: 16, use: "Page edge padding" },
  { token: "--font-hero", value: '"Axiforma", var(--font-dm-sans), "SF Pro", -apple-system, ...', refs: 12, use: "Hero <h1> font-family" },
];

const unusedGlobalsTokens = [
  { token: "--primary", hex: "#1D1D1F", note: 'Defined but no var(--primary) refs. The hex #1D1D1F is hardcoded in 36 files instead.' },
  { token: "--accent", hex: "#0066CC", note: 'Defined but no var(--accent) refs. The hex #0066CC is hardcoded in 13 files instead.' },
  { token: "--background", hex: "#FFFFFF", note: "Body-set fallback. No var() refs in components." },
  { token: "--foreground", hex: "#1D1D1F", note: "Body-set fallback. No var() refs in components." },
  { token: "--container-padding", hex: "24px → 1vw at ≥940px", note: "Defined but referenced indirectly via --page-padding only." },
  { token: "--cta-right", hex: "46px (default)", note: "Defined; not consumed via var() in components." },
];

const blogM3Tokens = [
  { token: "--md-sys-color-surface", use: "Blog page background — bg-[var(--md-sys-color-surface)]" },
  { token: "--md-sys-color-on-surface", use: "Blog body text — text-[var(--md-sys-color-on-surface)]" },
  { token: "--md-sys-color-on-surface-variant", use: "Blog secondary text" },
  { token: "--md-sys-color-surface-variant", use: "Blog accents / muted surface" },
  { token: "--md-sys-color-surface-container-high", use: "Blog code-block background tint (via color-mix 6%)" },
  { token: "--md-sys-color-surface-container-highest", use: "Blog elevated panels" },
  { token: "--md-sys-color-outline", use: "Blog hairline" },
  { token: "--md-sys-color-outline-variant", use: "Blog subtle hairline" },
  { token: "--md-sys-color-primary", use: "Blog accent links — ⚠️ STRAY PURPLE: only token resolving to #6750a4 anywhere in the project (1 ref in app/blog/blog.module.css:59)" },
];

const bodyModes = [
  { name: "Default light", bg: "#FFFFFF", fg: "#1D1D1F", primary: "#0066CC", refs: "(no class)" },
  { name: "Sepia (body.bg-mode-sepia)", bg: "#f4ecd8", fg: "#433422", primary: "#8a5a2b", refs: "6 refs" },
  { name: "Dark (body.bg-mode-dark)", bg: "#111318", fg: "#e2e2e9", primary: "#a8c8ff", refs: "6 refs" },
  { name: "Dyslexia (body.dyslexia-mode)", bg: "#FFFFFF", fg: "#1D1D1F", primary: "#0066CC", refs: "4 refs", note: "Forces font-family: 'OpenDyslexic' on all elements" },
];

const usedUtilityClasses = [
  { class: ".glass-btn", use: "Premium glass CTA button (with @property animations)" },
  { class: ".glass-btn-wrap--cta", use: "200px-wide CTA wrapper variant" },
  { class: ".rec-glass-card", use: "Glass-effect card (backdrop-filter)" },
  { class: ".rec-glass-pill", use: "Glass pill" },
  { class: ".rec-glass-card-link", use: "Hover lift wrapper for glass cards" },
  { class: ".section-lines-dark / -light", use: "1px vertical hairline borders on sections" },
  { class: ".grid-section / -fade-top", use: "Grid line layout containers" },
  { class: ".unique-spots-ticker", use: "Place-card ticker (50s scroll)" },
  { class: ".trusted-marquee", use: "Trusted-by marquee (40s)" },
  { class: ".adventurers-marquee", use: "Adventurers marquee (35s)" },
  { class: ".recommendations-marquee", use: "Recommendations marquee (60s, pause on hover)" },
  { class: ".bullet-halo / -dark", use: "Sonar pulse rings on list bullets" },
  { class: ".rec-orb-1..4", use: "Recommendation gradient orbs (440-640px, blurred)" },
  { class: ".case-intro-card", use: "Case intro card with hover overlay" },
  { class: ".case-intro-arrow / .see-case-studies-arrow", use: "Arrow bounce / float animations" },
  { class: ".travel-promo-float", use: "Sinusoidal hover (8s) for emojis" },
  { class: ".hover-bee", use: "Bee-like emoji wobble on hover" },
  { class: ".phone-clickable", use: "Products page phone hover/active" },
  { class: ".capabilities-scale", use: "Scroll-driven scale (disabled <1374px)" },
  { class: ".glass-rect", use: "Section E (Chat) glass cells with SVG noise" },
  { class: ".mobile-blur-reduce / .mobile-blur-none", use: "Mobile performance — reduce backdrop blur" },
  { class: ".ai-thinking-text", use: "AI shimmer wave animation" },
];

// Helpers

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-12 scroll-mt-24" style={{ borderTop: "1px solid var(--md-sys-color-outline-variant)" }}>
      <div className="mb-8">
        <h2 style={{ fontSize: "36px", lineHeight: "44px", fontFamily: "var(--md-ref-typeface-brand)", color: "var(--md-sys-color-on-surface)", margin: 0 }}>
          {title}
        </h2>
        {intro && (
          <p style={{ fontSize: "16px", lineHeight: "24px", fontFamily: "var(--md-ref-typeface-plain)", color: "var(--md-sys-color-on-surface-variant)", maxWidth: "60ch", marginTop: "12px" }}>
            {intro}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontSize: "22px", lineHeight: "28px", fontFamily: "var(--md-ref-typeface-brand)", color: "var(--md-sys-color-on-surface)", marginTop: "32px", marginBottom: "16px" }}>
      {children}
    </h3>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: "12px", padding: "2px 6px", background: "var(--md-sys-color-surface-container)", color: "var(--md-sys-color-on-surface)", borderRadius: "4px" }}>
      {children}
    </code>
  );
}

export default function ColumbusDesignPage() {
  const [activeSection, setActiveSection] = useState<string>("overview");

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
    <div
      data-theme="light"
      className="min-h-screen pt-[100px]"
      style={{ background: "var(--md-sys-color-background)", color: "var(--md-sys-color-on-surface)", fontFamily: "var(--font-dm-sans), ui-sans-serif, sans-serif" }}
    >
      {/* Header */}
      <header className="container max-w-[1280px] mx-auto px-6 py-12 md:py-16" style={{ fontFamily: "var(--md-ref-typeface-brand)" }}>
        <div className="flex items-end gap-6 flex-wrap">
          <div className="size-12" style={{ background: "#0066CC", borderRadius: "var(--md-sys-shape-corner-medium)" }} />
          <div>
            <p style={{ fontFamily: "ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--md-sys-color-on-surface-variant)" }}>
              Columbus · what&apos;s actually used · branch experimentV6-newTechV3.1-NewUseCases-ValeV4
            </p>
            <h1 style={{ fontSize: "57px", lineHeight: "64px", fontWeight: 400, fontFamily: "var(--md-ref-typeface-brand)", margin: "8px 0 0 0", letterSpacing: "-0.015625rem" }}>
              Columbus Design System
            </h1>
          </div>
        </div>
        <p style={{ fontSize: "16px", lineHeight: "24px", fontFamily: "var(--md-ref-typeface-plain)", color: "var(--md-sys-color-on-surface-variant)", maxWidth: "60ch", marginTop: "20px" }}>
          Showing only what&apos;s ACTUALLY consumed in real components, verified by grepping the codebase. Tokens defined in <Code>tokens.css</Code> but never referenced anywhere in components are dead code, not part of the active design language. See <Code>§ Theory vs reality</Code> for the audit.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 items-center">
          {[
            "Brand: #1D1D1F + #0066CC (mostly hardcoded)",
            "M3 type scale: 39 refs (consumed)",
            "Globals utilities: heavily used",
            ".ent-scope: ~70 of 80 tokens consumed",
            "M3 component tokens: 0 refs (unused)",
            "Body-mode a11y: 16 refs",
          ].map((t) => (
            <span key={t} style={{ fontFamily: "ui-monospace, monospace", fontSize: "11px", padding: "4px 10px", background: "var(--md-sys-color-surface-container)", color: "var(--md-sys-color-on-surface-variant)", borderRadius: "var(--md-sys-shape-corner-extra-small)" }}>
              {t}
            </span>
          ))}
        </div>
      </header>

      <div className="container max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
        <nav className="lg:sticky lg:top-[120px] lg:self-start lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto pb-8">
          <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--md-sys-color-on-surface-variant)", marginBottom: "12px" }}>
            Contents
          </div>
          <ul className="flex lg:flex-col gap-1 flex-wrap">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} style={{ display: "block", padding: "6px 8px", fontSize: "14px", fontFamily: "var(--md-ref-typeface-plain)", color: activeSection === s.id ? "#0066CC" : "var(--md-sys-color-on-surface-variant)", fontWeight: activeSection === s.id ? 500 : 400, textDecoration: "none" }}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          {/* OVERVIEW */}
          <Section id="overview" title="Overview" intro="Columbus's active design language is much smaller than its tokens.css spec suggests. The doc below covers only what's verified consumed.">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Active brand color", value: "#0066CC", note: "Globals --accent (mostly hardcoded as hex)" },
                { label: "Brand black", value: "#1D1D1F", note: "Globals --primary (mostly hardcoded as hex)" },
                { label: "Active typography", value: "M3 15-style type scale", note: "39 refs across components" },
                { label: "Display font", value: "Axiforma → DM Sans", note: "via --font-hero (12 refs)" },
                { label: "Body font", value: "DM Sans", note: "Applied to <body>" },
                { label: "Page-scoped layer", value: ".ent-scope (enterprise)", note: "~70 of 80 tokens consumed" },
                { label: "Body modes", value: "3 a11y states", note: "sepia / dark / dyslexia (16 refs)" },
                { label: "Globals utility classes", value: "20+ named", note: "glass-btn, marquees, sonar-pulse, orbs, etc." },
                { label: "M3 component tokens", value: "0 consumed", note: "All --md-comp-* unused — see audit" },
              ].map((c) => (
                <div key={c.label} style={{ padding: "20px", background: "var(--md-sys-color-surface-container-low)", borderRadius: "var(--md-sys-shape-corner-medium)", boxShadow: "var(--md-sys-elevation-level1)" }}>
                  <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--md-sys-color-on-surface-variant)" }}>{c.label}</div>
                  <div style={{ fontSize: "18px", fontWeight: 500, marginTop: "4px", color: "var(--md-sys-color-on-surface)" }}>{c.value}</div>
                  <div style={{ fontSize: "13px", color: "var(--md-sys-color-on-surface-variant)", marginTop: "4px" }}>{c.note}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* AUDIT */}
          <Section id="audit" title="Theory vs reality (the audit)" intro="What's defined in tokens.css vs what's actually referenced in real components.">
            <table style={{ width: "100%", fontSize: 13, fontFamily: "var(--md-ref-typeface-plain)" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--md-sys-color-outline-variant)" }}>
                  <th style={{ textAlign: "left", padding: 8 }}>Defined</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Refs in code</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["M3 reference palettes (78 tokens)", "0 direct refs", "✗ Indirectly consumed via system tokens"],
                  ["M3 system color: --md-sys-color-primary", "1 ref", "⚠️ Stray purple in app/blog/blog.module.css:59"],
                  ["M3 system color: --md-sys-color-secondary/-tertiary", "0 refs", "✗ Unused"],
                  ["M3 system color: --md-sys-color-surface*", "blog only (7 refs)", "✓ Consumed in blog page theming"],
                  ["M3 5-level surface containers", "2 of 5 used (high, highest in blog)", "⚠️ Mostly unused"],
                  ["M3 dark theme overrides ([data-theme=\"dark\"])", "0 refs", "✗ data-theme=\"light\" used in blog only"],
                  ["M3 type scale (--md-sys-typescale-*)", "39 refs", "✓ Heavily used — the active type system"],
                  ["M3 shape (--md-sys-shape-corner-*)", "2 refs", "⚠️ Barely used"],
                  ["M3 elevation (--md-sys-elevation-level*)", "0 refs", "✗ Unused"],
                  ["M3 motion (--md-sys-motion-*)", "2 refs", "⚠️ Barely used"],
                  ["M3 state layers (--md-sys-state-*)", "0 refs", "✗ Unused"],
                  ["M3 component tokens (--md-comp-* — 8 sets)", "0 refs", "✗ Entire namespace unused"],
                  ["Globals --primary / --accent (var refs)", "0 refs", "✗ Defined but never used via var() — hex hardcoded instead"],
                  ["Hex #1D1D1F (brand black)", "36 files", "✓ The actual brand black"],
                  ["Hex #0066CC (accent blue)", "13 files", "✓ The actual accent blue"],
                  ["Globals --grid-line / --page-padding / --font-hero", "45 / 16 / 12 refs", "✓ Heavily used"],
                  ["Globals --background / --foreground / --container-padding / --cta-right", "0 refs", "✗ Defined but unused via var()"],
                  ["@theme: text-md / text-display Tailwind utilities", "5 files", "✓ Used"],
                  ["body.bg-mode-sepia/dark/dyslexia", "16 refs total", "✓ Accessibility menu wires them"],
                  ["Enterprise: text/bg/border/btn/shadow/dark-text/blue/easing/gradient/chrome", "92 refs total", "✓ Heavily used in .ent-scope"],
                  ["Enterprise: radius / space / section / duration / tracking / leading / weight / noise / max-width", "0 refs", "✗ Defined but unused"],
                ].map((row, i) => {
                  const status = row[2];
                  const color = status.startsWith("✓") ? "#16a34a" : status.startsWith("⚠️") ? "#d97706" : "#dc2626";
                  return (
                    <tr key={i} style={{ borderBottom: "1px solid var(--md-sys-color-outline-variant)" }}>
                      <td style={{ padding: 8, fontSize: 12 }}>{row[0]}</td>
                      <td style={{ padding: 8, fontFamily: "ui-monospace, monospace", fontSize: 11, color: "var(--md-sys-color-on-surface-variant)" }}>{row[1]}</td>
                      <td style={{ padding: 8, fontSize: 12, color }}>{status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Section>

          {/* BRAND COLOR */}
          <Section id="brand-color" title="Brand color" intro="Black + blue, mostly applied as hardcoded hex.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div style={{ width: "100%", height: 160, background: "#1D1D1F", borderRadius: "var(--md-sys-shape-corner-medium)" }} />
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 18, fontWeight: 500 }}>Brand black</div>
                  <Code>#1D1D1F</Code>
                  <div style={{ fontSize: 13, color: "var(--md-sys-color-on-surface-variant)", marginTop: 4 }}>
                    Defined as <Code>--primary</Code> in globals.css but consumed primarily as hardcoded hex in 36 files.
                  </div>
                </div>
              </div>
              <div>
                <div style={{ width: "100%", height: 160, background: "#0066CC", borderRadius: "var(--md-sys-shape-corner-medium)" }} />
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 18, fontWeight: 500 }}>Accent blue</div>
                  <Code>#0066CC</Code>
                  <div style={{ fontSize: 13, color: "var(--md-sys-color-on-surface-variant)", marginTop: 4 }}>
                    Defined as <Code>--accent</Code> in globals.css but consumed as hardcoded hex in 13 files. Same value as enterprise <Code>--ent-blue-tint</Code>.
                  </div>
                </div>
              </div>
            </div>

            <SubHeading>⚠️ The 1 stray purple reference</SubHeading>
            <div style={{ padding: 16, background: "#fef3c7", borderRadius: "var(--md-sys-shape-corner-small)", border: "1px solid #f59e0b" }}>
              <p style={{ fontSize: 14, color: "#92400e" }}>
                <Code>app/blog/blog.module.css:59</Code> uses <Code>color: var(--md-sys-color-primary);</Code> which resolves to M3&apos;s default purple <Code>#6750a4</Code>.
              </p>
              <p style={{ fontSize: 13, marginTop: 8, color: "#92400e" }}>
                It&apos;s the ONLY reference to <Code>--md-sys-color-primary</Code> anywhere in the codebase. To eliminate purple entirely: replace it with <Code>color: var(--accent)</Code> or <Code>color: #0066CC</Code>.
              </p>
            </div>
          </Section>

          {/* TYPOGRAPHY */}
          <Section id="typography" title="Typography (M3 type scale)" intro="The M3 type scale is the most-used part of the M3 system here — 39 references across components. All 15 styles below are actively consumed.">
            <div className="space-y-3">
              {usedM3TypeScale.map((t) => (
                <div key={`${t.role}-${t.size}`} style={{ padding: 16, borderLeft: "2px solid #0066CC", background: "var(--md-sys-color-surface-container-lowest)" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "baseline", marginBottom: 8 }}>
                    <Code>{`${t.role.toLowerCase()}-${t.size.toLowerCase()}`}</Code>
                    <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "var(--md-sys-color-on-surface-variant)" }}>{t.px}px · lh {t.lh}px · {t.font} · {t.weight}</span>
                  </div>
                  <div style={{ fontSize: `${t.px}px`, lineHeight: `${t.lh}px`, fontWeight: parseInt(t.weight), fontFamily: "var(--md-ref-typeface-brand)", letterSpacing: t.role === "Display" && t.size === "Large" ? "-0.015625rem" : "normal" }}>
                    {t.sample}
                  </div>
                </div>
              ))}
            </div>

            <SubHeading>Tailwind theme additions (5 files)</SubHeading>
            <div style={{ padding: 16, background: "var(--md-sys-color-surface-container)", borderRadius: "var(--md-sys-shape-corner-small)", fontFamily: "ui-monospace, monospace", fontSize: 12, whiteSpace: "pre-wrap" }}>
              {`/* Available Tailwind utilities */
text-md       → 1.0625rem (17px)
text-display  → 4rem (64px)`}
            </div>
          </Section>

          {/* FONTS */}
          <Section id="fonts" title="Fonts" intro="9 font families loaded. Active stack: DM Sans (body) + Axiforma (display via --font-hero) + page-specific imports.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {usedProjectFonts.map((f) => (
                <div key={f.name} style={{ padding: 16, background: "var(--md-sys-color-surface-container-low)", borderRadius: "var(--md-sys-shape-corner-small)" }}>
                  <div style={{ fontSize: 16, fontWeight: 500 }}>{f.name}</div>
                  <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "var(--md-sys-color-on-surface-variant)", marginTop: 2 }}>{f.source}</div>
                  <div style={{ fontSize: 12, color: "var(--md-sys-color-on-surface-variant)", marginTop: 4 }}>{f.role}</div>
                  <div style={{ fontSize: 11, fontFamily: "ui-monospace, monospace", color: "#0066CC", marginTop: 4 }}>{f.refs}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* GLOBALS */}
          <Section id="globals" title="Globals layer" intro="What's defined in app/globals.css and actually consumed via var() in components.">
            <SubHeading>Used</SubHeading>
            <div className="space-y-3">
              {usedGlobalsTokens.map((g) => (
                <div key={g.token} style={{ padding: 12, background: "var(--md-sys-color-surface-container-low)", borderRadius: "var(--md-sys-shape-corner-small)", display: "flex", gap: 16, alignItems: "center" }}>
                  <span style={{ fontSize: 11, padding: "4px 8px", background: "#16a34a", color: "white", borderRadius: 4, minWidth: 60, textAlign: "center" }}>
                    {g.refs} refs
                  </span>
                  <Code>{g.token}</Code>
                  <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "var(--md-sys-color-on-surface-variant)", flex: 1 }}>{g.value}</span>
                  <span style={{ fontSize: 12, color: "var(--md-sys-color-on-surface-variant)" }}>{g.use}</span>
                </div>
              ))}
            </div>

            <SubHeading>Defined but unused via var()</SubHeading>
            <p style={{ fontSize: 13, color: "var(--md-sys-color-on-surface-variant)", marginBottom: 12 }}>
              These are declared on <Code>:root</Code> but no component references them via <Code>var()</Code>. The values still apply as element-level defaults in some cases (e.g. body color/background).
            </p>
            <div className="space-y-2">
              {unusedGlobalsTokens.map((g) => (
                <div key={g.token} style={{ padding: 10, borderLeft: "2px solid #dc2626", paddingLeft: 16 }}>
                  <Code>{g.token}</Code>
                  <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "var(--md-sys-color-on-surface-variant)", marginLeft: 8 }}>{g.hex}</span>
                  <div style={{ fontSize: 12, color: "var(--md-sys-color-on-surface-variant)", marginTop: 4 }}>{g.note}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* BLOG M3 THEME */}
          <Section id="blog-theme" title="Blog page M3 theming" intro="The /blog page is the only place that meaningfully consumes M3 system color tokens — via data-theme=&quot;light&quot; on the wrapping div + var() refs in blog.module.css.">
            <div style={{ padding: 20, background: "var(--md-sys-color-surface-container-low)", borderRadius: "var(--md-sys-shape-corner-medium)" }}>
              <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "var(--md-sys-color-on-surface-variant)", marginBottom: 12 }}>
                {'<div data-theme="light" className="bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]">'}
              </div>
              <div className="space-y-2">
                {blogM3Tokens.map((t) => (
                  <div key={t.token} className="flex items-center gap-3 py-2" style={{ borderBottom: "1px solid var(--md-sys-color-outline-variant)" }}>
                    <Code>{t.token}</Code>
                    <span style={{ fontSize: 12, color: t.token.includes("primary") ? "#dc2626" : "var(--md-sys-color-on-surface-variant)", flex: 1 }}>{t.use}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* ENTERPRISE */}
          <Section id="enterprise" title="Enterprise scope (.ent-scope)" intro="Page-scoped design layer for /products/enterprise. Only token groups that are actually consumed are shown below. Unused groups are listed at the bottom.">
            <SubHeading>Text colors (22 refs)</SubHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {enterpriseUsedColors.text.map((c) => (
                <div key={c.token} className="flex items-center gap-2 mb-1">
                  <div style={{ width: 28, height: 28, background: c.hex, borderRadius: 4, border: "1px solid var(--md-sys-color-outline-variant)" }} />
                  <Code>{c.token}</Code>
                  <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "var(--md-sys-color-on-surface-variant)" }}>{c.hex}</span>
                </div>
              ))}
            </div>

            <SubHeading>Text on dark — 4 tiers (11 refs)</SubHeading>
            <div style={{ background: "#060810", padding: 16, borderRadius: "var(--md-sys-shape-corner-small)" }}>
              {enterpriseUsedColors.textOnDark.map((c) => (
                <div key={c.token} className="mb-1" style={{ fontFamily: "ui-monospace, monospace", fontSize: 12 }}>
                  <span style={{ color: c.hex }}>{c.token}</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", marginLeft: 8 }}>{c.hex}</span>
                </div>
              ))}
            </div>

            <SubHeading>Surfaces (13 refs)</SubHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {enterpriseUsedColors.surfaces.map((c) => (
                <div key={c.token} className="flex items-center gap-2 mb-1">
                  <div style={{ width: 28, height: 28, background: c.hex, borderRadius: 4, border: "1px solid var(--md-sys-color-outline-variant)" }} />
                  <Code>{c.token}</Code>
                  <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "var(--md-sys-color-on-surface-variant)" }}>{c.hex}</span>
                </div>
              ))}
            </div>

            <SubHeading>Borders (17 refs)</SubHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {enterpriseUsedColors.borders.map((c) => (
                <div key={c.token} className="flex items-center gap-2 mb-1">
                  <div style={{ width: 80, height: 1, background: c.hex }} />
                  <Code>{c.token}</Code>
                  <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "var(--md-sys-color-on-surface-variant)" }}>{c.hex}</span>
                </div>
              ))}
            </div>

            <SubHeading>Buttons (8 refs) + Window chrome (2 refs)</SubHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Buttons</div>
                {enterpriseUsedColors.buttons.map((c) => (
                  <div key={c.token} className="flex items-center gap-2 mb-1">
                    <div style={{ width: 28, height: 28, background: c.hex, borderRadius: 4 }} />
                    <Code>{c.token}</Code>
                    <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "var(--md-sys-color-on-surface-variant)" }}>{c.hex}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Window chrome (Apple-style)</div>
                <div className="flex gap-3 mb-3">
                  {enterpriseUsedColors.chrome.map((c) => (
                    <div key={c.token} style={{ width: 36, height: 36, background: c.hex, borderRadius: 9999 }} title={c.token} />
                  ))}
                </div>
                {enterpriseUsedColors.chrome.map((c) => (
                  <div key={c.token} className="flex items-center gap-2 mb-1">
                    <Code>{c.token}</Code>
                    <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "var(--md-sys-color-on-surface-variant)" }}>{c.hex}</span>
                  </div>
                ))}
              </div>
            </div>

            <SubHeading>Blues (3 refs)</SubHeading>
            <div className="grid grid-cols-3 gap-2">
              {enterpriseUsedColors.blues.map((c) => (
                <div key={c.token}>
                  <div style={{ height: 64, background: c.hex, borderRadius: "var(--md-sys-shape-corner-extra-small)" }} />
                  <Code>{c.token.replace("--ent-blue-", "")}</Code>
                  <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, color: "var(--md-sys-color-on-surface-variant)", marginTop: 2 }}>{c.hex}</div>
                </div>
              ))}
            </div>

            <SubHeading>Shadows (4 refs)</SubHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {enterpriseUsedColors.shadows.map((s) => (
                <div key={s.token} style={{ padding: 12, background: "var(--md-sys-color-surface-container-low)", borderRadius: "var(--md-sys-shape-corner-small)" }}>
                  <Code>{s.token}</Code>
                  <div style={{ width: 60, height: 60, margin: "10px 0", background: s.token.includes("monitor") ? "#1D1D1F" : "var(--md-sys-color-surface-container-lowest)", borderRadius: 6, boxShadow: s.value }} />
                  <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, color: "var(--md-sys-color-on-surface-variant)", wordBreak: "break-all" }}>{s.value}</div>
                </div>
              ))}
            </div>

            <SubHeading>Easings (2 refs) + Gradient (1 ref)</SubHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Easings</div>
                {enterpriseUsedColors.easings.map((e) => (
                  <div key={e.token} className="mb-2">
                    <Code>{e.token}</Code>
                    <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "var(--md-sys-color-on-surface-variant)", marginTop: 2 }}>{e.value}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>PromptShowcase gradient</div>
                <div style={{ height: 64, background: `linear-gradient(135deg, ${enterpriseUsedColors.gradients[0].hex}, ${enterpriseUsedColors.gradients[1].hex})`, borderRadius: 6 }} />
                <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "var(--md-sys-color-on-surface-variant)", marginTop: 4 }}>
                  {enterpriseUsedColors.gradients[0].token} → {enterpriseUsedColors.gradients[1].token}
                </div>
              </div>
            </div>

            <SubHeading>Defined but unused enterprise tokens</SubHeading>
            <p style={{ fontSize: 13, color: "var(--md-sys-color-on-surface-variant)", marginBottom: 12 }}>
              About 30 enterprise tokens exist in <Code>enterprise-tokens.css</Code> with 0 references in components:
            </p>
            <div className="flex flex-wrap gap-2">
              {enterpriseUnused.map((tk) => (
                <span key={tk} style={{ fontSize: 11, fontFamily: "ui-monospace, monospace", padding: "4px 10px", background: "var(--md-sys-color-surface-container)", color: "#dc2626", borderRadius: "var(--md-sys-shape-corner-extra-small)" }}>
                  {tk}
                </span>
              ))}
            </div>
          </Section>

          {/* BODY MODES */}
          <Section id="body-modes" title="Body-mode accessibility (16 refs)" intro="Three body classes wired to the AccessibilityMenu component. Each re-targets M3 surface tokens at the body level.">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {bodyModes.map((m) => (
                <div key={m.name} style={{ padding: 16, background: m.bg, color: m.fg, borderRadius: "var(--md-sys-shape-corner-small)", border: "1px solid var(--md-sys-color-outline-variant)" }}>
                  <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 11 }}>{m.name}</div>
                  <div style={{ marginTop: 8, fontSize: 14 }}>Sample text</div>
                  <div style={{ marginTop: 8, padding: "6px 12px", background: m.primary, color: m.fg === "#1D1D1F" || m.fg === "#433422" ? "#ffffff" : m.fg, fontSize: 11, borderRadius: 9999, display: "inline-block" }}>
                    Primary CTA
                  </div>
                  <div style={{ marginTop: 6, fontSize: 10, opacity: 0.7, fontFamily: "ui-monospace, monospace" }}>{m.refs}</div>
                  {m.note && <div style={{ marginTop: 8, fontSize: 11, opacity: 0.7 }}>{m.note}</div>}
                </div>
              ))}
            </div>
          </Section>

          {/* GLOBALS UTILITIES */}
          <Section id="utilities" title="Globals utility classes" intro="Custom Tailwind-supplemental classes defined in app/globals.css. Used throughout the project.">
            <div className="space-y-2">
              {usedUtilityClasses.map((u) => (
                <div key={u.class} className="flex items-baseline gap-3 py-2" style={{ borderBottom: "1px solid var(--md-sys-color-outline-variant)" }}>
                  <Code>{u.class}</Code>
                  <span style={{ fontSize: 13, color: "var(--md-sys-color-on-surface-variant)", flex: 1 }}>{u.use}</span>
                </div>
              ))}
            </div>

            <SubHeading>Glass button preview</SubHeading>
            <div style={{ position: "relative", display: "inline-block" }}>
              <div style={{ padding: "0 28px", height: 46, background: "linear-gradient(-75deg, #ffffff0d, #fff3, #ffffff0d)", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 9999, backdropFilter: "blur(2px)", display: "inline-flex", alignItems: "center", boxShadow: "inset 0 .125em .125em #0000000d, inset 0 -.125em .125em #ffffff80, 0 .25em .125em -.125em #0003, inset 0 0 .1em .25em #fff3", color: "#323232", fontSize: 16, fontWeight: 500 }}>
                Get started
              </div>
            </div>
            <p style={{ fontSize: 13, color: "var(--md-sys-color-on-surface-variant)", marginTop: 12 }}>
              <Code>.glass-btn</Code> uses <Code>@property --angle-1</Code> and <Code>@property --angle-2</Code> (CSS Houdini) for animated conic gradients on hover.
            </p>
          </Section>

          <div style={{ borderTop: "1px solid var(--md-sys-color-outline-variant)", padding: "32px 0", marginTop: 32 }}>
            <p style={{ fontSize: 13, color: "var(--md-sys-color-on-surface-variant)" }}>
              This page intentionally omits sections of <Code>tokens.css</Code> that are <strong>defined but never consumed</strong> in real component code (M3 reference palettes, full surface container hierarchy, all <Code>--md-comp-*</Code> component tokens, state layers, the elevation scale, most motion tokens, the 5-step surface container hierarchy, and ~30 enterprise tokens). See <a href="#audit" style={{ color: "#0066CC" }}>§ Theory vs reality</a> for the full audit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
