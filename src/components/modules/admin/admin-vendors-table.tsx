"use client";

import { Building2, Eye, Inbox, RotateCcw, Users } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
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
import { useRestoreVendor, useSuspenseGetAllVendors } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type { IVendor, IVendorParams, VendorListFilter } from "@/types";
import VendorStatusBadge from "./vendor-status-badge";

export interface AdminVendorsTableProps extends IVendorParams {
  listFilter: VendorListFilter;
  handlePerformance: (id: string) => void;
  handleDetails: (id: string) => void;
  handleMembers: (vendor: IVendor) => void;
  handlePageChange: Dispatch<SetStateAction<number>>;
}

function RestoreVendorPopover({ vendor }: { vendor: IVendor }) {
  const { mutate: restoreVendor, isPending: isRestoring } = useRestoreVendor();
  const [open, setOpen] = useState(false);

  const handleRestore = () => {
    restoreVendor(vendor.id, {
      onSuccess: (res) => {
        toast.add({
          title: "Success",
          description: res?.message || "Vendor restored successfully.",
          type: "success",
        });
        setOpen(false);
      },
      onError: (err) => {
        toast.add({
          title: "Error",
          description: getApiErrorMessage(
            err,
            "An error occurred while restoring the vendor.",
          ),
          type: "error",
        });
      },
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<Button variant="outline" size="icon" title="Restore" />}
      >
        <RotateCcw className="size-4" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <PopoverTitle>Restore {vendor.name}?</PopoverTitle>
        <PopoverDescription>
          The vendor will be brought back and appear in the active list.
        </PopoverDescription>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(false)}
            disabled={isRestoring}
          >
            Cancel
          </Button>
          <Button size="sm" onClick={handleRestore} disabled={isRestoring}>
            {isRestoring ? (
              <>
                <Spinner />
                Restoring...
              </>
            ) : (
              "Restore Vendor"
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function AdminVendorsTable({
  listFilter,
  handlePerformance,
  handleDetails,
  handleMembers,
  handlePageChange,
  ...params
}: AdminVendorsTableProps) {
  const { data } = useSuspenseGetAllVendors(params);

  const vendors = data?.data ?? [];
  const displayedVendors =
    listFilter === "DELETED"
      ? vendors.filter((vendor) => vendor.isDeleted)
      : vendors;
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
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Service Areas</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedVendors.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-32 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Inbox className="size-8 opacity-50" />
                    <p className="text-sm">No vendors found.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              displayedVendors.map((vendor, index) => (
                <TableRow key={vendor.id} data-deleted={vendor.isDeleted}>
                  <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                  <TableCell className="max-w-48">
                    <p className="truncate font-medium">{vendor.name}</p>
                    {vendor.description ? (
                      <p className="truncate text-xs text-muted-foreground">
                        {vendor.description}
                      </p>
                    ) : null}
                  </TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.contactNumber ?? "—"}</TableCell>
                  <TableCell className="max-w-40 truncate">
                    {vendor.serviceAreas ?? "—"}
                  </TableCell>
                  <TableCell>
                    {vendor.rating ? `${vendor.rating.toFixed(1)} / 5` : "—"}
                  </TableCell>
                  <TableCell>
                    <VendorStatusBadge status={vendor.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {vendor.isDeleted ? (
                        <RestoreVendorPopover vendor={vendor} />
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            title="Performance"
                            onClick={() => handlePerformance(vendor.id)}
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            title="Details"
                            onClick={() => handleDetails(vendor.id)}
                          >
                            <Building2 className="size-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            title="Members"
                            onClick={() => handleMembers(vendor)}
                          >
                            <Users className="size-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
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