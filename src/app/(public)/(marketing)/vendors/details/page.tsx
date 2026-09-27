import { Suspense } from "react";
import Container from "@/components/layout/public/Container";
import VendorDetailsView from "@/components/modules/vendor/vendor-details-view";

export default function VendorDetailsPage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <Container className="py-10 sm:py-14">
        <Suspense fallback={null}>
          <VendorDetailsView />
        </Suspense>
      </Container>
    </main>
  );
}
