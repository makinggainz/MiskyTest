import { ResearchHero } from "@/components/sections/research/ResearchHero";
import { FoundationModelSection } from "@/components/sections/research/FoundationModelSection";
import { TimelineSection } from "@/components/sections/research/TimelineSection";
import { ResearchAccordionSection } from "@/components/sections/research/ResearchAccordionSection";
import { ResultsSection } from "@/components/sections/research/ResultsSection";
import { BlogSection } from "@/components/sections/research/BlogSection";
import { CareersFormSection } from "@/components/sections/research/CareersFormSection";

export const metadata = {
  title: "Research — MistX",
  description:
    "At Columbus, we collect the world’s data, and build a brain that comprehends it all. We’re building frontier geospatial intelligence.",
};

export default function ResearchPage() {
  return (
    <main className="bg-background">
      <ResearchHero />
      <FoundationModelSection />
      <TimelineSection />
      <ResearchAccordionSection />
      <ResultsSection />
      <BlogSection />
      <CareersFormSection />
    </main>
  );
}
