"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForgotPassword } from "@/hooks";
import { forgotPasswordSchema } from "@/validation";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const { mutate: forgotPassword, isPending: forgotPending } =
    useForgotPassword();

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      const forgotPasswordData = {
        email: value.email,
      };

      forgotPassword(forgotPasswordData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Server Failure",
              description: "Something went wrong. Please try again.",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "OTP Sent",
            description:
              "We've sent a password reset OTP to your email address.",
            type: "success",
          });

          const params = new URLSearchParams({
            email: forgotPasswordData.email,
            expiresAt: res?.data?.expiresAt || "",
            sessionExpiresAt: res?.data?.sessionExpiresIn
              ? new Date(
                  Date.now() + res.data.sessionExpiresIn * 1000,
                ).toISOString()
              : res?.data?.expiresAt || "",
          });
          router.push(`/forgot-password/reset?${params.toString()}`);
        },
        onError: (err) => {
          toast.add({
            title: "Request Failed",
            description:
              err.message || "Something went wrong. Please try again.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/login"
        className="inline-flex w-fit items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to login
      </Link>

      <div className="flex flex-col gap-2 text-center pt-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Forgot your password?
        </h1>
        <p className="max-w-xs mx-auto text-sm text-foreground">
          Enter your email and we&apos;ll send you a code to reset your
          password.
        </p>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="you@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                    className="py-4.5 md:py-5"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Button
            type="submit"
            disabled={forgotPending}
            className="h-9 w-full text-sm font-semibold md:h-10"
          >
            {forgotPending ? (
              <>
                <Spinner />
                Sending reset code...
              </>
            ) : (
              "Send reset code"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}