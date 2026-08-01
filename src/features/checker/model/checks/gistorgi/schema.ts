import { z } from "zod";

export const gistorgiSchema = z.object({
  vin: z
    .string()
    .trim()
    .min(17, "VIN: 17 символов")
    .max(17, "VIN: 17 символов"),
});
