import z from "zod";

export const MAX_PROFILE_IMAGE_SIZE = 5;

export const MAX_PROFILE_IMAGE_SIZE_BYTES = MAX_PROFILE_IMAGE_SIZE * 1024 * 1024;

export const ACCEPTED_PROFILE_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

export function isAcceptedImageType(fileType: string) {
  return ACCEPTED_PROFILE_IMAGE_TYPES.includes(fileType);
}

export function isAcceptedImageSize(fileSize: number) {
  return fileSize <= MAX_PROFILE_IMAGE_SIZE_BYTES;
}

export const updateProfileSchema = z.object({
  name: z
    .string("Not a valid name")
    .trim()
    .min(3, "Name must be at least 3 characters long.")
    .max(50, "Name must not exceed 50 characters."),
});

export const profileImageSchema = z.custom<File>().superRefine((file, ctx) => {
  if (!isAcceptedImageType(file.type)) {
    ctx.addIssue({
      code: "custom",
      message: "Profile picture must be a PNG, JPEG, or WEBP image",
    });
  } else if (!isAcceptedImageSize(file.size)) {
    ctx.addIssue({
      code: "custom",
      message: `Profile picture must not exceed ${MAX_PROFILE_IMAGE_SIZE} MB`,
    });
  }
});

export const applicationStatusSchema = z.object({
  email: z.string().email("Not a valid email address"),
});

export const createWorkOrderSchema = z.object({
  title: z
    .string("Title is required")
    .trim()
    .min(3, "Title must be at least 3 characters long.")
    .max(200, "Title must not exceed 200 characters."),

  description: z
    .string()
    .trim()
    .max(1000, "Description must not exceed 1000 characters.")
    .optional(),

  categoryId: z.string("Category is required"),

  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"], {
    message: "Invalid priority",
  }),

  scheduledAt: z.string().optional(),
});
