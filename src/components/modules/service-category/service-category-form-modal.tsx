"use client";

import { useForm } from "@tanstack/react-form";
import { Pencil, Plus, Tags } from "lucide-react";
import { useState } from "react";
import type z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useCreateServiceCategory, useUpdateServiceCategory } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type { IServiceCategory } from "@/types";
import {
  createServiceCategorySchema,
  updateServiceCategorySchema,
} from "@/validation";

type CategoryFormValues = z.infer<typeof createServiceCategorySchema>;

function ServiceCategoryForm({
  category,
  onSaved,
}: {
  category: IServiceCategory | null;
  onSaved: () => void;
}) {
  const isEditing = category !== null;
  const { mutate: createServiceCategory, isPending: isCreating } =
    useCreateServiceCategory();
  const { mutate: updateServiceCategory, isPending: isUpdating } =
    useUpdateServiceCategory();

  const isSaving = isCreating || isUpdating;

  const [isActive, setIsActive] = useState(category?.isActive ?? true);

  const defaultValues: CategoryFormValues = {
    name: category?.name ?? "",
    description: category?.description ?? "",
    basePrice:
      category?.basePrice === null || category?.basePrice === undefined
        ? ""
        : String(category.basePrice),
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: isEditing
        ? updateServiceCategorySchema
        : createServiceCategorySchema,
    },
    onSubmit: async ({ value }) => {
      const data = {
        name: value.name,
        ...(value.description ? { description: value.description } : {}),
        ...(value.basePrice ? { basePrice: Number(value.basePrice) } : {}),
      };

      if (isEditing && category) {
        updateServiceCategory(
          {
            serviceCategoryId: category.id,
            data: { ...data, isActive },
          },
          {
            onSuccess: (res) => {
              toast.add({
                title: "Success",
                description:
                  res?.message || "Service category updated successfully.",
                type: "success",
              });
              onSaved();
            },
            onError: (err) => {
              toast.add({
                title: "Error",
                description: getApiErrorMessage(
                  err,
                  "An error occurred while updating the service category.",
                ),
                type: "error",
              });
            },
          },
        );
        return;
      }

      createServiceCategory(data, {
        onSuccess: (res) => {
          toast.add({
            title: "Success",
            description:
              res?.message || "Service category created successfully.",
            type: "success",
          });
          onSaved();
        },
        onError: (err) => {
          toast.add({
            title: "Error",
            description: getApiErrorMessage(
              err,
              "An error occurred while creating the service category.",
            ),
            type: "error",
          });
        },
      });
    },
  });

  const isFieldInvalid = (field: {
    state: { meta: { isTouched: boolean; isValid: boolean } };
  }) => field.state.meta.isTouched && !field.state.meta.isValid;

  return (
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
                    placeholder="e.g. Internet Installation"
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

          <form.Field name="basePrice">
            {(field) => {
              const isInvalid = isFieldInvalid(field);

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Base Price (optional)
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min={0}
                    placeholder="e.g. 1500"
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
                    placeholder="A short description of the service category"
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

          {isEditing && (
            <Field>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isActive"
                  checked={isActive}
                  onCheckedChange={(checked) => setIsActive(checked === true)}
                />
                <FieldLabel htmlFor="isActive" className="mb-0">
                  Active
                </FieldLabel>
              </div>
              <p className="text-xs text-muted-foreground">
                Inactive categories are hidden from booking forms.
              </p>
            </Field>
          )}
        </FieldGroup>
      </div>

      <DialogFooter>
        <div className="flex items-center gap-5">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={onSaved}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            size="lg"
            className="flex-1"
            onClick={() => form.handleSubmit()}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Spinner />
                Saving...
              </>
            ) : isEditing ? (
              <>
                <Pencil />
                Save Changes
              </>
            ) : (
              <>
                <Plus />
                Create Category
              </>
            )}
          </Button>
        </div>
      </DialogFooter>
    </form>
  );
}

export default function ServiceCategoryFormModal({
  open,
  category,
  onClose,
}: {
  open: boolean;
  category: IServiceCategory | null;
  onClose: () => void;
}) {
  const isEditing = category !== null;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="overflow-hidden">
        <DialogHeader className="shrink-0 pr-12">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Tags className="size-5" />
            </span>
            <div className="min-w-0">
              <DialogTitle>
                {isEditing
                  ? "Edit Service Category"
                  : "Create Service Category"}
              </DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Update the details of this service category."
                  : "Add a new service category to the platform."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ServiceCategoryForm
          key={category?.id ?? "new"}
          category={category}
          onSaved={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
