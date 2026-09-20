"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/apiError";

export default function AdminPageError({
  error,
  reset,
  message,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border p-8 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-6" />
      </span>
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <p className="max-w-md text-sm text-muted-foreground">
        {getApiErrorMessage(error, message)}
      </p>
      <Button variant="outline" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
