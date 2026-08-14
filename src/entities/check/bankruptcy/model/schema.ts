import { z } from "zod";
import { createCheckSchema } from "../../model/base-schema";
import { CheckModule } from "../../model/types";

export const BankruptcyResultSchema = z.unknown();
export const BankruptcyCheckSchema = createCheckSchema(
  CheckModule.BANKRUPTCY,
  BankruptcyResultSchema
);
export type BankruptcyCheck = z.infer<typeof BankruptcyCheckSchema>;
