"use client";

import { AlertTriangle, ArrowLeft, RotateCcw, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useGetUserById, useRestoreUser, useUpdateUserStatus } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type { UserStatus } from "@/types";
import UserRoleBadge from "./user-role-badge";
import UserStatusBadge from "./user-status-badge";

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
      {initials || "U"}
    </span>
  );
}

export default function AdminUserDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") ?? "";

  const [confirmDelete, setConfirmDelete] = useState(false);

  const { data, isPending, isError, error } = useGetUserById(userId);
  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateUserStatus();
  const { mutate: restoreUser, isPending: isRestoring } = useRestoreUser();

  const user = data?.data;

  const goBack = () => router.push("/admin/users");

  const handleStatusChange = (status: UserStatus) => {
    updateStatus(
      { userId, status },
      {
        onSuccess: (res) => {
          toast.add({
            title: "Success",
            description: res?.message || "User status updated successfully.",
            type: "success",
          });
          if (status === "DELETED") {
            router.push("/admin/users");
          }
        },
        onError: (err) => {
          toast.add({
            title: "Error",
            description: getApiErrorMessage(
              err,
              "An error occurred while updating the user status.",
            ),
            type: "error",
          });
        },
      },
    );
  };

  const handleRestore = () => {
    restoreUser(
      { userId },
      {
        onSuccess: (res) => {
          toast.add({
            title: "Success",
            description: res?.message || "User restored successfully.",
            type: "success",
          });
        },
        onError: (err) => {
          toast.add({
            title: "Error",
            description: getApiErrorMessage(
              err,
              "An error occurred while restoring the user.",
            ),
            type: "error",
          });
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          title="Back to users"
          onClick={goBack}
        >
          <ArrowLeft className="size-4" />
        </Button>
        <Avatar name={user?.name ?? ""} imageUrl={user?.imageUrl ?? undefined} />
        <div className="min-w-0">
          <h1 className="truncate font-heading text-2xl font-semibold tracking-tight">
            {user?.name ?? "User details"}
          </h1>
          <p className="truncate text-sm text-muted-foreground">
            {user?.email ?? "Loading..."}
          </p>
        </div>
      </div>

      {!userId ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border p-8 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-6" />
          </span>
          <h2 className="text-base font-semibold">No user selected</h2>
          <p className="max-w-xs text-sm text-muted-foreground">
            Pick a user from the list to view its details.
          </p>
          <Button variant="outline" size="sm" onClick={goBack}>
            Back to Users
          </Button>
        </div>
      ) : isPending ? (
        <Card>
          <CardContent>
            <div className="space-y-5 py-2">
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
          </CardContent>
        </Card>
      ) : isError || !user ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border p-8 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-6" />
          </span>
          <h2 className="text-base font-semibold">Unable to load user details</h2>
          <p className="max-w-xs text-sm text-muted-foreground">
            {getApiErrorMessage(
              error,
              "This user may no longer exist or you may not have permission to view it.",
            )}
          </p>
          <Button variant="outline" size="sm" onClick={goBack}>
            Back to Users
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <Card>
            <CardContent className="flex-1">
              <div className="flex gap-2">
                <UserRoleBadge role={user.role} />
                <UserStatusBadge status={user.status} />
              </div>

              <Separator className="my-4" />

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                  <Detail label="User ID" value={user.id} />
                  <Detail label="Name" value={user.name} />
                  <Detail label="Email" value={user.email} />
                </div>
                <div className="space-y-4">
                  <Detail
                    label="Auth Provider"
                    value={user.authProvider.toLowerCase()}
                  />
                  <Detail
                    label="Email Verified"
                    value={user.emailVerified ? "Yes" : "No"}
                  />
                  <Detail
                    label="Needs Password Change"
                    value={user.needPasswordChange ? "Yes" : "No"}
                  />
                  <Detail
                    label="Joined At"
                    value={new Date(user.createdAt).toLocaleString()}
                  />
                  <Detail
                    label="Last Updated"
                    value={new Date(user.updatedAt).toLocaleString()}
                  />
                </div>
              </div>

              {user.customer && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <p className="font-heading text-sm font-medium">
                      Customer Profile
                    </p>
                    <div className="mt-3 grid gap-6 sm:grid-cols-2">
                      <Detail
                        label="Contact Number"
                        value={user.customer.contactNumber}
                      />
                      <Detail label="Address" value={user.customer.address} />
                    </div>
                  </div>
                </>
              )}

              {user.technician && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <p className="font-heading text-sm font-medium">
                      Technician Profile
                    </p>
                    <div className="mt-3 grid gap-6 sm:grid-cols-2">
                      <Detail
                        label="Contact Number"
                        value={user.technician.contactNumber}
                      />
                      <Detail label="Address" value={user.technician.address} />
                      <Detail
                        label="Qualifications"
                        value={user.technician.qualifications}
                      />
                      <Detail
                        label="Experience"
                        value={`${user.technician.experienceYears} year${
                          user.technician.experienceYears === 1 ? "" : "s"
                        }`}
                      />
                      <Detail label="Bio" value={user.technician.bio} />
                    </div>
                    {user.technician.skills.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-medium text-muted-foreground">
                          Skills
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {user.technician.skills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {user.status === "DELETED" ? (
            <Card>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This account has been deleted. Restore it to bring the user
                  back.
                </p>
                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" size="lg" onClick={goBack}>
                    Back to Users
                  </Button>
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleRestore}
                    disabled={isRestoring}
                  >
                    {isRestoring ? (
                      <>
                        <Spinner />
                        Restoring...
                      </>
                    ) : (
                      <>
                        <RotateCcw />
                        Restore User
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : confirmDelete ? (
            <Card>
              <CardContent>
                <p className="text-sm text-destructive">
                  Are you sure you want to delete this account? The user will
                  be marked as deleted and can be restored later.
                </p>
                <div className="mt-4 flex justify-end gap-2">
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
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" size="lg" onClick={goBack}>
                Back to Users
              </Button>
              {user.status === "ACTIVE" ? (
                <Button
                  variant="destructive"
                  size="lg"
                  className="sm:ml-auto"
                  onClick={() => handleStatusChange("BLOCKED")}
                  disabled={isUpdatingStatus}
                >
                  {isUpdatingStatus ? (
                    <>
                      <Spinner />
                      Blocking...
                    </>
                  ) : (
                    "Block User"
                  )}
                </Button>
              ) : user.status === "BLOCKED" ? (
                <Button
                  variant="default"
                  size="lg"
                  className="sm:ml-auto"
                  onClick={() => handleStatusChange("ACTIVE")}
                  disabled={isUpdatingStatus}
                >
                  {isUpdatingStatus ? (
                    <>
                      <Spinner />
                      Unblocking...
                    </>
                  ) : (
                    "Unblock User"
                  )}
                </Button>
              ) : null}
              <Button
                variant="outline"
                size="lg"
                className="text-destructive hover:text-destructive"
                onClick={() => setConfirmDelete(true)}
                disabled={isUpdatingStatus}
              >
                <Trash2 />
                Delete User
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}