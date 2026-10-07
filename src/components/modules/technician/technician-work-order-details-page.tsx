"use client";

import { useSearchParams } from "next/navigation";
import TechnicianAssignmentActions from "@/components/modules/technician/technician-assignment-actions";
import TechnicianStatusActions from "@/components/modules/technician/technician-status-actions";
import WorkOrderDetailsView from "@/components/modules/work-order/work-order-details-view";

export default function TechnicianWorkOrderDetailsPage() {
  const searchParams = useSearchParams();
  const workOrderId = searchParams.get("workOrderId") ?? "";

  return (
    <WorkOrderDetailsView
      workOrderId={workOrderId}
      backHref="/technician/work-orders"
      backLabel="Back to My Work Orders"
      renderActions={(workOrder) => (
        <>
          <TechnicianAssignmentActions workOrder={workOrder} />
          <TechnicianStatusActions workOrder={workOrder} />
        </>
      )}
    />
  );
}
