import { ArrowRight } from "lucide-react";
import Link from "next/link";
import HowItWorksButton from "@/components/modules/about-us/HowItWorksButton";
import { Button } from "@/components/ui/button";
import { DashboardMockup } from "./DashboardMockup";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-14">
      <div aria-hidden />
      <div className="relative flex justify-between items-center gap-12">
        <div className="flex flex-col items-start gap-8">
          <span className="rounded-full border bg-muted px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            About FieldNexus
          </span>
          <div className="flex flex-col gap-4">
            <h1 className="max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              The connected hub for modern field operations.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              FieldNexus brings customers, vendors, and technicians together on
              one platform — replacing paper files and phone calls with a single
              system that plans, dispatches, tracks, and pays for every field
              job.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              render={<Link href="/register" />}
              nativeButton={false}
            >
              Get started
              <ArrowRight data-icon="inline-end" />
            </Button>
            <HowItWorksButton />
          </div>
        </div>

        <div className="hidden justify-self-center lg:block">
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-12 rounded-full blur-3xl"
            />
            <div className="relative">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
