import { Check } from "lucide-react";
import { Fragment } from "react";

type AuthProgressProps = {
  currentStep: 1 | 2;
  steps: readonly string[];
  dark?: boolean;
};

export default function AuthProgress({
  currentStep,
  steps,
  dark = false,
}: AuthProgressProps) {
  return (
    <div className="w-full pt-1">
      <div className="flex w-full items-start gap-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isComplete = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const stepColor =
            isCurrent || isComplete
              ? dark
                ? "text-sky-300"
                : "text-primary"
              : dark
                ? "text-slate-500"
                : "text-muted-foreground";
          const circleColor =
            isCurrent || isComplete
              ? dark
                ? "border-sky-400 bg-sky-400 text-slate-950"
                : "border-primary bg-primary text-primary-foreground"
              : dark
                ? "border-white/20 bg-white/10"
                : "border-border bg-muted/40";
          const connectorColor =
            stepNumber < currentStep
              ? dark
                ? "bg-sky-400"
                : "bg-primary"
              : dark
                ? "bg-white/20"
                : "bg-border";

          return (
            <Fragment key={step}>
              <div
                className={`flex min-w-0 flex-1 flex-col items-center gap-2 text-center text-xs font-semibold ${stepColor}`}
              >
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-full border text-[11px] ${circleColor}`}
                >
                  {isComplete ? <Check className="size-3.5" /> : stepNumber}
                </span>
                <span className="leading-tight">{step}</span>
              </div>
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`mt-3.5 h-px min-w-8 flex-1 ${connectorColor}`}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
