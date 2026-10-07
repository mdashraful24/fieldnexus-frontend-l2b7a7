"use client";

import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import WorkOrderPriorityBadge from "@/components/modules/work-order/work-order-priority-badge";
import WorkOrderStatusBadge from "@/components/modules/work-order/work-order-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetFeedback,
  useGetServiceReport,
  useGetWorkOrderById,
} from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type { IWorkOrder } from "@/types";

function Detail({
  label,
  value,
  children,
}: {
  label: string;
  value?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-0.5 break-words text-sm whitespace-pre-wrap">
        {children ?? value ?? "—"}
      </p>
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <p className="font-heading text-sm font-medium text-foreground">
      {children}
    </p>
  );
}

export default function WorkOrderDetailsView({
  workOrderId,
  backHref,
  backLabel,
  renderActions,
}: {
  workOrderId: string;
  backHref: string;
  backLabel: string;
  renderActions?: (workOrder: IWorkOrder) => ReactNode;
}) {
  const router = useRouter();

  const { data, isPending, isError, error } = useGetWorkOrderById(workOrderId);
  const { data: reportData } = useGetServiceReport(workOrderId);
  const { data: feedbackData } = useGetFeedback(workOrderId);

  const workOrder = data?.data;
  const report = reportData?.data;
  const feedback = feedbackData?.data;

  const goBack = () => router.push(backHref);

  if (!workOrderId) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-8 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
          <AlertTriangle className="size-6" />
        </span>
        <h2 className="text-base font-semibold">No work order selected</h2>
        <p className="max-w-xs text-sm text-muted-foreground">
          Pick a work order from the list to view its details.
        </p>
        <Button variant="outline" size="sm" onClick={goBack}>
          {backLabel}
        </Button>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex flex-col gap-6">
        <Button variant="outline" size="sm" className="w-fit" onClick={goBack}>
          <ArrowLeft className="size-4" />
          {backLabel}
        </Button>
        <Card>
          <CardContent>
            <div className="space-y-4 py-2">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !workOrder) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-8 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
          <AlertTriangle className="size-6" />
        </span>
        <h2 className="text-base font-semibold">
          Unable to load work order details
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          {getApiErrorMessage(
            error,
            "This work order may no longer exist or you may not have permission to view it.",
          )}
        </p>
        <Button variant="outline" size="sm" onClick={goBack}>
          {backLabel}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Button variant="outline" size="sm" className="w-fit" onClick={goBack}>
        <ArrowLeft className="size-4" />
        {backLabel}
      </Button>

      <Card>
        <CardContent className="flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-heading text-lg font-semibold">
                    {workOrder.title}
                  </h2>
                  <WorkOrderStatusBadge status={workOrder.status} />
                  <WorkOrderPriorityBadge priority={workOrder.priority} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {workOrder.workOrderNumber}
                </p>
              </div>
            </div>

            {renderActions?.(workOrder)}

            <Separator />

            <div className="space-y-4">
              <SectionTitle>Overview</SectionTitle>
              <Detail label="Description" value={workOrder.description} />
              <Detail
                label="Service Category"
                value={workOrder.category?.name}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Detail
                  label="Scheduled At"
                  value={
                    workOrder.scheduledAt
                      ? new Date(workOrder.scheduledAt).toLocaleString()
                      : undefined
                  }
                />
                <Detail
                  label="SLA Deadline"
                  value={
                    workOrder.slaDeadline
                      ? new Date(workOrder.slaDeadline).toLocaleString()
                      : undefined
                  }
                />
                <Detail
                  label="Completed At"
                  value={
                    workOrder.completedAt
                      ? new Date(workOrder.completedAt).toLocaleString()
                      : undefined
                  }
                />
                <Detail
                  label="Created At"
                  value={new Date(workOrder.createdAt).toLocaleString()}
                />
              </div>
              {workOrder.cancellationReason && (
                <Detail
                  label="Cancellation Reason"
                  value={workOrder.cancellationReason}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex-1">
          <div className="space-y-4">
            <SectionTitle>Customer</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              <Detail label="Name" value={workOrder.customer?.name} />
              <Detail label="Email" value={workOrder.customer?.email} />
              <Detail
                label="Contact Number"
                value={workOrder.customer?.contactNumber}
              />
              <Detail label="Address" value={workOrder.customer?.address} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex-1">
          <div className="space-y-4">
            <SectionTitle>Assignments</SectionTitle>
            {!workOrder.workAssignments?.length ? (
              <p className="text-sm text-muted-foreground">
                No technician has been assigned yet.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {workOrder.workAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="rounded-lg border bg-muted/40 p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium">
                        {assignment.technician?.name ?? "Technician"}
                      </p>
                      <span className="rounded-full bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {assignment.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {assignment.vendor?.name ?? "Vendor"} · Assigned{" "}
                      {new Date(assignment.assignedAt).toLocaleString()}
                    </p>
                    {assignment.technician?.contactNumber && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {assignment.technician.contactNumber}
                        {assignment.technician.email
                          ? ` · ${assignment.technician.email}`
                          : ""}
                      </p>
                    )}
                    {assignment.rejectionReason && (
                      <p className="mt-1 text-xs text-destructive">
                        Rejection reason: {assignment.rejectionReason}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex-1">
          <div className="space-y-4">
            <SectionTitle>Service Report</SectionTitle>
            {!report ? (
              <p className="text-sm text-muted-foreground">
                No service report has been submitted yet.
              </p>
            ) : (
              <>
                <Detail
                  label="Work Description"
                  value={report.workDescription}
                />
                <Detail label="Issue Found" value={report.issueFound} />
                <Detail
                  label="Solution Provided"
                  value={report.solutionProvided}
                />
                <Detail
                  label="Hours Worked"
                  value={String(report.hoursWorked)}
                />
                {report.partsUsed && report.partsUsed.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Parts Used
                    </p>
                    <ul className="mt-1 space-y-0.5 text-sm">
                      {report.partsUsed.map((part, index) => (
                        <li key={`${part.name}-${index}`}>
                          {part.name} × {part.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            <Separator />

            <SectionTitle>Customer Feedback</SectionTitle>
            {!feedback ? (
              <p className="text-sm text-muted-foreground">
                The customer has not submitted feedback yet.
              </p>
            ) : (
              <div className="space-y-2">
                <Detail label="Rating" value={`${feedback.rating} / 5`} />
                <Detail label="Comment" value={feedback.comment} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
