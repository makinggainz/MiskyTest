import { ElioHero } from "@/components/sections/ElioHero";
import { ElioHowItWorks } from "@/components/sections/ElioHowItWorks";
import { ElioPromptGallery } from "@/components/sections/ElioPromptGallery";
import { ElioTestimonials } from "@/components/sections/ElioTestimonials";
import { ElioValues } from "@/components/sections/ElioValues";
import { ElioBigNumber } from "@/components/sections/ElioBigNumber";
import { ElioFinalCTA } from "@/components/sections/ElioFinalCTA";
import { StickyDownloadBar } from "@/components/StickyDownloadBar";

export const metadata = {
  title: "Elio — Find your next anything | Mistral AI",
  description:
    "A smarter, more social map for every spot on your list. Conversational map chat, group plans, surprise picks. Free, forever.",
};

// Section order follows consumer-landing-page-specification §23 default,
// applying the free-emphatic variation (§24.4). All trust scaffolding pieces
// are now present as placeholders to be swapped for live data on launch:
// App Store + Play Store badges (§31), 4.8★/12K rating display (§31),
// big-number band (§19), identity-tagged testimonials (§15 + §36), and the
// mobile sticky download bar (§25).
//
//   1. Hero (with badges + rating + free chip)
//   2. Feature scenes (3 — Ask anything / Plan together / Roll the dice)
//   3. Prompt gallery (UGC-grid principle, §32)
//   4. Testimonials (identity-tag principle, §36)
//   5. Brand values band (§17 + §33)
//   6. Big-number social proof (§19)
//   7. Final CTA (with badges + rating)
//   ─ Mobile-only StickyDownloadBar, fixed bottom (§25)
export default function ElioPage() {
  return (
    <main className="theme-elio bg-background">
      <ElioHero />
      <ElioHowItWorks />
      <ElioPromptGallery />
      <ElioTestimonials />
      <ElioValues />
      <ElioBigNumber />
      <ElioFinalCTA />
      <StickyDownloadBar />
    </main>
  );
}
