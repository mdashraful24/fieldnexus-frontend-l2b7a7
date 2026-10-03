"use client";

import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  CalendarCheck,
  CircleCheck,
  Clock3,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Service, Vendor } from "./marketplace-marquee.data";
import { services, vendors } from "./marketplace-marquee.data";

type Direction = "left" | "right";

const monogramColors = [
  "bg-blue-600/10 text-blue-700 dark:text-blue-300",
  "bg-emerald-600/10 text-emerald-700 dark:text-emerald-300",
  "bg-amber-600/10 text-amber-700 dark:text-amber-300",
  "bg-violet-600/10 text-violet-700 dark:text-violet-300",
  "bg-rose-600/10 text-rose-700 dark:text-rose-300",
  "bg-cyan-600/10 text-cyan-700 dark:text-cyan-300",
];

const monogramOf = (name: string) =>
  name
    .split(" ")
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

const colorOf = (name: string) => {
  const seed = name
    .split("")
    .reduce((total, character) => total + character.charCodeAt(0), 0);
  return monogramColors[seed % monogramColors.length];
};

function StatTile({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border bg-muted/30 p-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-background text-primary ring-1 ring-border">
        <Icon className="size-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </p>
        <p className="text-sm font-semibold">{value}</p>
        {hint ? (
          <p className="text-[11px] text-muted-foreground">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}

function MetaStrip({
  items,
}: {
  items: { icon: LucideIcon; label: string; value: ReactNode }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border bg-muted/30 px-4 py-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <span
            key={item.label}
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Icon className="size-3.5 text-primary" aria-hidden />
            {item.label}
            <span className="font-semibold text-foreground">{item.value}</span>
          </span>
        );
      })}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
      {children}
    </p>
  );
}

function VendorCard({
  vendor,
  onSelect,
}: {
  vendor: Vendor;
  onSelect: (vendor: Vendor) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(vendor)}
      className="flex w-64 shrink-0 items-center gap-3 rounded-xl border bg-card p-3.5 text-left transition-colors hover:border-primary/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:w-72"
    >
      <span
        className={`grid size-11 shrink-0 place-items-center rounded-lg text-sm font-bold tracking-tight ${colorOf(vendor.name)}`}
        aria-hidden
      >
        {monogramOf(vendor.name)}
      </span>

      <span className="min-w-0">
        <span className="flex items-center gap-1.5">
          <span className="truncate text-sm font-semibold">{vendor.name}</span>
          <BadgeCheck className="size-3.5 shrink-0 text-primary" aria-hidden />
        </span>
        <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>{vendor.trade}</span>
          <span aria-hidden>·</span>
          <MapPin className="size-3" aria-hidden />
          <span>{vendor.area}</span>
        </span>
        <span className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-0.5 font-medium text-foreground">
            <Star
              className="size-3 fill-amber-400 text-amber-400"
              aria-hidden
            />
            {vendor.rating}
          </span>
          <span aria-hidden>·</span>
          <span>{vendor.jobs} jobs</span>
        </span>
      </span>

      <span className="sr-only">View vendor details</span>
    </button>
  );
}

function ServicePill({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <span className="flex shrink-0 items-center gap-2.5 rounded-full border bg-card px-4 py-2.5">
      <Icon className="size-4 text-primary" aria-hidden />
      <span className="text-sm font-medium whitespace-nowrap">
        {service.name}
      </span>
      {/* <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground tabular-nums">
        {service.open} open
      </span> */}
    </span>
  );
}

