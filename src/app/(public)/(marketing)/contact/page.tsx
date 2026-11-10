import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/form/contact-form";
import Container from "@/components/layout/public/Container";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact Us",
  description:
    "Reach out to the Field Nexus team with questions, feedback, or support requests, and find our email, phone, office address, and support hours.",
  path: "/contact",
});

const contactChannels = [
  {
    icon: Mail,
    label: "Email",
    value: "support@fieldnexus.com",
    href: "mailto:support@fieldnexus.com",
    note: "Best for detailed questions and attachments.",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1700-000000",
    href: "tel:+8801700000000",
    note: "Talk to the support desk during operating hours.",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "House 12, Road 5, Dhanmondi, Dhaka 1205",
    note: "Visits by appointment only.",
  },
  {
    icon: Clock,
    label: "Support hours",
    value: "Sunday – Thursday, 9:00 AM – 6:00 PM (GMT+6)",
    note: "After-hours messages are answered the next business day.",
  },
];

const quickLinks = [
  {
    label: "Vendor directory",
    description: "Browse verified teams and the technicians they employ.",
    href: "/vendors",
  },
  {
    label: "About Field Nexus",
    description: "See how requests, assignments, and payments fit together.",
    href: "/about-us",
  },
  {
    label: "Security",
    description: "How we protect accounts, work orders, and payment data.",
    href: "/security",
  },
];

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <Container className="py-10 sm:py-14">
        <div className="flex flex-col gap-10 lg:gap-12">
          <header className="flex max-w-3xl flex-col items-start gap-4">
            <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
              Contact
            </span>
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Let&apos;s talk about your field operations.
            </h1>
            <p className="text-muted-foreground sm:text-lg">
              Questions about a request, a vendor, or your account? Tell us what
              you need and the right person on our team will take it from there.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-10">
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border bg-card p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-1">
                  <h2 className="font-heading text-lg font-semibold">
                    Contact channels
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Reach the team the way that suits you best.
                  </p>
                </div>

                <ul className="mt-4 flex flex-col gap-1">
                  {contactChannels.map((channel) => {
                    const Icon = channel.icon;
                    const content = (
                      <div className="flex items-start gap-4">
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            {channel.label}
                          </p>
                          <p className="mt-1 text-sm font-medium leading-snug">
                            {channel.value}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {channel.note}
                          </p>
                        </div>
                        {channel.href ? (
                          <ArrowUpRight
                            className="mt-1 size-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                            aria-hidden="true"
                          />
                        ) : null}
                      </div>
                    );

                    return (
                      <li key={channel.label}>
                        {channel.href ? (
                          <a
                            href={channel.href}
                            className="group block rounded-2xl p-3 transition-colors hover:bg-primary/5"
                          >
                            {content}
                          </a>
                        ) : (
                          <div className="group block rounded-2xl p-3">
                            {content}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-3xl border border-primary/20 bg-primary/6 p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Clock className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-heading text-base font-semibold">
                      Under one business day
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Average first reply
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Every message is read by a person, not an autoresponder.
                  Messages sent after hours are answered the next business day.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border bg-card p-5 shadow-sm sm:p-8">
              <div className="flex flex-col gap-1">
                <h2 className="font-heading text-lg font-semibold">
                  Send us a message
                </h2>
                <p className="text-sm text-muted-foreground">
                  Share a few details and we will route your message to the
                  right team.
                </p>
              </div>

              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>

          <section className="border-t pt-8">
            <div>
              <p className="text-xs font-medium tracking-wide text-primary uppercase">
                Keep exploring
              </p>
              <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight">
                Prefer to look around first?
              </h2>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group rounded-2xl border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium">{link.label}</span>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
