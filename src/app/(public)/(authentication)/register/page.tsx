import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/assets/svg/Logo";
import AuthSidePanel from "@/components/auth/auth-side-panel";
import GuestGuard from "@/components/auth/guest-guard";
import RegisterForm from "@/components/form/register-form";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Create Account",
  description:
    "Create a Field Nexus account to raise service requests, follow technician assignments, and pay for completed work.",
  path: "/register",
  noIndex: true,
});

export default function RegisterPage() {
  return (
    <GuestGuard>
      <div className="grid min-h-svh lg:grid-cols-2">
        <AuthSidePanel
          eyebrow="Start with clarity"
          title="Build a better way to run field work."
          description="Create your workspace and bring requests, people, and progress together from day one."
          mode="register"
          currentStep={1}
          steps={["Register", "Verify"]}
        />

        <div className="flex flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-88">
            <Link
              href="/"
              className="mb-10 flex items-center gap-2.5 lg:hidden"
            >
              <Logo />
              <span className="text-lg font-semibold tracking-tight text-foreground">
                Field Nexus
              </span>
            </Link>
            <RegisterForm />
          </div>
        </div>
      </div>
    </GuestGuard>
  );
}
