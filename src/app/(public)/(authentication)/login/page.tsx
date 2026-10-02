import Link from "next/link";
import Logo from "@/assets/svg/Logo";
import AuthSidePanel from "@/components/auth/auth-side-panel";
import LoginForm from "@/components/form/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <AuthSidePanel
        eyebrow="Welcome back"
        title="Your whole operation, in one clear view."
        description="Sign in to keep requests moving, coordinate your teams, and see exactly what needs attention next."
        mode="login"
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

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
