import SectionHeading from "@/components/modules/about-us/SectionHeading";

const steps = [
  {
    title: "Request a service",
    description:
      "Customers create a service request in minutes. The system instantly figures out the right category and priority.",
  },
  {
    title: "Smart assignment",
    description:
      "Admins assign the job to the best available vendor and technician, with scheduling that respects everyone's time.",
  },
  {
    title: "Track in real time",
    description:
      "From accepted to en route to in progress, every stage is visible. Nobody is left guessing.",
  },
  {
    title: "Confirm & pay",
    description:
      "Once the work is completed, customers give feedback and pay securely — with refunds handled fairly when needed.",
  },
];

export default function HowItWorks({ id }: { id?: string }) {
  return (
    <section id={id}>
      <div className="flex flex-col gap-12 py-20">
        <SectionHeading
          eyebrow="How it works"
          title="From request to resolution"
          description="A clear, step-by-step journey that keeps everyone in sync from start to finish."
        />
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative flex flex-col gap-3 rounded-xl border bg-card p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <h3 className="font-medium">{step.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
