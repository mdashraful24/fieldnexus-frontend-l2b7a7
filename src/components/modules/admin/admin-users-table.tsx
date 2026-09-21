"use client";

import { Eye, Inbox } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  handleView: (id: string) => void;
  handlePageChange: Dispatch<SetStateAction<number>>;
  selectedIds: Set<string>;
  handleToggleRow: (id: string) => void;
  handleToggleAll: (ids: string[]) => void;
}

export default function AdminUsersTable({
  handleView,
  handlePageChange,
  selectedIds,
  handleToggleRow,
  handleToggleAll,
  ...params
}: AdminUsersTableProps) {
  const { data } = useSuspenseGetAllUsers(params);

  const users = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 0;
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;

  const selectableUsers = users.filter((user) => user.status !== "DELETED");
  const anySelectable = selectableUsers.length > 0;
  const allOnPage =
    anySelectable && selectableUsers.every((user) => selectedIds.has(user.id));
  const someOnPage =
    selectableUsers.some((user) => selectedIds.has(user.id)) && !allOnPage;

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
              <TableHead className="w-8">
                <Checkbox
                  checked={allOnPage}
                  indeterminate={someOnPage}
                  disabled={!anySelectable}
                  onCheckedChange={() =>
                    handleToggleAll(selectableUsers.map((user) => user.id))
                  }
                  aria-label="Select all visible users"
                />
              </TableHead>
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
                  colSpan={8}
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
                <TableRow
                  key={user.id}
                  data-selected={selectedIds.has(user.id)}
                  className="data-[selected=true]:bg-muted/60"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(user.id)}
                      disabled={user.status === "DELETED"}
                      onCheckedChange={() => handleToggleRow(user.id)}
                      aria-label={`Select ${user.name}`}
                    />
                  </TableCell>
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
