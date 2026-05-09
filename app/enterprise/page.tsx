import { EnterpriseHero } from "@/components/sections/EnterpriseHero";
import { EnterpriseProblem } from "@/components/sections/EnterpriseProblem";
import { EnterpriseSolutions } from "@/components/sections/EnterpriseSolutions";
import { EnterpriseComparison } from "@/components/sections/EnterpriseComparison";
import { EnterprisePrompts } from "@/components/sections/EnterprisePrompts";
import { EnterpriseFeatureBlocks } from "@/components/sections/EnterpriseFeatureBlocks";
import { EnterpriseFinalCTA } from "@/components/sections/EnterpriseFinalCTA";

export const metadata = {
  title: "Columbus Pro — Agentic GIS | Mistral AI",
  description:
    "An agentic GIS that replaces three weeks of analysis with a single prompt. Conversational map chat, the most accurate geospatial data catalogue, and automated due-diligence reports.",
};

export default function EnterprisePage() {
  return (
    <main className="bg-background">
      <EnterpriseHero />
      <EnterpriseProblem />
      <div id="columbus-showcase">
        <EnterpriseSolutions />
      </div>
      <EnterpriseComparison />
      <EnterprisePrompts />
      <EnterpriseFeatureBlocks />
      <EnterpriseFinalCTA />
    </main>
  );
}
