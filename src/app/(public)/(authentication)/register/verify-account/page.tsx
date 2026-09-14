import Link from "next/link";
import Logo from "@/assets/svg/Logo";
import VerifyAccountForm from "@/components/form/verify-account-form";

export default function VerifyAccountPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
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

          <VerifyAccountForm />
        </div>
      </div>

      <div className="relative hidden bg-muted lg:flex lg:flex-col">
        <div className="flex flex-1 flex-col justify-between p-12">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo />
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Field Nexus
            </span>
          </Link>

          <div className="flex flex-col gap-3">
            <h2 className="text-3xl leading-snug font-semibold tracking-tight text-foreground">
              One last step to
              <br />
              getting started.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-foreground">
              Confirm your email with the 6-digit code we sent you to finish
              creating your account.
            </p>
          </div>

          <p className="text-xs text-foreground/70">
            © {new Date().getFullYear()} Field Nexus. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}