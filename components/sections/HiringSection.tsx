"use client";

import { useState } from "react";

const ROLES = ["Engineering", "Research", "Design", "Product", "Go-to-Market"];

const AVATARS: { initials: string; top: string; left?: string; right?: string }[] = [
  { initials: "AR", top: "18%", left: "12%" },
  { initials: "MK", top: "55%", left: "22%" },
  { initials: "JS", top: "20%", right: "18%" },
  { initials: "LP", top: "60%", right: "12%" },
];

function ArrowIcon() {
  return (
    <svg className="size-3 shrink-0" viewBox="0 0 9 13" fill="none" aria-hidden="true">
      <circle cx="7.22"  cy="6.589" r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="4.018" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="1.46"  r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="9.151" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="11.718" r="1.28" fill="currentColor" />
    </svg>
  );
}

export function HiringSection() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <section className="py-10 md:py-[100px]">
      <div className="container">

        {/* Heading */}
        <div className="mb-10 md:mb-20 text-center" data-reveal>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
            We&rsquo;re hiring humans.
          </h2>
          <p className="mt-6 md:mt-12 text-sm leading-relaxed text-mistral-black/55 max-w-xl mx-auto">
            Building the future of geospatial AI.
          </p>
        </div>

        {/* Decorative map graphic */}
        <div
          className="border border-[#C7D7F8] rounded-[20px] overflow-hidden mb-10 md:mb-20 h-[280px] md:h-[360px] relative"
          style={{ background: "#dde3ea" }}
          data-reveal
          data-reveal-delay="1"
        >
          {/* Dot grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #b8c2ce 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          {/* Road lines */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="40%" x2="100%" y2="38%" stroke="#a4aeba" strokeWidth="3" />
            <line x1="0" y1="65%" x2="100%" y2="63%" stroke="#a4aeba" strokeWidth="1.5" />
            <line x1="30%" y1="0" x2="28%" y2="100%" stroke="#a4aeba" strokeWidth="2.5" />
            <line x1="70%" y1="0" x2="72%" y2="100%" stroke="#a4aeba" strokeWidth="3.5" />
            <rect x="38%" y="32%" width="24%" height="22%" fill="#c8d0da" opacity="0.5" rx="2" />
          </svg>

          {/* Floating team avatars */}
          {AVATARS.map((a) => (
            <div
              key={a.initials}
              className="absolute size-10 rounded-full bg-white shadow-sm border border-[#C7D7F8] flex items-center justify-center text-xs font-semibold text-mistral-black/60"
              style={{ top: a.top, left: a.left, right: a.right }}
            >
              {a.initials}
            </div>
          ))}

          {/* Centre badge */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-[20px] shadow-sm border border-[#C7D7F8] px-8 py-5 flex flex-col items-center gap-1.5">
              <span className="text-base font-semibold text-mistral-black tracking-tight">Join the team.</span>
              <span className="text-xs text-mistral-black/40">We&rsquo;re just getting started.</span>
            </div>
          </div>
        </div>

        {/* Application form */}
        <div className="max-w-lg mx-auto w-full" data-reveal data-reveal-delay="2">
          <div className="border border-[#C7D7F8] rounded-[20px] overflow-hidden flex flex-col bg-background">

            {/* Form fields */}
            <div className="px-5 pt-5 pb-4 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border border-[#C7D7F8] rounded-[10px] bg-background px-4 py-3 text-sm text-mistral-black placeholder:text-mistral-black/30 focus:outline-none focus:border-mistral-black/40 transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-[#C7D7F8] rounded-[10px] bg-background px-4 py-3 text-sm text-mistral-black placeholder:text-mistral-black/30 focus:outline-none focus:border-mistral-black/40 transition-colors"
              />

              {/* Role interest */}
              <div className="flex flex-wrap gap-2">
                {ROLES.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role === selectedRole ? null : role)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                      selectedRole === role
                        ? "bg-mistral-black text-white"
                        : "border border-[#C7D7F8] bg-background text-mistral-black/70 hover:border-mistral-black/30"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              <textarea
                rows={4}
                placeholder="Tell us about yourself."
                className="w-full border border-[#C7D7F8] rounded-[10px] bg-background px-4 py-3 text-sm text-mistral-black placeholder:text-mistral-black/30 focus:outline-none focus:border-mistral-black/40 transition-colors resize-none"
              />
            </div>

            {/* CTA — exactly matching ProductsSection px-5 pb-5 pt-1 pattern */}
            <div className="px-5 pb-5 pt-1">
              <button
                type="submit"
                onClick={(e) => e.preventDefault()}
                className="group rounded-[7px] flex items-center justify-between w-full px-5 py-2.5 bg-mistral-black text-white text-sm font-medium transition-colors hover:bg-mistral-black/80"
              >
                Send application
                <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
