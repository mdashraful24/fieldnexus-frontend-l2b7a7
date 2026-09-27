import { Wrench } from "lucide-react";
import Link from "next/link";
import Container from "@/components/layout/public/Container";

const groups = [
  {
    title: "Platform",
    links: [
      { label: "Overview", url: "/" },
      { label: "How it works", url: "/#howItWorks" },
      { label: "Browse vendors", url: "/vendors" },
      { label: "About us", url: "/about-us" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", url: "/login" },
      { label: "Create account", url: "/register" },
      { label: "Apply as a technician", url: "/apply" },
      { label: "Forgot password", url: "/forgot-password" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of service", url: "/terms" },
      { label: "Privacy policy", url: "/privacy" },
      { label: "Security", url: "/security" },
    ],
  },
] as const;

const bottomBarLinks = [
  { label: "Terms of service", url: "/terms" },
  { label: "Privacy policy", url: "/privacy" },
  { label: "Security", url: "/security" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-muted/30">
      <Container>
        {/* Link columns */}
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)] lg:gap-8">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex w-fit items-center gap-2 font-heading font-semibold"
            >
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Wrench className="size-4" />
              </span>
              Field Nexus
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Field service management for vendors, technicians, and customers.
              Every work order, from first request to final receipt.
            </p>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              {/* Mobile: collapsible group */}
              <details className="group border-b border-border py-3 md:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold">
                  {group.title}
                  <span
                    aria-hidden
                    className="text-muted-foreground transition-transform group-open:rotate-180"
                  >
                    ▾
                  </span>
                </summary>
                <ul className="mt-4 flex flex-col gap-3 pb-2">
                  {group.links.map((link) => (
                    <li key={link.url}>
                      <Link
                        href={link.url}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>

              {/* Desktop: plain list */}
              <div className="hidden md:block">
                <p className="text-sm font-semibold">{group.title}</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.url}>
                      <Link
                        href={link.url}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Field Nexus. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {bottomBarLinks.map((link) => (
              <li key={link.url}>
                <Link
                  href={link.url}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
