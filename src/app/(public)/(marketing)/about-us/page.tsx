import Container from "@/components/layout/public/Container";
import Cta from "@/components/modules/about-us/Cta";
import Hero from "@/components/modules/about-us/hero-section/Hero";
import HowItWorks from "@/components/modules/about-us/HowItWorks";
import Roles from "@/components/modules/about-us/Roles";
import Stats from "@/components/modules/about-us/Stats";
import Story from "@/components/modules/about-us/Story";
import Values from "@/components/modules/about-us/Values";

export default function AboutUsPage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <Container>
        <div className="flex flex-col">
          <Hero />
          <Stats />
          <Story />
          <Values />
          <HowItWorks id="how-it-works" />
          <Roles />
          <Cta />
        </div>
      </Container>
    </main>
  );
}
