import { EnterpriseHero } from "@/components/sections/EnterpriseHero";
import { EnterprisePrompts } from "@/components/sections/EnterprisePrompts";
import { DesignPartnersStrip } from "@/components/sections/DesignPartnersStrip";
import { WatchItWork } from "@/components/sections/WatchItWork";
import { EnterpriseSolutions } from "@/components/sections/EnterpriseSolutions";
import { AITrustBand } from "@/components/sections/AITrustBand";
import { ReassuranceForIncumbents } from "@/components/sections/ReassuranceForIncumbents";
import { EnterpriseFAQ } from "@/components/sections/EnterpriseFAQ";
import { EnterpriseFinalCTA } from "@/components/sections/EnterpriseFinalCTA";

export const metadata = {
  title: "Columbus Pro — Agentic GIS | Mistral AI",
  description:
    "An agentic GIS that replaces three weeks of analysis with a single prompt. Conversational map chat, the most accurate geospatial data catalogue, and automated due-diligence reports.",
};

// Section order follows the landing-page-spec demo-forward variation
// (§30.3) for AI/agentic products in private-beta stage (§40):
//   1. Hero
//   2. Prompt gallery   ← moved up; primary "see what it does" surface
//   3. Design-partner logo strip (honestly labeled per §11)
//   4. Watch it work — three weeks vs three minutes (§12)
//   5. Feature deep-dive — sticky-scroll over four jobs (§15)
//   6. AI trust band (§17 + §38.4)
//   7. Reassurance for incumbent practitioners (§22 + §38.5)
//   8. FAQ (§26)
//   9. Final CTA (§27)
export default function EnterprisePage() {
  return (
    <main className="bg-background">
      <EnterpriseHero />
      <div id="columbus-showcase">
        <EnterprisePrompts />
      </div>
      <DesignPartnersStrip />
      <WatchItWork />
      <EnterpriseSolutions />
      <AITrustBand />
      <ReassuranceForIncumbents />
      <EnterpriseFAQ />
      <EnterpriseFinalCTA />
    </main>
  );
}
