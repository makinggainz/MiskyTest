import { Hero } from "@/components/sections/Hero";
import { Section1 } from "@/components/sections/Section1";
import { Section2 } from "@/components/sections/Section2";
import { Section3 } from "@/components/sections/Section3";

export default function HomePage() {
  return (
    <main className="bg-background">
      <Hero />
      <div className="bg-background pt-px">
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
    </main>
  );
}
