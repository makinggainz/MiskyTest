"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

type DropdownId = "products" | "research" | "blog" | "company";

const dropdowns: Record<DropdownId, { label: string; href?: string; items: { label: string; href: string }[] }> = {
  products: {
    label: "Products",
    items: [
      { label: "Le Chat", href: "https://chat.mistral.ai/" },
      { label: "Le Chat Enterprise", href: "https://mistral.ai/products/le-chat-enterprise" },
      { label: "La Plateforme", href: "https://console.mistral.ai/" },
      { label: "Mistral AI Studio", href: "https://mistral.ai/products/mistral-studio" },
      { label: "Mistral Code", href: "https://mistral.ai/products/mistral-code" },
      { label: "Compute", href: "https://mistral.ai/products/compute" },
    ],
  },
  research: {
    label: "Research",
    href: "https://mistral.ai/models",
    items: [
      { label: "Models", href: "https://mistral.ai/models" },
      { label: "Magistral", href: "https://mistral.ai/news/magistral" },
      { label: "Open Source", href: "https://mistral.ai/news/open-source" },
      { label: "Papers", href: "https://mistral.ai/research" },
    ],
  },
  blog: {
    label: "Blog",
    href: "https://mistral.ai/news",
    items: [
      { label: "Latest Posts", href: "https://mistral.ai/news" },
      { label: "Product Updates", href: "https://mistral.ai/news/category/product" },
      { label: "Research", href: "https://mistral.ai/news/category/research" },
      { label: "Newsroom", href: "https://mistral.ai/news/category/newsroom" },
    ],
  },
  company: {
    label: "Company",
    items: [
      { label: "About", href: "https://mistral.ai/about" },
      { label: "Mission", href: "https://mistral.ai/mission" },
      { label: "Careers", href: "https://mistral.ai/careers" },
      { label: "Press", href: "https://mistral.ai/press" },
      { label: "Contact", href: "https://mistral.ai/contact" },
    ],
  },
};

/**
 * The double-stacked arrow icon Mistral uses on every nav item — slides up
 * on hover (the chevron column rotates inside an h-3 overflow-hidden box).
 * Keeps the exact visual fidelity of the original.
 */
function NavArrowStack({ className = "" }: { className?: string }) {
  return (
    <div className={"h-3 overflow-hidden relative " + className}>
      <div className="h-6 flex flex-col transition-transform duration-200 group-hover:-translate-y-3">
        <ArrowDot className="rotate-90" />
        <ArrowDot className="-rotate-90" />
      </div>
    </div>
  );
}

