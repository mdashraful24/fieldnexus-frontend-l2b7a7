const stats = [
  { label: "Service requests handled", value: "25K+" },
  { label: "Verified technicians", value: "1.2K+" },
  { label: "Partner vendors", value: "400+" },
  { label: "Cities covered", value: "30+" },
];

export default function Stats() {
  return (
    <section aria-label="Stats">
      <div className="grid grid-cols-2 gap-px pb-16 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1 py-2 text-center"
          >
            <span className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {stat.value}
            </span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
