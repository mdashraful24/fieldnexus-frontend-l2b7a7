"use client";

import { useForm } from "@tanstack/react-form";
import { FileText, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useCreateServiceReport, useGetServiceReport } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type { IServiceReport, IWorkOrder } from "@/types";
import { serviceReportSchema } from "@/validation";

type ServiceReportFormValues = z.infer<typeof serviceReportSchema>;

type PartRow = { name: string; quantity: string };

export default function TechnicianServiceReportDialog({
  workOrder,
  open,
  onClose,
}: {
  workOrder: IWorkOrder;
  open: boolean;
  onClose: () => void;
}) {
  const { data, isLoading } = useGetServiceReport(open ? workOrder.id : "");

  const existingReport = data?.data;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="overflow-hidden">
        <DialogHeader className="pr-12">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <FileText className="size-5" />
            </span>
            <div className="min-w-0">
              <DialogTitle>Service Report</DialogTitle>
              <DialogDescription>
                {workOrder.workOrderNumber} — document the work you carried out.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <>
            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4">
              {[1, 2, 3, 4].map((row) => (
                <Skeleton key={row} className="h-16 w-full" />
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" size="lg" onClick={onClose}>
                Cancel
              </Button>
            </DialogFooter>
          </>
        ) : existingReport ? (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-2">
              <ExistingReportView report={existingReport} />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={onClose}
              >
                Close
              </Button>
            </DialogFooter>
          </>
        ) : (
          <ServiceReportForm
            key={workOrder.id}
            workOrder={workOrder}
            onSaved={onClose}
            onCancel={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function ExistingReportView({ report }: { report: IServiceReport }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-medium text-muted-foreground">
        A service report has already been submitted for this work order.
      </p>

      <div className="space-y-4">
        <Detail label="Work Description" value={report.workDescription} />
        <Detail label="Issue Found" value={report.issueFound} />
        <Detail label="Solution Provided" value={report.solutionProvided} />
        <Detail label="Hours Worked" value={String(report.hoursWorked)} />
        {report.partsUsed && report.partsUsed.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Parts Used
            </p>
            <ul className="mt-1 space-y-0.5 text-sm">
              {report.partsUsed.map((part, index) => (
                <li key={`${part.name}-${index}`}>
                  {part.name} × {part.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-0.5 break-words text-sm whitespace-pre-wrap">
        {value || "—"}
      </p>
    </div>
  );
}

function ServiceReportForm({
  workOrder,
  onSaved,
  onCancel,
}: {
  workOrder: IWorkOrder;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const { mutate: createServiceReport, isPending: isSubmitting } =
    useCreateServiceReport();

  const [parts, setParts] = useState<PartRow[]>([]);
  const [partsError, setPartsError] = useState<string | null>(null);

  const defaultValues: ServiceReportFormValues = {
    workDescription: "",
    issueFound: "",
    solutionProvided: "",
    hoursWorked: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: serviceReportSchema,
    },
    onSubmit: async ({ value }) => {
      const filledParts = parts.filter((part) => part.name.trim() !== "");
      const invalidPart = filledParts.find(
        (part) =>
          Number.isNaN(Number(part.quantity)) || Number(part.quantity) < 1,
      );

      if (invalidPart) {
        setPartsError("Parts quantity must be at least 1.");
        return;
      }

      setPartsError(null);

      createServiceReport(
        {
          workOrderId: workOrder.id,
          workDescription: value.workDescription,
          ...(value.issueFound ? { issueFound: value.issueFound } : {}),
          ...(value.solutionProvided
            ? { solutionProvided: value.solutionProvided }
            : {}),
          hoursWorked: Number(value.hoursWorked),
          ...(filledParts.length > 0
            ? {
                partsUsed: filledParts.map((part) => ({
                  name: part.name.trim(),
                  quantity: Number(part.quantity),
                })),
              }
            : {}),
        },
        {
          onSuccess: (res) => {
            toast.add({
              title: "Success",
              description:
                res?.message || "Service report submitted successfully.",
              type: "success",
            });
            onSaved();
          },
          onError: (err) => {
            toast.add({
              title: "Error",
              description: getApiErrorMessage(
                err,
                "An error occurred while submitting the service report.",
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

  const addPart = () => {
    setParts((prev) => [...prev, { name: "", quantity: "1" }]);
    setPartsError(null);
  };

  const removePart = (index: number) => {
    setParts((prev) => prev.filter((_, i) => i !== index));
    setPartsError(null);
  };

  const updatePart = (index: number, key: keyof PartRow, value: string) => {
    setParts((prev) =>
      prev.map((part, i) => (i === index ? { ...part, [key]: value } : part)),
    );
    setPartsError(null);
  };

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
          <form.Field name="workDescription">
            {(field) => {
              const isInvalid = isFieldInvalid(field);

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Work Description</FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    rows={3}
                    placeholder="What work did you carry out?"
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

          <form.Field name="issueFound">
            {(field) => {
              const isInvalid = isFieldInvalid(field);

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Issue Found (optional)
                  </FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    rows={2}
                    placeholder="Any issues you discovered"
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

          <form.Field name="solutionProvided">
            {(field) => {
              const isInvalid = isFieldInvalid(field);

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Solution Provided (optional)
                  </FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    rows={2}
                    placeholder="How did you resolve it?"
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

          <form.Field name="hoursWorked">
            {(field) => {
              const isInvalid = isFieldInvalid(field);

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Hours Worked</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min={0}
                    step="0.5"
                    placeholder="e.g. 2.5"
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

          <Field data-invalid={!!partsError}>
            <div className="flex items-center justify-between">
              <FieldLabel className="mb-0">Parts Used (optional)</FieldLabel>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8"
                onClick={addPart}
                disabled={isSubmitting}
              >
                <Plus />
                Add Part
              </Button>
            </div>

            {parts.length > 0 && (
              <div className="flex flex-col gap-2">
                {parts.map((part, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: rows are reordered only by index
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder="Part name"
                      value={part.name}
                      onChange={(e) =>
                        updatePart(index, "name", e.target.value)
                      }
                      disabled={isSubmitting}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      min={1}
                      placeholder="Qty"
                      value={part.quantity}
                      onChange={(e) =>
                        updatePart(index, "quantity", e.target.value)
                      }
                      disabled={isSubmitting}
                      className="w-20"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removePart(index)}
                      disabled={isSubmitting}
                      aria-label="Remove part"
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {partsError && <FieldError errors={[{ message: partsError }]} />}
          </Field>
        </FieldGroup>
      </div>

      <DialogFooter>
        <div className="flex items-center gap-5">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="lg"
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner />
                Submitting...
              </>
            ) : (
              <>
                <FileText />
                Submit Report
              </>
            )}
          </Button>
        </div>
      </DialogFooter>
    </form>
  );
}
