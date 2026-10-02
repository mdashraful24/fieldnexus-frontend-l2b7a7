import Container from "@/components/layout/public/Container";
import Cta from "@/components/modules/homepage/Cta";
import Faq from "@/components/modules/homepage/Faq";
import Features from "@/components/modules/homepage/Features";
import Hero from "@/components/modules/homepage/Hero";
import HowItWorks from "@/components/modules/homepage/HowItWorks";
import Roles from "@/components/modules/homepage/Roles";
import Stats from "@/components/modules/homepage/Stats";
import Testimonials from "@/components/modules/homepage/Testimonials";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <Container>
        <div className="flex flex-col">
          <Hero />
          <Stats />
          <HowItWorks />
          <Features />
          <Roles />
          <Testimonials />
          <Faq />
          <Cta />
        </div>
      </Container>
    </main>
  );
}
