function collectSubjectValues(value: unknown): string[] {
  if (value == null || value === "") {
    return [];
  }

  if (typeof value === "string" || typeof value === "number") {
    return [String(value)];
  }

  if (typeof value === "boolean") {
    return value ? ["true"] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap(collectSubjectValues);
  }

  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>).flatMap(
      collectSubjectValues
    );
  }

  return [];
}

export function formatCheckSubject(subject: unknown): string {
  if (subject == null) {
    return "—";
  }

  if (typeof subject === "string") {
    return subject;
  }

  if (typeof subject !== "object") {
    return String(subject);
  }

  const values = collectSubjectValues(subject);

  return values.length ? values.join(", ") : "—";
}
