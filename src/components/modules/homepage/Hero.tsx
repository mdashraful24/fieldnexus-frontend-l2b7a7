"use client";

import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Clock3,
  MapPin,
  Star,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    eyebrow: "01 / Request",
    title: "Start with a request that has all the right details.",
    copy: "Describe the issue, choose a category, set a priority, and share the location so the right team can respond without the back-and-forth.",
    service: "HVAC maintenance",
    location: "Gulshan, Dhaka",
    status: "New request",
    technician: "Waiting for review",
    initials: "WR",
    color: "bg-blue-600",
  },
  {
    eyebrow: "02 / Response",
    title: "Respond quickly with the full job context in view.",
    copy: "Admins review the request, confirm the details, and route it to the right service team before the work gets delayed.",
    service: "Electrical inspection",
    location: "Banani, Dhaka",
    status: "Request reviewed",
    technician: "Admin response recorded",
    initials: "AR",
    color: "bg-blue-700",
  },
  {
    eyebrow: "03 / Assign",
    title: "Put every job in the hands of the right technician.",
    copy: "Vendors see a focused queue, accept the work, and keep the customer informed as the job moves from assignment to action.",
    service: "Generator repair",
    location: "Uttara, Dhaka",
    status: "Technician assigned",
    technician: "Nadia Ahmed",
    initials: "NA",
    color: "bg-blue-800",
  },
  {
    eyebrow: "04 / Complete",
    title: "Close the loop with proof of work and payment.",
    copy: "The technician submits a service report, the customer confirms the result, and the completed order stays available for future reference.",
    service: "Generator repair",
    location: "Uttara, Dhaka",
    status: "Work completed",
    technician: "Nadia Ahmed",
    initials: "NA",
    color: "bg-green-600",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, []);

  const move = (direction: number) => {
    setActive(
      (current) => (current + direction + slides.length) % slides.length,
    );
  };

  return (
    <section className="relative scroll-mt-16 overflow-hidden pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(480px,1.05fr)]">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3 text-xs font-bold tracking-[0.16em] text-primary uppercase">
            <span className="h-px w-10 bg-primary" />
            {slide.eyebrow}
          </div>
          <h1 className="max-w-2xl text-5xl font-semibold lg:text-6xl leading-tight">
            {slide.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            {slide.copy}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-8">
            <Button
              nativeButton={false}
              render={<Link href="/register" />}
              className="p-5 rounded-xl"
            >
              Start a request <ArrowRight />
            </Button>
            <Link
              href="/vendors"
              className="text-sm font-semibold text-foreground underline border-b border-transparent underline-offset-8 transition-colors hover:text-primary hover:decoration-primary"
            >
              Explore vendors
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-5 rounded-[2rem]" />
          <div className="relative overflow-hidden rounded-[1.5rem] border bg-card shadow mb-1">
            <div className={`${slide.color} px-6 py-2 text-primary-foreground`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase opacity-75">
                    Live work order
                  </p>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight">
                    {slide.service}
                  </h2>
                </div>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                  #{String(active + 214).padStart(4, "0")}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border bg-muted/40 p-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="size-5 text-primary" />
                    <p className="text-sm text-foreground">Service location</p>
                  </div>
                  <p className="mt-2 font-semibold">{slide.location}</p>
                </div>
                <div className="rounded-xl border bg-muted/40 p-4">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="size-5 text-primary" />
                    <p className="text-sm text-foreground">Scheduled</p>
                  </div>
                  <p className="mt-2 font-semibold">Today, 2:30 PM</p>
                </div>
              </div>

              <div className="my-7 flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-full bg-primary/10 font-semibold text-primary">
                  {slide.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-foreground">Assigned technician</p>
                  <p className="truncate font-semibold">{slide.technician}</p>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-amber-600">
                  <Star className="size-4 fill-current" /> 4.9
                </span>
              </div>

              <div className="border-t pt-6">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="font-semibold">{slide.status}</span>
                  <span className="text-foreground">
                    Step {active + 1} of 4
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {["Request", "Response", "Assign", "Complete"].map(
                    (step, index) => (
                      <div key={step} className="space-y-2">
                        <div
                          className={`h-2 rounded-full ${index === active ? slide.color : "bg-muted"
                            }`}
                        />
                        <span className="block text-[11px] text-foreground">
                          {step}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="mt-7 flex flex-wrap justify-between items-center gap-3 text-xs text-foreground">
                <span className="flex items-center gap-1.5">
                  <CircleCheck className="size-4 text-emerald-600" /> Verified team
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock3 className="size-4 text-primary" /> Updates in real time
                </span>
                <span className="flex items-center gap-1.5">
                  <Wrench className="size-4 text-primary" /> Service report
                </span>
              </div>
            </div>
          </div>

          {/* <div className="relative mt-5 flex items-center justify-between">
            <div className="flex gap-2">
              {slides.map((item, index) => (
                <button
                  key={item.eyebrow}
                  type="button"
                  aria-label={`Show hero slide ${index + 1}`}
                  aria-current={index === active}
                  onClick={() => setActive(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === active ? "w-10 bg-primary" : "w-4 bg-border"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="size-9 rounded-full"
                onClick={() => move(-1)}
                aria-label="Previous hero slide"
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-9 rounded-full"
                onClick={() => move(1)}
                aria-label="Next hero slide"
              >
                <ChevronRight />
              </Button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
