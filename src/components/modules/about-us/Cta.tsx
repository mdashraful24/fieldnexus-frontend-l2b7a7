import { ArrowRight, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Cta() {
  return (
    <section>
      <div className="flex flex-col items-center gap-6 py-20 text-center">
        <Globe className="size-10 text-primary" />
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Ready to bring your field operations onto one platform?
        </h2>
        <p className="max-w-xl text-muted-foreground sm:text-lg">
          Join customers, vendors, and technicians who are already getting more
          done with FieldNexus.
        </p>
        <Button
          size="lg"
          render={<Link href="/register" />}
          nativeButton={false}
        >
          Create your account
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </section>
  );
}
