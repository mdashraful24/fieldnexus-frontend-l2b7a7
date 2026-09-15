import Link from "next/link";
import Logo from "@/assets/svg/Logo";
import ForgotPasswordForm from "@/components/form/forgot-password-form";

export default function ForgotPasswordPage() {
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

          <ForgotPasswordForm />
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
              Don&apos;t worry, we&apos;ve
              <br />
              got you covered.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-foreground">
              Enter your email and we&apos;ll send you a secure code to reset
              your password.
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