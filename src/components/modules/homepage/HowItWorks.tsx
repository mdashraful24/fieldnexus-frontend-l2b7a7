import { ClipboardList, CreditCard, UserCheck, Wrench } from "lucide-react";

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
    <section className="flex flex-col gap-10 py-16 sm:py-20">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <span className="rounded-full border bg-muted px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          How it works
        </span>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          From request to payment in four steps
        </h2>
        <p className="text-muted-foreground sm:text-lg">
          Every transition is tracked, so you always know exactly where a job
          stands.
        </p>
      </div>

      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <step.icon className="size-5" />
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                0{index + 1}
              </span>
            </div>
            <h3 className="font-heading text-base font-semibold">
              {step.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
