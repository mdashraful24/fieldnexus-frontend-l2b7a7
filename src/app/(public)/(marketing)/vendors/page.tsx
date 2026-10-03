import { Building2 } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/layout/public/Container";
import VendorsDirectory from "@/components/modules/vendor/vendors-directory";
import VendorsDirectoryLoading from "@/components/modules/vendor/vendors-directory-loading";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Vendor Directory",
  description:
    "Browse verified vendor teams on Field Nexus, compare ratings and completed jobs, and see the technicians each team employs before you book their service.",
  path: "/vendors",
});

export default function VendorsPage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <Container className="py-10 sm:py-14">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="size-6" />
            </span>
            <div className="space-y-2">
              <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Vendor Directory
              </h1>
              <p className="text-sm text-foreground">
                Browse our partner service teams and the technicians they
                employ.
              </p>
            </div>
          </div>

          <Suspense fallback={<VendorsDirectoryLoading />}>
            <VendorsDirectory />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}
