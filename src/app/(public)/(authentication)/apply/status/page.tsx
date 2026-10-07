import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/assets/svg/Logo";
import TechnicianApplicationStatusForm from "@/components/form/technician-application-status-form";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Check Application Status",
  description:
    "Check the status of your Field Nexus technician application using the email you applied with.",
  path: "/apply/status",
  noIndex: true,
});

export default function ApplicationStatusPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center justify-center px-6 py-6 sm:justify-start sm:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Field Nexus
          </span>
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-xl">
          <TechnicianApplicationStatusForm />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Want to apply again?{" "}
            <Link
              href="/apply"
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              Submit an application
            </Link>
          </p>
        </div>
      </main>

      <footer className="pb-6">
        <p className="text-center text-xs text-foreground/70">
          © {new Date().getFullYear()} Field Nexus. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
