"use client";

import { useForm } from "@tanstack/react-form";
import { Mail } from "lucide-react";
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
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useChangeAdminEmail } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import { changeAdminEmailSchema } from "@/validation";

export default function SuperAdminChangeEmailPopover({
  adminId,
  currentEmail,
  disabled = false,
}: {
  adminId: string;
  currentEmail?: string;
  disabled?: boolean;
}) {
  const { mutate: changeEmail, isPending: isChangingEmail } =
    useChangeAdminEmail();
  const [open, setOpen] = useState(false);

  type ChangeEmailDefaultValues = z.infer<typeof changeAdminEmailSchema>;

  const defaultValues: ChangeEmailDefaultValues = {
    newEmail: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: changeAdminEmailSchema,
    },
    onSubmit: async ({ value }) => {
      changeEmail(
        {
          adminId,
          newEmail: value.newEmail,
        },
        {
          onSuccess: (res) => {
            toast.add({
              title: "Success",
              description: res?.message || "Admin email changed successfully.",
              type: "success",
            });
            form.reset();
            setOpen(false);
          },
          onError: (err) => {
            toast.add({
              title: "Error",
              description: getApiErrorMessage(
                err,
                "An error occurred while changing the admin email.",
              ),
              type: "error",
            });
          },
        },
      );
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      form.reset();
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger render={<Button variant="outline" size="sm" disabled={disabled} />}>
        <Mail />
        Save New Email
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80">
        <PopoverTitle>Change Email</PopoverTitle>
        <PopoverDescription>
          Update the email address for this admin.
        </PopoverDescription>

        <form
          className="mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="gap-3">
            <Field>
              <FieldLabel htmlFor={`current-email-${adminId}`}>
                Current Email
              </FieldLabel>
              <p
                id={`current-email-${adminId}`}
                className="break-all rounded-lg border border-border bg-muted/40 px-2.5 py-1.5 text-sm text-foreground"
              >
                {currentEmail ?? ""}
              </p>
            </Field>

            <form.Field name="newEmail">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>New Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="new@fieldnexus.com"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
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
              onClick={() => setOpen(false)}
              disabled={isChangingEmail}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={isChangingEmail}
              onClick={() => form.handleSubmit()}
            >
              {isChangingEmail ? (
                <>
                  <Spinner />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}