import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "Who can use Field Nexus?",
    answer:
      "Four roles work together on the platform. Customers raise and pay for service requests, technicians travel and complete the jobs, vendors manage their technician teams, and admins approve requests, assign work, and audit everything that happens.",
  },
  {
    question: "How does a service request move through the system?",
    answer:
      "A customer creates a work order with a category, priority, and schedule. It stays pending until an admin approves it and assigns a vendor plus one of their technicians. From there the technician accepts, marks the job in progress, and submits a service report with parts and hours once the work is done.",
  },
  {
    question: "How do technicians get assigned to a job?",
    answer:
      "Admins assign the vendor first, then pick a technician from that vendor's team. Technicians only see requests routed to them, so no two teams accidentally claim the same job. A technician who cannot attend can decline, which returns the order to the admin queue.",
  },
  {
    question: "How does payment and invoicing work?",
    answer:
      "Once a work order is marked complete, the customer is prompted to pay through bKash. Payments are recorded against the order, appear in both the customer's payment history and the technician's earnings, and a receipt is emailed to the customer.",
  },
  {
    question: "Can I track the status of my booking?",
    answer:
      "Yes. Every work order exposes its current state, so you can follow it from pending through approval, assignment, in progress, and completion. Everyone involved is notified as soon as the status changes, so you never have to chase an update by phone.",
  },
  {
    question: "How are technicians and vendors verified?",
    answer:
      "Technicians apply through the site and stay pending until an admin reviews their profile and approves the account. Vendors onboard their own team members once approved. Because every account is reviewed, the vendor directory only lists teams that have cleared verification.",
  },
  {
    question: "What does it cost to get started?",
    answer:
      "Creating a customer account is free, and you can raise your first service request in under a minute. Vendors and technicians apply through a dedicated application and are onboarded once approved, with commercial terms agreed directly with the Field Nexus team.",
  },
  {
    question: "What can I see in the admin dashboard?",
    answer:
      "Admins get the full picture: every work order, vendor and member records, technician approvals, and an audit log of actions taken. Per-vendor scorecards summarise completed jobs, SLA breaches, and average completion time so you can spot problems early.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 pb-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(220px,0.7fr)_minmax(0,1.5fr)] lg:gap-16">
        <div className="flex flex-col items-start gap-5">
          <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
            FAQ
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Answers before you get started
          </h2>
          <p className="text-muted-foreground sm:text-lg">
            Find clear answers about requests, assignments, payments, and
            working with the Field Nexus team.
          </p>

          <div className="mt-2 w-full rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <p className="font-heading font-semibold">Still have a question?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Create an account and our team can help you choose the right
              next step.
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/register" />}
              className="mt-4"
            >
              Get started
            </Button>
          </div>
        </div>

        <Accordion
          className="w-full rounded-2xl border border-border px-5 sm:px-7"
          defaultValue={[faqs[0].question]}
        >
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionHeader>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
