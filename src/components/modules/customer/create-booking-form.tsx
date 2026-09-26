"use client";

import { useForm } from "@tanstack/react-form";
import { CalendarClock, Plus, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";
import type z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import {
  useCreateWorkOrder,
  useGetAllServiceCategories,
} from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type { ICreateWorkOrderPayload, WorkOrderPriority } from "@/types";
import { createWorkOrderSchema } from "@/validation";

const priorities: { value: WorkOrderPriority; label: string }[] = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "URGENT", label: "Urgent" },
];

export default function CreateBookingForm() {
  const router = useRouter();

  const { data: categoriesData, isPending: categoriesPending } =
    useGetAllServiceCategories();
  const { mutate: createWorkOrder, isPending: createPending } =
    useCreateWorkOrder();

  const categories = (categoriesData?.data ?? []).filter(
    (category) => category.isActive,
  );

  type BookingDefaultValues = z.infer<typeof createWorkOrderSchema>;

  const defaultValues: BookingDefaultValues = {
    title: "",
    description: "",
    categoryId: "",
    priority: "MEDIUM",
    scheduledAt: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: createWorkOrderSchema,
    },
    onSubmit: async ({ value }) => {
      const payload: ICreateWorkOrderPayload = {
        title: value.title.trim(),
        categoryId: value.categoryId,
        priority: value.priority,
      };

      if (value.description?.trim()) {
        payload.description = value.description.trim();
      }

      if (value.scheduledAt) {
        payload.scheduledAt = new Date(value.scheduledAt).toISOString();
      }

      createWorkOrder(payload, {
        onSuccess: (res) => {
          if (!res?.success) {
            toast.add({
              title: "Booking Failed",
              description: "Something went wrong. Please try again.",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "Booking Submitted",
            description: `Booking ${res?.data?.workOrderNumber ?? ""} was created. An admin will review it shortly.`,
            type: "success",
          });

          form.reset();
          router.push("/customer");
        },
        onError: (err) => {
          toast.add({
            title: "Booking Failed",
            description: getApiErrorMessage(err),
            type: "error",
          });
        },
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      noValidate
    >
      <FieldGroup className="gap-6 rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
        <form.Field name="title">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>What needs doing?</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  placeholder="Air conditioner not cooling"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                />
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="categoryId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Service category</FieldLabel>
                <div className="relative">
                  <Wrench className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    disabled={categoriesPending}
                    className="h-9 w-full appearance-none rounded-lg border bg-background pl-9 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50"
                  >
                    <option value="">
                      {categoriesPending
                        ? "Loading categories..."
                        : "Select a category"}
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                        {category.basePrice
                          ? ` — ৳${Number(category.basePrice).toLocaleString()}`
                          : ""}
                      </option>
                    ))}
                  </select>
                </div>
                {categories.length === 0 && !categoriesPending && (
                  <FieldDescription>
                    No active service categories are available yet.
                  </FieldDescription>
                )}
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            );
          }}
        </form.Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <form.Field name="priority">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Priority</FieldLabel>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.value as WorkOrderPriority)
                    }
                    aria-invalid={isInvalid}
                    className="h-9 w-full appearance-none rounded-lg border bg-background px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    {priorities.map((priority) => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="scheduledAt">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Preferred time{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>
                  <div className="relative">
                    <CalendarClock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="datetime-local"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className="h-9 pl-9"
                    />
                  </div>
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>
        </div>

        <form.Field name="description">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Details{" "}
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  rows={4}
                  placeholder="Anything the technician should know before arriving..."
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Button
          type="submit"
          disabled={createPending || categoriesPending}
          className="h-10 w-full"
        >
          {createPending ? (
            <>
              <Spinner />
              Submitting booking...
            </>
          ) : (
            <>
              <Plus data-icon="inline-start" />
              Submit booking
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
