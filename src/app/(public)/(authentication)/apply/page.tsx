import Link from "next/link";
import Logo from "@/assets/svg/Logo";
import TechnicianApplyForm from "@/components/form/technician-apply-form";

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
