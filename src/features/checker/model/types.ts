import type { z } from "zod";

export type FieldType = "text" | "date" | "checkbox";

export type FieldDef = {
  name: string;
  label: string;
  placeholder?: string;
  type?: FieldType;
};

export type FieldValues = Record<string, string | boolean>;

export type ModeDef = {
  id: string;
  label: string;
  fields: FieldDef[];
  schema: z.ZodType<FieldValues>;
  buildSubject: (values: FieldValues) => Record<string, unknown>;
  requiresFeature?: string;
};

export type CheckConfig = {
  id: string;
  title: string;
  endpoint: string;
  modes?: ModeDef[];
  fields?: FieldDef[];
  schema?: z.ZodType<FieldValues>;
  buildSubject?: (values: FieldValues) => Record<string, unknown>;
  includeModeInBody?: boolean;
  templateUrl?: string;
};
