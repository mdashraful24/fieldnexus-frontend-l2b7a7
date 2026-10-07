import z from "zod";

const basePrice = z
  .string()
  .refine(
    (val) => val === "" || (!Number.isNaN(Number(val)) && Number(val) >= 0),
    {
      message: "Base price must be a positive number.",
    },
  )
  .optional();

export const createServiceCategorySchema = z.object({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters long.")
    .max(100, "Name must not exceed 100 characters."),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters.")
    .optional(),
  basePrice,
});

export const updateServiceCategorySchema = z.object({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters long.")
    .max(100, "Name must not exceed 100 characters."),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters.")
    .optional(),
  basePrice,
  isActive: z.boolean().optional(),
});
