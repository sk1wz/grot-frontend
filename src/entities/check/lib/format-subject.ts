function formatSubjectValue(value: unknown): string {
  if (value == null) {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? "да" : "нет";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

export function formatCheckSubject(subject: unknown): string {
  if (subject == null) {
    return "—";
  }

  if (typeof subject === "string") {
    return subject;
  }

  if (typeof subject === "object" && !Array.isArray(subject)) {
    const entries = Object.entries(subject as Record<string, unknown>);

    if (!entries.length) {
      return "—";
    }

    return entries
      .map(([key, value]) => `${key}: ${formatSubjectValue(value)}`)
      .join(", ");
  }

  return JSON.stringify(subject);
}
