import { z } from "zod";
import { CheckModule, CheckStatus } from "./types";

/** Object-схема: известные поля валидируются, лишние сохраняются и не ломают парсинг. */
function schemaObject<T extends z.ZodRawShape>(shape: T) {
  return z.looseObject(shape);
}

const checkBaseSchema = schemaObject({
  id: z.uuid(),
  status: z.nativeEnum(CheckStatus),
  cost: z.number(),
  error: z.unknown().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  completedAt: z.string().nullable().optional(),
});

const vinSubjectSchema = schemaObject({
  vin: z.string(),
});

export const gibddSubjectSchema = vinSubjectSchema
  .extend({
    osago: z.boolean().optional(),
  })
  .loose();

export const gisTorgiSubjectSchema = vinSubjectSchema;

export const fsspSubjectSchema = z.union([
  schemaObject({
    fio: z.string(),
    dob: z.string(),
  }),
  schemaObject({ inn: z.string() }),
  schemaObject({ ip: z.string() }),
  schemaObject({ doc_id: z.string() }),
]);

export const bankruptcySubjectSchema = z.union([
  schemaObject({ inn: z.string() }),
  schemaObject({ fio: z.string() }),
]);

export const innSubjectSchema = z.union([
  schemaObject({
    fio: z.string(),
    dob: z.string(),
    passport: z.string(),
  }),
  schemaObject({ text: z.string() }),
]);

/*
 * Реальные схемы результатов
 * Спарсятся в нужные схемы, лишние поля сохранятся и не сломают парсинг.
 */
export const gibddResultSchema = z.unknown();
export const gisTorgiResultSchema = z.unknown();
export const fsspResultSchema = z.unknown();
export const bankruptcyResultSchema = z.unknown();
export const innResultSchema = z.unknown();

function normalizeSubjectSchema<TSubject extends z.ZodType>(
  subjectSchema: TSubject
) {
  return z
    .union([
      subjectSchema,
      schemaObject({
        subject: subjectSchema,
      }),
    ])
    .transform((subject): z.output<TSubject> => {
      if (
        typeof subject === "object" &&
        subject !== null &&
        "subject" in subject
      ) {
        return subject.subject as z.output<TSubject>;
      }

      return subject as z.output<TSubject>;
    });
}

function createCheckSchema<
  TModule extends CheckModule,
  TSubject extends z.ZodType,
  TResult extends z.ZodType
>(module: TModule, subject: TSubject, result: TResult) {
  return checkBaseSchema
    .extend({
      module: z.literal(module),
      subject: normalizeSubjectSchema(subject),
      result: result.nullable().optional(),
    })
    .loose();
}

export const checkSchemasByModule = {
  [CheckModule.GIBDD]: createCheckSchema(
    CheckModule.GIBDD,
    gibddSubjectSchema,
    gibddResultSchema
  ),
  [CheckModule.GISTORGI]: createCheckSchema(
    CheckModule.GISTORGI,
    gisTorgiSubjectSchema,
    gisTorgiResultSchema
  ),
  [CheckModule.FSSP]: createCheckSchema(
    CheckModule.FSSP,
    fsspSubjectSchema,
    fsspResultSchema
  ),
  [CheckModule.BANKRUPTCY]: createCheckSchema(
    CheckModule.BANKRUPTCY,
    bankruptcySubjectSchema,
    bankruptcyResultSchema
  ),
  [CheckModule.INN]: createCheckSchema(
    CheckModule.INN,
    innSubjectSchema,
    innResultSchema
  ),
} as const;

export const CheckSchema = z.discriminatedUnion("module", [
  checkSchemasByModule[CheckModule.GIBDD],
  checkSchemasByModule[CheckModule.GISTORGI],
  checkSchemasByModule[CheckModule.FSSP],
  checkSchemasByModule[CheckModule.BANKRUPTCY],
  checkSchemasByModule[CheckModule.INN],
]);

export const ChecksResponseSchema = z.array(CheckSchema);

export type Check = z.infer<typeof CheckSchema>;

export type CheckByModule<TModule extends CheckModule> = Extract<
  Check,
  { module: TModule }
>;

export function isCheckModule<TModule extends CheckModule>(
  module: TModule
): (check: Check) => check is CheckByModule<TModule> {
  return (check): check is CheckByModule<TModule> => check.module === module;
}
