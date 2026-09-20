"use client";

import { Inbox } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
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
import { useSuspenseGetAllTechnicians } from "@/hooks";
import type { ITechnicianParams } from "@/types";
import TechnicianApprovalTableLoading from "./technician-approval-table-loading";
import TechnicianStatusBadge from "./technician-status-badge";

export interface TechnicianApprovalTableProps extends ITechnicianParams {
  handleReview: Dispatch<SetStateAction<string>>;
  handlePageChange: Dispatch<SetStateAction<number>>;
}

export default function TechnicianApprovalTable({
  handleReview,
  handlePageChange,
  ...params
}: TechnicianApprovalTableProps) {
  const { data, isPending } = useSuspenseGetAllTechnicians(params);

  const technicians = data?.data ?? [];

  if (isPending) {
    return <TechnicianApprovalTableLoading />;
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact No.</TableHead>
              <TableHead>Experience (Years)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {technicians.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-32 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Inbox className="size-8 opacity-50" />
                    <p className="text-sm">No applications found.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              technicians.map((technician, index) => (
                <TableRow key={technician.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    {technician.name}
                  </TableCell>
                  <TableCell>{technician.email}</TableCell>
                  <TableCell>{technician.contactNumber ?? "—"}</TableCell>
                  <TableCell>{technician.experienceYears}</TableCell>
                  <TableCell>
                    <TechnicianStatusBadge status={technician.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    {technician.status === "PENDING" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReview(technician.id)}
                      >
                        Review
                      </Button>
                    ) : (
                      <span className="text-muted-foreground">Reviewed</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div>
        <TablePagination
          page={params.page ?? 0}
          totalPages={data?.meta?.totalPages ?? 0}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
}
