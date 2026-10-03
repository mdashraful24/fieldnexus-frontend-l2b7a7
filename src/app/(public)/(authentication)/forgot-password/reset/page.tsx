import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Logo from "@/assets/svg/Logo";
import AuthSidePanel from "@/components/auth/auth-side-panel";
import ResetPasswordForm from "@/components/form/reset-password-form";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Set a New Password",
  description:
    "Use the verification code from your email to choose a new password for your Field Nexus account.",
  path: "/forgot-password/reset",
  noIndex: true,
});

export default function ResetPasswordPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <AuthSidePanel
        eyebrow="Secure recovery"
        title="Almost there. Set a new password."
        description="Use the verification code from your email to secure your account and get back to your workspace."
        mode="reset"
        currentStep={2}
        steps={["Email", "Reset"]}
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
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
