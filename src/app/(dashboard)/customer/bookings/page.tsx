import { Info, ListChecks } from "lucide-react";

export default function CustomerBookingsPage() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ListChecks className="size-5" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              My Bookings
            </h1>
            <p className="text-sm text-muted-foreground">
              Every service request you have submitted.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed p-8">
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <ListChecks className="size-5" />
          </span>
          <div className="flex flex-col gap-1">
            <p className="font-medium">Booking history is not available yet</p>
            <p className="max-w-prose text-sm text-muted-foreground">
              The backend does not expose a customer-scoped list of work
              orders. <code className="font-mono text-xs">GET /work-orders</code>{" "}
              is restricted to admins and returns every booking on the platform,
              so it cannot be used here without leaking other customers&apos;
              data. This page will list your bookings once a customer-scoped
              endpoint exists.
            </p>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            <span>
              In the meantime you can submit new bookings and review your
              payment history.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
