import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import ContactForm from "@/components/form/contact-form";
import Container from "@/components/layout/public/Container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    title: "Email",
    value: "support@fieldnexus.com",
    href: "mailto:support@fieldnexus.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+880 1700-000000",
    href: "tel:+8801700000000",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "House 12, Road 5, Dhanmondi, Dhaka 1205, Bangladesh",
  },
  {
    icon: Clock,
    title: "Support Hours",
    value: "Sunday - Thursday, 9:00 AM - 6:00 PM (GMT+6)",
  },
];

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <Container className="py-10 sm:py-14">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail className="size-6" />
            </span>
            <div className="space-y-2">
              <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Contact Us
              </h1>
              <p className="text-sm text-foreground">
                Questions, feedback, or need help? We&apos;re here for you.
              </p>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1">
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              {contactChannels.map((channel) => {
                const Icon = channel.icon;
                const content = (
                  <div className="flex items-start gap-4">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{channel.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {channel.value}
                      </p>
                    </div>
                  </div>
                );

                return (
                  <div
                    key={channel.title}
                    className="rounded-xl border bg-card p-5 transition-colors hover:border-primary/40"
                  >
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="block underline-offset-4 hover:text-primary hover:underline"
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </div>
                );
              })}
            </div>

            <Card className="px-4 py-8 rounded-3xl">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form and our team will get back to you within one
                  business day.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}
