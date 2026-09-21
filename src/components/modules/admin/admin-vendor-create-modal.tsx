"use client";

import { useForm } from "@tanstack/react-form";
import { Building2, Plus } from "lucide-react";
import type z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useCreateVendor } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import { createVendorSchema } from "@/validation";

export default function AdminVendorCreateModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { mutate: createVendor, isPending: isCreating } = useCreateVendor();

  type CreateVendorDefaultValues = z.infer<typeof createVendorSchema>;

  const defaultValues: CreateVendorDefaultValues = {
    name: "",
    email: "",
    contactNumber: "",
    description: "",
    address: "",
    serviceAreas: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: createVendorSchema,
    },
    onSubmit: async ({ value }) => {
      createVendor(
        {
          name: value.name,
          email: value.email,
          contactNumber: value.contactNumber || undefined,
          description: value.description || undefined,
          address: value.address || undefined,
          serviceAreas: value.serviceAreas || undefined,
        },
        {
          onSuccess: (res) => {
            toast.add({
              title: "Success",
              description: res?.message || "Vendor created successfully.",
              type: "success",
            });
            form.reset();
            onClose();
          },
          onError: (err) => {
            toast.add({
              title: "Error",
              description: getApiErrorMessage(
                err,
                "An error occurred while creating the vendor.",
              ),
              type: "error",
            });
          },
        },
      );
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      form.reset();
      onClose();
    }
  };

  const isFieldInvalid = (field: {
    state: { meta: { isTouched: boolean; isValid: boolean } };
  }) => field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="overflow-hidden">
        <DialogHeader className="shrink-0 pr-12">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="size-5" />
            </span>
            <div className="min-w-0">
              <DialogTitle>Create Vendor</DialogTitle>
              <DialogDescription>
                Add a new vendor to the platform.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-2">
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
                        placeholder="e.g. Acme Field Services"
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
                        placeholder="vendor@fieldnexus.com"
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
                        placeholder="01XXXXXXXXX"
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
                        placeholder="Street, city, area"
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
                        placeholder="e.g. Dhaka, Chattogram"
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
                        placeholder="A short description of the vendor"
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
          </div>

          <DialogFooter>
            <div className="flex items-center gap-5">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={onClose}
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button
                size="lg"
                className="flex-1"
                onClick={() => form.handleSubmit()}
                disabled={isCreating}
              >
                {isCreating ? (
                  <>
                    <Plus />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus />
                    Create Vendor
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}