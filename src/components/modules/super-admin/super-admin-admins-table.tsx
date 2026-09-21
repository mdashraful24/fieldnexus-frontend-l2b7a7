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
import { useGetMe, useSuspenseGetAllAdmins } from "@/hooks";
import type { ISuperAdmin, ISuperAdminParams } from "@/types";
import UserRoleBadge from "../admin/user-role-badge";
import UserStatusBadge from "../admin/user-status-badge";
import SuperAdminChangeEmailPopover from "./super-admin-change-email-popover";
import SuperAdminResetPasswordPopover from "./super-admin-reset-password-popover";

export interface SuperAdminAdminsTableProps extends ISuperAdminParams {
  handleView: Dispatch<SetStateAction<string>>;
  handlePageChange: Dispatch<SetStateAction<number>>;
}

function canManageAdmin(
  admin: Pick<ISuperAdmin, "id" | "role">,
  currentUser?: { id?: string } | null,
) {
  return admin.role !== "SUPER_ADMIN" || admin.id === currentUser?.id;
}

export default function SuperAdminAdminsTable({
  handleView,
  handlePageChange,
  ...params
}: SuperAdminAdminsTableProps) {
  const { data } = useSuspenseGetAllAdmins(params);
  const { data: meData } = useGetMe();

  const admins = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 0;
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const currentUser = meData?.data;

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
              <TableHead className="w-8">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined At</TableHead>
              <TableHead>Change Email</TableHead>
              <TableHead>Reset Password</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-32 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Inbox className="size-8 opacity-50" />
                    <p className="text-sm">No admins found.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              admins.map((admin, index) => (
                <TableRow key={admin.id}>
                  <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                  <TableCell className="font-medium">{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <UserRoleBadge role={admin.role} />
                  </TableCell>
                  <TableCell>
                    <UserStatusBadge status={admin.status} />
                  </TableCell>
                  <TableCell>
                    {new Date(admin.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {canManageAdmin(admin, currentUser) ? (
                      <SuperAdminChangeEmailPopover
                        adminId={admin.id}
                        currentEmail={admin.email}
                      />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {canManageAdmin(admin, currentUser) ? (
                      <SuperAdminResetPasswordPopover adminId={admin.id} />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(admin.id)}
                    >
                      <Eye />
                      View
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