import { z } from "zod";

export const taxiSchema = z.object({
  vin: z
    .string()
    .trim()
    .min(17, "VIN: 17 символов")
    .max(17, "VIN: 17 символов"),
});
