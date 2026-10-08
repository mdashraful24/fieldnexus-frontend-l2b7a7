import { TOTAL_STEPS } from "./data";

interface StepDotsProps {
  current: number;
  total: typeof TOTAL_STEPS;
}

export function StepDots({ current, total }: StepDotsProps) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={[
            "block rounded-full transition-all duration-300",
            i === current
              ? "w-5 h-1.5 bg-primary"
              : "w-1.5 h-1.5 bg-muted-foreground/30",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
