import { z } from "zod";

export const userFormSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  job: z.string().min(2, "Job is required"),
});
