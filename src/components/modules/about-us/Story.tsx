import { Activity, CheckCircle2, Target } from "lucide-react";

const missionVision = [
  {
    icon: Target,
    title: "Our mission",
    description:
      "Make field service management effortless, transparent, and fast for everyone involved.",
  },
  {
    icon: Activity,
    title: "Our vision",
    description:
      "A world where every field job is planned, executed, and paid without friction.",
  },
];

const highlights = [
  "One system for admins, vendors, technicians & customers",
  "Live job status from dispatch to completion",
  "Secure digital payments and automatic receipts",
  "Email notifications at every important step",
];

export default function Story() {
  return (
    <section>
      <div className="grid gap-12 py-16 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div>
              <span className="rounded-full border bg-muted px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Our story
              </span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Built to connect every party in the field-service chain.
            </h2>
          </div>
          <p className="leading-relaxed text-muted-foreground">
            Companies that rely on field technicians often work with many small
            subcontractor teams. Coordinating them used to mean endless phone
            calls, paper forms, and months of messy records. We started
            FieldNexus to fix that.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Today our platform is the single source of truth for hundreds of
            service requests — from dispatching the right technician, to
            tracking every status change, to handling payments and refunds with
            confidence.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {highlights.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-primary/5 blur-3xl"
          />
          <div className="relative grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
            {missionVision.map((item, index) => (
              <div
                key={item.title}
                className="group flex flex-col gap-4 p-8 transition-colors hover:bg-muted/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform group-hover:scale-105">
                    <item.icon className="size-6" />
                  </div>
                  <span className="text-xs font-semibold tracking-widest text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
