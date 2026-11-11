import { cn } from "cn";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Search,
  Sparkles,
  Star,
  Wrench,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const toneClasses = {
  primary: "bg-primary/10 text-primary",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
} as const;

const workOrders = [
  {
    id: "#2147",
    title: "HVAC maintenance",
    location: "Gulshan, Dhaka",
    status: "Assigned",
    tone: "primary" as const,
  },
  {
    id: "#2146",
    title: "Electrical inspection",
    location: "Banani, Dhaka",
    status: "In progress",
    tone: "amber" as const,
  },
  {
    id: "#2145",
    title: "Generator repair",
    location: "Uttara, Dhaka",
    status: "Completed",
    tone: "emerald" as const,
  },
];

const week = [
  { day: "M", value: 45 },
  { day: "T", value: 62 },
  { day: "W", value: 54 },
  { day: "T", value: 78 },
  { day: "F", value: 88 },
  { day: "S", value: 66 },
  { day: "S", value: 40 },
];

const trustAvatars = ["AK", "SM", "RH", "NA"];

export default function Hero() {
  return (
    <section className="relative scroll-mt-16 overflow-hidden pt-10 lg:pt-16 flex flex-col lg:flex-row items-center justify-between lg:gap-6">
      <div
        aria-hidden
        className="hidden lg:block pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-140 w-250 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[64px_64px] opacity-40 mask-[radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center lg:items-start lg:text-left">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium">
          <Sparkles className="size-3.5" />
          Field service, end to end
        </span>

        <h1 className="mt-8 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Run every field job from{" "}
          <span className="text-primary">request to receipt</span>.
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-7 text-foreground sm:text-lg">
          Field Nexus brings customers, admins, vendors, and technicians onto
          one platform — so every work order is approved, assigned, completed,
          and paid without the back-and-forth.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button
            nativeButton={false}
            render={<Link href="/register" />}
            size="lg"
            className="h-11 rounded-xl px-6"
          >
            Start a request
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/vendors" />}
            size="lg"
            className="h-11 rounded-xl px-6"
          >
            Explore vendors
          </Button>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <div className="flex -space-x-2">
            {trustAvatars.map((initials, index) => (
              <span
                key={initials}
                className={cn(
                  "grid size-8 place-items-center rounded-full text-[10px] font-semibold text-primary-foreground ring-2 ring-background",
                  index % 2 === 0 ? "bg-primary" : "bg-primary",
                )}
              >
                {initials}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Trusted by{" "}
            <span className="font-semibold text-foreground">
              25K+ customers
            </span>{" "}
            · <span className="font-semibold text-foreground">4.9</span> average
            rating
          </p>
        </div>
      </div>

      <div className="relative mx-auto mt-14 max-w-6xl">
        <div className="rounded-3xl border bg-card/70 p-2 shadow-2xl shadow-primary/5 ring-1 ring-foreground/10 backdrop-blur sm:p-3">
          <div className="overflow-hidden rounded-2xl border bg-background">
            <div className="flex items-center justify-between gap-3 border-b bg-muted/40 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="grid size-6 place-items-center rounded-md bg-primary text-primary-foreground">
                  <Zap className="size-3.5" />
                </span>
                <span className="text-sm font-semibold">Field Nexus</span>
              </div>
              <div className="hidden items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-xs text-muted-foreground sm:flex">
                <Search className="size-3.5" />
                Search work orders
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 sm:inline-flex dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Live
                </span>
                <div className="flex -space-x-1.5">
                  {["NA", "SM"].map((initials, index) => (
                    <span
                      key={initials}
                      className={cn(
                        "grid size-6 place-items-center rounded-full text-[9px] font-semibold text-primary-foreground ring-2 ring-background",
                        index === 0 ? "bg-primary" : "bg-primary/70",
                      )}
                    >
                      {initials}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-3 p-3 sm:p-4 md:grid-cols-12">
              <div className="flex flex-col rounded-2xl border bg-card p-4 md:col-span-5 md:row-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Active work orders</p>
                    <p className="text-xs text-muted-foreground">
                      3 in progress today
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Live
                  </span>
                </div>

                <ul className="mt-4 flex flex-col gap-2.5">
                  {workOrders.map((order) => (
                    <li
                      key={order.id}
                      className="flex items-center gap-3 rounded-xl border bg-background/60 p-2.5"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                        <Wrench className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-medium">
                            {order.title}
                          </p>
                          <span className="text-[10px] text-muted-foreground">
                            {order.id}
                          </span>
                        </div>
                        <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                          <MapPin className="size-3 shrink-0" />
                          {order.location}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                          toneClasses[order.tone],
                        )}
                      >
                        {order.status}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4">
                  <span className="flex w-full items-center justify-center gap-1 rounded-xl border py-2 text-xs font-medium text-muted-foreground">
                    View all work orders
                    <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border bg-card p-4 md:col-span-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground">
                    Completed this week
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    <ArrowUpRight className="size-3" />
                    12%
                  </span>
                </div>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  128
                </p>
                <div className="mt-4 flex h-16 items-end gap-1.5">
                  {week.map((entry, index) => (
                    <div
                      key={`${entry.day}-${index}`}
                      className="flex-1 rounded-t bg-primary/60"
                      style={{ height: `${entry.value}%` }}
                    />
                  ))}
                </div>
                <div className="mt-1.5 flex gap-1.5">
                  {week.map((entry, index) => (
                    <span
                      key={`${entry.day}-${index}`}
                      className="flex-1 text-center text-[9px] text-muted-foreground"
                    >
                      {entry.day}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col rounded-2xl border bg-card p-4 md:col-span-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground">
                    Avg. rating
                  </p>
                  <Star className="size-4 fill-rating text-rating" />
                </div>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  4.9
                </p>
                <div className="mt-3 flex items-center gap-0.5 text-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="size-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border bg-card p-4 md:col-span-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Next assignment
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    NA
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      Nadia Ahmed
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      HVAC specialist · Gulshan
                    </p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                    <Star className="size-3 fill-current" />
                    4.9
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border bg-card p-4 md:col-span-3">
                <p className="text-xs font-medium text-muted-foreground">
                  Revenue
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  ৳248K
                </p>
                <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight className="size-3" />
                  8.4% vs last week
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
