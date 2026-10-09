import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Logo from "@/assets/svg/Logo";
import AuthSidePanel from "@/components/auth/auth-side-panel";
import GuestGuard from "@/components/auth/guest-guard";
import VerifyAccountForm from "@/components/form/verify-account-form";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Verify Account",
  description:
    "Confirm your email with the six-digit code we sent you to activate your new Field Nexus account.",
  path: "/register/verify-account",
  noIndex: true,
});

export default function VerifyAccountPage() {
  return (
    <GuestGuard>
      <div className="grid min-h-svh lg:grid-cols-2">
        <AuthSidePanel
          eyebrow="Verify your account"
          title="One last step to getting started."
          description="Confirm your email with the six-digit code we sent you, then your Field Nexus workspace will be ready."
          mode="verify"
          currentStep={2}
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
            <Suspense>
              <VerifyAccountForm />
            </Suspense>
          </div>
        </div>
      </div>
    </GuestGuard>
  );
}
