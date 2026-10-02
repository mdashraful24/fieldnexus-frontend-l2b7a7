"use client";

import Autoplay from "embla-carousel-autoplay";
import { Quote, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MarketingCard } from "@/components/modules/homepage/MarketingCard";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

const starSlots = [1, 2, 3, 4, 5];

const testimonials = [
  {
    quote:
      "I reported a leaking line before closing time and had a technician at the door the next morning. Being able to watch the job move from approval to completion meant I knew exactly when to expect them.",
    name: "Farhana Rahman",
    role: "Customer, residential plumbing",
    rating: 5,
  },
  {
    quote:
      "The work orders arrive with the category, priority, and site already attached. I am not chasing details over the phone, I just get the job and go do it.",
    name: "Imran Hossain",
    role: "Technician, HVAC",
    rating: 5,
  },
  {
    quote:
      "We manage twelve technicians on one account now. Utilisation and response times are visible at a glance, which we simply could not measure before.",
    name: "Sadia Afrin",
    role: "Vendor manager, electrical services",
    rating: 4,
  },
  {
    quote:
      "Approvals, assignments, and audit history used to live in three spreadsheets. Now every action is logged against the order, which has made disputes painless to settle.",
    name: "Tanvir Ahmed",
    role: "Operations admin",
    rating: 5,
  },
  {
    quote:
      "Service reports are submitted from the field and payments clear against the order without a second round of paperwork. Our close-of-month is uneventful now.",
    name: "Nusrat Jahan",
    role: "Customer, property management",
    rating: 5,
  },
  {
    quote:
      "SLA breaches show up per vendor before they become complaints. That one scorecard changed how we schedule our crews entirely.",
    name: "Kamrul Hasan",
    role: "Vendor manager, facilities maintenance",
    rating: 4,
  },
  {
    quote:
      "Two stores, three lifts, and a rooftop unit. I file everything from the office in the morning and track each crew without a single phone call.",
    name: "Rezaul Karim",
    role: "Customer, commercial retail",
    rating: 5,
  },
  {
    quote:
      "The parts I used are logged against the order as I fit them, so the invoice never comes back as a question. That alone was worth switching.",
    name: "Shahriar Alam",
    role: "Technician, electrical",
    rating: 4,
  },
  {
    quote:
      "Dispatch used to be a whiteboard and a lot of shouting. Now the queue assigns itself and our response time dropped by almost half.",
    name: "Masud Rana",
    role: "Dispatcher, HVAC and cooling",
    rating: 5,
  },
  {
    quote:
      "I can pull up any job from six months ago and see exactly who approved it, when, and what was charged. It settles arguments immediately.",
    name: "Farhan Chowdhury",
    role: "Operations admin",
    rating: 5,
  },
];

function TestimonialDots() {
  const { api } = useCarousel();
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;

    const sync = () => {
      setCount(api.slideNodes().length);
      setSelected(api.selectedScrollSnap());
    };

    sync();
    api.on("reInit", sync).on("select", sync);

    return () => {
      api.off("reInit", sync).off("select", sync);
    };
  }, [api]);

  if (count < 2) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: count }, (_, index) => (
        <button
          key={testimonials[index].name}
          type="button"
          onClick={() => api?.scrollTo(index)}
          aria-label={`Go to testimonial ${index + 1}`}
          aria-current={index === selected}
          className={`h-2 rounded-full transition-colors ${
            index === selected
              ? "w-6 bg-primary"
              : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    [],
  );

  return (
    <section
      id="testimonials"
      className="flex scroll-mt-16 flex-col gap-10 pb-28"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
          Testimonials
        </span>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Trusted across the field service chain
        </h2>
        <p className="text-muted-foreground sm:text-lg">
          What customers, technicians, vendors, and admins say after working
          through a full job cycle on the platform.
        </p>
      </div>

      <div className="relative">
        <Carousel
          opts={{ align: "center", loop: true }}
          plugins={[autoplayPlugin]}
          className="w-full px-2"
          aria-label="Customer testimonials"
        >
          <CarouselContent className="flex gap-4">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="basis-[30%] py-1"
              >
                <MarketingCard className="h-full px-3 py-6 rounded-3xl">
                  <CardContent className="flex h-full flex-col gap-5">
                    <Quote className="size-7 text-primary/40 transition-colors duration-300 group-hover:text-primary/70" />

                    <blockquote className="flex-1 text-sm text-foreground/85 sm:text-base">
                      {testimonial.quote}
                    </blockquote>

                    <div
                      className="flex items-center gap-1"
                      role="img"
                      aria-label={`Rated ${testimonial.rating} out of 5`}
                    >
                      {starSlots.map((slot) => (
                        <Star
                          key={slot}
                          aria-hidden="true"
                          className={`size-4 ${
                            slot <= testimonial.rating
                              ? "fill-primary text-primary"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex flex-col gap-0.5 border-t pt-3">
                      <span className="font-heading text-sm font-semibold">
                        {testimonial.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </span>
                    </div>
                  </CardContent>
                </MarketingCard>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-8 flex items-center justify-center gap-6">
            <TestimonialDots />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
