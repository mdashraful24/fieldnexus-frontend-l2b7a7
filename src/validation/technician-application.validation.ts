import z from "zod";

export const MAX_FILE_SIZE = 5;

export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024;

export const MAX_ADDITIONAL_DOCUMENTS = 5;

export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

export function isAcceptedFileSize(fileSize: number) {
  return fileSize <= MAX_FILE_SIZE_BYTES;
}

export function isAcceptedFileType(fileType: string) {
  return ACCEPTED_FILE_TYPES.includes(fileType);
}

const ACCEPTED_FILE_TYPES_LABEL = "PDF, DOC, DOCX, or image";

export const technicianApplicationSchema = z.object({
  name: z
    .string("Name is required")
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must not exceed 100 characters"),

  email: z
    .string("Email is required")
    .trim()
    .email("Please provide a valid email address"),

  contactNumber: z
    .string("Contact number is required")
    .trim()
    .min(7, "Contact number must be at least 7 characters long")
    .max(20, "Contact number must not exceed 20 characters")
    .optional(),

  address: z
    .string()
    .trim()
    .max(255, "Address must not exceed 255 characters")
    .optional(),

  qualifications: z
    .string("Qualifications are required")
    .trim()
    .min(2, "Qualifications are required")
    .max(500, "Qualifications must not exceed 500 characters"),

  experienceYears: z
    .string("Experience years is required")
    .min(1, "Experience years is required")
    .refine(
      (value) => !Number.isNaN(Number(value)),
      "Experience years must be a valid number",
    )
    .refine(
      (value) => Number.isInteger(Number(value)),
      "Experience years must be a whole number",
    )
    .refine(
      (value) => Number(value) >= 0,
      "Experience years cannot be negative",
    )
    .refine(
      (value) => Number(value) <= 70,
      "Experience years must not exceed 70",
    ),

  skills: z
    .string("Skills are required")
    .trim()
    .min(1, "Please enter at least one skill.")
    .refine(
      (value) => value.split(",").every((skill) => skill.trim().length > 0),
      "Please separate your skills with commas.",
    )
    .refine(
      (value) =>
        value
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean).length <= 50,
      "Skills must not exceed 50 entries.",
    )
    .refine(
      (value) =>
        value
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
          .every((skill) => skill.length <= 100),
      "Each skill must not exceed 100 characters.",
    ),

  bio: z
    .string()
    .trim()
    .max(2000, "Bio must not exceed 2000 characters")
    .optional(),

  resume: z.custom<File | null>().superRefine((file, ctx) => {
    if (!file) {
      ctx.addIssue({
        code: "custom",
        message: "Please upload your resume",
      });
      return;
    }

    if (!isAcceptedFileType(file.type)) {
      ctx.addIssue({
        code: "custom",
        message: `Resume must be an ${ACCEPTED_FILE_TYPES_LABEL} file`,
      });
    } else if (!isAcceptedFileSize(file.size)) {
      ctx.addIssue({
        code: "custom",
        message: `Resume must not exceed ${MAX_FILE_SIZE} MB`,
      });
    }
  }),

  additionalDocuments: z.array(z.custom<File>()).superRefine((files, ctx) => {
    if (files.length === 0) {
      return;
    }

    if (files.length > MAX_ADDITIONAL_DOCUMENTS) {
      ctx.addIssue({
        code: "custom",
        message: `You can upload at most ${MAX_ADDITIONAL_DOCUMENTS} additional documents`,
      });
      return;
    }

    files.forEach((file, index) => {
      if (!isAcceptedFileType(file.type)) {
        ctx.addIssue({
          code: "custom",
          path: [index],
          message: `"${file.name}" must be an ${ACCEPTED_FILE_TYPES_LABEL} file`,
        });
      } else if (!isAcceptedFileSize(file.size)) {
        ctx.addIssue({
          code: "custom",
          path: [index],
          message: `"${file.name}" must not exceed ${MAX_FILE_SIZE} MB`,
        });
      }
    });
  }),
});

export const rejectApplicationReasonSchema = z.object({
  rejectionReason: z
    .string("Rejection reason is required")
    .trim()
    .min(3, "Rejection reason must be at least 3 characters long")
    .max(500, "Rejection reason must not exceed 500 characters"),
});
