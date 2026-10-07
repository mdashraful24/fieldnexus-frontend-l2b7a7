"use client";

import { useForm } from "@tanstack/react-form";
import { MessageSquareHeart, Star } from "lucide-react";
import { useState } from "react";
import type z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useCreateFeedback, useGetFeedback } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type { IWorkOrder } from "@/types";
import { feedbackSchema } from "@/validation";

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

function RatingPicker({
  value,
  onChange,
  disabled,
  error,
}: {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  error?: boolean;
}) {
  return (
    <div className="flex items-center gap-1" aria-invalid={error}>
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          aria-label={`Rate ${rating} star${rating === 1 ? "" : "s"}`}
          disabled={disabled}
          onClick={() => onChange(rating)}
          className="rounded-md p-1 transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Star
            className={
              rating <= value
                ? "size-6 fill-amber-400 text-amber-400"
                : "size-6 text-muted-foreground"
            }
          />
        </button>
      ))}
    </div>
  );
}

function FeedbackForm({
  booking,
  onSaved,
}: {
  booking: IWorkOrder;
  onSaved: () => void;
}) {
  const { mutate: createFeedback, isPending: isSubmitting } =
    useCreateFeedback();

  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState<string | null>(null);

  const defaultValues: FeedbackFormValues = {
    comment: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: feedbackSchema,
    },
    onSubmit: async ({ value }) => {
      if (rating < 1 || rating > 5) {
        setRatingError("Please select a rating.");
        return;
      }

      setRatingError(null);

      createFeedback(
        {
          workOrderId: booking.id,
          rating,
          ...(value.comment ? { comment: value.comment } : {}),
        },
        {
          onSuccess: (res) => {
            toast.add({
              title: "Success",
              description: res?.message || "Feedback submitted successfully.",
              type: "success",
            });
            onSaved();
          },
          onError: (err) => {
            toast.add({
              title: "Error",
              description: getApiErrorMessage(
                err,
                "An error occurred while submitting your feedback.",
              ),
              type: "error",
            });
          },
        },
      );
    },
  });

  const isFieldInvalid = (field: {
    state: { meta: { isTouched: boolean; isValid: boolean } };
  }) => field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <form
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-2">
        <FieldGroup className="gap-4">
          <Field data-invalid={!!ratingError}>
            <FieldLabel>Rating</FieldLabel>
            <RatingPicker
              value={rating}
              onChange={(value) => {
                setRating(value);
                if (ratingError) setRatingError(null);
              }}
              disabled={isSubmitting}
              error={!!ratingError}
            />
            {ratingError && <FieldError errors={[{ message: ratingError }]} />}
          </Field>

          <form.Field name="comment">
            {(field) => {
              const isInvalid = isFieldInvalid(field);

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Comment (optional)
                  </FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    rows={4}
                    placeholder="How was the service?"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
      </div>

      <DialogFooter>
        <div className="flex items-center gap-5">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            type="button"
            onClick={onSaved}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            size="lg"
            className="flex-1"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner />
                Submitting...
              </>
            ) : (
              <>
                <MessageSquareHeart />
                Submit Feedback
              </>
            )}
          </Button>
        </div>
      </DialogFooter>
    </form>
  );
}

export default function CustomerFeedbackDialog({
  booking,
  open,
  onClose,
}: {
  booking: IWorkOrder;
  open: boolean;
  onClose: () => void;
}) {
  const { data, isLoading } = useGetFeedback(open ? booking.id : "");
  const feedback = data?.data;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="overflow-hidden">
        <DialogHeader className="pr-12">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <MessageSquareHeart className="size-5" />
            </span>
            <div className="min-w-0">
              <DialogTitle>Leave Feedback</DialogTitle>
              <DialogDescription>
                {booking.workOrderNumber} — tell us how this job went.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <>
            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4">
              {[1, 2, 3].map((row) => (
                <Skeleton key={row} className="h-16 w-full" />
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" size="lg" onClick={onClose}>
                Cancel
              </Button>
            </DialogFooter>
          </>
        ) : feedback ? (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-2">
              <div className="flex flex-col gap-4">
                <p className="text-xs font-medium text-muted-foreground">
                  You have already submitted feedback for this work order.
                </p>
                <div className="flex items-center gap-2">
                  <RatingPicker
                    value={feedback.rating}
                    onChange={() => {}}
                    disabled
                  />
                  <span className="text-sm text-muted-foreground">
                    {feedback.rating} / 5
                  </span>
                </div>
                {feedback.comment && (
                  <p className="text-sm whitespace-pre-wrap">
                    {feedback.comment}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={onClose}
              >
                Close
              </Button>
            </DialogFooter>
          </>
        ) : (
          <FeedbackForm booking={booking} onSaved={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}
