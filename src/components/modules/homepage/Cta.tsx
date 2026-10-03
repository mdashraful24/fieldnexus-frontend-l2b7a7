import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Cta() {
  return (
    <section className="scroll-mt-16 pb-28">
      <div className="relative isolate overflow-hidden rounded-3xl border border-primary/25 bg-primary/[0.06] px-6 py-14 sm:px-12 sm:py-16 lg:px-20">
        <div
          className="pointer-events-none absolute -right-24 -top-32 -z-10 size-80 rounded-full bg-primary/15 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-40 -left-24 -z-10 size-72 rounded-full bg-primary/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Built for every job cycle
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Move your next service request forward with confidence.
          </h2>
          <p className="mt-5 max-w-2xl text-muted-foreground sm:text-lg">
            Create your account, share the job details, and keep everyone
            aligned from the first request to the final report.
          </p>

          <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row">
            <Button
              nativeButton={false}
              render={<Link href="/register" />}
              size="lg"
              className="h-11 rounded-xl px-6"
            >
              Create your account
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/apply" />}
              size="lg"
              className="h-11 rounded-xl bg-background/70 px-6"
            >
              Join as a technician
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground sm:text-sm">
            {[
              "One clear job timeline",
              "Faster coordination",
              "No setup friction",
            ].map((benefit) => (
              <span key={benefit} className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-primary" aria-hidden="true" />
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
