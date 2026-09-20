"use client";

import { Eye, Inbox } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/ui/table-pagination";
import { useSuspenseGetAllVendors } from "@/hooks";
import type { IVendorParams } from "@/types";
import VendorStatusBadge from "./vendor-status-badge";

export interface AdminVendorsTableProps extends IVendorParams {
  handleView: Dispatch<SetStateAction<string>>;
  handlePageChange: Dispatch<SetStateAction<number>>;
}

export default function AdminVendorsTable({
  handleView,
  handlePageChange,
  ...params
}: AdminVendorsTableProps) {
  const { data } = useSuspenseGetAllVendors(params);

  const vendors = data?.data ?? [];
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
            {vendors.length === 0 ? (
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
              vendors.map((vendor, index) => (
                <TableRow key={vendor.id}>
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(vendor.id)}
                    >
                      <Eye />
                      Performance
                    </Button>
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
