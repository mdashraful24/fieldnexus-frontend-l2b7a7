import type { Metadata } from "next";
import Container from "@/components/layout/public/Container";
import Cta from "@/components/modules/homepage/Cta";
import Faq from "@/components/modules/homepage/Faq";
import Features from "@/components/modules/homepage/Features";
import Hero from "@/components/modules/homepage/Hero";
import HowItWorks from "@/components/modules/homepage/HowItWorks";
import MarketplaceMarquee from "@/components/modules/homepage/MarketplaceMarquee";
import Roles from "@/components/modules/homepage/Roles";
import Stats from "@/components/modules/homepage/Stats";
import Testimonials from "@/components/modules/homepage/Testimonials";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: {
    absolute:
      "Field Service Management for Vendors, Technicians & Customers | Field Nexus",
  },
  description:
    "Raise a work order, get it approved, assigned to the right technician, and paid for — all in one place. Field Nexus connects customers, admins, vendor teams, and technicians from first request to final receipt.",
  path: "/",
});

export default function HomePage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <Container>
        <div className="flex flex-col">
          <Hero />
          <Stats />
          <HowItWorks />
          <MarketplaceMarquee />
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
