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

  const values = Object.entries(subject as Record<string, unknown>)
    .flatMap(([, value]) => {
      if (value == null || value === "") {
        return [];
      }

      if (typeof value === "boolean") {
        return value ? [] : [];
      }

      return [String(value)];
    })
    .filter(Boolean);

  return values.length ? values.join(", ") : "—";
}