function ArrowDot({ className = "" }: { className?: string }) {
  return (
    <svg
      className={"size-3 shrink-0 transition-transform duration-300 " + className}
      width="24"
      viewBox="0 0 9 13"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="7.22" cy="6.589" r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="4.018" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="1.46" r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="9.151" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="11.718" r="1.28" fill="currentColor" />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownId | null>(null);
  const [elioOpen, setElioOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navColor = "text-mistral-black";

  const navItemTriggerProps = (id: DropdownId) => ({
    onMouseEnter: () => setOpenDropdown(id),
    onMouseLeave: () => setOpenDropdown((d) => (d === id ? null : d)),
  });

  return (
    <header className="fixed z-999 top-0 left-0 w-full">
      {/* Backdrop: invisible over hero, solid once scrolled into content */}
      <div
        className="absolute left-0 top-0 w-full pointer-events-none z-0 bg-background transition-[height] duration-300"
        style={{ height: scrolled ? "100%" : "0%" }}
      />

      <div className="px-4 md:px-auto md:container flex items-center py-6 relative z-10">
        {/* Left: logo + wordmark */}
        <div className="flex-1 flex items-center gap-3">
          <a rel="home" aria-label="Home" className="relative z-10 flex size-[34px] items-center justify-center" href="/">
            <img
              alt="Columbo Logo"
              width={34}
              height={34}
              decoding="async"
              className="object-contain transition-[filter] duration-300"
              style={{
                color: "transparent",
                filter: "brightness(0) saturate(100%) invert(8%) sepia(80%) saturate(1400%) hue-rotate(215deg) brightness(90%)",
              }}
              src="/images/Columbo.png"
            />
          </a>
          <span
            className="hidden lg:flex items-center font-semibold leading-none whitespace-nowrap text-mistral-black"
            style={{ fontFamily: "Axiforma, var(--font-display), sans-serif", fontSize: scrolled ? 20 : 24, transition: "font-size 500ms cubic-bezier(0.22,1,0.36,1)", position: "relative", top: "3px" }}
          >
            Columbus Earth
          </span>
        </div>

        {/* Center: main nav links */}
        <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
          {(Object.keys(dropdowns) as Array<DropdownId>).map((id) => {
            const dd = dropdowns[id];
            const isOpen = openDropdown === id;
            const triggerClass = `group py-4 flex items-center text-sm gap-2 transition-opacity duration-500 opacity-80 hover:opacity-100 ${navColor}`;
            return (
              <div key={id} className="relative" {...navItemTriggerProps(id)}>
                {dd.href ? (
                  <a
                    role="menuitem"
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    href={dd.href}
                    className={triggerClass}
                  >
                    {dd.label}
                    <NavArrowStack />
                  </a>
                ) : (
                  <button
                    role="menuitem"
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    onClick={() => setOpenDropdown((d) => (d === id ? null : id))}
                    className={triggerClass}
                  >
                    {dd.label}
                    <NavArrowStack />
                  </button>
                )}
                {isOpen && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full min-w-[240px] bg-background text-mistral-black shadow-lg border-t-2 border-mistral-orange py-2 z-50 rounded-b-[20px] overflow-hidden"
                  >
                    <ul>
                      {dd.items.map((item) => (
                        <li key={item.href} role="none">
                          <a
                            role="menuitem"
                            className="block px-4 py-2 text-sm hover:bg-mistral-beige-deep transition-colors"
                            href={item.href}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: CTAs */}
        <div className="flex-1 flex items-center justify-end gap-2">
          {/* Contact */}
          <a
            target="_self"
            className="group rounded-full px-5 py-2 text-sm hidden md:flex items-center truncate gap-2 transition-colors bg-mistral-black text-white hover:bg-mistral-black/80 opacity-10 hover:opacity-100"
            href="/ColumbusDesign"
          >
            Contact
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
              <ArrowDot className="text-mistral-orange" />
            </span>
          </a>

          {/* Try Elio dropdown */}
          <div
            className="relative hidden md:block"
            onMouseEnter={() => setElioOpen(true)}
            onMouseLeave={() => setElioOpen(false)}
          >
            <button
              className="group rounded-full px-5 py-2 text-sm flex items-center gap-2 transition-colors bg-mistral-black text-white hover:bg-mistral-black/80"
              aria-haspopup="menu"
              aria-expanded={elioOpen}
            >
              Try Elio
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
                <NavArrowStack className="text-mistral-orange" />
              </span>
            </button>
            {elioOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-1 min-w-[180px] bg-background text-mistral-black shadow-lg border-t-2 border-mistral-orange py-2 z-50 rounded-b-[20px] overflow-hidden"
              >
                <ul>
                  <li role="none">
                    <a role="menuitem" className="block px-4 py-2 text-sm hover:bg-mistral-beige-deep transition-colors" href="#">Try Elio</a>
                  </li>
                  <li role="none">
                    <a role="menuitem" className="block px-4 py-2 text-sm hover:bg-mistral-beige-deep transition-colors" href="#">Try Mapsurf</a>
                  </li>
                  <li role="none">
                    <a role="menuitem" className="block px-4 py-2 text-sm hover:bg-mistral-beige-deep transition-colors" href="/ColumbusDesign">Try Columbus</a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <button
            className="lg:hidden md:px-2 cursor-pointer text-mistral-black"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" />
              </svg>
            ) : (
              <svg width="24" height="20" viewBox="0 0 75 63" fill="none" aria-hidden="true">
                <path opacity="0.5" d="M49.76 49.76H0V62.20H49.76V49.76Z" fill="currentColor" />
                <path opacity="0.7" d="M74.64 24.88H0V37.32H74.64V24.88Z" fill="currentColor" />
                <path d="M74.64 0H0V12.44H74.64V0Z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-background text-mistral-black z-20 px-6 py-6 shadow-lg max-h-[calc(100vh-100px)] overflow-y-auto">
          <ul className="flex flex-col gap-1">
            {(Object.keys(dropdowns) as Array<DropdownId>).map((id) => {
              const dd = dropdowns[id];
              return (
                <li key={id}>
                  <div className="font-semibold mt-3 py-1">{dd.label}</div>
                  <ul className="flex flex-col gap-1 pl-4">
                    {dd.items.map((item) => (
                      <li key={item.href}>
                        <a href={item.href} className="text-sm py-1 block hover:underline">{item.label}</a>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
            <li className="mt-6">
              <a href="/ColumbusDesign" className="block rounded-full px-5 py-2 bg-mistral-black text-white text-sm text-center hover:bg-mistral-black/80">
                Try Columbus
              </a>
            </li>
            <li className="mt-2">
              <a href="#" className="block rounded-full px-5 py-2 bg-mistral-black text-white text-sm text-center hover:bg-mistral-black/80">
                Try Elio
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
