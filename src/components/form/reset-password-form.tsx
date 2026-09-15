"use client";

import { useForm } from "@tanstack/react-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Eye, EyeClosed, KeyRound } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useResendForgotPasswordOtp, useResetPassword } from "@/hooks";
import { forgotPasswordSchema, resetPasswordFormSchema } from "@/validation";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const { mutate: resetPassword, isPending: resetPending } =
    useResetPassword();

  const { mutate: resendOtp, isPending: resendPending } =
    useResendForgotPasswordOtp();

  const email = searchParams.get("email") || "";

  const getRemainingSeconds = (expiresAtValue: string) => {
    if (!expiresAtValue) return 0;
    return Math.max(
      0,
      Math.floor((new Date(expiresAtValue).getTime() - Date.now()) / 1000),
    );
  };

  const [expiresAt, setExpiresAt] = useState(
    searchParams.get("expiresAt") || "",
  );
  const [sessionExpiresAt, setSessionExpiresAt] = useState(
    searchParams.get("sessionExpiresAt") || "",
  );
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const emailValidation = forgotPasswordSchema.safeParse({ email });
    const isSessionExpired =
      !sessionExpiresAt || new Date(sessionExpiresAt).getTime() <= Date.now();

    if (!emailValidation.success || isSessionExpired || !expiresAt) {
      router.replace("/forgot-password");
      return;
    }

    const sessionExpiryTime = new Date(sessionExpiresAt).getTime();
    const timerId = setInterval(() => {
      if (sessionExpiryTime <= Date.now()) {
        router.replace("/forgot-password");
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [email, sessionExpiresAt, expiresAt, router]);

  useEffect(() => {
    if (!expiresAt) {
      return;
    }

    const expiryTime = new Date(expiresAt).getTime();
    let timerId: ReturnType<typeof setInterval> | undefined;

    const updateRemaining = () => {
      const seconds = Math.max(
        0,
        Math.floor((expiryTime - Date.now()) / 1000),
      );
      setRemaining(seconds);
      if (seconds <= 0 && timerId) {
        clearInterval(timerId);
      }
    };

    updateRemaining();
    timerId = setInterval(updateRemaining, 1000);

    return () => clearInterval(timerId);
  }, [expiresAt]);

  const isOtpExpired = Boolean(expiresAt) && remaining <= 0;

  const formatRemainingTime = () => {
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const form = useForm({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validators: {
      onSubmit: resetPasswordFormSchema,
    },
    onSubmit: async ({ value }) => {
      const resetPasswordData = {
        email,
        otp,
        newPassword: value.newPassword,
      };

      resetPassword(resetPasswordData, {
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
            title: "Password Reset Successful",
            description: "Your password has been reset. Please login.",
            type: "success",
          });
          router.push("/login");
        },
        onError: (err) => {
          toast.add({
            title: "Reset Failed",
            description:
              err.message || "Something went wrong. Please try again.",
            type: "error",
          });
        },
      });
    },
  });

  const handleReset = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    form.handleSubmit();
  };

  const handleResendOTP = () => {
    const validation = forgotPasswordSchema.safeParse({ email });

    if (!validation.success) {
      toast.add({
        title: "Resend Failed",
        description: "Please provide a valid email address.",
        type: "error",
      });
      return;
    }

    resendOtp(
      { email },
      {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Resend Failed",
              description: "Something went wrong. Please try again.",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "OTP Sent",
            description: "A new password reset OTP has been sent to your email.",
            type: "success",
          });
          setOtp("");

          if (res?.data?.expiresAt) {
            setExpiresAt(res.data.expiresAt);
            setRemaining(getRemainingSeconds(res.data.expiresAt));
          }

          const newSessionExpiresAt = res?.data?.sessionExpiresIn
            ? new Date(
                Date.now() + res.data.sessionExpiresIn * 1000,
              ).toISOString()
            : sessionExpiresAt;

          if (res?.data?.sessionExpiresIn) {
            setSessionExpiresAt(newSessionExpiresAt);
          }

          const params = new URLSearchParams({
            email,
            expiresAt: res?.data?.expiresAt || expiresAt,
            sessionExpiresAt: newSessionExpiresAt,
          });
          router.replace(`/forgot-password/reset?${params.toString()}`, {
            scroll: false,
          });
        },
        onError: (err) => {
          toast.add({
            title: "Resend Failed",
            description:
              err.message || "Something went wrong. Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  const isEmailValid = forgotPasswordSchema.safeParse({ email }).success;
  const isSessionValid =
    Boolean(sessionExpiresAt) &&
    new Date(sessionExpiresAt).getTime() > Date.now();

  if (!isEmailValid || !isSessionValid || !expiresAt) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-2 items-center text-center">
        <span className="mb-2 grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
          <KeyRound size={22} />
        </span>
        <CardTitle className="text-xl">Reset your password</CardTitle>
        <CardDescription>
          Enter the OTP we sent to your email and choose a new password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="reset-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleReset();
          }}
          className="flex flex-col gap-4"
        >
          <Field className="items-center" data-invalid={isInvalid}>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>
            <InputOTP
              maxLength={6}
              onChange={(value) => {
                setOtp(value);
                if (isInvalid) {
                  setIsInvalid(false);
                }
              }}
              value={otp}
              autoComplete="off"
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup className="flex justify-center items-center w-full">
                <InputOTPSlot index={0} className="size-10 text-base" />
                <InputOTPSlot index={1} className="size-10 text-base" />
                <InputOTPSlot index={2} className="size-10 text-base" />
                <InputOTPSlot index={3} className="size-10 text-base" />
                <InputOTPSlot index={4} className="size-10 text-base" />
                <InputOTPSlot index={5} className="size-10 text-base" />
              </InputOTPGroup>
            </InputOTP>
            {isInvalid && (
              <FieldError
                errors={[{ message: "Invalid OTP. Please try again." }]}
              />
            )}
            {isOtpExpired ? (
              <FieldDescription>
                OTP expired. Please resend a new one.
              </FieldDescription>
            ) : (
              expiresAt && (
                <FieldDescription>
                  OTP expires in {formatRemainingTime()}
                </FieldDescription>
              )
            )}
          </Field>

          <FieldGroup>
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
                        placeholder="Enter your new password"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        autoComplete="off"
                        aria-invalid={isInvalid}
                        className="pr-10 py-4.5 md:py-5"
                      />
                      <button
                        className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                        type="button"
                        aria-label={
                          showNewPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeClosed size={18} />
                        ) : (
                          <Eye size={18} />
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
                        placeholder="Confirm your new password"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        autoComplete="off"
                        aria-invalid={isInvalid}
                        className="pr-10 py-4.5 md:py-5"
                      />
                      <button
                        className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
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
                          <EyeClosed size={18} />
                        ) : (
                          <Eye size={18} />
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
        </form>
      </CardContent>

      <CardFooter className="flex w-full gap-2">
        <Button
          variant="outline"
          className="flex-1 h-10"
          onClick={handleResendOTP}
          disabled={resendPending || resetPending}
        >
          {resendPending ? (
            <>
              <Spinner />
              Resending...
            </>
          ) : (
            "Resend OTP"
          )}
        </Button>
        <Button
          type="submit"
          form="reset-form"
          className="flex-1 h-10"
          disabled={resetPending || isOtpExpired}
        >
          {resetPending ? (
            <>
              <Spinner />
              Resetting password...
            </>
          ) : (
            "Reset password"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}