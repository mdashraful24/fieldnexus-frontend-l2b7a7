"use client";

import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useUpdateWorkOrderStatus } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import { getAdminStatusActions } from "@/lib/work-order";
import type { IWorkOrder, WorkOrderStatus } from "@/types";

function statusLabel(status: WorkOrderStatus) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export default function WorkOrderStatusDialog({
  workOrder,
  onClose,
}: {
  workOrder: IWorkOrder | null;
  onClose: () => void;
}) {
  const [selectedStatus, setSelectedStatus] = useState<WorkOrderStatus | "">(
    "",
  );
  const [cancellationReason, setCancellationReason] = useState("");

  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateWorkOrderStatus();

  const options = workOrder ? getAdminStatusActions(workOrder.status) : [];

  useEffect(() => {
    if (!workOrder) {
      setSelectedStatus("");
      setCancellationReason("");
    }
  }, [workOrder]);

  const handleUpdate = () => {
    if (!workOrder || !selectedStatus) return;

    updateStatus(
      {
        workOrderId: workOrder.id,
        status: selectedStatus,
        version: workOrder.version,
        ...(selectedStatus === "CANCELLED" && cancellationReason
          ? { cancellationReason }
          : {}),
      },
      {
        onSuccess: (res) => {
          toast.add({
            title: "Success",
            description:
              res?.message ||
              `${workOrder.workOrderNumber} is now ${statusLabel(selectedStatus)}.`,
            type: "success",
          });
          onClose();
        },
        onError: (err) => {
          toast.add({
            title: "Error",
            description: getApiErrorMessage(
              err,
              "An error occurred while updating the work order status.",
            ),
            type: "error",
          });
        },
      },
    );
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      onClose();
    }
  };

  if (!workOrder || options.length === 0) {
    return null;
  }

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader className="pr-12">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <RefreshCw className="size-5" />
            </span>
            <div className="min-w-0">
              <DialogTitle>Update Status</DialogTitle>
              <DialogDescription>
                {workOrder.workOrderNumber} — choose the next status for this
                work order.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pb-2">
          <div className="flex flex-col gap-2">
            {options.map((status) => (
              <label
                key={status}
                className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50 has-checked:border-primary has-checked:bg-primary/5"
              >
                <input
                  type="radio"
                  name="work-order-status"
                  value={status}
                  checked={selectedStatus === status}
                  onChange={() => setSelectedStatus(status)}
                  disabled={isUpdating}
                  className="size-4 accent-primary"
                />
                <span className="text-sm font-medium">
                  {statusLabel(status)}
                </span>
              </label>
            ))}
          </div>

          {selectedStatus === "CANCELLED" && (
            <Field>
              <FieldLabel htmlFor="cancellation-reason">
                Cancellation reason (optional)
              </FieldLabel>
              <Textarea
                id="cancellation-reason"
                rows={3}
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                disabled={isUpdating}
                placeholder="Why is this work order being cancelled?"
              />
            </Field>
          )}
        </div>

        <DialogFooter>
          <div className="flex items-center gap-5">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={onClose}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              size="lg"
              className="flex-1"
              onClick={handleUpdate}
              disabled={!selectedStatus || isUpdating}
            >
              {isUpdating ? (
                <>
                  <Spinner />
                  Updating...
                </>
              ) : (
                "Update Status"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
