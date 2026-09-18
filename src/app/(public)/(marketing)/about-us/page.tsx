import Cta from "@/components/modules/about-us/Cta";
import Hero from "@/components/modules/about-us/hero-section/Hero";
import HowItWorks from "@/components/modules/about-us/HowItWorks";
import Roles from "@/components/modules/about-us/Roles";
import Stats from "@/components/modules/about-us/Stats";
import Story from "@/components/modules/about-us/Story";
import Values from "@/components/modules/about-us/Values";

export default function AboutUsPage() {
  return (
    <main className="w-full min-h-screen bg-pp-bg text-pp-dark overflow-x-hidden">
      <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 sm:max-w-150 md:max-w-185 lg:max-w-255 xl:max-w-7xl 2xl:max-w-410 3xl:max-w-[1710px]">
        <div className="flex flex-col">
          <Hero />
          <Stats />
          <Story />
          <Values />
          <HowItWorks id="how-it-works" />
          <Roles />
          <Cta />
        </div>
      </div>
    </main>
  );
}
