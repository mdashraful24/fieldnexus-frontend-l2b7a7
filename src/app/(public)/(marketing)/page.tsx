import Container from "@/components/layout/public/Container";
import Cta from "@/components/modules/homepage/Cta";
import Features from "@/components/modules/homepage/Features";
import Hero from "@/components/modules/homepage/Hero";
import HowItWorks from "@/components/modules/homepage/HowItWorks";
import Stats from "@/components/modules/homepage/Stats";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <Container>
        <div className="flex flex-col">
          <Hero />
          <Stats />
          <HowItWorks />
          <Features />
          <Cta />
        </div>
      </Container>
    </main>
  );
}
