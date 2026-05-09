import { Hero } from "@/components/sections/Hero";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { ElioSection } from "@/components/sections/ElioSection";
import { ResearchSection } from "@/components/sections/ResearchSection";
import { HiringSection } from "@/components/sections/HiringSection";
import { Section1 } from "@/components/sections/Section1";
import { ColumbusFeatures } from "@/components/sections/ColumbusFeatures";
import { Section2 } from "@/components/sections/Section2";
import { Section3 } from "@/components/sections/Section3";

export default function HomePage() {
  return (
    <main className="bg-background">
      <Hero />
      <ProductsSection />
      <div className="bg-background">
        <ColumbusFeatures />
        <ElioSection />
        <ResearchSection />
        <HiringSection />
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
    </main>
  );
}
