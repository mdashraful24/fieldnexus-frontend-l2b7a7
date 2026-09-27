import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const highlights = [
  "Automated technician assignment",
  "Live work order tracking",
  "bKash payments with receipts",
];

export default function Hero() {
  return (
    <section className="flex flex-col items-center gap-8 py-16 text-center sm:py-24">
      <span className="inline-flex items-center gap-2 rounded-full border bg-muted px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        <Sparkles className="size-3.5" />
        Field service, finally organised
      </span>

      <div className="flex max-w-4xl flex-col items-center gap-5">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Every service request, vendor, and technician in one place
        </h1>
        <p className="max-w-2xl text-muted-foreground sm:text-lg">
          FieldNexus replaces spreadsheets and phone calls with a single hub
          for work orders, technician dispatch, service reports, and payments.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" nativeButton={false} render={<Link href="/register" />}>
          Create your account
          <ArrowRight data-icon="inline-end" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={<Link href="/vendors" />}
        >
          Browse vendors
        </Button>
      </div>

      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        {highlights.map((highlight) => (
          <li key={highlight} className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-primary" />
            {highlight}
          </li>
        ))}
      </ul>
    </section>
  );
}
