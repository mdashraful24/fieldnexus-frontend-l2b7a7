"use client";

import { AlertTriangle } from "lucide-react";
import Image from "next/image";
import { type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import {
  useGetAdminById,
  useRestoreAdmin,
  useUpdateAdminStatus,
} from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type { UserStatus } from "@/types";
import UserRoleBadge from "../admin/user-role-badge";
import UserStatusBadge from "../admin/user-status-badge";

function Detail({
  label,
  value,
  children,
}: {
  label: string;
  value?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-0.5 break-words text-sm whitespace-pre-wrap">
        {children ?? value ?? "—"}
      </p>
    </div>
  );
}

function Avatar({ name, imageUrl }: { name: string; imageUrl?: string }) {
  if (imageUrl) {
    return (
      <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-muted">
        <Image
          src={imageUrl}
          alt={name}
          width={44}
          height={44}
          unoptimized
          className="size-full object-cover"
        />
      </span>
    );
  }

  const initials = name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
      {initials || "A"}
    </span>
  );
}

export default function SuperAdminAdminDetailSheet({
  selectedId,
  onClose,
  onAdminDeleted,
}: {
  selectedId: string;
  onClose: () => void;
  onAdminDeleted?: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { data, isPending, isError, error } = useGetAdminById(selectedId);
  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateAdminStatus();
  const { mutate: restoreAdmin, isPending: isRestoring } = useRestoreAdmin();

  const admin = data?.data;

  const isSuperAdminRow = admin?.role === "SUPER_ADMIN";

  const handleClose = () => {
    setConfirmDelete(false);
    onClose();
  };

  const handleStatusChange = (status: UserStatus) => {
    updateStatus(
      { adminId: selectedId, status },
      {
        onSuccess: (res) => {
          toast.add({
            title: "Success",
            description: res?.message || "Admin status updated successfully.",
            type: "success",
          });
          handleClose();
          if (status === "DELETED") {
            onAdminDeleted?.();
          }
        },
        onError: (err) => {
          toast.add({
            title: "Error",
            description: getApiErrorMessage(
              err,
              "An error occurred while updating the admin status.",
            ),
            type: "error",
          });
        },
      },
    );
  };

  const handleRestore = () => {
    restoreAdmin(selectedId, {
      onSuccess: (res) => {
        toast.add({
          title: "Success",
          description: res?.message || "Admin restored successfully.",
          type: "success",
        });
        handleClose();
      },
      onError: (err) => {
        toast.add({
          title: "Error",
          description: getApiErrorMessage(
            err,
            "An error occurred while restoring the admin.",
          ),
          type: "error",
        });
      },
    });
  };

  return (
    <Sheet open={!!selectedId} onOpenChange={handleClose}>
      <SheetContent className="overflow-hidden">
        <SheetHeader className="shrink-0 pr-12">
          <div className="flex items-center gap-3">
            <Avatar
              name={admin?.name ?? ""}
              imageUrl={admin?.imageUrl ?? undefined}
            />
            <div className="min-w-0">
              <SheetTitle className="flex flex-wrap items-center gap-2 break-all">
                {admin?.name ?? "Admin details"}
              </SheetTitle>
              <SheetDescription className="break-all">
                {admin?.email ?? "Loading..."}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {isPending ? (
          <div className="space-y-5 px-4 py-2">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        ) : isError || !admin ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border p-8 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="size-6" />
            </span>
            <h2 className="text-base font-semibold">
              Unable to load admin details
            </h2>
            <p className="max-w-xs text-sm text-muted-foreground">
              {getApiErrorMessage(
                error,
                "This admin may no longer exist or you may not have permission to view it.",
              )}
            </p>
            <Button variant="outline" size="sm" onClick={handleClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <div
              key={selectedId}
              className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4"
            >
              <div className="flex gap-2">
                <UserRoleBadge role={admin.role} />
                <UserStatusBadge status={admin.status} />
              </div>

              <div className="space-y-4">
                <Detail label="Admin ID" value={admin.id} />
                <Detail label="Name" value={admin.name} />
                <Detail label="Email" value={admin.email} />

                <Separator />

                <Detail
                  label="Contact Number"
                  value={admin.admin?.contactNumber ?? "—"}
                />
                <Detail
                  label="Email Verified"
                  value={admin.emailVerified ? "Yes" : "No"}
                />
                <Detail
                  label="Needs Password Change"
                  value={admin.needPasswordChange ? "Yes" : "No"}
                />
                <Detail
                  label="Joined At"
                  value={new Date(admin.createdAt).toLocaleString()}
                />
                <Detail
                  label="Last Updated"
                  value={new Date(admin.updatedAt).toLocaleString()}
                />
              </div>

              <Separator />
            </div>

            <SheetFooter className="shrink-0">
              {admin.status === "DELETED" ? (
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-muted-foreground">
                    This admin account has been deleted. Restore it to bring it
                    back.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                    {isSuperAdminRow ? (
                      <Button
                        size="lg"
                        className="flex-1"
                        onClick={handleClose}
                      >
                        OK
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        size="lg"
                        className="flex-1"
                        onClick={handleRestore}
                        disabled={isRestoring}
                      >
                        {isRestoring ? (
                          <>
                            <Spinner />
                            Restoring...
                          </>
                        ) : (
                          "Restore Admin"
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              ) : confirmDelete ? (
                <div className="flex w-full flex-col gap-4">
                  <p className="text-sm text-destructive">
                    Are you sure you want to delete this admin? The account will
                    be marked as deleted and can be restored later.
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setConfirmDelete(false)}
                      disabled={isUpdatingStatus}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      size="lg"
                      onClick={() => handleStatusChange("DELETED")}
                      disabled={isUpdatingStatus}
                    >
                      {isUpdatingStatus ? (
                        <>
                          <Spinner />
                          Deleting...
                        </>
                      ) : (
                        "Confirm Delete"
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                    {!isSuperAdminRow &&
                      (admin.status === "ACTIVE" ? (
                        <Button
                          variant="outline"
                          size="lg"
                          className="flex-1 text-destructive hover:text-destructive"
                          onClick={() => handleStatusChange("BLOCKED")}
                          disabled={isUpdatingStatus}
                        >
                          {isUpdatingStatus ? (
                            <>
                              <Spinner />
                              Blocking...
                            </>
                          ) : (
                            "Block Admin"
                          )}
                        </Button>
                      ) : admin.status === "BLOCKED" ? (
                        <Button
                          variant="default"
                          size="lg"
                          className="flex-1"
                          onClick={() => handleStatusChange("ACTIVE")}
                          disabled={isUpdatingStatus}
                        >
                          {isUpdatingStatus ? (
                            <>
                              <Spinner />
                              Unblocking...
                            </>
                          ) : (
                            "Unblock Admin"
                          )}
                        </Button>
                      ) : null)}
                  </div>
                  {!isSuperAdminRow && (
                    <Button
                      variant="destructive"
                      size="lg"
                      onClick={() => setConfirmDelete(true)}
                      disabled={isUpdatingStatus}
                    >
                      Delete Admin
                    </Button>
                  )}
                </div>
              )}
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}