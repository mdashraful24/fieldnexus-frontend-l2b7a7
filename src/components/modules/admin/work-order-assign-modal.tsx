"use client";

import { UserPlus } from "lucide-react";
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
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import {
  useAssignWorkOrder,
  useGetAllVendors,
  useGetVendorMembers,
} from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type { IWorkOrder } from "@/types";

const selectClassName =
  "h-9 w-full appearance-none rounded-lg border bg-background px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50";

export default function WorkOrderAssignModal({
  workOrder,
  onClose,
}: {
  workOrder: IWorkOrder | null;
  onClose: () => void;
}) {
  const [vendorId, setVendorId] = useState("");
  const [technicianId, setTechnicianId] = useState("");

  const { data: vendorsData, isPending: vendorsPending } = useGetAllVendors({
    limit: 100,
  });
  const { data: membersData, isPending: membersPending } =
    useGetVendorMembers(vendorId);
  const { mutate: assignWorkOrder, isPending: isAssigning } =
    useAssignWorkOrder();

  const vendors = vendorsData?.data ?? [];
  const members = membersData?.data ?? [];

  useEffect(() => {
    if (!workOrder) {
      setVendorId("");
      setTechnicianId("");
    }
  }, [workOrder]);

  const handleVendorChange = (value: string) => {
    setVendorId(value);
    setTechnicianId("");
  };

  const handleAssign = () => {
    if (!workOrder || !vendorId || !technicianId) return;

    assignWorkOrder(
      {
        workOrderId: workOrder.id,
        vendorId,
        technicianId,
      },
      {
        onSuccess: (res) => {
          toast.add({
            title: "Success",
            description:
              res?.message ||
              `${workOrder.workOrderNumber} assigned successfully.`,
            type: "success",
          });
          onClose();
        },
        onError: (err) => {
          toast.add({
            title: "Error",
            description: getApiErrorMessage(
              err,
              "An error occurred while assigning the work order.",
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

  return (
    <Dialog open={!!workOrder} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader className="pr-12">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <UserPlus className="size-5" />
            </span>
            <div className="min-w-0">
              <DialogTitle>Assign Work Order</DialogTitle>
              <DialogDescription>
                {workOrder
                  ? `${workOrder.workOrderNumber} — pick a vendor and one of their technicians.`
                  : "Pick a vendor and one of their technicians."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pb-2">
          <div className="space-y-2">
            <label
              htmlFor="assign-vendor"
              className="text-sm font-medium leading-none"
            >
              Vendor
            </label>
            <select
              id="assign-vendor"
              value={vendorId}
              onChange={(e) => handleVendorChange(e.target.value)}
              disabled={vendorsPending || isAssigning}
              className={selectClassName}
            >
              <option value="">
                {vendorsPending ? "Loading vendors..." : "Select a vendor"}
              </option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="assign-technician"
              className="text-sm font-medium leading-none"
            >
              Technician
            </label>
            <select
              id="assign-technician"
              value={technicianId}
              onChange={(e) => setTechnicianId(e.target.value)}
              disabled={!vendorId || membersPending || isAssigning}
              className={selectClassName}
            >
              <option value="">
                {!vendorId
                  ? "Select a vendor first"
                  : membersPending
                    ? "Loading technicians..."
                    : "Select a technician"}
              </option>
              {members
                .filter((member) => member.technician && !member.isDeleted)
                .map((member) => (
                  <option key={member.id} value={member.technicianId}>
                    {member.technician?.name}
                    {member.technician?.email
                      ? ` — ${member.technician.email}`
                      : ""}
                  </option>
                ))}
            </select>
            {vendorId && !membersPending && members.length === 0 && (
              <p className="text-xs text-muted-foreground">
                This vendor has no active technicians yet.
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <div className="flex items-center gap-5">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={onClose}
              disabled={isAssigning}
            >
              Cancel
            </Button>
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAssign}
              disabled={!vendorId || !technicianId || isAssigning}
            >
              {isAssigning ? (
                <>
                  <Spinner />
                  Assigning...
                </>
              ) : (
                <>
                  <UserPlus />
                  Assign
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
