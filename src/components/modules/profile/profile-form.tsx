"use client";

import { useForm } from "@tanstack/react-form";
import {
  BadgeCheck,
  Camera,
  Image as ImageIcon,
  Loader2,
  Mail,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useGetMe, useUpdateUserInfo, useUploadProfilePicture } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type { UserRole } from "@/types";
import { formatFileSize } from "@/utils";
import {
  MAX_PROFILE_IMAGE_SIZE,
  isAcceptedImageSize,
  isAcceptedImageType,
  updateProfileSchema,
} from "@/validation";
import UserStatusBadge from "../admin/user-status-badge";

const roleLabels: Record<UserRole, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  TECHNICIAN: "Technician",
  CUSTOMER: "Customer",
};

function ProfilePicture({
  imageUrl,
  name,
}: {
  imageUrl?: string | null;
  name: string;
}) {
  const [file, setFile] = useState<File | null>(null);

  const {
    mutate: uploadPicture,
    isPending: uploadPending,
  } = useUploadProfilePicture();

  const { data: meData } = useGetMe();
  const currentImageUrl = meData?.data?.imageUrl ?? imageUrl;

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const displayedImageUrl = previewUrl ?? currentImageUrl;

  const handleUpload = () => {
    if (!file) {
      return;
    }

    uploadPicture(file, {
      onSuccess: (res) => {
        if (!res?.success) {
          toast.add({
            title: "Upload Failed",
            description: "Something went wrong. Please try again.",
            type: "error",
          });
          return;
        }

        toast.add({
          title: "Profile Picture Updated",
          description: "Your profile picture has been uploaded successfully.",
          type: "success",
        });
        setFile(null);
      },
      onError: (err) => {
        toast.add({
          title: "Upload Failed",
          description: getApiErrorMessage(err),
          type: "error",
        });
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Profile Picture</CardTitle>
        <CardDescription>
          PNG, JPEG, or WEBP up to {MAX_PROFILE_IMAGE_SIZE} MB.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-5">
          <span className="relative inline-flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted">
            {displayedImageUrl ? (
              // biome-ignore lint/performance/noImgElement: user uploaded avatar served from cloudinary
              <img
                src={displayedImageUrl}
                alt={`${name}'s profile picture`}
                className="size-full object-cover"
              />
            ) : (
              <ImageIcon className="size-8 text-muted-foreground" />
            )}
          </span>

          <div className="flex min-w-0 flex-col gap-2">
            <Button
              render={
                <label htmlFor="profile-picture-field">
                  <Camera size="4" />
                  {file ? "Change picture" : "Upload picture"}
                </label>
              }
              nativeButton={false}
              variant="secondary"
              disabled={uploadPending}
            />
            <input
              id="profile-picture-field"
              type="file"
              className="sr-only"
              accept=".png,.jpg,.jpeg,.webp"
              disabled={uploadPending}
              onChange={(e) => {
                const selected = e.target.files?.[0] ?? null;
                e.target.value = "";

                if (!selected) {
                  return;
                }

                if (!isAcceptedImageType(selected.type)) {
                  toast.add({
                    title: "Unsupported file type",
                    description:
                      "Profile picture must be a PNG, JPEG, or WEBP image.",
                    type: "error",
                  });
                  return;
                }

                if (!isAcceptedImageSize(selected.size)) {
                  toast.add({
                    title: "File too large",
                    description: `Profile picture must not exceed ${MAX_PROFILE_IMAGE_SIZE} MB.`,
                    type: "error",
                  });
                  return;
                }

                setFile(selected);
              }}
            />

            {file ? (
              <span className="inline-flex max-w-full items-center gap-2 rounded-lg bg-muted px-2.5 py-1.5 text-sm">
                <ImageIcon size="16" className="shrink-0 text-primary" />
                <span className="truncate">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </span>
                <button
                  type="button"
                  aria-label="Remove selected picture"
                  onClick={() => setFile(null)}
                  className="text-muted-foreground transition-colors hover:text-destructive focus:outline-none"
                >
                  <X size="16" />
                </button>
              </span>
            ) : (
              <p className="text-sm text-muted-foreground">
                {currentImageUrl
                  ? "A picture is already set. Upload a new one to replace it."
                  : "No picture uploaded yet."}
              </p>
            )}
          </div>
        </div>

        {file && (
          <div className="flex justify-end">
            <Button
              onClick={handleUpload}
              disabled={uploadPending}
              className="h-9"
            >
              {uploadPending ? (
                <>
                  <Spinner />
                  Uploading...
                </>
              ) : (
                "Save picture"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ProfileForm() {
  const { data: meData, isPending: mePending } = useGetMe();
  const { mutate: updateInfo, isPending: updatePending } = useUpdateUserInfo();

  const user = meData?.data;

  type ProfileDefaultValues = z.infer<typeof updateProfileSchema>;

  if (mePending || !user) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const form = useForm({
    defaultValues: {
      name: user.name,
    } as ProfileDefaultValues,
    validators: {
      onSubmit: updateProfileSchema,
    },
    onSubmit: async ({ value }) => {
      const trimmedName = value.name.trim();

      if (trimmedName === user.name) {
        toast.add({
          title: "No Changes",
          description: "Your name is already up to date.",
          type: "info",
        });
        return;
      }

      updateInfo(
        { name: trimmedName },
        {
          onSuccess: (res) => {
            if (!res?.success) {
              toast.add({
                title: "Update Failed",
                description: "Something went wrong. Please try again.",
                type: "error",
              });
              return;
            }

            toast.add({
              title: "Profile Updated",
              description: "Your profile information has been updated.",
              type: "success",
            });
          },
          onError: (err) => {
            toast.add({
              title: "Update Failed",
              description: getApiErrorMessage(err),
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <ProfilePicture imageUrl={user.imageUrl} name={user.name} />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account Details</CardTitle>
          <CardDescription>
            Your email address and role are managed by the Field Nexus team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="gap-5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              noValidate
            >
              <FieldGroup className="gap-5">
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
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                              field.handleChange(e.target.value)
                            }
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

                <Field data-disabled>
                  <FieldLabel htmlFor="profile-email">Email address</FieldLabel>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="profile-email"
                      type="email"
                      value={user.email}
                      readOnly
                      disabled
                      className="h-9 pl-9"
                    />
                  </div>
                </Field>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                    {roleLabels[user.role as UserRole] ?? user.role}
                  </span>
                  <UserStatusBadge status={user.status} />
                  {user.emailVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <BadgeCheck size="12" />
                      Verified
                    </span>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={updatePending}
                    className="h-9"
                  >
                    {updatePending ? (
                      <>
                        <Spinner />
                        Saving...
                      </>
                    ) : (
                      "Save changes"
                    )}
                  </Button>
                </div>
              </FieldGroup>
            </form>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
