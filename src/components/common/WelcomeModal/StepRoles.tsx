import { roles } from "./data";

export function StepRoles() {
  return (
    <div className="space-y-7">
      <div className="text-center space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
          Built for everyone
        </p>
        <h3 className="text-2xl font-bold">Who uses Field Nexus?</h3>
        <p className="text-base text-muted-foreground max-w-md mx-auto">
          Every stakeholder has a tailored experience designed for their exact
          role.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {roles.map(({ icon: Icon, label, color, iconColor, ringColor, description }) => (
          <div
            key={label}
            className={[
              "group relative overflow-hidden rounded-2xl border border-border/50 bg-linear-to-br p-4",
              "transition-all duration-200 shadow hover:border-border hover:shadow-md hover:-translate-y-0.5",
              color,
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <div
                className={[
                  "flex size-8 items-center justify-center rounded-lg bg-background/60 ring-1 backdrop-blur-sm",
                  iconColor,
                  ringColor,
                ].join(" ")}
              >
                <Icon className="size-4" aria-hidden="true" />
              </div>
              <p className="text-base font-semibold">{label}</p>
            </div>
            <p className="mt-2 text-[0.8rem] leading-relaxed text-foreground dark:text-muted-foreground">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
