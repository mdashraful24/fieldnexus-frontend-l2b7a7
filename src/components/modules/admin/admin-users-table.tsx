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
import { useSuspenseGetAllUsers } from "@/hooks";
import type { IAdminUsersParams } from "@/types";
import UserRoleBadge from "./user-role-badge";
import UserStatusBadge from "./user-status-badge";

export interface AdminUsersTableProps extends IAdminUsersParams {
  handleView: Dispatch<SetStateAction<string>>;
  handlePageChange: Dispatch<SetStateAction<number>>;
}

export default function AdminUsersTable({
  handleView,
  handlePageChange,
  ...params
}: AdminUsersTableProps) {
  const { data } = useSuspenseGetAllUsers(params);

  const users = data?.data ?? [];
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
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-32 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Inbox className="size-8 opacity-50" />
                    <p className="text-sm">No users found.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <UserRoleBadge role={user.role} />
                  </TableCell>
                  <TableCell>
                    <UserStatusBadge status={user.status} />
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(user.id)}
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
