import { ClipboardList, CreditCard, UserCheck, Wrench } from "lucide-react";
import {
  MarketingCard,
  MarketingCardIcon,
} from "@/components/modules/homepage/MarketingCard";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    icon: ClipboardList,
    title: "Customers raise a request",
    description:
      "A customer creates a work order with a category, priority, and schedule. It lands in the queue as pending.",
  },
  {
    icon: UserCheck,
    title: "Admin approves and assigns",
    description:
      "An admin approves the request, then assigns a vendor and one of their technicians to the job.",
  },
  {
    icon: Wrench,
    title: "Technicians do the work",
    description:
      "The technician accepts, travels, works, and submits a service report with parts and hours used.",
  },
  {
    icon: CreditCard,
    title: "Customer pays",
    description:
      "Once the job is complete the customer pays through bKash and receives a receipt by email.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="howItWorks"
      className="flex scroll-mt-16 flex-col gap-10 pb-28"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
          How it works
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          From request to payment in four steps
        </h2>
        <p className="text-muted-foreground sm:text-lg">
          Every transition is tracked, so you always know exactly where a job
          stands.
        </p>
      </div>

      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title}>
            <MarketingCard className="px-4 py-8 rounded-3xl">
              <CardHeader>
                <div className="flex items-start justify-between gap-3 mb-5">
                  <MarketingCardIcon>
                    <step.icon className="size-5" />
                  </MarketingCardIcon>

                  <span
                    aria-hidden="true"
                    className="font-heading text-4xl leading-none font-black text-primary/15 transition-colors duration-300 group-hover:text-primary/25"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <CardTitle className="mb-2 text-lg">{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </MarketingCard>
          </li>
        ))}
      </ol>
    </section>
  );
}
