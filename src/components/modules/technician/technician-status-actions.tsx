"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useUpdateWorkOrderStatus } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import { getTechnicianStatusActions } from "@/lib/work-order";
import type { IWorkOrder, WorkOrderStatus } from "@/types";
import TechnicianServiceReportDialog from "./technician-service-report-dialog";

const statusLabels: Partial<Record<WorkOrderStatus, string>> = {
  EN_ROUTE: "Head to Site",
  IN_PROGRESS: "Start Work",
  COMPLETED: "Mark Completed",
  FAILED: "Report Failure",
};

export default function TechnicianStatusActions({
  workOrder,
}: {
  workOrder: IWorkOrder;
}) {
  const [reportOpen, setReportOpen] = useState(false);
  const { mutate: updateStatus, isPending } = useUpdateWorkOrderStatus();

  const statusActions = getTechnicianStatusActions(workOrder.status);
  const canSubmitReport =
    workOrder.status === "IN_PROGRESS" || workOrder.status === "COMPLETED";

  if (statusActions.length === 0 && !canSubmitReport) {
    return null;
  }

  const handleStatusChange = (status: WorkOrderStatus) => {
    updateStatus(
      {
        workOrderId: workOrder.id,
        status,
        version: workOrder.version,
      },
      {
        onSuccess: (res) => {
          toast.add({
            title: "Success",
            description:
              res?.message ||
              `${workOrder.workOrderNumber} moved to ${status
                .replace("_", " ")
                .toLowerCase()}.`,
            type: "success",
          });
        },
        onError: (err) => {
          toast.add({
            title: "Action Failed",
            description: getApiErrorMessage(err),
            type: "error",
          });
        },
      },
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {statusActions.map((status) => (
        <Button
          key={status}
          size="sm"
          className="h-8"
          variant={status === "FAILED" ? "destructive" : "default"}
          onClick={() => handleStatusChange(status)}
          disabled={isPending}
        >
          {isPending ? <Spinner /> : null}
          {statusLabels[status] ?? status}
        </Button>
      ))}

      {canSubmitReport && (
        <Button
          size="sm"
          className="h-8"
          variant="outline"
          onClick={() => setReportOpen(true)}
          disabled={isPending}
        >
          Service Report
        </Button>
      )}

      <TechnicianServiceReportDialog
        workOrder={workOrder}
        open={reportOpen}
        onClose={() => setReportOpen(false)}
      />
    </div>
  );
}
