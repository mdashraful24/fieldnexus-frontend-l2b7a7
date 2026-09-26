import { Building2 } from "lucide-react";
import { Suspense } from "react";
import VendorsDirectory from "@/components/modules/vendor/vendors-directory";
import VendorsDirectoryLoading from "@/components/modules/vendor/vendors-directory-loading";

export default function VendorsPage() {
  return (
    <main className="w-full min-h-screen bg-pp-bg text-pp-dark">
      <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-10 sm:py-14 max-w-6xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="size-5" />
            </span>
            <div>
              <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Vendor Directory
              </h1>
              <p className="text-sm text-muted-foreground">
                Browse our partner service teams and the technicians they
                employ.
              </p>
            </div>
          </div>

          <Suspense fallback={<VendorsDirectoryLoading />}>
            <VendorsDirectory />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
