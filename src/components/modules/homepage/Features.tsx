import {
  Bell,
  LineChart,
  MapPin,
  Repeat,
  ShieldCheck,
  Star,
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Vendor directory",
    description:
      "Browse partner teams, see their service areas, and meet the technicians they employ.",
  },
  {
    icon: Repeat,
    title: "Guided status flow",
    description:
      "Work orders move through a checked state machine, so nothing skips a step by accident.",
  },
  {
    icon: Star,
    title: "Ratings and feedback",
    description:
      "Customers rate completed work, building a scorecard for every vendor.",
  },
  {
    icon: LineChart,
    title: "Performance scorecards",
    description:
      "Admins see completed jobs, SLA breaches, and average completion time per vendor.",
  },
  {
    icon: Bell,
    title: "Instant notifications",
    description:
      "Everyone involved is notified the moment a job is assigned, accepted, or completed.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based access",
    description:
      "Customers, technicians, vendors, and admins each see only what their role allows.",
  },
];

export default function Features() {
  return (
    <section className="flex flex-col gap-10 py-16 sm:py-20">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <span className="rounded-full border bg-muted px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Capabilities
        </span>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything the field team needs
        </h2>
        <p className="text-muted-foreground sm:text-lg">
          Built around the real workflow of dispatching engineers and getting
          paid for the work.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="flex flex-col gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <feature.icon className="size-5" />
            </span>
            <h3 className="font-heading text-base font-semibold">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
