import type { CheckConfig, FieldValues, ModeDef } from "./types";

export function buildCheckBody(
  config: CheckConfig,
  values: FieldValues,
  mode?: ModeDef
): Record<string, unknown> {
  const body = mode?.buildBody(values) ?? config.buildBody?.(values) ?? {};

  if (mode) {
    return { type: mode.id, body };
  }

  return { body };
}
