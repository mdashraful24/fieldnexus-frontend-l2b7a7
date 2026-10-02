import { Handshake, Rocket, ShieldCheck, Zap } from "lucide-react";
import SectionHeading from "@/components/modules/about-us/SectionHeading";

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Safety",
    description:
      "Every technician is vetted and every job is tracked, so you always know who is at your door.",
  },
  {
    icon: Zap,
    title: "Speed",
    description:
      "Automated assignment and real-time status updates mean jobs get done faster, from dispatch to completion.",
  },
  {
    icon: Handshake,
    title: "Transparency",
    description:
      "Clear pricing, live job tracking, and honest feedback keep every side of the marketplace accountable.",
  },
  {
    icon: Rocket,
    title: "Continuous Growth",
    description:
      "We invest in tools, training, and technology so technicians, vendors, and customers grow together.",
  },
];

export default function Values() {
  return (
    <section>
      <div className="flex flex-col gap-12 pb-28">
        <SectionHeading
          eyebrow="Our values"
          title="What we stand for"
          description="The principles that guide every feature we ship and every job we help complete."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="flex flex-col gap-4 rounded-3xl border bg-card p-8 group"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white transition-colors duration-300">
                <value.icon className="size-6" />
              </div>
              <h3 className="mt-2 text-lg font-medium">{value.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
