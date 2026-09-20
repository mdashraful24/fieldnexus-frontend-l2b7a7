"use client";

import { useForm } from "@tanstack/react-form";
import {
  ArrowRight,
  Briefcase,
  FileText,
  FileUp,
  GraduationCap,
  HardHat,
  Mail,
  MapPin,
  Phone,
  User,
  Wrench,
  X,
} from "lucide-react";
import Link from "next/link";
import type z from "zod";
import { useApplyTechnician } from "@/hooks/technician.hook";
import { getApiErrorMessage } from "@/lib/apiError";
import type {
  ITechnicianApplicationData,
  ITechnicianApplicationPayload,
} from "@/types";
import { formatFileSize } from "@/utils";
import {
  isAcceptedFileSize,
  isAcceptedFileType,
  MAX_ADDITIONAL_DOCUMENTS,
  MAX_FILE_SIZE,
  technicianApplicationSchema,
} from "@/validation";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/toast";

export default function TechnicianApplyForm() {
  const { mutate: apply, isPending: applyPending } = useApplyTechnician();

  type TechnicianDefaultValues = z.infer<typeof technicianApplicationSchema>;

  const defaultValues: TechnicianDefaultValues = {
    name: "Mr. Islam",
    email: "islam50-076@diu.edu.bd",
    contactNumber: "01712345678",
    address: "Mirpur 10, Dhaka, Bangladesh",
    qualifications: "BSc in Electrical Engineering, HSC",
    experienceYears: "5",
    skills: "Electrical Installation, Troubleshooting, Customer Service",
    bio: "I am a skilled technician with over 5 years of experience in electrical installation and troubleshooting. I have a strong background in customer service and am committed to providing high-quality work.",
    resume: null as File | null,
    additionalDocuments: [] as File[],
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: technicianApplicationSchema,
    },
    onSubmit: async ({ value }) => {
      const technicianData: ITechnicianApplicationData = {
        name: value.name.trim(),
        email: value.email.trim(),
        contactNumber: value.contactNumber?.trim() ?? "",
        address: value.address?.trim() ?? "",
        qualifications: value.qualifications.trim(),
        experienceYears: Number(value.experienceYears),
        skills: value.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        bio: value.bio?.trim() ?? "",
      };

      const payload: ITechnicianApplicationPayload = {
        data: technicianData,
        resume: value.resume as File,
        additionalDocuments: value.additionalDocuments,
      };

      apply(payload, {
        onSuccess: (res) => {
          if (!res?.success) {
            toast.add({
              title: "Server Failure",
              description: "Something went wrong. Please try again.",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "Application Submitted",
            description:
              "We've received your application. Our team will review it and get back to you.",
            type: "success",
          });

          form.reset();
        },
        onError: (err) => {
          toast.add({
            title: "Submission Failed",
            description: getApiErrorMessage(err),
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <HardHat size="24" />
        </span>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Apply as a Technician
          </h1>
          <p className="text-balance text-sm leading-relaxed text-muted-foreground">
            Join the Field Nexus technician network and let teams in your area
            discover your skills.
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        noValidate
      >
        <FieldGroup className="gap-6 rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                    <div className="relative">
                      <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Rahim Uddin"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className="h-9 pl-9"
                        autoComplete="off"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
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
                    <div className="relative">
                      <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        placeholder="rahim@example.com"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className="h-9 pl-9"
                        autoComplete="off"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="contactNumber">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Contact number</FieldLabel>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="tel"
                        placeholder="+8801712345678"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className="h-9 pl-9"
                        autoComplete="off"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="address">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Mirpur 10, Dhaka, Bangladesh"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className="h-9 pl-9"
                        autoComplete="off"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="qualifications">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Qualifications</FieldLabel>
                    <div className="relative">
                      <GraduationCap className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="BSc in Electrical Engineering, HSC"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className="h-9 pl-9"
                        autoComplete="off"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="experienceYears">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Years of experience
                    </FieldLabel>
                    <div className="relative">
                      <Briefcase className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        placeholder="5"
                        min={0}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className="h-9 pl-9"
                        autoComplete="off"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <form.Field
            name="skills"
            validators={{
              onChange: technicianApplicationSchema.shape.skills,
              onBlur: technicianApplicationSchema.shape.skills,
              onSubmit: technicianApplicationSchema.shape.skills,
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Skills{" "}
                    <span className="font-normal text-muted-foreground">
                      (comma separated)
                    </span>
                  </FieldLabel>
                  <div className="relative">
                    <Wrench className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="Network troubleshooting, Router configuration, Cable installation"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className="h-9 pl-9"
                      autoComplete="off"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="resume">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const file = field.state.value;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="resume-field">Resume</FieldLabel>
                  <div className="flex flex-col items-start gap-2 rounded-xl border border-dashed border-border bg-muted/40 p-4">
                    <Button
                      render={
                        <label htmlFor="resume-field">
                          <FileUp size="4" />
                          Upload resume
                        </label>
                      }
                      nativeButton={false}
                      variant="secondary"
                    />
                    <input
                      id="resume-field"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      name={field.name}
                      onChange={(e) => {
                        const selected = e.target.files?.[0] ?? null;

                        if (selected && !isAcceptedFileType(selected.type)) {
                          toast.add({
                            title: "Unsupported file type",
                            description:
                              "Resume must be a PDF, DOC, DOCX, or image file.",
                            type: "error",
                          });
                          field.handleBlur();
                          return;
                        }

                        if (selected && !isAcceptedFileSize(selected.size)) {
                          toast.add({
                            title: "File too large",
                            description: `Resume must not exceed ${MAX_FILE_SIZE} MB.`,
                            type: "error",
                          });
                          field.handleBlur();
                          return;
                        }

                        field.handleChange(selected);
                        e.target.value = ""; // Reset the input value to allow re-uploading the same file if needed
                      }}
                    />
                    {file ? (
                      <span className="inline-flex max-w-full items-center gap-2 rounded-lg bg-card px-2.5 py-1.5 text-sm shadow-sm">
                        <FileText size="16" className="shrink-0 text-primary" />
                        <span className="truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                        <button
                          type="button"
                          aria-label="Remove resume"
                          onClick={() => {
                            field.handleChange(null);
                            field.handleBlur(); // Mark the field as touched when removing the file
                          }}
                          className="text-muted-foreground transition-colors hover:text-destructive focus:outline-none"
                        >
                          <X size="16" />
                        </button>
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        PDF, DOC, DOCX, or image files up to {MAX_FILE_SIZE} MB
                      </span>
                    )}
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="additionalDocuments">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const files = field.state.value;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="additional-documents-field">
                    Additional Documents
                  </FieldLabel>
                  <div className="flex flex-col items-start gap-2 rounded-xl border border-dashed border-border bg-muted/40 p-4">
                    <Button
                      render={
                        <label htmlFor="additional-documents-field">
                          <FileUp size="4" />
                          Upload Additional Documents
                        </label>
                      }
                      nativeButton={false}
                      variant="secondary"
                    />
                    <input
                      id="additional-documents-field"
                      type="file"
                      multiple
                      className="sr-only"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      name={field.name}
                      onChange={(e) => {
                        const incomingFiles = Array.from(e.target.files ?? []);

                        if (incomingFiles.length === 0) {
                          return;
                        }

                        if (
                          files.length + incomingFiles.length >
                          MAX_ADDITIONAL_DOCUMENTS
                        ) {
                          toast.add({
                            title: "Too many documents",
                            description: `You can upload at most ${MAX_ADDITIONAL_DOCUMENTS} additional documents.`,
                            type: "error",
                          });
                          e.target.value = "";
                          return;
                        }

                        const oversizedFiles = incomingFiles.filter(
                          (file) => !isAcceptedFileSize(file.size),
                        );
                        const invalidTypeFiles = incomingFiles.filter(
                          (file) => !isAcceptedFileType(file.type),
                        );

                        if (oversizedFiles.length > 0) {
                          toast.add({
                            title: "File too large",
                            description: `${oversizedFiles[0].name} must not exceed ${MAX_FILE_SIZE} MB.`,
                            type: "error",
                          });
                        }

                        if (invalidTypeFiles.length > 0) {
                          toast.add({
                            title: "Unsupported file type",
                            description:
                              "Only PDF, DOC, DOCX, or image files are allowed.",
                            type: "error",
                          });
                        }

                        if (
                          oversizedFiles.length > 0 ||
                          invalidTypeFiles.length > 0
                        ) {
                          field.handleBlur();
                          e.target.value = "";
                          return;
                        }

                        field.handleChange([...files, ...incomingFiles]);
                      }}
                    />
                    {files.length > 0 && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {files.length} of {MAX_ADDITIONAL_DOCUMENTS} added
                      </span>
                    )}
                    {files.length > 0 ? (
                      <ul className="mt-2 flex flex-col gap-2">
                        {files.map((file, index) => (
                          <li
                            key={`${file.name}-${index}`}
                            className="inline-flex max-w-full items-center gap-2 rounded-lg bg-card px-2.5 py-1.5 text-sm shadow-sm"
                          >
                            <span className="flex min-w-0 items-center gap-2">
                              <FileText
                                size="16"
                                className="shrink-0 text-primary"
                              />
                              <span className="truncate">{file.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)}
                              </span>
                            </span>
                            <button
                              type="button"
                              aria-label={`Remove ${file.name}`}
                              onClick={() => {
                                field.handleChange(
                                  files.filter((_, i) => i !== index),
                                );
                                field.handleBlur();
                              }}
                              className="text-muted-foreground transition-colors hover:text-destructive focus:outline-none"
                            >
                              <X size="16" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        PDF, DOC, DOCX, or image files
                      </span>
                    )}
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="bio">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Professional bio{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    placeholder="Tell us about your experience and areas of expertise..."
                    rows={4}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Button
            type="submit"
            size="lg"
            disabled={applyPending}
            className="w-full h-10"
          >
            {applyPending ? (
              <>
                <Spinner />
                Submitting...
              </>
            ) : (
              <>
                Submit application
                <ArrowRight data-icon="inline-end" />
              </>
            )}
          </Button>
        </FieldGroup>
      </form>

      <p className="text-balance text-center text-sm leading-relaxed text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          Sign in
        </Link>
        . Customers should use the{" "}
        <Link
          href="/register"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          Customer registration
        </Link>{" "}
        form instead.
      </p>
    </div>
  );
}
