"use client";

import { useForm } from "@tanstack/react-form";
import { Eye, EyeClosed, KeyRound } from "lucide-react";
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
import { useResetAdminPassword } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import { resetAdminPasswordSchema } from "@/validation";

export default function SuperAdminResetPasswordPopover({
  adminId,
  disabled = false,
}: {
  adminId: string;
  disabled?: boolean;
}) {
  const { mutate: resetPassword, isPending: isResettingPassword } =
    useResetAdminPassword();
  const [open, setOpen] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  type ResetPasswordDefaultValues = z.infer<
    typeof resetAdminPasswordSchema
  >;

  const defaultValues: ResetPasswordDefaultValues = {
    newPassword: "",
    confirmNewPassword: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: resetAdminPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      resetPassword(
        {
          adminId,
          newPassword: value.newPassword,
        },
        {
          onSuccess: (res) => {
            toast.add({
              title: "Success",
              description: res?.message || "Admin password reset successfully.",
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
                "An error occurred while resetting the admin password.",
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
        <KeyRound />
        Reset Password
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80">
        <PopoverTitle>Reset Password</PopoverTitle>
        <PopoverDescription>
          Force this admin to use a new password.
        </PopoverDescription>

        <form
          className="mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="gap-3">
            <form.Field name="newPassword">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type={showNewPassword ? "text" : "password"}
                        placeholder="New password"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        autoComplete="off"
                        aria-invalid={isInvalid}
                        className="pr-10"
                      />
                      <button
                        className="absolute top-1/2 right-1 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
                        type="button"
                        aria-label={
                          showNewPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeClosed size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="confirmNewPassword">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm New Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type={showConfirmNewPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        autoComplete="off"
                        aria-invalid={isInvalid}
                        className="pr-10"
                      />
                      <button
                        className="absolute top-1/2 right-1 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
                        type="button"
                        aria-label={
                          showConfirmNewPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        onClick={() =>
                          setShowConfirmNewPassword(!showConfirmNewPassword)
                        }
                      >
                        {showConfirmNewPassword ? (
                          <EyeClosed size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
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
              disabled={isResettingPassword}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={isResettingPassword}
              onClick={() => form.handleSubmit()}
            >
              {isResettingPassword ? (
                <>
                  <Spinner />
                  Resetting...
                </>
              ) : (
                "Reset"
              )}
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}