"use client";

import type { ReactNode } from "react";
import WorkOrderPriorityBadge from "@/components/modules/work-order/work-order-priority-badge";
import WorkOrderStatusBadge from "@/components/modules/work-order/work-order-status-badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetFeedback,
  useGetServiceReport,
  useGetWorkOrderById,
} from "@/hooks";

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

export default function WorkOrderDetailsSheet({
  selectedId,
  onClose,
}: {
  selectedId: string;
  onClose: () => void;
}) {
  const { data, isLoading, isError } = useGetWorkOrderById(selectedId);
  const {
    data: reportData,
    isLoading: reportLoading,
    isError: reportError,
  } = useGetServiceReport(selectedId);
  const {
    data: feedbackData,
    isLoading: feedbackLoading,
    isError: feedbackError,
  } = useGetFeedback(selectedId);

  const workOrder = data?.data;
  const report = reportData?.data;
  const feedback = feedbackData?.data;

  return (
    <Sheet open={!!selectedId} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="overflow-hidden">
        <SheetHeader className="shrink-0 pr-12">
          <div className="min-w-0">
            <SheetTitle className="flex items-center gap-2 break-all">
              {workOrder?.workOrderNumber ?? "Work Order"}
              {workOrder && <WorkOrderStatusBadge status={workOrder.status} />}
            </SheetTitle>
            <SheetDescription className="break-all">
              {workOrder?.title ?? "Loading work order details..."}
            </SheetDescription>
          </div>
        </SheetHeader>

        <div
          key={selectedId}
          className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4"
        >
          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((row) => (
                <Skeleton key={row} className="h-10 w-full" />
              ))}
            </div>
          )}

          {isError && (
            <p className="text-sm text-muted-foreground">
              This work order could not be loaded. It may have been deleted.
            </p>
          )}

          {workOrder && (
            <>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <WorkOrderStatusBadge status={workOrder.status} />
                  <WorkOrderPriorityBadge priority={workOrder.priority} />
                </div>

                <Detail label="Title" value={workOrder.title} />
                <Detail label="Description" value={workOrder.description} />
                <Detail
                  label="Service Category"
                  value={workOrder.category?.name}
                />
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
                  label="Cancellation Reason"
                  value={workOrder.cancellationReason}
                />
                <Detail
                  label="Created At"
                  value={new Date(workOrder.createdAt).toLocaleString()}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <SectionTitle>Customer</SectionTitle>
                <Detail label="Name" value={workOrder.customer?.name} />
                <Detail label="Email" value={workOrder.customer?.email} />
                <Detail
                  label="Contact Number"
                  value={workOrder.customer?.contactNumber}
                />
                <Detail label="Address" value={workOrder.customer?.address} />
              </div>

              <Separator />

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

              <Separator />

              <div className="space-y-4">
                <SectionTitle>Service Report</SectionTitle>
                {reportLoading ? (
                  <Skeleton className="h-20 w-full" />
                ) : reportError || !report ? (
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
                    <Detail label="Hours Worked" value={report.hoursWorked} />
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
              </div>

              <Separator />

              <div className="space-y-4 pb-4">
                <SectionTitle>Customer Feedback</SectionTitle>
                {feedbackLoading ? (
                  <Skeleton className="h-16 w-full" />
                ) : feedbackError || !feedback ? (
                  <p className="text-sm text-muted-foreground">
                    The customer has not submitted feedback yet.
                  </p>
                ) : (
                  <>
                    <Detail label="Rating" value={`${feedback.rating} / 5`} />
                    <Detail label="Comment" value={feedback.comment} />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
