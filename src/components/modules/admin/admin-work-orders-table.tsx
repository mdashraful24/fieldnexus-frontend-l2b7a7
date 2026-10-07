"use client";

import { Check, Eye, RefreshCw, Trash2, UserPlus } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import WorkOrderPriorityBadge from "@/components/modules/work-order/work-order-priority-badge";
import WorkOrderStatusBadge from "@/components/modules/work-order/work-order-status-badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/ui/table-pagination";
import { toast } from "@/components/ui/toast";
import {
  useDeleteWorkOrder,
  useSuspenseGetAllWorkOrders,
  useUpdateWorkOrderStatus,
} from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import { getAdminStatusActions } from "@/lib/work-order";
import type { IWorkOrder, IWorkOrderParams } from "@/types";

function ApproveWorkOrderButton({ workOrder }: { workOrder: IWorkOrder }) {
  const { mutate: updateStatus, isPending } = useUpdateWorkOrderStatus();

  const handleApprove = () => {
    updateStatus(
      {
        workOrderId: workOrder.id,
        status: "APPROVED",
        version: workOrder.version,
      },
      {
        onSuccess: (res) => {
          toast.add({
            title: "Success",
            description:
              res?.message || `${workOrder.workOrderNumber} approved.`,
            type: "success",
          });
        },
        onError: (err) => {
          toast.add({
            title: "Error",
            description: getApiErrorMessage(
              err,
              "An error occurred while approving the work order.",
            ),
            type: "error",
          });
        },
      },
    );
  };

  return (
    <Button
      variant="outline"
      size="icon"
      title="Approve"
      onClick={handleApprove}
      disabled={isPending}
    >
      {isPending ? (
        <Spinner className="size-4" />
      ) : (
        <Check className="size-4" />
      )}
    </Button>
  );
}

function DeleteWorkOrderPopover({ workOrder }: { workOrder: IWorkOrder }) {
  const { mutate: deleteWorkOrder, isPending: isDeleting } =
    useDeleteWorkOrder();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    deleteWorkOrder(workOrder.id, {
      onSuccess: (res) => {
        toast.add({
          title: "Success",
          description: res?.message || "Work order deleted successfully.",
          type: "success",
        });
        setOpen(false);
      },
      onError: (err) => {
        toast.add({
          title: "Error",
          description: getApiErrorMessage(
            err,
            "An error occurred while deleting the work order.",
          ),
          type: "error",
        });
      },
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<Button variant="outline" size="icon" title="Delete" />}
      >
        <Trash2 className="size-4 text-destructive" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <PopoverTitle>Delete {workOrder.workOrderNumber}?</PopoverTitle>
        <PopoverDescription>
          The work order will be removed from the list. This cannot be undone.
        </PopoverDescription>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Spinner />
                Deleting...
              </>
            ) : (
              "Delete Work Order"
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export interface AdminWorkOrdersTableProps extends IWorkOrderParams {
  handleDetails: (id: string) => void;
  handleAssign: (workOrder: IWorkOrder) => void;
  handleStatus: (workOrder: IWorkOrder) => void;
  handlePageChange: Dispatch<SetStateAction<number>>;
}

export default function AdminWorkOrdersTable({
  handleDetails,
  handleAssign,
  handleStatus,
  handlePageChange,
  ...params
}: AdminWorkOrdersTableProps) {
  const { data } = useSuspenseGetAllWorkOrders(params);

  const workOrders = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 0;
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;

  useEffect(() => {
    if (page > 1 && (totalPages === 0 || page > totalPages)) {
      handlePageChange(totalPages > 0 ? totalPages : 1);
    }
  }, [totalPages, page, handlePageChange]);

  return (
    <>
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Work Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workOrders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-32 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm">No work orders found.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              workOrders.map((workOrder, index) => {
                const statusActions = getAdminStatusActions(workOrder.status);
                const canAssign =
                  workOrder.status === "APPROVED" ||
                  workOrder.status === "ASSIGNED";

                return (
                  <TableRow key={workOrder.id}>
                    <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                    <TableCell className="max-w-56">
                      <p className="truncate font-medium">
                        {workOrder.workOrderNumber}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {workOrder.title}
                      </p>
                    </TableCell>
                    <TableCell className="max-w-40 truncate">
                      {workOrder.customer?.name ?? "—"}
                    </TableCell>
                    <TableCell className="max-w-40 truncate">
                      {workOrder.category?.name ?? "—"}
                    </TableCell>
                    <TableCell>
                      <WorkOrderPriorityBadge priority={workOrder.priority} />
                    </TableCell>
                    <TableCell>
                      <WorkOrderStatusBadge status={workOrder.status} />
                    </TableCell>
                    <TableCell>
                      {new Date(workOrder.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {workOrder.status === "PENDING" && (
                          <ApproveWorkOrderButton workOrder={workOrder} />
                        )}
                        {canAssign && (
                          <Button
                            variant="outline"
                            size="icon"
                            title="Assign"
                            onClick={() => handleAssign(workOrder)}
                          >
                            <UserPlus className="size-4" />
                          </Button>
                        )}
                        {statusActions.length > 0 && (
                          <Button
                            variant="outline"
                            size="icon"
                            title="Update status"
                            onClick={() => handleStatus(workOrder)}
                          >
                            <RefreshCw className="size-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="icon"
                          title="Details"
                          onClick={() => handleDetails(workOrder.id)}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <DeleteWorkOrderPopover workOrder={workOrder} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div>
        <TablePagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
}
