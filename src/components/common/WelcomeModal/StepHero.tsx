import Logo from "@/assets/svg/Logo";
import { CheckCircle2 } from "lucide-react";

export function StepHero() {
  return (
    <div className="flex flex-col items-center text-center gap-7 py-2">
      {/* Animated glow orb */}
      <div className="relative flex items-center justify-center">
        <div className="absolute size-32 rounded-full bg-primary/20 blur-2xl animate-pulse" />
        <div className="relative flex size-16 items-center justify-center rounded-2xl shadow-lg shadow-primary/20 ring-4 ring-primary/20">
          <Logo />
        </div>
      </div>

      <div className="space-y-5 max-w-lg">
        <p className="text-md font-semibold uppercase tracking-[0.22em] text-blue-600">
          Field Service Management
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-foreground leading-[1.15]">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-primary">
            Field Nexus
          </span>
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          One calm, connected platform to move every service job from the first
          customer request all the way to final payment.
        </p>
      </div>

      {/* Quick stat pills */}
      <div className="flex flex-wrap justify-center gap-3">
        {[
          { label: "4 Roles", sub: "All in one platform" },
          { label: "End-to-End", sub: "Request → Payment" },
          { label: "Real-Time", sub: "Live updates" },
        ].map(({ label, sub }) => (
          <div
            key={label}
            className="flex items-center gap-2 rounded-full shadow border border-border/60 bg-muted/40 px-3 py-2 text-[0.8rem]"
          >
            <CheckCircle2 className="size-3.5 text-primary shrink-0" />
            <span className="font-medium">{label}</span>
            <span className="dark:text-muted-foreground">{sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
