"use client";

/* eslint-disable @next/next/no-img-element */

/**
 * /compareM-C — side-by-side comparison of Mistral's and Columbus's
 * design systems, showing only what's ACTUALLY consumed in each project's
 * real component code (not what's defined-but-unused in tokens.css).
 *
 * The Columbus side reflects the audit findings:
 *   - M3 component tokens, state layers, elevation, ref palettes: 0 refs
 *   - The active design language is brand-black + accent-blue + M3 type
 *     scale + .ent-scope (partial) + body-mode a11y + globals utilities
 */

import { useEffect, useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "philosophy", label: "Philosophy" },
  { id: "brand-color", label: "Brand color" },
  { id: "palette", label: "Palette / theming approach" },
  { id: "typography", label: "Typography" },
  { id: "fonts", label: "Fonts" },
  { id: "radius", label: "Border radius" },
  { id: "spacing", label: "Spacing" },
  { id: "elevation", label: "Elevation" },
  { id: "motion", label: "Motion" },
  { id: "components", label: "Components" },
  { id: "theming", label: "Theming" },
  { id: "token-counts", label: "Active tokens" },
  { id: "verdict", label: "When to use which" },
];

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-12 scroll-mt-24 border-t border-mistral-black/10">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-medium text-mistral-black m-0">{title}</h2>
        {intro && <p className="text-base text-mistral-black-tint max-w-3xl mt-3">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

function Pair({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}

function MistralCol({ children, label = "Mistral" }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="border border-mistral-black/10 p-6" style={{ background: "#fffaeb", color: "#1f1f1f", fontFamily: "var(--font-rubik), system-ui, sans-serif" }}>
      <div className="flex items-center gap-2 mb-4">
        <span className="size-2 rounded-full" style={{ background: "#ff8205" }} />
        <span className="text-xs uppercase tracking-wider font-mono opacity-70">{label}</span>
      </div>
      {children}
    </div>
  );
}

function ColumbusCol({ children, label = "Columbus" }: { children: React.ReactNode; label?: string }) {
  return (
    <div data-theme="light" style={{ background: "var(--md-sys-color-surface-container-low)", color: "var(--md-sys-color-on-surface)", padding: 24, borderRadius: "var(--md-sys-shape-corner-medium)", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
      <div className="flex items-center gap-2 mb-4">
        <span className="size-2 rounded-full" style={{ background: "#0066CC" }} />
        <span className="text-xs uppercase tracking-wider font-mono" style={{ opacity: 0.7 }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

function Mono({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-xs px-1.5 py-0.5 rounded-sm bg-black/5">{children}</code>;
}

export default function CompareMCPage() {
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
    <main className="bg-background min-h-screen pt-[100px] text-mistral-black">
      <header className="container max-w-[1280px] mx-auto px-6 py-12 md:py-16">
        <p className="text-xs font-mono uppercase tracking-wider text-mistral-black-tint">
          Mistral · Columbus · side-by-side · only what&apos;s actually used
        </p>
        <h1 className="text-4xl md:text-6xl font-medium leading-tight mt-2">Mistral vs Columbus</h1>
        <p className="mt-6 text-base md:text-lg text-mistral-black-tint max-w-3xl">
          Two design systems compared dimension-by-dimension, showing only the tokens and patterns that are <strong>actually consumed</strong> in real component code.
          Earlier versions of this comparison reflected what was <em>defined</em> in token files; this version reflects what&apos;s <em>used</em>.
          For Columbus, that meaningfully changes the picture (most of M3 is dead code).
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            ["Mistral", "#ff8205", "Utility-first Tailwind. Active design ≈ defined design."],
            ["Columbus", "#0066CC", "Active design is much smaller than defined: brand black + accent blue + M3 type scale + .ent-scope partial + globals utilities."],
          ].map(([name, color, note]) => (
            <span key={name} className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-mistral-black/5 rounded-sm">
              <span className="size-2 rounded-full" style={{ background: color }} />
              <strong>{name}</strong>
              <span className="opacity-70">— {note}</span>
            </span>
          ))}
        </div>
      </header>

      <div className="container max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
        <nav className="lg:sticky lg:top-[120px] lg:self-start lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto pb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-mistral-black-tint mb-3">Contents</div>
          <ul className="flex lg:flex-col gap-1 flex-wrap">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={"block px-2 py-1 text-sm transition-colors " + (activeSection === s.id ? "text-mistral-orange font-medium" : "text-mistral-black-tint hover:text-mistral-black")}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <Section id="overview" title="Overview" intro="Two systems for two goals. Mistral's defined design ≈ active design. Columbus's defined design is much larger than its active design.">
            <Pair>
              <MistralCol>
                <h3 className="text-2xl font-medium mb-3">Mistral — what&apos;s used</h3>
                <ul className="text-sm space-y-2">
                  <li>• Tailwind v4 utility-first, compiled output</li>
                  <li>• 235 tokens, mostly used (utility-first means the tokens BACK the utilities)</li>
                  <li>• Mistral Rainbow + sunset stripe = brand signature</li>
                  <li>• Square corners by default (--radius: 0rem)</li>
                  <li>• Single-family typography (Rubik / Arial)</li>
                  <li>• 1 named shadow (--shadow-deploy-logo)</li>
                  <li>• `dark:` variants compiled (no toggle UI yet)</li>
                </ul>
              </MistralCol>
              <ColumbusCol>
                <h3 className="text-2xl font-medium mb-3" style={{ fontFamily: "var(--md-ref-typeface-brand)" }}>Columbus — what&apos;s used</h3>
                <ul className="text-sm space-y-2">
                  <li>• Brand: <Mono>#1D1D1F</Mono> + <Mono>#0066CC</Mono>, mostly hardcoded as hex</li>
                  <li>• <strong>M3 type scale</strong> — the only widely-used part of M3 (39 refs)</li>
                  <li>• <Mono>.ent-scope</Mono> page-local layer (~70 of 80 tokens consumed)</li>
                  <li>• Globals utility classes — glass-btn, marquees, sonar-pulse, etc.</li>
                  <li>• Body-mode a11y (sepia/dark/dyslexia, 16 refs)</li>
                  <li>• 9 fonts loaded (DM Sans body + Axiforma display + 7 specialty)</li>
                  <li>• Blog page is the only meaningful M3 surface theming consumer</li>
                  <li className="opacity-70">Defined but unused: M3 ref palettes, all 8 component token sets, state layers, elevation, secondary/tertiary, ~30 enterprise tokens</li>
                </ul>
              </ColumbusCol>
            </Pair>
          </Section>

          <Section id="philosophy" title="Methodology / Philosophy" intro="Where each system places the unit of design vs. how the project actually uses it.">
            <Pair>
              <MistralCol>
                <p className="text-sm mb-3">
                  Mistral is <strong>utility-first</strong>: unit of design is a Tailwind class. Compose utilities (<Mono>bg-mistral-black text-white p-md</Mono>); tokens live behind them.
                </p>
                <p className="text-sm">
                  Component-token namespace is <strong>sparse by design</strong> (only <Mono>--nav-height</Mono> and <Mono>--logoloop-gap</Mono>). Token coverage matches active usage — defined ≈ used.
                </p>
              </MistralCol>
              <ColumbusCol>
                <p className="text-sm mb-3" style={{ fontFamily: "var(--md-ref-typeface-plain)" }}>
                  Columbus is <strong>spec-driven</strong> on paper: M3 three-tier hierarchy. In practice, only the <strong>type scale</strong> (39 refs) and <strong>blog surface theming</strong> consume M3.
                </p>
                <p className="text-sm">
                  The brand layer (<Mono>--primary</Mono> / <Mono>--accent</Mono>) is defined as CSS vars but components mostly use hardcoded hex (<Mono>#1D1D1F</Mono>, <Mono>#0066CC</Mono>) directly. So defined ≫ used in M3, while the actual design is a much simpler, hex-and-utility-driven system.
                </p>
              </ColumbusCol>
            </Pair>
          </Section>

          <Section id="brand-color" title="Brand color" intro="Each system's signature color and how it actually appears on the site.">
            <Pair>
              <MistralCol>
                <div className="size-32 mx-auto" style={{ background: "#ff8205" }} />
                <div className="text-center mt-3">
                  <div className="text-lg font-medium">Mistral Orange</div>
                  <div className="text-xs font-mono mt-1">#ff8205 · RGB 255/130/5 · CMYK 0/49/98/0</div>
                  <div className="text-xs font-mono text-mistral-black-tint mt-2">--color-mistral-orange · --color-mistral-footer-band-4</div>
                </div>
                <p className="text-xs text-mistral-black-tint mt-4">Signal color: CTAs + active states only. Used widely via Tailwind classes that consume the token.</p>
              </MistralCol>
              <ColumbusCol>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div style={{ width: "100%", height: 100, background: "#1D1D1F", borderRadius: "var(--md-sys-shape-corner-medium)" }} />
                    <div className="text-center mt-2">
                      <div className="text-sm font-medium">Brand black</div>
                      <Mono>#1D1D1F</Mono>
                      <div className="text-xs mt-1" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>36 files (hardcoded hex)</div>
                    </div>
                  </div>
                  <div>
                    <div style={{ width: "100%", height: 100, background: "#0066CC", borderRadius: "var(--md-sys-shape-corner-medium)" }} />
                    <div className="text-center mt-2">
                      <div className="text-sm font-medium">Accent blue</div>
                      <Mono>#0066CC</Mono>
                      <div className="text-xs mt-1" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>13 files (hardcoded hex)</div>
                    </div>
                  </div>
                </div>
                <p className="text-xs mt-4" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                  M3&apos;s default <Mono>#6750a4</Mono> purple is in <Mono>tokens.css</Mono> but only consumed in <strong>1 file</strong> (<Mono>app/blog/blog.module.css:59</Mono>) — the lone stray purple.
                </p>
              </ColumbusCol>
            </Pair>
          </Section>

          <Section id="palette" title="Palette / theming approach" intro="Mistral has a 5-stop signature spectrum. Columbus has 78 reference stops on paper but uses none of them directly.">
            <Pair>
              <MistralCol>
                <div className="text-sm font-medium mb-3">🌈 Mistral Rainbow (5 stops, signature)</div>
                <div className="grid grid-cols-5 gap-1">
                  {[
                    { hex: "#e10500", name: "Red" },
                    { hex: "#fa500f", name: "Orange Dark" },
                    { hex: "#ff8205", name: "Orange" },
                    { hex: "#ffaf00", name: "Orange Light" },
                    { hex: "#ffd800", name: "Yellow" },
                  ].map((c) => (
                    <div key={c.hex}>
                      <div className="h-16" style={{ background: c.hex }} />
                      <div className="text-[10px] font-mono mt-1">{c.name}</div>
                      <div className="text-[10px] font-mono text-mistral-black-tint">{c.hex}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-mistral-black-tint mt-4">Sunset stripe band closer at every page foot.</p>
              </MistralCol>
              <ColumbusCol>
                <div className="text-sm font-medium mb-3" style={{ fontFamily: "var(--md-ref-typeface-brand)" }}>What Columbus actually uses for color</div>
                <ul className="text-sm space-y-2">
                  <li>• Hex <Mono>#1D1D1F</Mono> in 36 files — hardcoded</li>
                  <li>• Hex <Mono>#0066CC</Mono> in 13 files — hardcoded</li>
                  <li>• <Mono>bg-[var(--primary)]</Mono> / <Mono>bg-[var(--accent)]</Mono> Tailwind arbitrary values — 11 refs</li>
                  <li>• <Mono>--ent-blue-primary</Mono>/<Mono>-deep</Mono> in <Mono>.ent-scope</Mono> — 3 refs</li>
                  <li>• Blog: <Mono>--md-sys-color-surface</Mono> + <Mono>-on-surface</Mono> theming via <Mono>data-theme=&quot;light&quot;</Mono></li>
                </ul>
                <p className="text-xs mt-3" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                  M3&apos;s 78 reference palette stops + 25 system roles + 5-level surface containers + dark-theme overrides are all <strong>defined in tokens.css but never consumed</strong>.
                </p>
              </ColumbusCol>
            </Pair>
          </Section>

          <Section id="typography" title="Typography" intro="Both have a usable type scale. Columbus's IS its M3 type scale (the only meaningful M3 use).">
            <Pair>
              <MistralCol>
                <div className="text-sm font-medium mb-3">Mistral type scale (4 headings + Tailwind text-*)</div>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-mono opacity-70">--font-size-heading-0 · 72/103px md</div>
                    <div style={{ fontSize: 56, lineHeight: 1, fontWeight: 500, letterSpacing: "-0.025em" }}>Frontier AI.</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono opacity-70">--font-size-heading-2 · 40/56px md</div>
                    <div style={{ fontSize: 32, lineHeight: 1.05, fontWeight: 500 }}>High finance, without friction</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono opacity-70">text-base / text-lg / text-xl</div>
                    <p className="text-base">Body 16px — paragraph text in articles and blocks.</p>
                  </div>
                </div>
              </MistralCol>
              <ColumbusCol>
                <div className="text-sm font-medium mb-3" style={{ fontFamily: "var(--md-ref-typeface-brand)" }}>M3 type scale (15 styles, 39 refs)</div>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-mono opacity-70">display-large · 57/64</div>
                    <div style={{ fontSize: 48, lineHeight: 1.1, fontFamily: "var(--md-ref-typeface-brand)", letterSpacing: "-0.015625rem" }}>Display L</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono opacity-70">headline-large · 32/40</div>
                    <div style={{ fontSize: 28, lineHeight: 1.25, fontFamily: "var(--md-ref-typeface-brand)" }}>Headline L</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono opacity-70">body-large · 16/24</div>
                    <p style={{ fontSize: 16, lineHeight: 1.5, fontFamily: "var(--md-ref-typeface-plain)" }}>Body Large — paragraph text used in articles.</p>
                  </div>
                </div>
                <p className="text-xs mt-3" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                  This is M3&apos;s big win in Columbus — the only system token namespace that&apos;s consumed widely.
                </p>
              </ColumbusCol>
            </Pair>
          </Section>

          <Section id="fonts" title="Fonts" intro="Mistral runs single-family. Columbus has 9 families loaded.">
            <Pair>
              <MistralCol>
                <div className="text-sm font-medium mb-3">2 fonts (1 active)</div>
                <div className="border-l-2 pl-4 mb-3" style={{ borderColor: "#ff8205" }}>
                  <div className="text-xs font-mono opacity-70">Rubik · next/font/google · ACTIVE</div>
                  <div style={{ fontFamily: "var(--font-rubik)", fontSize: 24 }}>Rubik · used in app</div>
                </div>
                <div className="border-l-2 pl-4" style={{ borderColor: "rgba(0,0,0,0.4)" }}>
                  <div className="text-xs font-mono opacity-70">Arial · brand spec only (not in app)</div>
                  <div style={{ fontFamily: "Arial", fontSize: 24 }}>Arial · brand canonical</div>
                </div>
              </MistralCol>
              <ColumbusCol>
                <div className="text-sm font-medium mb-3" style={{ fontFamily: "var(--md-ref-typeface-brand)" }}>9 fonts loaded</div>
                <div className="grid grid-cols-1 gap-1 text-sm">
                  {[
                    ["DM Sans", "M3 brand+plain alias (body)", "ACTIVE"],
                    ["Axiforma", "Display via --font-hero (12 refs)", "ACTIVE"],
                    ["Geist", "--font-geist-sans variable", "Mounted"],
                    ["Cormorant Garamond", "Specialty serif", "Page imports"],
                    ["Cambo", "Specialty serif", "Page imports"],
                    ["Cormorant Garamond (local)", "lib/fonts.ts", "Page imports"],
                    ["Shanti", "lib/fonts.ts", "Page imports"],
                    ["Shippori Mincho", "Japanese serif", "Page imports"],
                    ["Instrument Serif", "Defined in app/fonts.ts", "Not applied"],
                  ].map(([name, role, status]) => (
                    <div key={name} className="flex justify-between items-baseline border-b py-1" style={{ borderColor: "var(--md-sys-color-outline-variant)" }}>
                      <span style={{ fontFamily: "var(--md-ref-typeface-brand)", fontWeight: 500 }}>{name}</span>
                      <div className="text-right">
                        <div className="text-xs" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>{role}</div>
                        <div className="text-[10px] font-mono" style={{ color: status === "ACTIVE" ? "#16a34a" : "var(--md-sys-color-on-surface-variant)" }}>{status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ColumbusCol>
            </Pair>
          </Section>

          <Section id="radius" title="Border radius" intro="Mistral leans squared by default. Columbus is harder to characterize because the M3 shape system is barely used.">
            <Pair>
              <MistralCol>
                <div className="text-sm font-medium mb-3">Squared by default (--radius: 0rem)</div>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "default", radius: "0px" },
                    { label: "xl", radius: "12px" },
                    { label: "2xl", radius: "16px" },
                    { label: "full", radius: "9999px" },
                  ].map((r) => (
                    <div key={r.label} className="text-center">
                      <div className="size-12 mx-auto" style={{ background: "#ff8205", borderRadius: r.radius }} />
                      <div className="text-xs font-mono mt-1">{r.label}</div>
                    </div>
                  ))}
                </div>
              </MistralCol>
              <ColumbusCol>
                <div className="text-sm font-medium mb-3" style={{ fontFamily: "var(--md-ref-typeface-brand)" }}>Sparingly used</div>
                <p className="text-xs mb-3" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                  M3 shape tokens (<Mono>--md-sys-shape-corner-*</Mono>): only 2 refs in code. Enterprise radii (<Mono>--ent-radius-*</Mono>): 0 refs.
                </p>
                <p className="text-xs" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                  In practice, Columbus components write radius values directly in Tailwind classes (<Mono>rounded-md</Mono>, <Mono>rounded-2xl</Mono>) or hardcode pixel values, NOT via design tokens. The shape system on paper isn&apos;t the shape system in practice.
                </p>
              </ColumbusCol>
            </Pair>
          </Section>

          <Section id="spacing" title="Spacing" intro="Both 4px-base. Mistral has 16 used tokens. Columbus has spacing tokens defined but they're unused — components use hardcoded values + Tailwind utilities.">
            <Pair>
              <MistralCol>
                <div className="text-sm font-medium mb-3">16 tokens (--space-* + --gap-*) — used</div>
                <div className="space-y-2">
                  {[
                    { token: "--gap-md", px: 16 },
                    { token: "--gap-xl", px: 24 },
                    { token: "--gap-2xl", px: 32 },
                    { token: "--gap-3xl", px: 48 },
                    { token: "--gap-4xl", px: 64 },
                  ].map((s) => (
                    <div key={s.token} className="flex items-center gap-3">
                      <div className="text-xs font-mono w-32 shrink-0">{s.token}</div>
                      <div className="text-xs font-mono w-12 opacity-70">{s.px}px</div>
                      <div style={{ height: 8, background: "#ff8205", width: s.px }} />
                    </div>
                  ))}
                </div>
              </MistralCol>
              <ColumbusCol>
                <div className="text-sm font-medium mb-3" style={{ fontFamily: "var(--md-ref-typeface-brand)" }}>Spacing tokens defined; not consumed via var()</div>
                <p className="text-xs mb-3" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                  M3 doesn&apos;t tokenize spacing (4px convention only). Enterprise has 16 spacing tokens (<Mono>--ent-space-*</Mono>) — <strong>0 refs</strong>. Section padding (<Mono>--ent-section-*</Mono>) — <strong>0 refs</strong>.
                </p>
                <p className="text-xs" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                  Real components use Tailwind spacing utilities (<Mono>p-4</Mono>, <Mono>m-8</Mono>) and hardcoded pixel values. The 4px convention is observed but not via tokens.
                </p>
              </ColumbusCol>
            </Pair>
          </Section>

          <Section id="elevation" title="Elevation" intro="Mistral has 1 named shadow. Columbus has the M3 5-level scale defined but 0 refs — only enterprise's 4 bespoke shadows are actually consumed.">
            <Pair>
              <MistralCol>
                <div className="text-sm font-medium mb-3">1 named shadow + Tailwind shadow utilities</div>
                <div className="size-24 bg-white border" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }} />
                <Mono>--shadow-deploy-logo</Mono>
                <p className="text-xs mt-4 text-mistral-black-tint">
                  Used for the floating logo squares in section 3. For general use, Tailwind shadow utilities.
                </p>
              </MistralCol>
              <ColumbusCol>
                <div className="text-sm font-medium mb-3" style={{ fontFamily: "var(--md-ref-typeface-brand)" }}>4 bespoke enterprise shadows (M3 unused)</div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "monitor", shadow: "0 40px 100px rgba(0,0,0,0.50), 0 12px 32px rgba(0,0,0,0.30)" },
                    { name: "monitor-top", shadow: "0 -20px 60px rgba(0,0,0,0.30), 0 -6px 20px rgba(0,0,0,0.15)" },
                    { name: "card", shadow: "0px 0px 30px rgba(0,0,0,0.2)" },
                    { name: "prompt-glow", shadow: "0px 0px 30px 5px rgba(191, 197, 235, 0.25)" },
                  ].map((s) => (
                    <div key={s.name} className="text-center">
                      <div style={{ width: 60, height: 60, margin: "0 auto", background: "#1D1D1F", borderRadius: 6, boxShadow: s.shadow }} />
                      <div className="text-[10px] font-mono mt-2">--ent-shadow-{s.name}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs mt-3" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                  M3&apos;s 6-level <Mono>--md-sys-elevation-*</Mono> scale is defined in tokens.css but has <strong>0 refs</strong> in components.
                </p>
              </ColumbusCol>
            </Pair>
          </Section>

          <Section id="motion" title="Motion" intro="Mistral has 5 keyframes + 3 easings, lightly used. Columbus has 16 M3 durations + 10 easings defined but only 2 refs total — the active motion vocabulary is the 30+ globals keyframes.">
            <Pair>
              <MistralCol>
                <div className="text-sm font-medium mb-3">5 keyframes + 3 easings</div>
                <div className="text-xs font-mono space-y-1 opacity-70">
                  <div>--animate-spin / -pulse / -rotate-y</div>
                  <div>--animate-accordion-down / -up</div>
                  <div>--ease-in / -out / -in-out</div>
                </div>
                <p className="text-xs mt-3 text-mistral-black-tint">
                  Default transition: .15s. Live nav uses 500ms transition-colors.
                </p>
              </MistralCol>
              <ColumbusCol>
                <div className="text-sm font-medium mb-3" style={{ fontFamily: "var(--md-ref-typeface-brand)" }}>30+ globals keyframes (active)</div>
                <p className="text-xs mb-3" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                  M3 motion: <strong>2 refs total</strong>. Enterprise: <Mono>--ent-easing-spring</Mono> + <Mono>-toggle</Mono> = 2 refs. Active motion language is the keyframe library in <Mono>app/globals.css</Mono>:
                </p>
                <div className="flex flex-wrap gap-1">
                  {["sonar-pulse", "ai-thinking-wave", "intro-blob-A/B/C", "hero-float", "flowerBounceIn", "flowerWind", "heartFloat1/2", "geo-warning-shake", "trusted-marquee-scroll", "recommendations-marquee-scroll", "rec-orb-drift-a/b", "bee-hover", "see-case-studies-arrow-float", "..."].map((k) => (
                    <span key={k} style={{ fontSize: 10, fontFamily: "ui-monospace, monospace", padding: "2px 6px", background: "var(--md-sys-color-surface-container)", color: "var(--md-sys-color-on-surface-variant)", borderRadius: 3 }}>
                      {k}
                    </span>
                  ))}
                </div>
              </ColumbusCol>
            </Pair>
          </Section>

          <Section id="components" title="Components" intro="Mistral: utility-first, 2 component tokens. Columbus: M3 ships 8 component token sets but 0 refs in code.">
            <Pair>
              <MistralCol>
                <div className="text-sm font-medium mb-3">2 component tokens; patterns synthesized</div>
                <div className="space-y-2">
                  <button className="px-4 py-2 bg-mistral-black text-white text-sm rounded-md hover:bg-mistral-black/90">Primary</button>
                  <button className="px-4 py-2 ml-2 bg-mistral-orange text-white text-sm rounded-md">Accent</button>
                  <button className="px-4 py-2 ml-2 border border-current text-mistral-black text-sm rounded-md">Outlined</button>
                </div>
                <p className="text-xs mt-4 text-mistral-black-tint">
                  Tokens: <Mono>--nav-height</Mono>, <Mono>--logoloop-gap</Mono>. Everything else as Tailwind class compositions.
                </p>
              </MistralCol>
              <ColumbusCol>
                <div className="text-sm font-medium mb-3" style={{ fontFamily: "var(--md-ref-typeface-brand)" }}>M3 component tokens defined; not consumed</div>
                <p className="text-xs mb-3" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                  All 8 M3 component token sets (filled-button, FAB, card, navigation-bar, outlined-text-field, chip, dialog, top-app-bar) — <strong>0 refs in code</strong>. Components are built either with Tailwind utilities, hardcoded styles, or via the globals utility class library (<Mono>.glass-btn</Mono>).
                </p>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <div style={{ padding: "0 28px", height: 46, background: "linear-gradient(-75deg, #ffffff0d, #fff3, #ffffff0d)", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 9999, backdropFilter: "blur(2px)", display: "inline-flex", alignItems: "center", boxShadow: "inset 0 .125em .125em #0000000d, inset 0 -.125em .125em #ffffff80, 0 .25em .125em -.125em #0003, inset 0 0 .1em .25em #fff3", color: "#323232", fontSize: 14, fontWeight: 500 }}>
                    Glass button
                  </div>
                </div>
              </ColumbusCol>
            </Pair>
          </Section>

          <Section id="theming" title="Theming" intro="Mistral compiles dark: variants but no toggle. Columbus has 3 body-mode classes wired to an accessibility menu.">
            <Pair>
              <MistralCol>
                <div className="text-sm font-medium mb-3">Tailwind dark: variants (compiled, no toggle UI)</div>
                <div className="text-xs font-mono mb-2">html.dark .my-element { /* dark style */ }</div>
                <p className="text-xs mt-3 text-mistral-black-tint">
                  All `dark:*` Tailwind variants are baked into utilities.css. No UI toggle wired up.
                </p>
              </MistralCol>
              <ColumbusCol>
                <div className="text-sm font-medium mb-3" style={{ fontFamily: "var(--md-ref-typeface-brand)" }}>Body-mode classes wired to AccessibilityMenu</div>
                <div className="text-xs font-mono space-y-1 opacity-80">
                  <div>{'<body class="bg-mode-sepia">'} — 6 refs</div>
                  <div>{'<body class="bg-mode-dark">'} — 6 refs</div>
                  <div>{'<body class="dyslexia-mode">'} — 4 refs</div>
                </div>
                <p className="text-xs mt-3" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                  M3 <Mono>data-theme=&quot;dark&quot;</Mono> attribute exists in tokens.css but isn&apos;t wired to a UI toggle. The active theming is body-mode-driven for accessibility.
                </p>
              </ColumbusCol>
            </Pair>
          </Section>

          <Section id="token-counts" title="Active token comparison" intro="Tokens defined vs tokens actually consumed in component code.">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-mistral-black/10">
                    <th className="text-left p-2 font-medium">Dimension</th>
                    <th className="text-left p-2 font-medium" style={{ color: "#ff8205" }}>Mistral (def / used)</th>
                    <th className="text-left p-2 font-medium" style={{ color: "#0066CC" }}>Columbus (def / used)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Total tokens", "235 / mostly used", "~430 / ~150 consumed"],
                    ["Brand color tokens", "rainbow + sunshine + brand", "--primary/--accent: defined; mostly hardcoded as hex"],
                    ["Type scale tokens", "~30 used", "M3 type scale: 75 defined / 39 used (the only M3 win)"],
                    ["Reference palette tokens", "—", "78 defined / 0 directly used"],
                    ["System color roles", "—", "~25 defined / 1-2 used (blog only) + the stray purple"],
                    ["Component tokens", "2 used (--nav-height, --logoloop-gap)", "M3: 8 sets / 0 used. Enterprise: most used"],
                    ["State layer tokens", "0", "6 defined / 0 used"],
                    ["Elevation tokens", "1 used (--shadow-deploy-logo)", "M3: 6 / 0 used. Enterprise: 4 / 4 used"],
                    ["Motion tokens", "5 keyframes + 3 easings used", "M3: 26 / 2 used. Enterprise easings: 4 / 2 used. Globals keyframes: 30+ used"],
                    ["Spacing tokens", "16 used (--space-* / --gap-*)", "Enterprise: 16 / 0 used. Real spacing via Tailwind utilities + hardcoded px"],
                    ["Border radius tokens", "6 defined; squared default", "M3: 7 / 2 used. Enterprise: 7 / 0 used"],
                    ["Font families", "1 active (Rubik)", "9 loaded; DM Sans + Axiforma actively consumed"],
                    ["Theming", "Compiled dark: variants only", "Body-mode classes (sepia/dark/dyslexia, 16 refs)"],
                    ["Brand-color usage pattern", "Tailwind utilities → tokens", "Mostly hardcoded hex (#1D1D1F, #0066CC) directly in 49 files"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-mistral-black/10">
                      {row.map((c, j) => (<td key={j} className="p-2" style={{ verticalAlign: "top" }}>{c}</td>))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="verdict" title="When to use which" intro="Different systems for different goals. Pick the philosophy that matches the work.">
            <Pair>
              <MistralCol>
                <div className="text-sm font-medium mb-3">Reach for Mistral when…</div>
                <ul className="text-sm space-y-2">
                  <li>✓ Marketing site / brand site with strong visual signature</li>
                  <li>✓ Single-family typography</li>
                  <li>✓ You want utility-first speed (compose in markup)</li>
                  <li>✓ Square corners + warm cream palette fits the brand</li>
                  <li>✓ Few interactive components (mostly content + CTAs)</li>
                  <li>✓ Don&apos;t need formal accessibility theming</li>
                  <li>✓ The defined design IS the active design (no spec drift)</li>
                </ul>
              </MistralCol>
              <ColumbusCol>
                <div className="text-sm font-medium mb-3" style={{ fontFamily: "var(--md-ref-typeface-brand)" }}>Reach for Columbus when…</div>
                <ul className="text-sm space-y-2">
                  <li>✓ Multi-family typography (display + body + specialty)</li>
                  <li>✓ Need accessibility body-modes (sepia / dark / dyslexia)</li>
                  <li>✓ Page-scoped design layers (.ent-scope) for distinct sections</li>
                  <li>✓ Heavy custom motion vocabulary (30+ keyframes)</li>
                  <li>✓ Brand identity is brand-black + accent-blue, not a saturated brand color</li>
                  <li>✓ You&apos;re comfortable with utility-first + hardcoded hex (the M3 spec on paper exceeds what you actually consume)</li>
                </ul>
                <p className="text-xs mt-4" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                  ⚠️ If adopting Columbus&apos;s pattern: be aware that M3 tokens.css is more aspiration than reality here. The active design is closer to a hex-driven brand layer + M3 type scale + .ent-scope partial + globals utilities.
                </p>
              </ColumbusCol>
            </Pair>

            <div className="mt-12 p-6 bg-mistral-black text-white rounded-md">
              <div className="text-xs uppercase tracking-wider opacity-60 font-medium mb-3">Source files</div>
              <ul className="text-xs font-mono space-y-1">
                <li>Mistral: <Mono>design-system/design-system.md</Mono> + <Mono>design-system/styles/tokens.css</Mono></li>
                <li>Columbus: <Mono>design-system/Columbusdesign.md</Mono> + <Mono>design-system/styles/columbus/m3-tokens.css</Mono> + <Mono>design-system/styles/columbus/enterprise-tokens.css</Mono></li>
              </ul>
              <p className="text-xs opacity-60 mt-4">
                Visit <a href="/design" className="underline">/design</a> for the Mistral showcase, <a href="/ColumbusDesign" className="underline">/ColumbusDesign</a> for the Columbus showcase (also pruned to actual usage).
              </p>
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}
