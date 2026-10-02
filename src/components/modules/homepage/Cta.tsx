import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Cta() {
  return (
    <section className="scroll-mt-16 pb-28">
      <div className="flex flex-col justify-center items-center gap-6 text-center border border-primary/25 rounded-3xl py-24">
        <h2 className="max-w-5xl text-4xl font-semibold tracking-tight text-balance">
          Ready to bring your field operations onto one platform?
        </h2>
        <p className="text-muted-foreground sm:text-lg">
          Create an account and raise your first service request in under a
          minute.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            nativeButton={false}
            render={<Link href="/register" />}
            className="p-5"
          >
            Create your account
            {/* <ArrowRight data-icon="inline-end" /> */}
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/apply" />}
            className="p-5"
          >
            Apply as a technician
          </Button>
        </div>
      </div>
    </section>
  );
}
