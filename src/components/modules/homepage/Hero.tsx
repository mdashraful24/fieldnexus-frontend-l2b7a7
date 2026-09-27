"use client";

import {
  ArrowRight,
  CalendarCheck2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ShieldCheck,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const slides = [
  {
    eyebrow: "Welcome to FieldNexus",
    title: "Every field job, in expert hands.",
    copy: "Raise a work order, let admins route it to the right vendor and technician, and follow the job to completion.",
    service: "HVAC servicing",
    category: "Cooling & heating",
    price: "From ৳1,200",
    duration: "60–90 min",
    rating: "4.9",
    initials: "JM",
    name: "Jordan Mitchell",
    color: "bg-blue-500",
  },
  {
    eyebrow: "Verified & Accountable",
    title: "Quality service you can trust.",
    copy: "Every FieldNexus vendor is reviewed and every technician is approved, so the right person shows up for the job.",
    service: "Site inspection",
    category: "Inspection & audit",
    price: "From ৳800",
    duration: "2–3 hours",
    rating: "5.0",
    initials: "AR",
    name: "Avery Reed",
    color: "bg-emerald-500",
  },
  {
    eyebrow: "Fast & Reliable",
    title: "Dispatch a technician in minutes.",
    copy: "Approve, assign, and track a work order from one dashboard, then close it out with bKash payment and a receipt.",
    service: "On-site repair",
    category: "Maintenance & repair",
    price: "From ৳600",
    duration: "1–2 hours",
    rating: "4.8",
    initials: "TK",
    name: "Theo Kim",
    color: "bg-purple-500",
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

  const move = (direction: number) =>
    setActive(
      (current) => (current + direction + slides.length) % slides.length,
    );

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href");
    if (targetId) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <section className="relative isolate min-h-[65vh] overflow-hidden text-foreground">
      {/* Hero content */}
      <div className="relative z-10 mx-auto grid min-h-[calc(62vh-4rem)] grid-cols-1 items-center gap-8 pt-14 lg:grid-cols-[1fr_minmax(430px,.9fr)] lg:gap-[7vw]">
        {/* Left column */}
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.08em] text-blue-600">
            <span className="h-1.75 w-1.75 rounded-full bg-blue-500" />
            {slide.eyebrow}
          </div>
          <h1 className="mt-4 mb-4.5 max-w-162.5 text-6xl font-extrabold tracking-tight">
            {slide.title}
          </h1>
          <p className="max-w-2xl text-[17px] leading-[1.55] text-foreground">
            {slide.copy}
          </p>
          <div className="mt-7.25 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Link
              href="/vendors"
              className="flex items-center gap-2 rounded-full bg-primary px-5.25 py-3.75 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_oklch(.48_.16_245_/.22)]"
            >
              Browse Vendors <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about-us"
              className="flex items-center gap-2.25 rounded-full border-2 border-blue-600 px-5.25 py-2.5 text-sm font-bold text-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_oklch(.48_.16_245_/.22)]"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full border bg-blue-100 pl-0.5 text-[10px] text-blue-600">
                ▶
              </span>
              About Field Nexus
            </Link>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-2.5 text-[11px] text-muted-foreground">
            <div className="flex pr-1">
              {["JD", "AK", "LM"].map((initials, i) => (
                <span
                  key={initials}
                  className={`grid h-6.25 w-6.25 -mr-1.75 place-items-center rounded-full border-2 border-background text-[8px] font-extrabold ${
                    i === 0
                      ? "bg-primary text-primary-foreground"
                      : i === 1
                        ? "bg-accent text-accent-foreground"
                        : "bg-foreground text-background"
                  }`}
                >
                  {initials}
                </span>
              ))}
            </div>
            <span>
              <strong className="text-foreground">100+</strong> jobs dispatched
            </span>
            <span className="mx-1.25 hidden h-4 w-px bg-border sm:inline" />
            <span className="flex items-center gap-1 text-foreground">
              <Star className="h-3.25 w-3.25 fill-current text-[#e4a900]" />
              4.9 average rating
            </span>
          </div>
        </div>

        {/* Right column - Visual */}
        <div className="min-w-0" aria-live="polite">
          <div
            className={`relative min-h-97.5 overflow-hidden rounded-2xl transition-colors duration-300 lg:shadow-[0_24px_55px_oklch(.2_.03_255_/.12)] ${slide.color}`}
          >
            {/* Window */}
            <div className="absolute top-[12%] right-[10%] h-[53%] w-[46%] border-8 border-white/20 bg-white/10">
              <div className="absolute top-[14%] right-[17%] h-8.25 w-8.25 rounded-full bg-accent" />
              <div className="absolute top-[47%] h-2.25 w-full bg-white/20" />
              <div className="absolute left-[47%] h-full w-2.25 bg-white/20" />
            </div>

            {/* Plant */}
            <div className="absolute right-[4%] bottom-[6%] h-40 w-25">
              <div className="absolute bottom-0 h-13.25 w-18.5 rounded-[45%_45%_40%_40%] bg-[oklch(.18_.05_120_/.32)]" />
              <span className="absolute bottom-10.5 left-10.5 h-23 w-4.5 origin-bottom-left rotate-[-23deg] rounded-[100%_0_0_0] bg-[oklch(.26_.1_142_/.55)]" />
              <i className="absolute bottom-10.5 left-6 h-23 w-4.5 origin-bottom-left rotate-[-52deg] scale-80 rounded-[100%_0_0_0] bg-[oklch(.26_.1_142_/.55)]" />
              <b className="absolute bottom-10.5 left-13.75 h-23 w-4.5 origin-bottom-left rotate-24 scale-75 rounded-[100%_0_0_0] bg-[oklch(.26_.1_142_/.55)]" />
            </div>

            {/* Card */}
            <div className="absolute bottom-[18%] left-[12%] w-[min(79%,390px)] rounded-2xl border border-white/45 bg-white/95 p-4.75 text-foreground shadow-[0_17px_35px_oklch(.2_.03_255_/.15)] backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8.75 w-8.75 place-items-center rounded-full border-2 border-background bg-foreground text-[10px] font-extrabold text-background">
                  {slide.initials}
                </div>
                <div>
                  <Badge
                    variant="secondary"
                    className="mb-0.75 flex items-center gap-1 text-[9px] font-bold text-[oklch(.45_.13_145)] dark:text-white"
                  >
                    <span className="h-1.25 w-1.25 rounded-full bg-green-500" />
                    Available today
                  </Badge>
                  <strong className="block text-xs text-black">
                    {slide.name}
                  </strong>
                  <small className="block text-[10px] text-black">
                    Verified FieldNexus pro
                  </small>
                </div>
                <span className="ml-auto flex items-center gap-1 text-[11px] font-extrabold text-[#e4a900]">
                  <Star className="h-3.5 w-3.5 fill-current" /> {slide.rating}
                </span>
              </div>

              <div className="my-3.75 flex justify-between gap-3 border-y border-border py-3.5 dark:border-gray-400">
                <div>
                  <span className="block text-[8px] font-extrabold tracking-[0.09em] text-black uppercase">
                    POPULAR SERVICE
                  </span>
                  <strong className="mt-0.75 block text-[17px] tracking-[-0.04em] text-black">
                    {slide.service}
                  </strong>
                  <small className="mt-0.75 block text-[10px] text-black">
                    {slide.category}
                  </small>
                </div>
                <span className="self-center text-xs font-extrabold text-primary">
                  {slide.price}
                </span>
              </div>

              <div className="flex gap-3.75 text-[9px] text-black">
                <span className="flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" /> {slide.duration}
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> Background checked
                </span>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute top-[8%] left-[5%] flex items-center gap-2.25 rounded-xl border border-white/45 bg-white/90 px-3 py-2.5 text-foreground shadow-[0_9px_20px_oklch(.2_.03_255_/.12)] backdrop-blur-sm">
              <ShieldCheck className="h-4.25 w-4.25 text-primary" />
              <div className="text-black">
                <strong className="block text-[10px]">Safety first</strong>
                <small className="block text-[9px]">Every pro verified</small>
              </div>
            </div>

            <div className="absolute right-[5%] bottom-[8%] flex items-center gap-2.25 rounded-xl border border-white/45 bg-white/90 px-3 py-2.5 text-foreground shadow-[0_9px_20px_oklch(.2_.03_255_/.12)] backdrop-blur-sm">
              <CalendarCheck2 className="h-4.25 w-4.25 text-primary" />
              <div className="text-black">
                <strong className="block text-[10px]">Dispatch fast</strong>
                <small className="block text-[9px]">
                  Assign in a few clicks
                </small>
              </div>
            </div>
          </div>

          {/* Slider controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-[12px] text-foreground">
              <span>01</span>
              <div className="h-0.5 w-22.5 bg-border">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${((active + 1) / slides.length) * 100}%` }}
                />
              </div>
              <span>0{slides.length}</span>
            </div>
            <div className="flex gap-1.75">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-border bg-transparent text-foreground/80 hover:bg-primary hover:text-primary-foreground"
                onClick={() => move(-1)}
                aria-label="Previous service"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-border bg-transparent text-foreground/80 hover:bg-primary hover:text-primary-foreground"
                onClick={() => move(1)}
                aria-label="Next service"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator with icon */}
      <div className="hidden lg:block">
        <Link
          href="#howItWorks"
          onClick={handleScroll}
          className="group absolute bottom-4.25 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 pt-5 text-[12px] font-bold text-foreground/80 transition-colors hover:text-foreground"
        >
          <span>Scroll to explore</span>
          <div className="flex animate-bounce flex-col items-center gap-1">
            <ChevronDown className="h-5 w-5" />
            <span className="block h-px w-10.5 transition-colors group-hover:bg-foreground" />
          </div>
        </Link>
      </div>
    </section>
  );
}
