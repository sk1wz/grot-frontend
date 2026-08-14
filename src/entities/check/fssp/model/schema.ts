import { z } from "zod";
import { createCheckSchema } from "../../model/base-schema";
import { CheckModule } from "../../model/types";

export const FsspResultSchema = z.unknown();
export const FsspCheckSchema = createCheckSchema(
  CheckModule.FSSP,
  FsspResultSchema
);
export type FsspCheck = z.infer<typeof FsspCheckSchema>;
