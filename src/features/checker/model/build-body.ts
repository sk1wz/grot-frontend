import type { CheckConfig, FieldValues, ModeDef } from "./types";

export function buildCheckSubjectBody(
  config: CheckConfig,
  values: FieldValues,
  mode?: ModeDef
): Record<string, unknown> {
  const subjectBody =
    mode?.buildSubjectBody(values) ?? config.buildSubjectBody?.(values) ?? {};

  if (mode) {
    return { type: mode.id, subjectBody };
  }

  return { subjectBody };
}
