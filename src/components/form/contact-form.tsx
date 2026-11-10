"use client";

import { useForm } from "@tanstack/react-form";
import { Send } from "lucide-react";
import Link from "next/link";
import { useCreateContactMessage } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import { contactFormSchema } from "@/validation";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/toast";

const inputClass = "py-4.5 md:py-5";
const textareaClass = "min-h-32 py-4 md:py-5";

export default function ContactForm() {
  const { mutate: sendMessage, isPending } = useCreateContactMessage();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validators: {
      onSubmit: contactFormSchema,
    },
    onSubmit: async ({ value }) => {
      sendMessage(value, {
        onSuccess: (res) => {
          toast.add({
            title: "Message Sent",
            description:
              res?.message ||
              "Thanks for reaching out. Our team will get back to you within one business day.",
            type: "success",
          });

          form.reset();
        },
        onError: (err) => {
          toast.add({
            title: "Send Failed",
            description: getApiErrorMessage(
              err,
              "Your message could not be sent. Please try again.",
            ),
            type: "error",
          });
        },
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Your name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="name"
                    aria-invalid={isInvalid}
                    className={inputClass}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

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
                    autoComplete="email"
                    aria-invalid={isInvalid}
                    className={inputClass}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>

        <form.Field name="subject">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Subject</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="How can we help?"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  aria-invalid={isInvalid}
                  className={inputClass}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="message">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  placeholder="Tell us more about your inquiry..."
                  rows={8}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                  className={textareaClass}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-64 text-xs leading-relaxed text-muted-foreground">
            By sending a message you agree to our{" "}
            <Link
              href="/terms"
              className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <Button
            type="submit"
            disabled={isPending}
            className="h-10 w-full text-sm font-semibold sm:w-auto"
          >
            {isPending ? (
              <>
                <Spinner />
                Sending message...
              </>
            ) : (
              <>
                <Send className="size-4" />
                Send message
              </>
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
