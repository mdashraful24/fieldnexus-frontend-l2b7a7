import { Award, CheckCircle2, Layers, Users, Wrench } from "lucide-react";
import {
  MarketingCard,
  MarketingCardIcon,
} from "@/components/modules/homepage/MarketingCard";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const groups = [
  {
    icon: Users,
    title: "For customers",
    description:
      "Something is broken and you need it fixed. Raise a request with the details, watch the job move through its stages, and pay only when the work is done.",
    points: [
      "Request a visit in under a minute",
      "See every status change as it happens",
      "Pay by bKash and keep the receipt",
    ],
  },
  {
    icon: Wrench,
    title: "For technicians",
    description:
      "You are the one doing the job. Take on work that matches your skills, log the parts and hours from wherever you are, and track what you have earned.",
    points: [
      "Only receive jobs routed to you",
      "Submit service reports from the field",
      "Follow up on payments and payouts",
    ],
  },
  {
    icon: Layers,
    title: "For vendors",
    description:
      "You run a team and need steady, well-managed work. Manage your technicians, watch your quality scores, and keep every job accounted for.",
    points: [
      "Add and manage your technician team",
      "Monitor SLAs and completion times",
      "Build a reputation through ratings",
    ],
  },
  {
    icon: Award,
    title: "For admins",
    description:
      "You keep the whole operation healthy. Approve requests, assign the right vendor, and audit every action taken on the platform.",
    points: [
      "Approve technicians and vendors",
      "Assign work with full visibility",
      "Review audit logs and scorecards",
    ],
  },
];

export default function Roles() {
  return (
    <section
      id="roles"
      className="flex scroll-mt-16 flex-col gap-10 pb-28"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
          Who it's for
        </span>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          One platform, four connected roles
        </h2>
        <p className="text-muted-foreground sm:text-lg">
          Customers, technicians, vendors, and admins all work from the same
          records, so nothing gets lost between tools.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {groups.map((group) => (
          <MarketingCard key={group.title} className="px-4 py-8 rounded-3xl space-y-4">
            <CardHeader>
              <MarketingCardIcon className="mb-5">
                <group.icon className="size-5" />
              </MarketingCardIcon>
              <CardTitle className="text-lg mb-2">{group.title}</CardTitle>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="flex flex-col gap-3 rounded-xl bg-muted/50 p-5 transition-colors duration-300 group-hover:bg-primary/5">
                {group.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </MarketingCard>
        ))}
      </div>
    </section>
  );
}
