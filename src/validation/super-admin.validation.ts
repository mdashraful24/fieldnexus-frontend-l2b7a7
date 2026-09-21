import z from "zod";

const adminPassword = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .max(32, { message: "Password must not exceed 32 characters." })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter.",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter.",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number." })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character.",
  });

export const createAdminSchema = z
  .object({
    name: z
      .string("Not a valid name")
      .min(3, "Name must be at least 3 characters long.")
      .max(10, "Name must not exceed 10 characters."),
    email: z.string().email("Not a valid email address"),
    contactNumber: z
      .string()
      .refine(
        (val) => val === "" || /^(?:\+?880|0)1[3-9]\d{8}$/.test(val),
        { message: "Please enter a valid Bangladeshi number" },
      )
      .optional(),
    password: adminPassword,
    confirmPassword: adminPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const resetAdminPasswordSchema = z
  .object({
    newPassword: adminPassword,
    confirmNewPassword: adminPassword,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export const changeAdminEmailSchema = z.object({
  newEmail: z.string().email("Not a valid email address"),
});