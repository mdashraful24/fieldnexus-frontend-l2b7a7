import { ArrowLeft, ArrowRight, Compass, Home, Wrench } from "lucide-react";
import Link from "next/link";
import Container from "@/components/layout/public/Container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_42%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_34%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_at_center,black_20%,transparent_72%)]"
      />

      <Container className="flex w-full justify-center">
        <section
          aria-labelledby="not-found-title"
          className="flex w-full max-w-2xl flex-col items-center text-center"
        >
          <div className="relative mb-8">
            <div
              aria-hidden
              className="absolute inset-0 scale-150 rounded-full bg-primary/10 blur-3xl"
            />
            <div className="relative flex size-20 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-sm">
              <Wrench
                className="size-8 rotate-[-18deg]"
                strokeWidth={1.6}
              />
              <span className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground">
                <Compass className="size-4" />
              </span>
            </div>
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Error 404
          </p>
          <h1
            id="not-found-title"
            className="font-heading text-4xl font-bold tracking-tight"
          >
            Page not found
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-foreground sm:text-lg">
            The page you&apos;re looking for may have moved, been removed, or is
            temporarily out of service. Let&apos;s get you back on track.
          </p>

          <div className="my-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button
              nativeButton={false}
              className="py-5"
              render={
                <Link href="/">
                  <Home data-icon="inline-start" />
                  Return home
                </Link>
              }
            />
            <Button
              variant="outline"
              nativeButton={false}
              className="py-5 shadow"
              render={
                <Link href="/vendors">
                  Browse vendors
                  <ArrowRight data-icon="inline-end" />
                </Link>
              }
            />
          </div>

          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground sm:flex-row">
            <span>Need help finding something?</span>
            <Link
              href="/about-us"
              className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 transition-colors hover:underline"
            >
              Learn more about Field Nexus
              <ArrowLeft className="size-3.5 rotate-180" />
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
