import { Award, CheckCircle2, Layers, Users, Wrench } from "lucide-react";
import SectionHeading from "@/components/modules/about-us/SectionHeading";

const groups = [
  {
    icon: Users,
    title: "Customers",
    points: [
      "Create service requests in minutes",
      "Track jobs from request to completion",
      "Pay securely and leave feedback",
    ],
  },
  {
    icon: Wrench,
    title: "Technicians",
    points: [
      "Accept jobs that fit your schedule",
      "Report work right from the field",
      "Get paid for completed jobs",
    ],
  },
  {
    icon: Layers,
    title: "Vendors",
    points: [
      "Manage your team of technicians",
      "See performance and quality scores",
      "Grow with a steady stream of work",
    ],
  },
  {
    icon: Award,
    title: "Admins",
    points: [
      "Approve & assign every job",
      "Review dashboards and audit logs",
      "Keep everything on time and on budget",
    ],
  },
];

export default function Roles() {
  return (
    <section>
      <div className="flex flex-col gap-12 pt-20 pb-14">
        <SectionHeading
          eyebrow="Who we serve"
          title="One platform, four connected roles"
          description="Every side of the field-service chain works in the same system — no more disconnected tools."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <div
              key={group.title}
              className="flex flex-col gap-4 rounded-xl border bg-card p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <group.icon className="size-5 text-primary" />
                </div>
                <h3 className="font-medium">{group.title}</h3>
              </div>
              <ul className="flex flex-col gap-2">
                {group.points.map((point) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
