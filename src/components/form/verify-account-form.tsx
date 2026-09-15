"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useResendRegistrationOtp, useVerifyAccount } from "@/hooks";
import { resendRegistrationOtpSchema } from "@/validation";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

export default function VerifyAccountForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const { mutate: verifyAccount, isPending: verifyPending } =
    useVerifyAccount();

  const { mutate: resendOtp, isPending: resendPending } =
    useResendRegistrationOtp();

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
  const [remaining, setRemaining] = useState(0);
  const [mounted, setMounted] = useState(false);

  const [sessionExpiresAt, setSessionExpiresAt] = useState(
    searchParams.get("sessionExpiresAt") || "",
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const emailValidation = resendRegistrationOtpSchema.safeParse({ email });
    const isSessionExpired =
      !sessionExpiresAt || new Date(sessionExpiresAt).getTime() <= Date.now();

    if (!emailValidation.success || isSessionExpired || !expiresAt) {
      router.replace("/register");
      return;
    }

    const sessionExpiryTime = new Date(sessionExpiresAt).getTime();
    const timerId = setInterval(() => {
      if (sessionExpiryTime <= Date.now()) {
        router.replace("/register");
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
      const seconds = Math.max(0, Math.floor((expiryTime - Date.now()) / 1000));
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

  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const verifyData = {
      email,
      otp,
    };

    verifyAccount(verifyData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Verification Failed",
            description: "Something went wrong. Please try again.",
            type: "error",
          });
          return;
        }

        toast.add({
          title: "Verification Successful",
          description: "Your account has been verified successfully.",
          type: "success",
        });
        router.push("/");
      },
      onError: (err) => {
        toast.add({
          title: "Verification Failed",
          description: err.message || "Something went wrong. Please try again.",
          type: "error",
        });
      },
    });
  };

  const handleResendOTP = () => {
    const validation = resendRegistrationOtpSchema.safeParse({ email });

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
            description: "A new verification OTP has been sent to your email.",
            type: "success",
          });
          setOtp("");

          const newExpiresAt = res?.data?.expiresAt || expiresAt;
          const newSessionExpiresAt = res?.data?.sessionExpiresIn
            ? new Date(Date.now() + res.data.sessionExpiresIn * 1000).toISOString()
            : sessionExpiresAt;

          if (res?.data?.expiresAt) {
            setExpiresAt(res.data.expiresAt);
            setRemaining(getRemainingSeconds(res.data.expiresAt));
          }

          if (res?.data?.sessionExpiresIn) {
            setSessionExpiresAt(newSessionExpiresAt);
          }

          const params = new URLSearchParams({
            email,
            expiresAt: newExpiresAt,
            sessionExpiresAt: newSessionExpiresAt,
          });
          router.replace(`/register/verify-account?${params.toString()}`, {
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

  const isEmailValid = resendRegistrationOtpSchema.safeParse({ email }).success;
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
          <Mail size={22} />
        </span>
        <CardTitle className="text-xl">Verify your account</CardTitle>
        <CardDescription>
          Please provide the OTP we sent to your email address.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOTP();
          }}
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
            {mounted &&
              (isOtpExpired ? (
                <FieldDescription>
                  OTP expired. Please resend a new one.
                </FieldDescription>
              ) : (
                expiresAt && (
                  <FieldDescription>
                    OTP expires in {formatRemainingTime()}
                  </FieldDescription>
                )
              ))}
          </Field>
        </form>
      </CardContent>

      <CardFooter className="flex w-full gap-2">
        <Button
          variant="outline"
          className="flex-1 h-10"
          onClick={handleResendOTP}
          disabled={resendPending}
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
          form="otp-form"
          className="flex-1 h-10"
          disabled={verifyPending || isOtpExpired}
        >
          {verifyPending ? (
            <>
              <Spinner />
              Verifying account...
            </>
          ) : (
            "Verify account"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
