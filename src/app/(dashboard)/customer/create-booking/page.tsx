import { CalendarPlus } from "lucide-react";
import CreateBookingForm from "@/components/modules/customer/create-booking-form";

export default function CustomerCreateBookingPage() {
  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CalendarPlus className="size-5" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Book a Service
            </h1>
            <p className="text-sm text-muted-foreground">
              Tell us what you need and an admin will assign a technician.
            </p>
          </div>
        </div>

        <CreateBookingForm />
      </div>
    </div>
  );
}
