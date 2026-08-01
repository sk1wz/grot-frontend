import type { FieldValues } from "./types";

export function pickString(values: FieldValues, key: string): string {
  const value = values[key];
  return typeof value === "string" ? value.trim() : "";
}
