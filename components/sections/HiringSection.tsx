"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

const ROLES = ["Engineering", "Research", "Design", "Product", "Go-to-Market"];

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

        {/* Hero image — replaces the previous decorative map graphic. Edges
            fade into the page background via .media-bleed (same treatment as
            the footer + the Elio "Never be bored" image). */}
        <div
          className="mb-10 md:mb-20 h-[280px] md:h-[360px] relative"
          data-reveal
          data-reveal-delay="1"
        >
          <img
            src="/images/Hiringimg.png"
            alt=""
            aria-hidden="true"
            className="media-bleed absolute inset-0 w-full h-full object-cover"
            style={{ "--media-bleed-fade": "18%" }}
          />
        </div>

        {/* Application form */}
        <div className="max-w-lg mx-auto w-full" data-reveal data-reveal-delay="2">
          <div className="border border-[#C7D7F8] rounded-[20px] overflow-hidden flex flex-col bg-mistral-beige-deep">

            {/* Form header */}
            <div className="px-5 pt-5 pb-4 flex flex-col gap-1.5 border-b border-[#C7D7F8]/60">
              <h3 className="text-base font-semibold text-mistral-black tracking-tight">
                Join us.
              </h3>
              <p className="text-xs text-mistral-black/55 leading-relaxed">
                Drop your details and the role you&rsquo;re drawn to. We read every application — expect a reply within two weeks.
              </p>
            </div>

            {/* Form fields. Inputs and unselected role chips use bg-mistral-beige
                (#F1F5FE — page-background tone) — lighter than the form's
                bg-mistral-beige-deep (#DCE7FB) wrapper but not pure white, so
                the fields read as recessed windows in the surface, not stark tiles. */}
            <div className="px-5 pt-5 pb-4 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border border-[#C7D7F8] rounded-[10px] bg-mistral-beige px-4 py-3 text-sm text-mistral-black placeholder:text-mistral-black/30 focus:outline-none focus:border-mistral-black/40 transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-[#C7D7F8] rounded-[10px] bg-mistral-beige px-4 py-3 text-sm text-mistral-black placeholder:text-mistral-black/30 focus:outline-none focus:border-mistral-black/40 transition-colors"
              />

              {/* Role interest */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-mistral-black/50 uppercase tracking-wider">
                  I&rsquo;m drawn to
                </span>
                <div className="flex flex-wrap gap-2">
                  {ROLES.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role === selectedRole ? null : role)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                        selectedRole === role
                          ? "bg-mistral-black text-white"
                          : "border border-[#C7D7F8] bg-mistral-beige text-mistral-black/70 hover:border-mistral-black/30"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={4}
                placeholder="Tell us about yourself."
                className="w-full border border-[#C7D7F8] rounded-[10px] bg-mistral-beige px-4 py-3 text-sm text-mistral-black placeholder:text-mistral-black/30 focus:outline-none focus:border-mistral-black/40 transition-colors resize-none"
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
