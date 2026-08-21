import { z } from "zod";
import { BankruptcyCheckSchema } from "../bankruptcy/model/schema";
import { FsspCheckSchema } from "../fssp/model/schema";
import { GibddCheckSchema } from "../gibdd/model/schema";
import { GistorgiCheckSchema } from "../gistorgi/model/schema";
import { InnCheckSchema } from "../inn/model/schema";
import { LimitationCheckSchema } from "../limitation/model/schema";
import { CheckModule } from "./types";
import { TaxiCheckSchema } from "../taxi/model/schema";

export const checkSchemasByModule = {
  [CheckModule.GIBDD]: GibddCheckSchema,
  [CheckModule.GISTORGI]: GistorgiCheckSchema,
  [CheckModule.LIMITATION]: LimitationCheckSchema,
  [CheckModule.FSSP]: FsspCheckSchema,
  [CheckModule.BANKRUPTCY]: BankruptcyCheckSchema,
  [CheckModule.INN]: InnCheckSchema,
  [CheckModule.TAXI]: TaxiCheckSchema,
} as const;

export const CheckSchema = z.discriminatedUnion("module", [
  GibddCheckSchema,
  GistorgiCheckSchema,
  LimitationCheckSchema,
  FsspCheckSchema,
  BankruptcyCheckSchema,
  InnCheckSchema,
  TaxiCheckSchema,
]);
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
