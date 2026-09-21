"use client";

import { useForm } from "@tanstack/react-form";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  ChevronDown,
  Search,
  UserMinus,
  UserPlus,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import {
  useAddVendorMember,
  useGetAllTechnicians,
  useGetVendorById,
  useGetVendorMembers,
  useRemoveVendorMember,
  useRestoreVendorMember,
} from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type { IVendorMember, ITechnicianApplication } from "@/types";
import { addVendorMemberSchema } from "@/validation";

function AddVendorMemberForm({
  vendorId,
  memberTechnicianIds,
}: {
  vendorId: string;
  memberTechnicianIds: Set<string>;
}) {
  const { mutate: addMember, isPending: isAdding } = useAddVendorMember();
  const { data: techniciansData, isPending: isTechniciansPending } =
    useGetAllTechnicians({ status: "APPROVED", limit: 100 });

  const [pickerOpen, setPickerOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selected, setSelected] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);

  const applications = techniciansData?.data ?? [];

  const available: ITechnicianApplication[] = applications.filter(
    (application) =>
      application.technicianId &&
      !memberTechnicianIds.has(application.technicianId),
  );

  const filtered = available.filter((application) => {
    const technician = application.technician;
    const name = (technician?.name ?? application.name ?? "").toLowerCase();
    const email = (technician?.email ?? application.email ?? "").toLowerCase();
    const query = searchInput.toLowerCase();
    return name.includes(query) || email.includes(query);
  });

  const form = useForm({
    defaultValues: { technicianId: "" },
    validators: {
      onSubmit: addVendorMemberSchema,
    },
    onSubmit: async ({ value }) => {
      if (!value.technicianId) {
        return;
      }

      addMember(
        { vendorId, technicianId: value.technicianId },
        {
          onSuccess: (res) => {
            toast.add({
              title: "Success",
              description:
                res?.message || "Technician added to vendor successfully.",
              type: "success",
            });
            form.reset();
            setSelected(null);
            setPickerOpen(false);
            setSearchInput("");
          },
          onError: (err) => {
            toast.add({
              title: "Error",
              description: getApiErrorMessage(
                err,
                "An error occurred while adding the technician.",
              ),
              type: "error",
            });
          },
        },
      );
    },
  });

  const handlePickerOpenChange = (nextOpen: boolean) => {
    setPickerOpen(nextOpen);
    if (!nextOpen) {
      setSearchInput("");
    }
  };

  const handleSelect = (application: ITechnicianApplication) => {
    const technicianId = application.technicianId;
    if (!technicianId) {
      return;
    }

    form.setFieldValue("technicianId", technicianId);
    setSelected({
      id: technicianId,
      name: application.technician?.name ?? application.name,
      email: application.technician?.email ?? application.email,
    });
    setSearchInput("");
    setPickerOpen(false);
  };

  return (
    <div className="rounded-xl border p-4">
      <p className="font-heading text-sm font-medium">Add Technician</p>
      <form
        className="mt-3"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-3">
          <form.Field name="technicianId">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel>Technician</FieldLabel>
                  <Popover
                    open={pickerOpen}
                    onOpenChange={handlePickerOpenChange}
                  >
                    <PopoverTrigger
                      render={
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          className="w-full justify-between font-normal"
                        >
                          {selected ? (
                            <span className="min-w-0">
                              <span className="block truncate text-foreground">
                                {selected.name}
                              </span>
                              <span className="block truncate text-xs font-normal text-muted-foreground">
                                {selected.email}
                              </span>
                            </span>
                          ) : (
                            <span className="text-muted-foreground">
                              Select a technician
                            </span>
                          )}
                          <ChevronDown className="size-4 shrink-0 opacity-50" />
                        </Button>
                      }
                    />
                    <PopoverContent align="start" className="w-80">
                      <PopoverTitle>Select a technician</PopoverTitle>
                      <PopoverDescription>
                        Approved technicians not yet assigned to this vendor.
                      </PopoverDescription>

                      <div className="relative mt-3">
                        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search by name or email"
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                          className="h-9 pr-3 pl-9 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:hidden"
                        />
                      </div>

                      <div className="mt-2 max-h-56 overflow-y-auto">
                        {isTechniciansPending ? (
                          <div className="space-y-2 p-2">
                            <Skeleton className="h-9 w-full" />
                            <Skeleton className="h-9 w-full" />
                          </div>
                        ) : filtered.length === 0 ? (
                          <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                            {available.length === 0
                              ? "No available technicians."
                              : "No matching technicians."}
                          </p>
                        ) : (
                          filtered.map((application) => {
                            const name =
                              application.technician?.name ?? application.name;
                            const email =
                              application.technician?.email ?? application.email;

                            return (
                              <button
                                key={application.id}
                                type="button"
                                onClick={() => handleSelect(application)}
                                className="flex w-full flex-col items-start gap-0.5 rounded-md px-2 py-2 text-left transition-colors hover:bg-muted"
                              >
                                <span className="text-sm font-medium text-foreground">
                                  {name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {email}
                                </span>
                              </button>
                            );
                          })
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>

        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            size="sm"
            onClick={() => form.handleSubmit()}
            disabled={isAdding || !selected}
          >
            {isAdding ? (
              <>
                <Spinner />
                Adding...
              </>
            ) : (
              <>
                <UserPlus />
                Add Member
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

function MemberRow({
  member,
  vendorId,
}: {
  member: IVendorMember;
  vendorId: string;
}) {
  const { mutate: removeMember, isPending: isRemoving } =
    useRemoveVendorMember();
  const { mutate: restoreMember, isPending: isRestoring } =
    useRestoreVendorMember();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const technician = member.technician;
  const name = technician?.name ?? "Unknown technician";
  const email = technician?.email ?? "—";

  const handleRestore = () => {
    restoreMember(
      { vendorId, technicianId: member.technicianId },
      {
        onSuccess: (res) => {
          toast.add({
            title: "Success",
            description:
              res?.message || "Technician restored to vendor successfully.",
            type: "success",
          });
        },
        onError: (err) => {
          toast.add({
            title: "Error",
            description: getApiErrorMessage(
              err,
              "An error occurred while restoring the technician.",
            ),
            type: "error",
          });
        },
      },
    );
  };

  const handleRemove = () => {
    removeMember(
      { vendorId, technicianId: member.technicianId },
      {
        onSuccess: () => {
          toast.add({
            title: "Success",
            description: "Technician removed from vendor successfully.",
            type: "success",
          });
          setConfirmOpen(false);
        },
        onError: (err) => {
          toast.add({
            title: "Error",
            description: getApiErrorMessage(
              err,
              "An error occurred while removing the technician.",
            ),
            type: "error",
          });
        },
      },
    );
  };

  const initials = name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border bg-card p-3">
      <div className="flex min-w-0 items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
          {initials || "T"}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{name}</p>
          <p className="truncate text-xs text-muted-foreground">{email}</p>
          {technician?.skills && technician.skills.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {technician.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
              {technician.skills.length > 3 && (
                <span className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                  +{technician.skills.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {member.isActive ? (
        <Popover open={confirmOpen} onOpenChange={setConfirmOpen}>
          <PopoverTrigger
            render={
              <Button variant="outline" size="sm">
                <UserMinus />
                Remove
              </Button>
            }
          />
          <PopoverContent align="end" className="w-80">
            <PopoverTitle>Remove {name}?</PopoverTitle>
            <PopoverDescription>
              The technician will be removed from this vendor. They can be
              added back later.
            </PopoverDescription>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setConfirmOpen(false)}
                disabled={isRemoving}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                disabled={isRemoving}
              >
                {isRemoving ? (
                  <>
                    <Spinner />
                    Removing...
                  </>
                ) : (
                  "Confirm Remove"
                )}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={handleRestore}
          disabled={isRestoring}
        >
          {isRestoring ? (
            <>
              <Spinner />
              Restoring...
            </>
          ) : (
            "Restore"
          )}
        </Button>
      )}
    </div>
  );
}

export default function AdminVendorMembersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const vendorId = searchParams.get("vendorId") ?? "";

  const { data: vendorData } = useGetVendorById(vendorId);
  const { data, isPending, isError, error } = useGetVendorMembers(vendorId);

  const vendorName = vendorData?.data?.name ?? "Vendor members";
  const members = data?.data ?? [];
  const memberTechnicianIds = new Set(members.map((member) => member.technicianId));

  const goBack = () => router.push("/admin/vendors");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          title="Back to vendors"
          onClick={goBack}
        >
          <ArrowLeft className="size-4" />
        </Button>
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Building2 className="size-5" />
        </span>
        <div className="min-w-0">
          <h1 className="truncate font-heading text-2xl font-semibold tracking-tight">
            Vendor Members
          </h1>
          <p className="truncate text-sm text-muted-foreground">
            {vendorName}
          </p>
        </div>
      </div>

      {!vendorId ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border p-8 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-6" />
          </span>
          <h2 className="text-base font-semibold">No vendor selected</h2>
          <p className="max-w-xs text-sm text-muted-foreground">
            Pick a vendor from the list to manage its members.
          </p>
          <Button variant="outline" size="sm" onClick={goBack}>
            Back to Vendors
          </Button>
        </div>
      ) : isPending ? (
        <div className="space-y-3">
          <Skeleton className="h-28 w-full rounded-xl" />
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border p-8 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-6" />
          </span>
          <h2 className="text-base font-semibold">Unable to load members</h2>
          <p className="max-w-xs text-sm text-muted-foreground">
            {getApiErrorMessage(
              error,
              "Vendor not found or you may not have permission to view its members.",
            )}
          </p>
          <Button variant="outline" size="sm" onClick={goBack}>
            Back to Vendors
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
          <div>
            <AddVendorMemberForm
              vendorId={vendorId}
              memberTechnicianIds={memberTechnicianIds}
            />
          </div>

          <div>
            <Separator className="mb-4 lg:hidden" />

            <p className="font-heading text-sm font-medium">
              Members ({members.length})
            </p>
            {members.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">
                No technicians assigned to this vendor yet.
              </p>
            ) : (
              <div className="mt-3 space-y-2">
                {members.map((member) => (
                  <MemberRow
                    key={member.id}
                    member={member}
                    vendorId={vendorId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}