"use client";

import { CreditCard, MessageSquareHeart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useInitiatePayment } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type { IWorkOrder } from "@/types";
import CustomerFeedbackDialog from "./customer-feedback-dialog";

export default function CustomerBookingActions({
  booking,
  showPay,
}: {
  booking: IWorkOrder;
  showPay: boolean;
}) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const { mutate: initiatePayment, isPending: isPaying } = useInitiatePayment();

  const handlePay = () => {
    initiatePayment(
      { workOrderId: booking.id },
      {
        onSuccess: (res) => {
          const paymentUrl = res?.data?.paymentUrl;

          if (!paymentUrl) {
            toast.add({
              title: "Error",
              description: "No payment URL was returned. Please try again.",
              type: "error",
            });
            return;
          }

          window.location.href = paymentUrl;
        },
        onError: (err) => {
          toast.add({
            title: "Error",
            description: getApiErrorMessage(
              err,
              "An error occurred while initiating the payment.",
            ),
            type: "error",
          });
        },
      },
    );
  };

  if (booking.status !== "COMPLETED") {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {showPay && (
        <Button
          size="sm"
          className="h-8"
          onClick={handlePay}
          disabled={isPaying}
        >
          {isPaying ? <Spinner /> : <CreditCard />}
          Pay Now
        </Button>
      )}

      <Button
        size="sm"
        variant="outline"
        className="h-8"
        onClick={() => setFeedbackOpen(true)}
        disabled={isPaying}
      >
        <MessageSquareHeart />
        Feedback
      </Button>

      <CustomerFeedbackDialog
        booking={booking}
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
      />
    </div>
  );
}
