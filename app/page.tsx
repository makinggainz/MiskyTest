import { Hero } from "@/components/sections/Hero";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { ElioSection } from "@/components/sections/ElioSection";
import { ResearchSection } from "@/components/sections/ResearchSection";
import { HiringSection } from "@/components/sections/HiringSection";
import { ColumbusFeatures } from "@/components/sections/ColumbusFeatures";

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
      </div>
    </main>
  );
}
