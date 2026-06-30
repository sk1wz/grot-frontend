import type { CheckConfig, FieldValues, ModeDef } from "./types";

export function buildCheckBody(
  config: CheckConfig,
  values: FieldValues,
  mode?: ModeDef
): Record<string, unknown> {
  const subject =
    mode?.buildSubject(values) ?? config.buildSubject?.(values) ?? {};

  if (mode && config.includeModeInBody) {
    return { mode: mode.id, subject };
  }

  return { subject };
}
