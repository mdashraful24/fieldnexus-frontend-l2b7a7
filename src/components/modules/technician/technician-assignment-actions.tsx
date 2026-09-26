"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useAcceptWorkOrder, useRejectWorkOrder } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import { rejectApplicationReasonSchema } from "@/validation";
import type { IWorkOrder } from "@/types";

export default function TechnicianAssignmentActions({
  workOrder,
}: {
  workOrder: IWorkOrder;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState<string | null>(null);

  const { mutate: accept, isPending: acceptPending } = useAcceptWorkOrder();
  const { mutate: reject, isPending: rejectPending } = useRejectWorkOrder();

  const assignment = workOrder.workAssignments?.find(
    (item) => item.technicianId && item.status === "PENDING",
  );
  const isAwaitingResponse = assignment?.status === "PENDING";

  const handleAccept = () => {
    accept(workOrder.id, {
      onSuccess: (res) => {
        if (!res?.success) {
          toast.add({
            title: "Action Failed",
            description: "Something went wrong. Please try again.",
            type: "error",
          });
          return;
        }

        toast.add({
          title: "Assignment Accepted",
          description: `You accepted ${workOrder.workOrderNumber}.`,
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
    });
  };

  const handleReject = () => {
    const validation = rejectApplicationReasonSchema.safeParse({
      rejectionReason: reason,
    });

    if (!validation.success) {
      setReasonError(
        validation.error.issues[0]?.message ?? "Please provide a reason.",
      );
      return;
    }

    setReasonError(null);

    reject(
      {
        workOrderId: workOrder.id,
        rejectionReason: validation.data.rejectionReason,
      },
      {
        onSuccess: (res) => {
          if (!res?.success) {
            toast.add({
              title: "Action Failed",
              description: "Something went wrong. Please try again.",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "Assignment Declined",
            description: `You declined ${workOrder.workOrderNumber}.`,
            type: "success",
          });
          setOpen(false);
          setReason("");
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

  if (!isAwaitingResponse) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        size="sm"
        onClick={handleAccept}
        disabled={acceptPending || rejectPending}
        className="h-8"
      >
        {acceptPending ? <Spinner /> : null}
        Accept
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        disabled={acceptPending || rejectPending}
        className="h-8"
      >
        Decline
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Decline this assignment?</DialogTitle>
            <DialogDescription>
              {workOrder.workOrderNumber} will be returned to the admin so
              someone else can be assigned.
            </DialogDescription>
          </DialogHeader>

          <Field data-invalid={!!reasonError}>
            <FieldLabel htmlFor="rejection-reason">Reason</FieldLabel>
            <Textarea
              id="rejection-reason"
              rows={3}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (reasonError) {
                  setReasonError(null);
                }
              }}
              placeholder="Tell the admin why you cannot take this job..."
              aria-invalid={!!reasonError}
            />
            {reasonError && (
              <FieldError errors={[{ message: reasonError }]} />
            )}
          </Field>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={rejectPending}
            >
              Keep it
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={rejectPending}
            >
              {rejectPending ? (
                <>
                  <Spinner />
                  Declining...
                </>
              ) : (
                "Decline assignment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
