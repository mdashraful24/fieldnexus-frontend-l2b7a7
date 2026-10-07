"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useGetServiceReport, useUpdateWorkOrderStatus } from "@/hooks";
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

  const needsReportCheck =
    workOrder.status === "IN_PROGRESS" || workOrder.status === "COMPLETED";

  const { data: reportData } = useGetServiceReport(
    needsReportCheck ? workOrder.id : "",
  );
  const hasReport = !!reportData?.data;
  const canSubmitReport = needsReportCheck && !hasReport;

  const visibleStatusActions = getTechnicianStatusActions(
    workOrder.status,
  ).filter((status) => {
    if (status === "COMPLETED") return hasReport;
    if (status === "FAILED") return !hasReport;
    return true;
  });

  const reportPending = workOrder.status === "IN_PROGRESS" && !hasReport;

  if (visibleStatusActions.length === 0 && !canSubmitReport) {
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
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {visibleStatusActions.map((status) => (
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
      </div>

      {reportPending && (
        <p className="text-xs text-muted-foreground">
          Submit the service report to unlock the completion option. Reporting a
          failure closes this work order.
        </p>
      )}

      <TechnicianServiceReportDialog
        workOrder={workOrder}
        open={reportOpen}
        onClose={() => setReportOpen(false)}
      />
    </div>
  );
}
