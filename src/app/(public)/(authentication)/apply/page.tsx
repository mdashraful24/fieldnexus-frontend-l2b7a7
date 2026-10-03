import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/assets/svg/Logo";
import TechnicianApplyForm from "@/components/form/technician-apply-form";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Apply as a Technician",
  description:
    "Apply to join the Field Nexus technician network. Submit your trade, experience, and service area, and our team will review your profile.",
  path: "/apply",
  noIndex: true,
});

export default function ApplyAsTechnicianPage() {
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
        <div className="w-full max-w-2xl">
          <TechnicianApplyForm />
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
