"use client";

import { Search } from "lucide-react";
import { type FormEvent, useState } from "react";
import TechnicianStatusBadge from "@/components/modules/technician-approval/technician-status-badge";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useGetTechnicianApplicationStatus } from "@/hooks";

const statusMessages: Record<string, string> = {
  PENDING:
    "Your application is in review. We will get back to you once our team has verified your profile.",
  APPROVED:
    "Your application has been approved and your technician account has been created. You can sign in now.",
  REJECTED:
    "Your application was not approved. See the reason below, and you are welcome to apply again.",
};

export default function TechnicianApplicationStatusForm() {
  const [emailInput, setEmailInput] = useState("");
  const [checkedEmail, setCheckedEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const { data, isPending, isError, isFetching } =
    useGetTechnicianApplicationStatus(checkedEmail);

  const result = data?.data;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailInput.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError(null);
    setCheckedEmail(email);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Check Application Status
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter the email you applied with to see where your technician
          application stands.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field data-invalid={!!emailError}>
          <FieldLabel htmlFor="application-email">Email address</FieldLabel>
          <Input
            id="application-email"
            type="email"
            placeholder="you@example.com"
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.target.value);
              if (emailError) setEmailError(null);
            }}
            aria-invalid={!!emailError}
          />
          {emailError && <FieldError errors={[{ message: emailError }]} />}
        </Field>

        <Button type="submit" size="lg" disabled={isFetching}>
          {isFetching ? <Spinner /> : <Search />}
          Check Status
        </Button>
      </form>

      {checkedEmail && (
        <div className="rounded-xl border p-5">
          {isPending ? (
            <div className="flex flex-col gap-3">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : isError ? (
            <div className="flex flex-col gap-1.5">
              <p className="text-sm font-medium text-destructive">
                No application found
              </p>
              <p className="text-sm text-muted-foreground">
                We could not find an application submitted with{" "}
                <span className="font-medium text-foreground">
                  {checkedEmail}
                </span>
                . Please check the email address and try again.
              </p>
            </div>
          ) : result ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium">Application Status</p>
                <TechnicianStatusBadge status={result.status} />
              </div>

              <p className="text-sm text-muted-foreground">
                {statusMessages[result.status] ??
                  "Your application is being processed."}
              </p>

              {result.status === "REJECTED" && result.rejectionReason && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                  <p className="text-xs font-medium text-destructive">Reason</p>
                  <p className="mt-1 text-sm">{result.rejectionReason}</p>
                </div>
              )}

              <dl className="grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">
                    Applied On
                  </dt>
                  <dd className="mt-0.5">
                    {new Date(result.createdAt).toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">
                    Last Updated
                  </dt>
                  <dd className="mt-0.5">
                    {new Date(result.updatedAt).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
