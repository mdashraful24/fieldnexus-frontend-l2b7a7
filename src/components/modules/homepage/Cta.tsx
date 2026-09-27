import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Cta() {
  return (
    <section>
      <div className="flex flex-col items-center gap-6 py-20 text-center">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Ready to bring your field operations onto one platform?
        </h2>
        <p className="max-w-xl text-muted-foreground sm:text-lg">
          Create an account and raise your first service request in under a
          minute.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" nativeButton={false} render={<Link href="/register" />}>
            Create your account
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/apply" />}
          >
            Apply as a technician
          </Button>
        </div>
      </div>
    </section>
  );
}