function VendorDialog({
  vendor,
  onClose,
}: {
  vendor: Vendor | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!vendor} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="gap-0 overflow-hidden max-w-xl p-2 rounded-3xl"
        showCloseButton={false}
      >
        {vendor ? (
          <>
            <DialogHeader className="px-6 pt-5 pb-4">
              <div className="flex items-start gap-3.5">
                <span
                  className={`grid size-14 shrink-0 place-items-center rounded-2xl text-lg font-bold ring-1 ring-border ${colorOf(vendor.name)}`}
                  aria-hidden
                >
                  {monogramOf(vendor.name)}
                </span>

                <div className="min-w-0">
                  <DialogTitle className="flex flex-wrap items-center gap-x-2 gap-y-1 text-lg">
                    {vendor.name}
                    <BadgeCheck
                      className="size-4 shrink-0 text-primary"
                      aria-hidden
                    />
                    {Number(vendor.rating) >= 4.8 ? (
                      <Badge
                        variant="secondary"
                        className="h-5 gap-1 px-1.5 text-[10px] tracking-wide uppercase"
                      >
                        <Star
                          className="size-3 fill-amber-400 text-amber-400"
                          aria-hidden
                        />
                        Top rated
                      </Badge>
                    ) : null}
                  </DialogTitle>
                  <DialogDescription className="mt-1">
                    {vendor.trade} vendor · {vendor.area} · Verified on Field
                    Nexus
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="flex min-h-0 flex-col gap-4 overflow-y-auto px-6 pb-5 overscroll-contain">
              <p className="text-sm leading-relaxed text-foreground">
                {vendor.summary}
              </p>

              <MetaStrip
                items={[
                  {
                    icon: Star,
                    label: "Rating",
                    value: `${vendor.rating} / 5`,
                  },
                  { icon: CircleCheck, label: "Jobs", value: vendor.jobs },
                  {
                    icon: Users,
                    label: "Technicians",
                    value: vendor.technicians,
                  },
                  {
                    icon: CalendarCheck,
                    label: "On time",
                    value: vendor.onTime,
                  },
                ]}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <StatTile
                  icon={CalendarCheck}
                  label="On-time completion"
                  value={vendor.onTime}
                  hint="Rolling 90 days"
                />
                <StatTile
                  icon={Clock3}
                  label="Avg first response"
                  value={vendor.response}
                  hint="Measured from approval"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <SectionLabel>Service areas</SectionLabel>
                {vendor.serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border bg-muted/40 px-2.5 py-1 text-xs font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <DialogFooter className="flex flex-row items-center gap-4 border-t bg-muted/20 px-6 py-4">
              <Button
                nativeButton={false}
                render={<Link href="/vendors" />}
                onClick={onClose}
                className="flex-1 p-5"
              >
                Browse vendor directory
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 p-5"
              >
                Close
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function MarqueeRow({
  direction,
  isPaused,
  children,
}: {
  direction: Direction;
  isPaused: boolean;
  children: ReactNode;
}) {
  const trackAnimation =
    direction === "left"
      ? "motion-safe:animate-marquee-left"
      : "motion-safe:animate-marquee-right";

  return (
    <div className="group grid gap-6 items-center">
      <div className="relative overflow-hidden">
        <span
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-background to-transparent"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-background to-transparent"
          aria-hidden
        />

        <ul
          className={`flex w-max items-center py-1 ${trackAnimation} group-hover:marquee-paused ${
            isPaused ? "marquee-paused" : ""
          }`}
        >
          {[0, 1].map((copy) => (
            <li
              key={copy}
              inert={copy === 1 ? true : undefined}
              className="flex shrink-0 items-center gap-5 pr-3"
            >
              {children}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function MarketplaceMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const isPaused = !isInView || selectedVendor !== null;

  const selectVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor);
  };

  const closeDialog = () => {
    setSelectedVendor(null);
  };

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col gap-8 pb-28">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-primary">Verified network</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Vendors and services already working orders
        </h2>
        <p className="mt-3 text-muted-foreground">
          Approved vendor teams across Dhaka and the service categories they
          cover. Every listing is reviewed before it appears here. Select a
          vendor to see the full breakdown.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <MarqueeRow direction="left" isPaused={isPaused}>
          {vendors.map((vendor) => (
            <VendorCard
              key={vendor.name}
              vendor={vendor}
              onSelect={selectVendor}
            />
          ))}
        </MarqueeRow>

        <MarqueeRow direction="right" isPaused={isPaused}>
          {services.map((service) => (
            <ServicePill key={service.name} service={service} />
          ))}
        </MarqueeRow>
      </div>

      <VendorDialog vendor={selectedVendor} onClose={closeDialog} />
    </div>
  );
}
