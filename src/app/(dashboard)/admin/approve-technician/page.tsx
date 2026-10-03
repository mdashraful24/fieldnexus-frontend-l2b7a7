import { ClipboardCheck } from "lucide-react";
import type { Metadata } from "next";
import TechnicianApprovalTabs from "@/components/modules/technician-approval/technician-approval-tabs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Technician Approval",
  description:
    "Review technician applications, verify submitted details, and approve or reject technician accounts.",
  path: "/admin/approve-technician",
  noIndex: true,
});

export default function ApproveTechnicianPage() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto flex w-full flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ClipboardCheck className="size-5" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Technician Approval
            </h1>
            <p className="text-sm text-muted-foreground">
              Review technician applications, verify their details, and approve
              or reject them.
            </p>
          </div>
        </div>

        <TechnicianApprovalTabs />
      </div>
    </div>
  );
}
