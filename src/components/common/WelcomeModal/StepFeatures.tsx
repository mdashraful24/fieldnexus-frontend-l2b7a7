import { features } from "./data";

export function StepFeatures() {
  return (
    <div className="space-y-7">
      <div className="text-center space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
          Everything you need
        </p>
        <h3 className="text-2xl font-bold">Powerful features, zero clutter</h3>
        <p className="text-base text-muted-foreground max-w-md mx-auto">
          Field Nexus keeps every team aligned from the moment a job is raised.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map(({ icon: Icon, title, description, color, bg }) => (
          <div
            key={title}
            className="group rounded-xl border border-border/50 bg-muted/20 p-3.5 transition-all duration-200 hover:bg-muted/40 hover:border-border hover:-translate-y-0.5 shadow hover:shadow-sm"
          >
            <div className="flex items-center gap-2">
              <div
                className={[
                  "flex size-8 shrink-0 items-center justify-center rounded-lg",
                  bg,
                  color,
                ].join(" ")}
              >
                <Icon className="size-4" aria-hidden="true" />
              </div>
              <p className="text-sm font-semibold text-foreground leading-snug">
                {title}
              </p>
            </div>
            <p className="mt-2 text-[0.79rem] leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
