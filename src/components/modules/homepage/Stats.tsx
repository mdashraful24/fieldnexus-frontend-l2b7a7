import { MarketingCard } from "@/components/modules/homepage/MarketingCard";
import { CardContent } from "@/components/ui/card";

const stats = [
  { label: "Service requests handled", value: "25K+" },
  { label: "Verified technicians", value: "1.2K+" },
  { label: "Partner vendors", value: "400+" },
  { label: "Cities covered", value: "30+" },
];

export default function Stats() {
  return (
    <section
      aria-label="Platform statistics"
      className="max-w-6xl w-full mx-auto flex scroll-mt-16 flex-col py-28"
    >
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <MarketingCard
            key={stat.label}
            className="items-center justify-center text-center px-4 py-8 rounded-3xl"
          >
            <CardContent className="flex flex-col gap-1.5">
              <span className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
            </CardContent>
          </MarketingCard>
        ))}
      </div>
    </section>
  );
}
