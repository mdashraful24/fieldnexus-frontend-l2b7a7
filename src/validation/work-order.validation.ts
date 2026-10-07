import z from "zod";

export const serviceReportSchema = z.object({
  workDescription: z
    .string("Work description is required")
    .min(1, "Work description is required")
    .max(2000, "Work description must not exceed 2000 characters."),
  issueFound: z
    .string()
    .max(2000, "Issue found must not exceed 2000 characters.")
    .optional(),
  solutionProvided: z
    .string()
    .max(2000, "Solution provided must not exceed 2000 characters.")
    .optional(),
  hoursWorked: z
    .string()
    .refine(
      (val) => val !== "" && !Number.isNaN(Number(val)) && Number(val) > 0,
      { message: "Hours worked must be a positive number." },
    ),
});

export const feedbackSchema = z.object({
  comment: z
    .string()
    .max(500, "Comment must not exceed 500 characters.")
    .optional(),
});
