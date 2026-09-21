import z from "zod";

export const createVendorSchema = z.object({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters long.")
    .max(100, "Name must not exceed 100 characters."),
  email: z.string("Email is required").email("Not a valid email address"),
  contactNumber: z
    .string()
    .refine(
      (val) =>
        val === "" || (val.length >= 10 && val.length <= 15),
      {
        message: "Contact number must be between 10 and 15 characters.",
      },
    )
    .optional(),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters.")
    .optional(),
  address: z
    .string()
    .max(200, "Address must not exceed 200 characters.")
    .optional(),
  serviceAreas: z
    .string()
    .max(300, "Service areas must not exceed 300 characters.")
    .optional(),
});

export const updateVendorSchema = z.object({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters long.")
    .max(100, "Name must not exceed 100 characters.")
    .optional(),
  email: z
    .string("Email is required")
    .email("Not a valid email address")
    .optional(),
  contactNumber: z
    .string()
    .refine(
      (val) =>
        val === "" || (val.length >= 10 && val.length <= 15),
      {
        message: "Contact number must be between 10 and 15 characters.",
      },
    )
    .optional(),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters.")
    .optional(),
  address: z
    .string()
    .max(200, "Address must not exceed 200 characters.")
    .optional(),
  serviceAreas: z
    .string()
    .max(300, "Service areas must not exceed 300 characters.")
    .optional(),
});

export const addVendorMemberSchema = z.object({
  technicianId: z.string("Technician ID is required"),
});