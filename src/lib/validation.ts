import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const requiredString = z.string().min(1, { message: "Required" });
const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Invalid file type"
  )
  .refine((file) => {
    return !file || file.size < 2 * 1024 * 1024;
  }, "File size should be less than 2MB");

const numericRequiredString = requiredString.regex(/^\d+$/, {
  message: "Must be a number",
});

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).email().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or url is not required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      "Invalid location type"
    ),
    location: requiredString.max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required for On-site jobs",
      path: ["location"],
    }
  );

export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    description: z.string().max(5000).optional(),
    companyName: requiredString.max(100),
    location: z.string(),
    type: requiredString.refine((value) => jobTypes.includes(value), {
      message: "Invalid job type",
    }),
    companyLogo: companyLogoSchema,
    salary: numericRequiredString.max(9, "Number can't be long than 9 digits"),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type CreateJobValues = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;
