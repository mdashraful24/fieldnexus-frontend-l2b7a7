import type { Metadata } from "next";
import Container from "@/components/layout/public/Container";
import Hero from "@/components/modules/about-us/hero-section/Hero";
import HowItWorks from "@/components/modules/about-us/HowItWorks";
import Roles from "@/components/modules/about-us/Roles";
import Stats from "@/components/modules/about-us/Stats";
import Story from "@/components/modules/about-us/Story";
import Values from "@/components/modules/about-us/Values";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About Us",
  description:
    "Learn why Field Nexus was built, how the platform works, and the values behind a field service operation where every work order is visible from request to payment.",
  path: "/about-us",
});

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
        </div>
      </Container>
    </main>
  );
}
