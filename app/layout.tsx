import type { Metadata } from "next";
import "./globals.css";
import { funnelDisplay, openingHoursSans } from "@/app/fonts";
import { Nav } from "@/components/nav/Nav";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Frontier AI LLMs, assistants, agents, services | Mistral AI",
  description:
    "Mistral AI builds frontier AI for business and technology, with open-weight models, productivity assistants, and customizable agents.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* Mistral's snapshot uses class="light" by default; their `dark:`
       Tailwind variants are compiled in but only apply when class="dark"
       is on <html>. Default to light to match the original render. */
    <html lang="en" className={`${funnelDisplay.variable} ${openingHoursSans.variable} light`}>
      <body className="relative overflow-x-hidden font-sans">
        <Nav />
        <ScrollReveal />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
