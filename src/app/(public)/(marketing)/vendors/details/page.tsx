import { Suspense } from "react";
import VendorDetailsView from "@/components/modules/vendor/vendor-details-view";

export default function VendorDetailsPage() {
  return (
    <main className="w-full min-h-screen bg-pp-bg text-pp-dark">
      <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-10 sm:py-14 max-w-6xl">
        <Suspense fallback={null}>
          <VendorDetailsView />
        </Suspense>
      </div>
    </main>
  );
}
