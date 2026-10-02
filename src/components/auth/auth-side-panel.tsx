import {
  ArrowUpRight,
  Check,
  CircleDashed,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/assets/svg/Logo";
import AuthProgress from "@/components/auth/auth-progress";

type AuthSidePanelProps = {
  eyebrow: string;
  title: string;
  description: string;
  mode: "login" | "register" | "verify" | "recovery" | "reset";
  currentStep?: 1 | 2;
  steps?: readonly string[];
};

const panelData = {
  login: {
    label: "Operations overview",
    status: "All systems ready",
    progress: "82%",
    detail: "Work orders on track",
    icon: ShieldCheck,
  },
  register: {
    label: "Your workspace",
    status: "Setup takes minutes",
    progress: "01",
    detail: "Account creation step",
    icon: Check,
  },
  verify: {
    label: "Email verification",
    status: "Code ready to confirm",
    progress: "02",
    detail: "Verification step",
    icon: Check,
  },
  recovery: {
    label: "Account security",
    status: "Secure recovery",
    progress: "24/7",
    detail: "Protected access",
    icon: CircleDashed,
  },
  reset: {
    label: "Password recovery",
    status: "Ready for a new password",
    progress: "02",
    detail: "Reset password step",
    icon: ShieldCheck,
  },
} as const;

export default function AuthSidePanel({
  eyebrow,
  title,
  description,
  mode,
  currentStep,
  steps,
}: AuthSidePanelProps) {
  const data = panelData[mode];
  const StatusIcon = data.icon;

  return (
    <aside className="relative hidden overflow-hidden bg-slate-950 text-white lg:flex lg:flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,oklch(.45_.18_250/.35),transparent_34%),radial-gradient(circle_at_20%_90%,oklch(.35_.12_180/.2),transparent_32%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(oklch(1_0_0/.08)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0/.08)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative flex min-h-full flex-col justify-between p-10 xl:p-14">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="text-lg font-semibold tracking-tight">Field Nexus</span>
        </Link>

        <div className="my-12 max-w-lg">
          <p className="mb-5 text-xs font-bold tracking-[0.18em] text-sky-300 uppercase">
            {eyebrow}
          </p>
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] xl:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
            {description}
          </p>
          {/* {currentStep && steps && (
            <div className="mt-8">
              <AuthProgress
                currentStep={currentStep}
                steps={steps}
                dark
              />
            </div>
          )} */}

          <div className="mt-10 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-sky-400/15 text-sky-300">
                  <StatusIcon className="size-5" />
                </span>
                <div>
                  <p className="text-xs text-slate-400">{data.label}</p>
                  <p className="mt-1 text-sm font-semibold">{data.status}</p>
                </div>
              </div>
              <ArrowUpRight className="size-5 text-slate-400" />
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-3xl font-semibold tracking-tight">
                  {data.progress}
                </p>
                <p className="mt-1 text-xs text-slate-400">{data.detail}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-300">
                <Clock3 className="size-3.5" />
                Live status
              </div>
            </div>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full bg-sky-400 ${
                  mode === "recovery"
                    ? "w-1/2"
                    : mode === "register"
                      ? "w-1/4"
                      : mode === "verify" || mode === "reset"
                        ? "w-full"
                        : "w-[82%]"
                }`}
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} Field Nexus. Built for work that moves.
        </p>
      </div>
    </aside>
  );
}
