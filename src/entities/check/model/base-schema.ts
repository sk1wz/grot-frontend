import { z } from "zod";
import { CheckModule, CheckStatus } from "./types";

const checkBaseSchema = z.looseObject({
  id: z.uuid(),
  status: z.nativeEnum(CheckStatus),
  cost: z.number(),
  error: z.unknown().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  completedAt: z.string().nullable().optional(),
});

export function createCheckSchema<
  TModule extends CheckModule,
  TResult extends z.ZodType
>(module: TModule, result: TResult) {
  return checkBaseSchema
    .extend({
      module: z.literal(module),
      subjectBody: z.record(z.string(), z.unknown()),
      subjectBodyText: z.string(),
      result: result.nullable().optional(),
    })
    .loose();
}
