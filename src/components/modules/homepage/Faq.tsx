"use client";

import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const faqRef = useRef<HTMLDivElement>(null);
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    const handleOutsidePointerDown = (event: PointerEvent) => {
      if (!faqRef.current?.contains(event.target as Node)) {
        setOpenItems([]);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    return () =>
      document.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, []);

  return (
    <section className="scroll-mt-16 pb-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(260px,0.72fr)_minmax(0,1.45fr)] lg:gap-16">
        <div className="flex flex-col items-start">
          <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
            FAQ
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Answers before you get started
          </h2>
          <p className="mt-5 text-muted-foreground sm:text-lg">
            Find clear answers about requests, assignments, payments, and
            working with the Field Nexus team.
          </p>

          <div className="mt-8 w-full rounded-2xl border border-primary/20 bg-primary/6 p-5 sm:p-6">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MessageCircleQuestion className="size-5" aria-hidden="true" />
            </div>
            <p className="mt-4 font-heading font-semibold">
              Still have a question?
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Our team can help you choose the right next step for your role.
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/register" />}
              className="mt-5 rounded-xl"
            >
              Get started <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>

        <Accordion
          ref={faqRef} id="faq"
          className="w-full rounded-2xl border border-border bg-card/50 px-5 shadow-sm sm:px-7"
          value={openItems}
          onValueChange={setOpenItems}
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={faq.question}
              className="border-border/80"
            >
              <AccordionHeader>
                <AccordionTrigger className="py-5 text-sm sm:text-base">
                  <span className="flex items-center gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent className="pl-10 transition-[height,opacity] duration-300 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0">
                <p className="max-w-4xl leading-7">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
