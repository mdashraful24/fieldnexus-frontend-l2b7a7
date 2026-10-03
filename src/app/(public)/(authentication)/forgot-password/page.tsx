import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/assets/svg/Logo";
import AuthSidePanel from "@/components/auth/auth-side-panel";
import ForgotPasswordForm from "@/components/form/forgot-password-form";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Forgot Password",
  description:
    "Request a verification code to reset the password on your Field Nexus account.",
  path: "/forgot-password",
  noIndex: true,
});

export default function ForgotPasswordPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <AuthSidePanel
        eyebrow="Secure recovery"
        title="Getting back into your workspace is simple."
        description="We’ll verify your email and guide you through a secure password reset so your work can keep moving."
        mode="recovery"
        currentStep={1}
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
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
