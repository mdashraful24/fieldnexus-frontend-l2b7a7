import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/layout/public/Container";
import VendorDetailsView from "@/components/modules/vendor/vendor-details-view";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Vendor Profile",
  description:
    "Service categories, technician team, ratings, and contact details for a verified Field Nexus vendor.",
  path: "/vendors/details",
  noIndex: true,
});

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
