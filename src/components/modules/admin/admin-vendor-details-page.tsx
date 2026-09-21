"use client";

import { useForm } from "@tanstack/react-form";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { type ReactNode, useState } from "react";
import type z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useDeleteVendor, useGetVendorById, useUpdateVendor } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type { IVendor } from "@/types";
import { updateVendorSchema } from "@/validation";
import VendorStatusBadge from "./vendor-status-badge";

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

function VendorEditForm({
  vendor,
  onSaved,
}: {
  vendor: IVendor;
  onSaved: () => void;
}) {
  const { mutate: updateVendor, isPending: isUpdating } = useUpdateVendor();

  type UpdateVendorDefaultValues = z.infer<typeof updateVendorSchema>;

  const defaultValues: UpdateVendorDefaultValues = {
    name: vendor.name,
    email: vendor.email,
    contactNumber: vendor.contactNumber ?? "",
    description: vendor.description ?? "",
    address: vendor.address ?? "",
    serviceAreas: vendor.serviceAreas ?? "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: updateVendorSchema,
    },
    onSubmit: async ({ value }) => {
      updateVendor(
        {
          vendorId: vendor.id,
          data: {
            name: value.name,
            email: value.email,
            contactNumber: value.contactNumber || undefined,
            description: value.description || undefined,
            address: value.address || undefined,
            serviceAreas: value.serviceAreas || undefined,
          },
        },
        {
          onSuccess: (res) => {
            toast.add({
              title: "Success",
              description: res?.message || "Vendor updated successfully.",
              type: "success",
            });
            onSaved();
          },
          onError: (err) => {
            toast.add({
              title: "Error",
              description: getApiErrorMessage(
                err,
                "An error occurred while updating the vendor.",
              ),
              type: "error",
            });
          },
        },
      );
    },
  });

  const isFieldInvalid = (field: {
    state: { meta: { isTouched: boolean; isValid: boolean } };
  }) => field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <div className="rounded-xl border p-4">
      <p className="font-heading text-sm font-medium">Edit Details</p>
      <form
        className="mt-3"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-3">
          <form.Field name="name">
            {(field) => {
              const isInvalid = isFieldInvalid(field);

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="email">
            {(field) => {
              const isInvalid = isFieldInvalid(field);

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="contactNumber">
            {(field) => {
              const isInvalid = isFieldInvalid(field);

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Contact Number (optional)
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="address">
            {(field) => {
              const isInvalid = isFieldInvalid(field);

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Address (optional)
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="serviceAreas">
            {(field) => {
              const isInvalid = isFieldInvalid(field);

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Service Areas (optional)
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="description">
            {(field) => {
              const isInvalid = isFieldInvalid(field);

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Description (optional)
                  </FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    rows={4}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>

        <div className="mt-4 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onSaved}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => form.handleSubmit()}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <Spinner />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function AdminVendorDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const vendorId = searchParams.get("vendorId") ?? "";

  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { data, isPending, isError, error } = useGetVendorById(vendorId);
  const { mutate: deleteVendor, isPending: isDeleting } = useDeleteVendor();

  const vendor = data?.data;

  const goBack = () => router.push("/admin/vendors");

  const handleDelete = () => {
    deleteVendor(vendorId, {
      onSuccess: (res) => {
        toast.add({
          title: "Success",
          description: res?.message || "Vendor deleted successfully.",
          type: "success",
        });
        router.push("/admin/vendors");
      },
      onError: (err) => {
        toast.add({
          title: "Error",
          description: getApiErrorMessage(
            err,
            "An error occurred while deleting the vendor.",
          ),
          type: "error",
        });
      },
    });
  };

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
            {vendor?.name ?? "Vendor details"}
          </h1>
          <p className="truncate text-sm text-muted-foreground">
            {vendor?.email ?? "Loading..."}
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
            Pick a vendor from the list to view its details.
          </p>
          <Button variant="outline" size="sm" onClick={goBack}>
            Back to Vendors
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
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : isError || !vendor ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border p-8 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-6" />
          </span>
          <h2 className="text-base font-semibold">
            Unable to load vendor details
          </h2>
          <p className="max-w-xs text-sm text-muted-foreground">
            {getApiErrorMessage(
              error,
              "This vendor may no longer exist or you may not have permission to view it.",
            )}
          </p>
          <Button variant="outline" size="sm" onClick={goBack}>
            Back to Vendors
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <Card>
            <CardContent className="flex-1">
              {editing ? (
                <VendorEditForm
                  vendor={vendor}
                  onSaved={() => setEditing(false)}
                />
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center gap-2">
                    <VendorStatusBadge status={vendor.status} />
                    <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      ★ {vendor.rating ? vendor.rating.toFixed(1) : "0.0"} / 5
                    </span>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-4">
                      <Detail label="Vendor ID" value={vendor.id} />
                      <Detail label="Name" value={vendor.name} />
                      <Detail label="Email" value={vendor.email} />
                      <Detail label="Contact Number" value={vendor.contactNumber} />
                    </div>
                    <div className="space-y-4">
                      <Detail label="Address" value={vendor.address} />
                      <Detail label="Service Areas" value={vendor.serviceAreas} />
                      <Detail label="Description" value={vendor.description} />

                      <Separator />

                      <Detail
                        label="Created At"
                        value={new Date(vendor.createdAt).toLocaleString()}
                      />
                      <Detail
                        label="Last Updated"
                        value={new Date(vendor.updatedAt).toLocaleString()}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-lg border bg-card p-4">
                    <div>
                      <p className="font-heading text-sm font-medium">Members</p>
                      <p className="text-xs text-muted-foreground">
                        {vendor._count.members} technician
                        {vendor._count.members === 1 ? "" : "s"} assigned
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(
                          `/admin/vendors/members?vendorId=${vendor.id}`,
                        )
                      }
                    >
                      <Users />
                      Manage Members
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {confirmDelete ? (
            <Card>
              <CardContent>
                <p className="text-sm text-destructive">
                  Are you sure you want to delete this vendor? It will be
                  marked as deleted and can be restored later.
                </p>
                <div className="mt-4 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setConfirmDelete(false)}
                    disabled={isDeleting}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
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
                Back to Vendors
              </Button>
              {!editing && (
                <Button
                  variant="outline"
                  size="lg"
                  className="sm:ml-auto"
                  onClick={() => setEditing(true)}
                >
                  <Pencil />
                  Edit Details
                </Button>
              )}
              <Button
                variant="destructive"
                size="lg"
                onClick={() => setConfirmDelete(true)}
              >
                <Trash2 />
                Delete Vendor
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}